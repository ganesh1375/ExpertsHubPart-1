import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './Forms/forgot-password/forgot-password.component';
import { LoginComponent } from './Forms/login/login.component';
import { PageNotFoundComponent } from './Forms/page-not-found/page-not-found.component';
import { RegisterComponent } from './Forms/register/register.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path:"register",component:RegisterComponent
  }
  ,{
    path:"login",component:LoginComponent
  },
  {
    path:"register/login",component:LoginComponent
  },
  {
    path:"forgot-password",component:ForgotPasswordComponent
  },
  {
    path:"",component:HomepageComponent
  },
  {
    path:"**",component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
