import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { UserAccountComponent } from './userAccount.component';

const routes: Routes = [
    {
      // todo: go to url student if student ...
      path: 'account/student', component: UserAccountComponent,
      canActivate: [AuthGuardService]
    }

    //   children: [
    //    // {
    //    //   path: 'teacher',
    //    //   component: TeacherComponent
    //    // },
    //    // {
    //    //   path: 'admin',
    //    //   component: AdminComponent
    //    // }
    // ]
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

  export class UserAccountRoutingModule {
  }
