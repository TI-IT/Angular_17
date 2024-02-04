import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from "../../typeScript/interfaces";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {GoogleSigninButtonModule, SocialAuthService} from "@abacritt/angularx-social-login";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GoogleSigninButtonModule,
    MatIcon,
    MatLabel,
    MatFormField,
    MatError,
    MatButton,
    MatInput
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  aSub!: Subscription;
  message!: string;
  role_id!: string;
  passwordCheck: boolean = false

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

  ngOnInit() {
    // Google Oauth
    this._auth.logout()
    this._authGoogleService.signOut()

    this.registerForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      secondPassword: [null, Validators.required],
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

    if (!this.role_id) {
      this.getRoleId()
    }

    // Google Oauth
    this.aSub = this._authGoogleService.authState.subscribe((userGoogle) => {
      this.userGoogle.set(userGoogle)
      // this.loggedInGoogle = (userGoogle != null)
      if (this.userGoogle()) {
        const user: IUser = {
          name: this.userGoogle().name,
          email: this.userGoogle().email,
          password: this.userGoogle().email + this.userGoogle().id,
          role_id: this.role_id
        }
        this.saveUserDb(user)
      }
    })
  }


  ngOnDestroy(): void {
    //отписываемся от стрима
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  getRoleId() {
    this._auth.getAllRole().subscribe({
      next: ({data, message}) => {
        let userRoleFound = false;
        data.forEach((role) => {
          if (role.roleName === 'user') {
            this.role_id = role._id;
            userRoleFound = true;
          }
        });
        if (!userRoleFound) {
          this.createRole('user');
        }
      },
      error: error => {
        //включаем форму обратно
        this.registerForm.enable()
      }
    })
  }

  createRole(roleName: string) {
    this._auth.createRole(roleName).subscribe({
      next: ({data, message}) => {
        this.role_id = data._id
      },
      error: error => {
        console.warn(error)
        this._snackBar.openTop(error.error.message)
      }
    })
  }

  onSubmit() {
    if (this.registerForm.value.password !== this.registerForm.value.secondPassword) {
      this.passwordCheck = true
      this.registerForm.enable()
      return
    }
    // выключает форму при запросе-не дает повторно нажать отправить
    this.registerForm.disable()

    const user: IUser = {
      name: '',
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role_id: this.role_id ? this.role_id : ''
    }
    this.saveUserDb(user)
  }

  saveUserDb(user: IUser) {
    this.aSub = this._auth.register(user).subscribe({
      next: ({data, message}) => {
        // handle next value
        this._router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
        this._snackBar.openTop(message)
      },
      error: error => {
        console.warn(error)
        this._snackBar.openTop(error.error.message)
        this.registerForm.enable()
      }
    })
  }

}
