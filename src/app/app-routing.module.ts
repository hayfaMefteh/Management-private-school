import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingupComponent } from './components/singup/singup.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"subscription",component:SingupComponent},
  {path:"addCours",component:AddCoursComponent},
  {path:"admin",component:AdminComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
