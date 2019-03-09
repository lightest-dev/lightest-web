import {ErrorHandler, NgModule} from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { UserAccountModule } from './student/userAccount.module';
import { EditorComponent } from './editor/editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { EditorService } from './shared/services/editor.service';
import { API_URL } from 'src/config/apiConfig';
import { MessageComponent } from './message/message.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';
import {AuthErrorMsgService} from './shared/services/authErrorMsg.service';
import {CompareValidatorDirective} from './shared/directives/compare-validator.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { UserChangeInfoDialogComponent } from './user-change-info-dialog/user-change-info-dialog.component';
import { AddTaskPageComponent } from './add-task-page/add-task-page.component';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';
import {AddCheckerPageComponent} from './add-checker-page/add-checker-page.component';
import { AddGroupPageComponent } from './add-group-page/add-group-page.component';
import { AddLanguagePageComponent } from './add-language-page/add-language-page.component';
import {DomService} from './shared/services/dom.service';
import {LanguageFormComponent} from './add-task-page/language-form/language-form.component';
import {TestFormComponent} from './add-task-page/test-form/test-form.component';
import {AdDirective} from './shared/directives/ad.directive';
import {DynamicAdComponent} from './dynamic-ad/dynamic-ad.component';
import {SnackbarService} from './shared/services/snackbar.service';
import {FormService} from './shared/services/form.service';
import { AddTaskToUsersPageComponent } from './add-task-to-users-page/add-task-to-users-page.component';
import { AddUsersToGroupPageComponent } from './add-users-to-group-page/add-users-to-group-page.component';
import { AddUsersToCategoryPageComponent } from './add-users-to-category-page/add-users-to-category-page.component';
import { TaskToUsersFormComponent } from './add-task-to-users-page/task-to-users-form/task-to-users-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    ErrorComponent,
    AuthComponent,
    EditorComponent,
    MessageComponent,
    CompareValidatorDirective,
    UserChangeInfoDialogComponent,
    AddTaskPageComponent,
    AddCategoryPageComponent,
    AddCheckerPageComponent,
    AddGroupPageComponent,
    AddLanguagePageComponent,
    LanguageFormComponent,
    TestFormComponent,
    AdDirective,
    DynamicAdComponent,
    AddTaskToUsersPageComponent,
    AddUsersToGroupPageComponent,
    AddUsersToCategoryPageComponent,
    TaskToUsersFormComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    MatFormFieldModule,
    HttpClientModule,
    UserAccountModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [API_URL],
        sendAccessToken: true
      }
    }),
    MonacoEditorModule.forRoot(),
    OverlayModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    EditorService,
    AuthErrorMsgService,
    DomService,
    SnackbarService,
    FormService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
    ],
  bootstrap: [AppComponent],
  entryComponents: [
    MessageComponent,
    UserChangeInfoDialogComponent,
    LanguageFormComponent,
    TestFormComponent
  ],
})

export class AppModule { }
