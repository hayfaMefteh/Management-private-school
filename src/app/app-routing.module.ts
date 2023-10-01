import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingupComponent } from './components/singup/singup.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { AdminComponent } from './components/admin/admin.component';
import { SingupTeacherComponent } from './components/singup-teacher/singup-teacher.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"subscription",component:SingupComponent},
  {path:"subscriptionTeacher",component:SingupTeacherComponent},
  {path:"addCours",component:AddCoursComponent},
  {path:"subscriptionAdmin",component:AdminComponent},
  {path:"login",component:LoginComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
