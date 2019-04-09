import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../shared/services/account.service';
import {UserChangeInfoDialogComponent} from '../user-change-info-dialog/user-change-info-dialog.component';
import {MatDialog} from '@angular/material';
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

  fillerNav = [
    {
      name: 'Моя сторінка',
      icon: 'account_circle',
      link: 'account/user'
    },
    {
      name: 'Список курсів',
      icon: 'import_contacts',
      link: ''
    },
    {
      name: 'Список завдань',
      icon: 'list',
      link: ''
    }
    // {
    //   name: 'Вихід',
    //   icon: 'rowing',
    //   link: ''
    // }
  ];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private routerLink: Router,
    private accountService: AccountService,
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
  }

  logout() {
    console.log('logout');
    this.authService.logout().subscribe(data => {
        this.routerLink.navigate(['/login']);
      }, (err) => {
      console.log(err.status);
    });
  }

  stepBack() {
    this.location.back();
  }
}
