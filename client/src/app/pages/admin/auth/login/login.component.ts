import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginObj: any = {
    userName: '',
    password: ''
  }

  constructor(
    private router: Router,
    private toaster: ToastrService,
  ){

  }

  onLogin() {
    if(this.loginObj.userName === "admin" && this.loginObj.password === "123"){
      console.log("Вы вошли", 'Toastr fun!');
      this.toaster.success("Вы вошли", 'Success');
      //Перенаправляем по URL
      this.router.navigateByUrl('/products');

    } else {
      alert('Не верные учетные данные')
    }
  }

}
