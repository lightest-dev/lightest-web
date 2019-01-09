import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AccountStudentRoutingModule } from './accountStudent-routing.module';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { SharedModule } from '../shared/shared.module';
import {StudentInfoComponent} from './student-info/student-info.component';
import { TaskComponent } from './task/task.component';
import {AccountService} from '../shared/services/account.service';

@NgModule({
  declarations: [
    StudentComponent,
    StudentInfoComponent,
    TaskComponent
  ],
  imports: [
   CommonModule,
   SharedModule,
   AccountStudentRoutingModule
  ],
  providers: [
    AccountService
  ]
})

export class AccountStudentModule { }
