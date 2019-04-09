import { Component, OnInit } from '@angular/core';
import {AccountService} from '../shared/services/account.service';
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
              private messageService: SnackbarService) { }

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
        this.modarateData();
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
        details: 'Деталі'
      },
      data: this.users
    };
  }

  modarateData() {
    this.users.map((user, index) => {
      user.number = index + 1;
      user.details = 'Деталі';
    });
  }

  deleteUser(user) {
    console.log(user);
  }

}
