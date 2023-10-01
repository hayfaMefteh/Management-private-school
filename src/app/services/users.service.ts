import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userURL: string = "http://localhost:3000/api/users";

  constructor(private http: HttpClient,) { }
  login(user) {
    console.log("userfromservice",user);
    return this.http.post<{user:any,msg:string}>(this.userURL + "/login", user)
    
    
  }

  singup(user: any, avatar: File) {
    let formData = new FormData;
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("img", avatar);
    return this.http.post(this.userURL + "/signup", formData);
  }



  signupTeacher(user: any ,avatar: File) {
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("number", user.number);
    formData.append("role", user.role);
    formData.append("cours", user.cours);
    formData.append("status", user.status);
    formData.append("pdf", avatar);
    console.log("user frome service",user);
     
    return this.http.post(this.userURL + "/signupTeacher", formData)
  }

  signupAdmin(user: any) {
    console.log("userrrr ", user);

    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("number", user.number);
    formData.append("role", user.role);

    
    
    console.log("service ", formData);

    return this.http.post(this.userURL + "/signupAdmin", user)
  }

}
