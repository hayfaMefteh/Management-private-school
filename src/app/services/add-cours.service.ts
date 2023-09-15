import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddCoursService {

  constructor(private httpClient : HttpClient) { }

  coursURL:string="http://localhost:3000/api/cours";

  addCours(coursObj){
    return this.httpClient.post(this.coursURL,coursObj);
  } 

}
