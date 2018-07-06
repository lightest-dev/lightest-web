import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//angular-material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule { }
