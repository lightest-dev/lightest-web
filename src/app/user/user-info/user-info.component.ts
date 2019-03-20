import {ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {User} from '../../shared/models/User';
import {UserChangeInfoDialogComponent} from '../../user-change-info-dialog/user-change-info-dialog.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../../shared/services/account.service';
import {MatDialog} from '@angular/material';
import {TaskService} from '../../shared/services/task.service';
import {TaskShort} from '../../shared/models/TaskShort';
import {CategoriesService} from '../../shared/services/categories.service';
import {pluck, tap} from 'rxjs/operators';

@Component({
  selector: 'app-student-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  tabsForTasks = [
    {
      icon: 'list',
      tabName: 'Завдання'
    },
    {
      icon: 'done_all',
      tabName: 'Виконані'
    },
    {
      icon: 'notifications',
      tabName: 'Потрібно виконати'
    }
  ]; // get content from accountService (from studentComponent)

  tasks;

  user = new User();
  mobileQuery: MediaQueryList;
  flagUserInit = false;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private routerLink: Router,
    private accountService: AccountService,
    public dialog: MatDialog,
    private taskService: TaskService,
    private categoriesService: CategoriesService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
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
    const temp = this.accountService.getUser(id).subscribe(data => {
        this.user = data;
      }, (err) => {},
      () => {
        this.getTasks();
        if (this.user.name === null && this.user.surname === null) {
          this.openDialog();
        }
      });
  }

  // getTasks() {
  //   this.taskService.getTasks().subscribe(data => {
  //     this.tasks = data;
  //   }, error1 => {},
  //     () => {
  //       this.getCategoriesFromTasks();
  //     });
  // }

  // todo: finish
  getTasks() {
    this.user.tasks.map(task => {
      this.taskService.getTask(task.id)
        .subscribe(data => {
          task['category'] = data['category']['name'];
          task['description'] = data['description'];
          task['points'] = data['points'];
      });
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

}
