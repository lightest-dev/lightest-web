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
import { EditorComponent } from './editor/editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { EditorService } from './shared/services/editor.service';
import { API_URL } from 'src/config/apiConfig';
import { MessageComponent } from './message/message.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {OverlayModule} from '@angular/cdk/overlay';
import {AuthErrorMsgService} from './shared/services/authErrorMsg.service';
import {CompareValidatorDirective} from './shared/directives/compare-validator.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { UserChangeInfoDialogComponent } from './user-change-info-dialog/user-change-info-dialog.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import {CheckerPageComponent} from './checker-page/checker-page.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { LanguagePageComponent } from './language-page/language-page.component';
import {DomService} from './shared/services/dom.service';
import {LanguageFormComponent} from './task-page/language-form/language-form.component';
import {TestFormComponent} from './task-page/test-form/test-form.component';
import {AdDirective} from './shared/directives/ad.directive';
import {DynamicAdComponent} from './dynamic-ad/dynamic-ad.component';
import {SnackbarService} from './shared/services/snackbar.service';
import {FormService} from './shared/services/form.service';
import {ProfilePageComponent} from './user/profilePage.component';
import {UserInfoComponent} from './user/user-info/user-info.component';
import {AddTaskToUsersPageComponent} from './add-task-to-users-page/add-task-to-users-page.component';
import {TaskToUsersFormComponent} from './add-task-to-users-page/task-to-users-form/task-to-users-form.component';
import {TestPageComponent} from './test-page/test-page.component';
import {TaskComponent} from './user/task/task.component';
import {ProfileService} from './shared/services/profile.service';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { TableBaseComponent } from './table-base/table-base.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { CheckersTableComponent } from './checkers-table/checkers-table.component';
import { GroupsTableComponent } from './groups-table/groups-table.component';
import { TestsTableComponent } from './tests-table/tests-table.component';
import { UploadsTableComponent } from './uploads-table/uploads-table.component';
import { ServiceNavigationComponent } from './service-navigation/service-navigation.component';
import { AddUsersToGroupComponent } from './add-users-to-group/add-users-to-group.component';
import { AddUsersToCategoriesComponent } from './add-users-to-categories/add-users-to-categories.component';
import {AuthGuardAdminService} from './shared/guards/auth-guard-admin.service';
import {AuthGuardTeacherService} from './shared/guards/auth-guard-teacher.service';
import { UploadsListComponent } from './uploads-list/uploads-list.component';
import { AddToRoleDialogComponent } from './add-to-role-dialog/add-to-role-dialog.component';
import { AccountService } from './shared/services/account.service';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

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
    TaskPageComponent,
    CategoryPageComponent,
    CheckerPageComponent,
    GroupPageComponent,
    LanguagePageComponent,
    LanguageFormComponent,
    TestFormComponent,
    AdDirective,
    DynamicAdComponent,
    ProfilePageComponent,
    UserInfoComponent,
    AddTaskToUsersPageComponent,
    TaskToUsersFormComponent,
    TestPageComponent,
    TaskComponent,
    InfoDialogComponent,
    TableBaseComponent,
    UsersTableComponent,
    CategoriesTableComponent,
    TasksTableComponent,
    CheckersTableComponent,
    GroupsTableComponent,
    TestsTableComponent,
    UploadsTableComponent,
    ServiceNavigationComponent,
    AddUsersToGroupComponent,
    AddUsersToCategoriesComponent,
    UploadsListComponent,
    AddToRoleDialogComponent,
    ChangePasswordDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    MatFormFieldModule,
    HttpClientModule,
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
    AccountService,
    AuthGuardService,
    AuthGuardAdminService,
    AuthGuardTeacherService,
    EditorService,
    AuthErrorMsgService,
    DomService,
    SnackbarService,
    FormService,
    ProfileService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
    ],
  bootstrap: [AppComponent],
  entryComponents: [
    TaskToUsersFormComponent,
    MessageComponent,
    UserChangeInfoDialogComponent,
    InfoDialogComponent,
    LanguageFormComponent,
    TestFormComponent
  ],
})

export class AppModule { }
