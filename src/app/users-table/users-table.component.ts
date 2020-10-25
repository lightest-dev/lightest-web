import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddToRoleDialogComponent } from '../add-to-role-dialog/add-to-role-dialog.component';
import {ProfileService} from '../shared/services/profile.service';
import { AuthService } from '../shared/services/auth.service';
import {SnackbarService} from '../shared/services/snackbar.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../confirmation-dialog/confirmation-dialog.component';
import { UserShort } from '../shared/models/UserShort';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  users;
  userTableObj;

  constructor(private profileService: ProfileService,
              private accountService: AccountService,
              private messageService: SnackbarService,
              private authService: AuthService,
              private dialog: MatDialog,
              private snackbar: SnackbarService
              ) { }

  ngOnInit() {
    this.profileService.getUsers()
      .subscribe(data => {
        this.users = data;
      }, () => {
        this.messageService.showSnackBar({
          message: 'Не вдалось отримати користувачів',
          isError: true
        });
      }, () => {
        this.moderateData();
        this.loadObjForUsersTable();
      });
  }

  loadObjForUsersTable() {
    this.userTableObj = {
      labels: ['number', 'name', 'surname', 'email', 'details'],
      labelsName: {
        number: '№',
        name: 'Ім\'я',
        surname: 'Прізвище',
        email: 'E-mail',
        details: 'Деталі',
        addToRoleButton: 'Додати в роль',
        resetPasswordButton: 'Скинути пароль',
      },
      data: this.users,
      customButtons: {
        addToRoleButton: {
          handler: (data) => this.addToRole(data),
        },
        resetPasswordButton: {
          handler: (data) => this.resetPassword(data),
        },
      }
    };

    if (this.authService.getUserInfo().isAdmin) {
      this.userTableObj.labels.push('addToRoleButton');
      this.userTableObj.labels.push('resetPasswordButton');
    }
  }

  moderateData() {
    this.users.map((user, index) => {
      user.number = index + 1;
      user.details = 'Деталі';
      user.addToRoleButton = true;
    });
  }

  deleteUser(user: UserShort) {
    console.log(user);
  }

  addToRole(user: UserShort) {
    this.dialog.open(AddToRoleDialogComponent, {
      data: {
        users: [user]
      }
    });
  }

  resetPassword(user: UserShort) {
    const confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: <ConfirmationDialogData> {
        title: 'Підтвердження скидання',
        message: `Справді скинути пароль користувачу ${user.name} ${user.surname}?`,
      }
    });

    confirmationDialogRef.afterClosed().pipe(switchMap(confirmationResult => {
      if(confirmationResult !== true) {
        return EMPTY;
      }
      return this.accountService.resetPassword({userName: user.userName});
    })).subscribe(passwordResult => {
      this.dialog.open(ConfirmationDialogComponent, {
        disableClose: true,
        data: <ConfirmationDialogData> {
          title: 'Новий пароль',
          message: `Новий пароль користувача ${user.name} ${user.surname}: ${passwordResult.password}`,
          hideCancel: true
        }
      });
    }, () => {
      this.snackbar.showSnackBar({
        isError: true,
        message: 'Не вдалося скинути пароль.'
      });
    })
  }
}
