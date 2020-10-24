import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddToRoleDialogComponent } from '../add-to-role-dialog/add-to-role-dialog.component';
import {AccountService} from '../shared/services/account.service';
import { AuthService } from '../shared/services/auth.service';
import {SnackbarService} from '../shared/services/snackbar.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  users;
  userTableObj;

  constructor(private accountService: AccountService,
              private messageService: SnackbarService,
              private authService: AuthService,
              private dialog: MatDialog,
              ) { }

  ngOnInit() {
    this.accountService.getUsers()
      .subscribe(data => {
        this.users = data;
      }, error1 => {
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
        addToRoleButton: 'Додати в роль'
      },
      data: this.users,
      customButtons: {
        addToRoleButton: {
          handler: (data) => this.addToRole(data),
        }
      }
    };

    if (this.authService.getUserInfo().isAdmin) {
      this.userTableObj.labels.push('addToRoleButton');
    }
  }

  moderateData() {
    this.users.map((user, index) => {
      user.number = index + 1;
      user.details = 'Деталі';
      user.addToRoleButton = true;
    });
  }

  deleteUser(user) {
    console.log(user);
  }

  addToRole(user) {
    this.dialog.open(AddToRoleDialogComponent, {
      data: {
        users: [user]
      }
    });
  }
}
