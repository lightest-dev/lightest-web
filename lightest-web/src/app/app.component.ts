import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {  AuthConfig } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService) {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.configureLogin(authConfig);
    }
  }
}

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://login.lightest.tk',
  requireHttps: false,


  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200',

  // URL of the SPA to redirect the user after silent refresh
  // silentRefreshRedirectUri: 'http://localhost:2020/silent-refresh.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'client',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'api'
};
