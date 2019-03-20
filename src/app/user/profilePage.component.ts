import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../shared/services/account.service';
import {UserChangeInfoDialogComponent} from '../user-change-info-dialog/user-change-info-dialog.component';
import {MatDialog} from '@angular/material';
import {User} from '../shared/models/User';

@Component({
  selector: 'app-student',
  templateUrl: './profilePage.component.html',
  styleUrls: ['./profilePage.component.scss']
})

export class ProfilePageComponent implements OnInit {

  user = new User();
  mobileQuery: MediaQueryList;
  flagUserInit: boolean = false;

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
    public dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    console.log('user account');
    this.initUser();
  }

  initUser() {
    if (!this.flagUserInit) {
      const temp = this.authService.getUserInfo();
      this.user.id = temp.id;
      this.user.isAdmin = temp.isAdmin;
      this.user.isTeacher = temp.isTeacher;
      console.log(this.user.id);
      if ((this.user.name === null || this.user.name === undefined) &&
        (this.user.surname === null || this.user.surname === undefined)) {
        this.getUser(this.user.id);
      }
      this.flagUserInit = true;
    }
  }

   getUser(id)  {
    let temp = this.accountService.getUser(id).subscribe(data => {
        this.user = data;
    }, (err) => {},
        () => {
            if (this.user.name === null && this.user.surname === null) {
                this.openDialog();
            }
        });
  }

    openDialog(): void {
        const dialogRef = this.dialog.open(UserChangeInfoDialogComponent, {
            width: '375px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result.value);
            this.accountService.putUser(this.authService.getUserInfo().id, {name: result.value.firstName, surname: result.value.secondName, userId: this.authService.getUserInfo().id})
              .subscribe( () => {},
                          error1 => {},
                          () => {
                            this.getUser(this.authService.getUserInfo().id);
                          }
                );
        });
    }

  logout() {
    console.log('logout');
    this.authService.logout().subscribe(data => {
        this.routerLink.navigate(['/login']);
      }, (err) => {
      console.log(err.status);
    });
  }
}
