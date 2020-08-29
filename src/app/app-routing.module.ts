import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { EditorComponent } from './editor/editor.component';
import {AddTaskPageComponent} from './add-task-page/add-task-page.component';
import {AddCategoryPageComponent} from './add-category-page/add-category-page.component';
import {CheckerPageComponent} from './checker-page/checker-page.component';
import {GroupPageComponent} from './group-page/group-page.component';
import {LanguagePageComponent} from './language-page/language-page.component';
import {TestPageComponent} from './test-page/test-page.component';
import {ProfilePageComponent} from './user/profilePage.component';
import {AuthGuardService} from './shared/guards/auth-guard.service';
import {UserInfoComponent} from './user/user-info/user-info.component';
import {AddTaskToUsersPageComponent} from './add-task-to-users-page/add-task-to-users-page.component';
import {UsersTableComponent} from './users-table/users-table.component';
import {TasksTableComponent} from './tasks-table/tasks-table.component';
import {CategoriesTableComponent} from './categories-table/categories-table.component';
import {CheckersTableComponent} from './checkers-table/checkers-table.component';
import {TestsTableComponent} from './tests-table/tests-table.component';
import {GroupsTableComponent} from './groups-table/groups-table.component';
import {ServiceNavigationComponent} from './service-navigation/service-navigation.component';
import {AuthGuardAdminService} from './shared/guards/auth-guard-admin.service';
import {AddUsersToGroupComponent} from './add-users-to-group/add-users-to-group.component';
import {AddUsersToCategoriesComponent} from './add-users-to-categories/add-users-to-categories.component';
import {UploadsListComponent} from './uploads-list/uploads-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AuthComponent, },
  { path: 'main', component: MainComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { 
    path: 'tests',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'table',
        canActivate: [AuthGuardAdminService],
        component: TestsTableComponent
      },
      {
        path: 'add',
        component: TestPageComponent
      },
      {
        path: 'edit/:id',
        component: TestPageComponent
      },
    ]
  },
  {
    path: 'checkers',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'table',
        canActivate: [AuthGuardAdminService],
        component: CheckersTableComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuardAdminService],
        component: CheckerPageComponent
      },
      {
        path: 'edit/:id',
        component: CheckerPageComponent
      },
    ]
  },
  {
    path: 'languages',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'add',
        canActivate: [AuthGuardAdminService],
        component: LanguagePageComponent
      },
    ]
  },
  {
    path: 'groups',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'table',
        canActivate: [AuthGuardAdminService],
        component: GroupsTableComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuardAdminService],
        component: GroupPageComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuardAdminService],
        component: GroupPageComponent
      },
    ]
  },
  {
    path: 'account', component: ProfilePageComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: UserInfoComponent },
      { path: 'editor/:id',
        canActivate: [AuthGuardService],
        component: EditorComponent
      },
      { path: 'table/users',
        canActivate: [AuthGuardAdminService],
        component: UsersTableComponent
      },
      // TODO: should be accessible only by teachers/admins
      { path: 'table/tasks',
        canActivate: [AuthGuardService],
        component: TasksTableComponent
      },
      { path: 'table/categories',
        canActivate: [AuthGuardAdminService],
        component: CategoriesTableComponent
      },
      { path: 'add-task',
        canActivate: [AuthGuardAdminService],
        component: AddTaskPageComponent
      },
      { path: 'add-category',
        canActivate: [AuthGuardAdminService],
        component: AddCategoryPageComponent
      },
      { path: 'add-task-for-users',
        canActivate: [AuthGuardAdminService],
        component: AddTaskToUsersPageComponent
      },
      { path: 'add-users-to-group',
        canActivate: [AuthGuardAdminService],
        component: AddUsersToGroupComponent
      },
      { path: 'add-users-to-categories',
        canActivate: [AuthGuardAdminService],
        component: AddUsersToCategoriesComponent
      },
      { path: 'service-navigation',
        canActivate: [AuthGuardAdminService],
        component: ServiceNavigationComponent
      },
      { path: 'uploads/:id',
        canActivate: [AuthGuardService],
        component: UploadsListComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
