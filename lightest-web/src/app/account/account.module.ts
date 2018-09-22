import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { StudentComponent } from '../student/student.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
   CommonModule,
   SharedModule,
   AccountRoutingModule 
  ]
})

export class AccountModule { }
