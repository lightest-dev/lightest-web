import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { EditorComponent } from './editor/editor.component';
import {AddTaskPageComponent} from './add-task-page/add-task-page.component';
import {AddCategoryPageComponent} from './add-category-page/add-category-page.component';
import {AddCheckerPageComponent} from './add-checker-page/add-checker-page.component';
import {AddGroupPageComponent} from './add-group-page/add-group-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AuthComponent, },
  { path: 'main', component: MainComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'editor', component: EditorComponent },
  { path: 'add-task', component: AddTaskPageComponent },
  { path: 'add-category', component: AddCategoryPageComponent },
  { path: 'add-checker', component: AddCheckerPageComponent },
  { path: 'add-group', component: AddGroupPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
