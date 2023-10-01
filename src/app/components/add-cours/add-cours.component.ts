import { CoursService } from './../../services/cours.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  coursForm: FormGroup;
  cours :any={};
  user:any;
  coursToSend:any;
  constructor(private formBuilder:FormBuilder,
    private router:Router,private coursService:CoursService) { }

  ngOnInit() {
  }

  addCours(){
    console.log("here player object", this.cours);
    console.log("cours value",this.coursForm.value);
    console.log("add cous user",this.user.userId);
    this.coursToSend = {
      ...this.coursForm.value,
      TeacherID: this.user.userId
    };

    console.log(this.coursToSend);
    this.coursService.addcours(this.coursToSend).subscribe(
      (response) => {
        console.log("Response from server:", response);
        // Handle the response here if needed
      },
      (error) => {
        console.error("Error while adding cours:", error);
        // Handle the error here if needed
      }
    );
  }


}
