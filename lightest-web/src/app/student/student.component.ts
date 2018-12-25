import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
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
    private routerLink: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    // get data about student from service accountService
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
