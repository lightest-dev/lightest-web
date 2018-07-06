import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "main" }, 
  // { path: "**", component: ErrorComponent},
  { path: "main", component: MainComponent},
  { path: "login", component: LoginComponent},
  { path: "registration", component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
