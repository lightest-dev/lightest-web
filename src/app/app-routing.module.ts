import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { EditorComponent } from './editor/editor.component';
import {TaskPageComponent} from './task-page/task-page.component';
import {CategoryPageComponent} from './category-page/category-page.component';
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
import {TasksUploadsPreviewPageComponent} from "./tasks-uploads-preview-page/tasks-uploads-preview-page.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthComponent,
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'l',
    component: ProfilePageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'account',
        component: UserInfoComponent
      },
      {
        path: 'tasks-uploads',
        component: TasksUploadsPreviewPageComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'editor/:id',
        canActivate: [AuthGuardService],
        component: EditorComponent
      },
      {
        path: 'table/users',
        canActivate: [AuthGuardAdminService],
        component: UsersTableComponent
      },
      {
        path: 'add-task-for-users',
        canActivate: [AuthGuardAdminService],
        component: AddTaskToUsersPageComponent
      },
      {
        path: 'add-users-to-group',
        canActivate: [AuthGuardAdminService],
        component: AddUsersToGroupComponent
      },
      {
        path: 'add-users-to-categories',
        canActivate: [AuthGuardAdminService],
        component: AddUsersToCategoriesComponent
      },
      {
        path: 'service-navigation',
        canActivate: [AuthGuardAdminService],
        component: ServiceNavigationComponent
      },
      {
        path: 'uploads/:id',
        canActivate: [AuthGuardService],
        component: UploadsListComponent
      },
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
        path: 'categories',
        canActivate: [AuthGuardService],
        children: [
          {
            path: 'table',
            canActivate: [AuthGuardAdminService],
            component: CategoriesTableComponent
          },
          {
            path: 'add',
            canActivate: [AuthGuardAdminService],
            component: CategoryPageComponent
          },
          {
            path: 'edit/:id',
            canActivate: [AuthGuardAdminService],
            component: CategoryPageComponent
          },
        ]
      },
      {
        // TODO: should be accessible only by teachers/admins
        path: 'tasks',
        canActivate: [AuthGuardService],
        children: [
          {
            path: 'table',
            canActivate: [AuthGuardService],
            component: TasksTableComponent
          },
          {
            path: 'add',
            canActivate: [AuthGuardAdminService],
            component: TaskPageComponent
          },
          {
            path: 'edit/:id',
            canActivate: [AuthGuardAdminService],
            component: TaskPageComponent
          },
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
