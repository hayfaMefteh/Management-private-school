import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-singup-teacher',
  templateUrl: './singup-teacher.component.html',
  styleUrls: ['./singup-teacher.component.css']
})
export class SingupTeacherComponent implements OnInit {

  signupTeacherForm:FormGroup;
  selectedFileInvalid: boolean = false;
 path:string;

  constructor(private formBuilder:FormBuilder,
    private userService:UsersService,
    private router:Router) {
      // this. signupTeacherForm= this.formBuilder.group({
      //   cours: ['initialValue'],
      //   // other form controls
      // });
     }

  ngOnInit() {

    this.path= this.router.url;
    console.log(this.path);

    this.signupTeacherForm= this.formBuilder.group({
      firstName:["",[Validators.required, Validators.minLength(3)]],
      lastName:["",[Validators.required, Validators.minLength(5)]],
      email:["",[Validators.required,Validators.email]],
      pwd:["",[Validators.required,Validators.minLength(6),Validators.maxLength(12)]],
      number:["",Validators.required],
      cours:["",Validators.required],
      role:["Teacher"],
      status:["not-verified"],
      pdf:[""],
    })


  }


  signupTeacher(){


    console.log("here objectFrom FE ", this.signupTeacherForm.value);

  // Get the selected PDF file from the form control
  const pdfFile = this.signupTeacherForm.get('pdf').value;

  this.userService.signupTeacher(this.signupTeacherForm.value, pdfFile).subscribe(
    (response) => {
      // Handle the success response
      console.log("Teacher signed up successfully:", response);
    },
    (error) => {
      // Handle the error response
      console.error("Error signing up teacher:", error);
    }
  );
  }
  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file && file.type === 'application/pdf') {
      this.signupTeacherForm.patchValue({ pdf: file });
      this.signupTeacherForm.updateValueAndValidity();
    } else {
      // Invalid file type, reset the form field and display a message
      this.signupTeacherForm.patchValue({ pdf: null });
      this.selectedFileInvalid = true;
    }
  }
}
