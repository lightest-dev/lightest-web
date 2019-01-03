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
import { AccountStudentModule } from './student/accountStudent.module';
import { EditorComponent } from './editor/editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { EditorService } from './shared/services/editor.service';
import { API_URL } from 'src/config/apiConfig';
import { MessageComponent } from './message/message.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';
import {AuthErrorMsgService} from './shared/services/authErrorMsg.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    ErrorComponent,
    AuthComponent,
    EditorComponent,
    MessageComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    MatFormFieldModule,
    HttpClientModule,
    AccountStudentModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [API_URL],
        sendAccessToken: true
      }
    }),
    MonacoEditorModule.forRoot(),
    OverlayModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    EditorService,
    AuthErrorMsgService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
    ],
  bootstrap: [AppComponent],
  entryComponents:[
    MessageComponent
  ],
})

export class AppModule { }
