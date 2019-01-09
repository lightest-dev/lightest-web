import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { StudentComponent } from './student.component';

const routes: Routes = [
    {
      // todo: go to url student if student ...
      path: 'account/student', component: StudentComponent,
      canActivate: [AuthGuardService]
    },
    { path: '**', redirectTo: 'main' }

    //   children: [
    //    {
    //       path: 'student',
    //       component: StudentComponent
    //    }
    //   //  {
    //   //    path: 'teacher',
    //   //    component: TeacherComponent
    //   //  },
    //   //  {
    //   //    path: 'admin',
    //   //    component: AdminComponent
    //   //  }
    // ]}
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

  export class AccountStudentRoutingModule {
  }
