import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { UserAccountRoutingModule } from './userAccount-routing.module';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './userAccount.component';
import { SharedModule } from '../shared/shared.module';
import {StudentInfoComponent} from './student-info/student-info.component';
import { TaskComponent } from './task/task.component';
import {AccountService} from '../shared/services/account.service';

@NgModule({
  declarations: [
    UserAccountComponent,
    StudentInfoComponent,
    TaskComponent
  ],
  imports: [
   CommonModule,
   SharedModule,
   UserAccountRoutingModule
  ],
  providers: [
    AccountService
  ]
})

export class UserAccountModule { }
