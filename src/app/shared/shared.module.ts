import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular-material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatSnackBarModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatOptionModule,
  MatSelectModule,
  MatToolbar,
  MatToolbarModule,
  MatListModule,
  MatTabsModule, MatNativeDateModule, MatCheckboxModule, MatTooltipModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AddTestPageComponent} from '../add-test-page/add-test-page.component';
import {TestFormComponent} from '../add-task-page/test-form/test-form.component';
import {LanguageFormComponent} from '../add-task-page/language-form/language-form.component';

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
    MatTooltipModule,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  declarations: [
    AddTestPageComponent,
  ],
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
    MatTooltipModule,
    MatListModule,
    MatTabsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    AddTestPageComponent,
  ]

})
export class SharedModule { }
