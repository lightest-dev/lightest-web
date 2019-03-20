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
import {EditorComponent} from '../editor/editor.component';
import {AddTaskToUsersPageComponent} from '../add-task-to-users-page/add-task-to-users-page.component';
import {TaskToUsersFormComponent} from '../add-task-to-users-page/task-to-users-form/task-to-users-form.component';
import {MessageComponent} from '../message/message.component';
import {UserChangeInfoDialogComponent} from '../user-change-info-dialog/user-change-info-dialog.component';
import {LanguageFormComponent} from '../add-task-page/language-form/language-form.component';
import {TestFormComponent} from '../add-task-page/test-form/test-form.component';

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
    MatCheckboxModule,
  ],
  declarations: [
  ],
  entryComponents: [
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
  ]

})
export class SharedModule { }
