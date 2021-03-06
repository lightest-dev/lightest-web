import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private location: Location) {
  }

  canActivate() {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      return true;
    } else {
      this.location.back();
      return false;
    }
  }
}
