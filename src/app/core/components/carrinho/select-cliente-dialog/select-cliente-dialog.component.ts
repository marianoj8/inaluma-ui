import { Component, OnInit, inject } from "@angular/core";
import { UsersService } from "../../user/services/users.service";
import { Observable } from "rxjs";
import { UserDTO } from "src/app/core/model/dto/UserDTO";
import { Perfil } from "src/app/core/model/Profiles";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-select-cliente-dialog',
  templateUrl: './select-cliente-dialog.component.html',
  styleUrls: ['./select-cliente-theme.scss']
})
export class SelectClienteDialogComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _usersService = inject(UsersService);
  private readonly _diagRef = inject(MatDialogRef);

  /* MEMBERS */
  public clientes$: Observable<UserDTO[]>;

  ngOnInit(): void {
    this.clientes$ = this._usersService.fetch(true)
  }

  public selecionar(usr: UserDTO): void { this._fecharDialogo(usr); }
  public cancelar(): void { this._fecharDialogo(null); }

  private _fecharDialogo(usr: UserDTO): void {
    this._diagRef.close(usr);
  }
}
