import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { UserDTO } from "src/app/core/model/dto/UserDTO";
import { ThemeService } from "src/app/core/services/theme.service";
import { Router } from "@angular/router";
import { APP_ROUTES } from "src/app/shared/config";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html'
})
export class LogInComponent {
  /* DEPENDENCIES */
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _themeService = inject(ThemeService);
  private readonly _router = inject(Router);

  /* MEMBERS */
  public readonly loginForm: FormGroup;
  public readonly capa: string;
  public readonly ano: number;
  public showProgress: boolean

  constructor() {
    this._themeService.init();

    this.loginForm = this._formBuilder.group({
      password: new FormControl<string>(undefined, [Validators.required]),
      username: new FormControl<string>(undefined, [Validators.required])
    });

    this._authService.showProgress.subscribe(emit => { this.showProgress = emit });

    this.ano = new Date(Date.now()).getUTCFullYear();
    this.capa = '../../../../../assets/images/capa.png.jpg';
  }

  public login() {
    if(!this.loginForm.valid) return;

    this.showProgress = true;
    const user = Object.assign(new UserDTO(), this.loginForm.value);
    this._authService.signIn(user);
  }

  public cancelar() {
    this._router.navigate([APP_ROUTES.home]).then();
  }

  public get username() { return this.loginForm.get('username') as FormControl<string> }
  public get password() { return this.loginForm.get('password') as FormControl<string> }
}
