import {Component, Inject, inject, OnDestroy, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {GoogleSigninButtonModule, SocialAuthService} from "@abacritt/angularx-social-login";
import {SnackBarService} from "../../services/snack-bar.service";
import {AuthService} from "../../services/auth.service";
import {IUser} from "../../typeScript/interfaces";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {CommonModule, DOCUMENT} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatIcon,
    GoogleSigninButtonModule,
    MatLabel,
    MatFormField,
    MatError,
    MatInput,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  socialAuthService=inject(SocialAuthService)
  loginForm!: FormGroup;
  aSub!: Subscription;
  message!: string;

  // Google Oauth
  userGoogle = this._auth.userGoogle

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _snackBar: SnackBarService,
    private _authGoogleService: SocialAuthService,

  ) {
  }

  ngOnInit(): void {
    // Google Oauth
    this._auth.logout()
    this._authGoogleService.signOut()

    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });

    this._route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this._snackBar.openTop('Теперь можете зайти в систему используя свои данные')
      } else if (params['accessDenied']) {
        this._snackBar.openTop('Для начало авторизуйтесь в системе')
      } else if (params['sessionFailed']) {
        this._snackBar.openTop('Пожалуйста войдите в систему заного')
      }
    })

    // Google Oauth
    this.socialAuthService.authState.subscribe((userGoogle) => {
      this.userGoogle.set(userGoogle)
      if (userGoogle) {
        const user: any = {
          email: this.userGoogle().email,
          password: this.userGoogle().email + this.userGoogle().id,
        }
        this.loginUserDb(user)
      }
    })
  }

  ngOnDestroy(): void {
    //отписываемся от стрима
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.loginForm.disable()
    this.loginUserDb(this.loginForm.value)
  }

  // loginGoogle(user: IUser) {
  //   this.loginUserDb(user)
  // }

  loginUserDb(user: IUser) {
    this.aSub = this._auth.login(user).subscribe({
      next: ({message}) => {
        this._snackBar.openBottom(message)
        this._router.navigate(['/products'])
      },
      error: error => {
        this._snackBar.openTop(error.error.message)
        //включаем форму обратно
        this.loginForm.enable()
      }
    })
  }
}
