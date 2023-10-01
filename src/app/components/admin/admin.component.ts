import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminSignupForm:FormGroup;
path:string;
  constructor(private formBuilder:FormBuilder,
    private userService:UsersService,
    private router:Router) { }

  ngOnInit() {
    this.path= this.router.url;
    console.log(this.path);

    this.adminSignupForm= this.formBuilder.group({
      firstName:["",[Validators.required, Validators.minLength(3)]],
      lastName:["",[Validators.required, Validators.minLength(5)]],
      email:["",[Validators.required,Validators.email]],
      pwd:["",[Validators.required,Validators.minLength(6),Validators.maxLength(12)]],
      number:["",Validators.required],
      role:["Admin"],
      status:["verified"],
      
    })
  }

  signupAdmin()
  {
    console.log("here object",this.adminSignupForm.value);
    
    this.userService.signupAdmin(this.adminSignupForm.value).subscribe()
  }

}
