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
import {AddLanguagePageComponent} from './add-language-page/add-language-page.component';
import {AddTestPageComponent} from './add-test-page/add-test-page.component';
import {ProfilePageComponent} from './user/profilePage.component';
import {AuthGuardService} from './shared/guards/auth-guard.service';
import {UserInfoComponent} from './user/user-info/user-info.component';
import {AddTaskToUsersPageComponent} from './add-task-to-users-page/add-task-to-users-page.component';
import {TableBaseComponent} from './table-base/table-base.component';
import {UsersTableComponent} from './users-table/users-table.component';
import {TasksTableComponent} from './tasks-table/tasks-table.component';
import {CategoriesTableComponent} from './categories-table/categories-table.component';
// import {AddTaskToUsersPageComponent} from './add-task-to-users-page/add-task-to-users-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AuthComponent, },
  { path: 'main', component: MainComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},

  { path: 'add-task',
    canActivate: [AuthGuardService],
    component: AddTaskPageComponent
  },
  { path: 'add-category',
    canActivate: [AuthGuardService],
    component: AddCategoryPageComponent
  },
  { path: 'add-checker',
    canActivate: [AuthGuardService],
    component: AddCheckerPageComponent
  },
  { path: 'add-group',
    canActivate: [AuthGuardService],
    component: AddGroupPageComponent
  },
  { path: 'add-language',
    canActivate: [AuthGuardService],
    component: AddLanguagePageComponent
  },
  { path: 'add-test',
    canActivate: [AuthGuardService],
    component: AddTestPageComponent
  },
  { path: 'add-task-for-users',
    canActivate: [AuthGuardService],
    component: AddTaskToUsersPageComponent
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
        canActivate: [AuthGuardService],
        component: UsersTableComponent
      },
      { path: 'table/tasks',
        canActivate: [AuthGuardService],
        component: TasksTableComponent
      },
      { path: 'table/categories',
        canActivate: [AuthGuardService],
        component: CategoriesTableComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
