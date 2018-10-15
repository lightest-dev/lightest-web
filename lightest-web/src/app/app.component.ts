import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {  AuthConfig } from 'angular-oauth2-oidc';
import { OAuthService, JwksValidationHandler} from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  constructor(){
    // private router: Router,
    // @Inject(PLATFORM_ID) private platformId: Object,
    // private oauthService: OAuthService,
    // private authService: AuthService) {
    // if (isPlatformBrowser(this.platformId)) {
    //     this.oauthService.configure(authConfig);
    //     this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    //     /*if (this.authService.isLoggedIn()) {
    //         this.oauthService.loadDiscoveryDocumentAndTryLogin();
    //     }*/
    // }
}

ngOnInit() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     //  debugger;
  //       if (!this.authService.isLoggedIn()) {
  //           this.router.navigate(['/main']);
  //       } else {
  //           this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
  //               if (
  //                   !this.oauthService.hasValidIdToken() ||
  //                   !this.oauthService.hasValidAccessToken()
  //               ) {
  //                   this.oauthService.initImplicitFlow('some-state');
  //               }
  //           });
  //       }
  //   }
  // }
}

// export const authConfig: AuthConfig = {
//   // Url of the Identity Provider
//   issuer: 'http://login.lightest.tk',
//   requireHttps: false,
//
//
//   // URL of the SPA to redirect the user to after login
//   redirectUri: 'http://localhost:4200/index.html',
//
//   // URL of the SPA to redirect the user after silent refresh
//   //silentRefreshRedirectUri: "http://localhost:2020/silent-refresh.html",
//
//   // The SPA's id. The SPA is registerd with this id at the auth-server
//   clientId: 'client',
//
//   // set the scope for the permissions the client should request
//   // The first three are defined by OIDC. The 4th is a usecase-specific one
//   scope: 'api'
// };
