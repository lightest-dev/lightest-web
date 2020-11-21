import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/User';
import {UserChangeInfoDialogComponent} from '../../user-change-info-dialog/user-change-info-dialog.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthService} from '../../shared/services/auth.service';
import {ProfileService} from '../../shared/services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import {TaskService} from '../../shared/services/task.service';
import { AssignmentService } from 'src/app/shared/services/assignment.service';
import { ChangePasswordDialogComponent } from 'src/app/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-student-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  taskTabs = {
    'all': {
      icon: 'list',
      tabName: 'Завдання',
      tasks: []
    },
    'done': {
      icon: 'done_all',
      tabName: 'Виконані',
      tasks: []
    },
    'notDone': {
      icon: 'notifications',
      tabName: 'Потрібно виконати',
      tasks: []
    }
  };

  user = new User();
  mobileQuery: MediaQueryList;
  flagUserInit = false;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private accountService: ProfileService,
    public dialog: MatDialog,
    private taskService: TaskService,
    private assignmentService: AssignmentService) {
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
      if ((this.user.name === null || this.user.name === undefined) &&
        (this.user.surname === null || this.user.surname === undefined)) {
        this.getUser(this.user.id);
      }
      this.flagUserInit = true;
    }
  }

  getUser(id)  {
   this.accountService.getUser(id).subscribe(data => {
        this.user = data;
      }, () => {},
      () => {
        this.getTasks();
        if (this.user.name === null && this.user.surname === null) {
          this.openPersonalInfoDialog();
        }
      });
  }

  getTasks() {
    this.assignmentService.getAssignedTasks().subscribe(data => {
      this.user.tasks = data;
      this.user.tasks.map(task => {
        this.taskService.getTask(task.id)
          .subscribe(data => {
            task['category'] = data['category']['name'];
            task['description'] = data['description'];
            task['points'] = data['points'];
            task['languages'] = data['languages'];
        });
      });

      this.taskTabs.done.tasks = this.taskService.findDoneTasks(this.user.tasks);
      this.taskTabs.notDone.tasks = this.taskService.findNotDoneTasks(this.user.tasks);
      this.taskTabs.all.tasks = this.taskTabs.done.tasks.concat(this.taskTabs.notDone.tasks);
    });
  }

  openPersonalInfoDialog(): void {
    const dialogRef = this.dialog.open(UserChangeInfoDialogComponent, {
      width: '375px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.accountService.putUser(this.authService.getUserInfo().id, {name: result.value.firstName, surname: result.value.secondName, userId: this.authService.getUserInfo().id})
        .subscribe( () => {},
          () => {},
          () => {
            this.getUser(this.authService.getUserInfo().id);
          }
        );
    });
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
  }

}
