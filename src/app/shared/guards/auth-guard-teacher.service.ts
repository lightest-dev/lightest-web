import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuardTeacherService implements CanActivate {

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
