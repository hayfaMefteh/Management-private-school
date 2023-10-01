import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  coursURL:string="http://localhost:3000/api/cours"

  constructor(private http :HttpClient) { }
  addcours(cours:any) {
    console.log("cous from service ", cours);

    return this.http.post(this.coursURL +"/addcours", cours)
  }
  getallcourses(){
    return this.http.get<{courses:any ,msg:string}>(this.coursURL);
  }
}
