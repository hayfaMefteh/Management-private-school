import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  signupForm: FormGroup ;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
      // phone:["",[Validators.required,Validators.maxLength(8)]],
      // adress:["",[Validators.required]]
    })
  }
  signup() {
    console.log("here object", this.signupForm.value);
    // this.userService.singup(this.signupForm.value,this.signupForm.value.img).subscribe();
    // let idUser=JSON.parse(localStorage.getItem("userId")||"1");
    // let users=JSON.parse(localStorage.getItem("users")||"[]");
    // this.signupForm.value.id=idUser;
    // users.push(this.signupForm.value);
    // localStorage.setItem("users", JSON.stringify(users));
    // localStorage.setItem("userId", idUser+1);

  }

}
