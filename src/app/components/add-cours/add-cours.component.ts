import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  coursForm: FormGroup;
  cours :any={};
  constructor() { }

  ngOnInit() {
  }

  addCours(){
    console.log("here player object", this.cours);

  }


}
