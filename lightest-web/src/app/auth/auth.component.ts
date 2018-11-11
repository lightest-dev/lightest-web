import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';



@Component({
  template: '',
  selector: 'app-auth'
})
export class AuthComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    //todo: fix login after browser closing
    if (!this.authService.loginPossible()) {
        this.router.navigate(['/main']);
    } else {
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
            if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
                this.oauthService.initImplicitFlow('some-state');
            } else {
                // todo: should be changed to actual main page after login
              // get id and role from accountService
                this.router.navigate(['/account/student']);
            }
        });
    }
  }

}
