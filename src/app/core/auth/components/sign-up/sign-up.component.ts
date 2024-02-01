import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Perfil } from "src/app/core/model/Profiles";
import { ThemeService } from "src/app/core/services/theme.service";
import { Router } from "@angular/router";
import { APP_ROUTES } from "src/app/shared/config";
import { Sexo } from "src/app/core/model/Sexo";
import { IEntityValue } from "src/app/core/model/IEntityValue";
import { ApplicationUserDTO } from "src/app/core/model/dto/ApplicationUserDTO";
import { UserDTO } from "src/app/core/model/dto/UserDTO";
import { ApplicationUserService } from "../../services/sign-up.service";
import { CustomRegExp } from "src/app/shared/config/regexp/regexp-rules";
import { InvalidUsername } from "src/app/shared/config/validators/form";

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
  private readonly _applicationUserSrvc = inject(ApplicationUserService);

  /* MEMBERS */
  public readonly userForm: FormGroup;
  public readonly sexos = Sexo;
  public readonly telMask = CustomRegExp.fone;

  constructor() {
    let controls: {[k: string]: FormControl} = {
      nome: new FormControl<string>(undefined, [Validators.required]),
      sobrenome: new FormControl<string>(undefined, [Validators.required]),
      perfil: new FormControl<string>(this.isVisitor ? Perfil.cliente.api : undefined, [Validators.required]),
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

  public get isVisitor(): boolean { return !this._authService.isSignedIn; }
  public get isAdmin(): boolean { return !this.isVisitor && this._authService.isAdmin(); }
  public cancelar(): void { this._router.navigate([APP_ROUTES.home]).then() }
  public get formTitle(): string { return this.isVisitor ? 'Cadastro de Utilizador' : 'Cadastro de Funcionário' }
  public get canSave(): boolean { return this.userForm.valid }
  public get tiposConta(): IEntityValue[] {
    return this.isVisitor
      ? Perfil.names.filter(i => i.api === Perfil.cliente.api)
      : Perfil.names.filter(i => i.api !== Perfil.cliente.api);
  }

  public salvar() {
    if(!this.canSave) return;

    const appUser = new ApplicationUserDTO();
    const user = new UserDTO();

    Object.assign(appUser, this.userForm.value);
    Object.assign(user, this.userForm.value);

    appUser.perf = Perfil.getPerfil(appUser.perfil);

    this.isVisitor ? appUser.cliente = user : appUser.funcionario = user;

    this._applicationUserSrvc.signUp(appUser).subscribe(usr => {
      if(this.isVisitor) {
        const u = new UserDTO();
        u.username = usr.username;
        u.password = usr.password;

        this._authService.signIn(u, true);
      };

      this.userForm.reset({emitEvent: false});
    });
  }

  public toggleControlType(ctrl: HTMLInputElement) {
    ctrl.type = ctrl.type === 'text' ? 'password' : 'text';
  }
}
