import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { AuthService } from '../../api/services/auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
