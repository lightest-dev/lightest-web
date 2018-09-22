import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angular-material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatProgressSpinnerModule, MatRadioModule, MatOptionModule, MatSelectModule, MatToolbar, MatToolbarModule, MatListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatRadioModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule
  ],
  declarations: [],
  exports: [
    BrowserModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatRadioModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule
  ]
})
export class SharedModule { }
