import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuardAdminService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location) {
  }

  canActivate() {
    const isLoggedIn = this.authService.isLoggedIn();
    const isAdminTeacher = this.authService.getUserInfo().isAdmin || this.authService.getUserInfo().isTeacher;
    if (isLoggedIn && isAdminTeacher) {
      return true;
    } else {
      this.location.back();
      return false;
    }
  }
}
