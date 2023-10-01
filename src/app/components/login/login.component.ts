import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg:string;
  constructor(private formBuilder: FormBuilder,
    private userService:UsersService,
    private router:Router,) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      number: ['', [Validators.required]],
      pwd: ['', [Validators.required]]
    });
  }
  login() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log("Response from server:", response);
        if (response.msg=="2") {
          sessionStorage.setItem('jwt',response.user);
         this.router.navigate(["profile"]);
          
          
        } else {
          this.errorMsg="Please Check Number/PWD"
          
        }
      },
    );
  }
}
