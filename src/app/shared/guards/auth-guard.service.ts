import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate() {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
