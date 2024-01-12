import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Perfil } from "src/app/core/model/Profiles";
import { ThemeService } from "src/app/core/services/theme.service";
import { Router } from "@angular/router";
import { APP_ROUTES } from "src/app/shared/config";
import { Sexo } from "src/app/core/model/Sexo";
import { IEntityValue } from "src/app/core/model/IEntityValue";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _themeService = inject(ThemeService);
  private readonly _router = inject(Router);

  /* MEMBERS */
  public readonly userForm: FormGroup;
  public readonly sexos = Sexo;

  constructor() {
    console.log(this._router.getCurrentNavigation().extras.state);
    let controls: {[k: string]: FormControl} = {
      nome: new FormControl<string>(undefined, [Validators.required]),
      sobrenome: new FormControl<string>(undefined, [Validators.required]),
      tipo: new FormControl<string>(this.isVisitor ? Perfil.cliente.api : undefined, [Validators.required]),
      estado: new FormControl(false, [Validators.required]),
      genero: new FormControl<string>(undefined, [Validators.required]),
      username: new FormControl<string>(undefined, [Validators.required]),
      password: new FormControl<string>(undefined, [Validators.required]),
    };

    if(this.isVisitor) controls.contato = new FormControl<string>(undefined, [Validators.required]);
    else controls.contacto = new FormControl<string>(undefined, [Validators.required]);

    this.userForm = this._formBuilder.group(controls);
  }

  ngOnInit(): void {
    this._themeService.init();
  }

  public get isVisitor(): boolean { return this._authService.isSignedIn; }
  public cancelar(): void { this._router.navigate([APP_ROUTES.home]).then() }
  public get formTitle(): string { return this.isVisitor ? 'Cadastro de Funcionário' : 'Cadastro de Utilizador' }
  public get canSave(): boolean { return this.userForm.valid }
  public get tiposConta(): IEntityValue[] {
    return this._authService.isCliente()
      ? Perfil.names.filter(i => i.api === Perfil.cliente.api)
      : Perfil.names.filter(i => i.api !== Perfil.cliente.api);
  }

  public salvar() {
    if(!this.canSave) return;


  }
}
