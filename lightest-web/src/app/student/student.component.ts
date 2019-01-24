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
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {

  user = new User();
  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      name: 'Моя сторінка',
      icon: 'account_circle',
      link: 'account/student'
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
    this.initUser();
    this.getUser(this.user.id);
  }

  initUser() {
      const temp = this.authService.getUserInfo();
      this.user.id = temp.id;
      this.user.isAdmin = temp.isAdmin;
      this.user.isTeacher = temp.isTeacher;
      console.log(this.user.id);
  }

  getUser(id) {
    this.accountService.getUser(id).subscribe(data => {
      if (data.name === null || data.surname === null) {
        this.openDialog();
      } else {
        this.user = data;
      }
    });
  }

    openDialog(): void {
        const dialogRef = this.dialog.open(UserChangeInfoDialogComponent, {
            width: '375px',
            data: {name: 'test', animal: 'fff'}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result.value);
            this.accountService.putUser(this.authService.getUserInfo().id, {name: result.value.firstName, surname: result.value.secondName, userId: this.authService.getUserInfo().id}).subscribe();
        });
    }

  logout() {
    console.log('logout');
    this.authService.logout().subscribe(data => {
        console.log(data);
      }, (err) => {
      console.log(err.status);
    }, () => {
    //  this.routerLink.routerL(\main);/
    });
  }
}
