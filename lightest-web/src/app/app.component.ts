import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { AUTH_CONFIG } from 'src/config/authConfig';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService) {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.configureLogin(AUTH_CONFIG);
    }
  }
}
