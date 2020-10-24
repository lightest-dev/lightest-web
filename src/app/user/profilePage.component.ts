import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../shared/services/auth.service';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {User} from '../shared/models/User';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student',
  templateUrl: './profilePage.component.html',
  styleUrls: ['./profilePage.component.scss']
})

export class ProfilePageComponent implements OnInit {

  user = new User();
  mobileQuery: MediaQueryList;
  flagUserInit = false;
  userRole;

  fillerNav = [
    {
      name: 'Моя сторінка',
      icon: 'account_circle',
      link: '/l/account'
    },
  ];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private routerLink: Router,
    public dialog: MatDialog,
    private location: Location
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.checkAccess();
  }

  logout() {
    this.authService.logout().subscribe(() => {
        this.routerLink.navigate(['/login']);
      }, (err) => {
      console.log(err.status);
    });
  }

  stepBack() {
    this.location.back();
  }

  checkAccess() {
    if (this.authService.getUserInfo().isAdmin || this.authService.getUserInfo().isTeacher) {
     this.userRole = true;
    } else {
      this.userRole = false;
    }
  }

  goToService() {
    this.routerLink.navigate(['l/service-navigation']);
  }
}
