import { Component, OnInit } from '@angular/core';
import {GroupService} from '../shared/services/group.service';
import {SnackbarService} from '../shared/services/snackbar.service';
import {AccountService} from '../shared/services/account.service';
import {DomService} from '../shared/services/dom.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../shared/services/form.service';

@Component({
  selector: 'app-add-users-to-group',
  templateUrl: './add-users-to-group.component.html',
  styleUrls: ['./add-users-to-group.component.scss']
})
export class AddUsersToGroupComponent implements OnInit {

  validationMessagesUsersGroupForm = {
    'groups': {
      'required': `Обов'язкове поле`
    },
    'users': {
      'required': `Обов'язкове поле`
    }
  };

  formErrorsUsersGroupForm = {
    'groups': '',
    'users': ''
  };

  groups;
  users;
  usersGroupForm: FormGroup;

  constructor(private groupService: GroupService,
              private messageService: SnackbarService,
              private accountService: AccountService,
              private formBuilder: FormBuilder,
              private formService: FormService) {
  }

  ngOnInit() {
    this.initForm();
    this.getGroups();
    this.getUsers();
  }

  getGroups() {
    this.groupService.getGroups()
      .subscribe(data => {
        this.groups = data;
      });
  }

  getUsers() {
    this.accountService.getUsers()
      .subscribe(data => {
          this.users = data;
        }, error1 => {},
        () => {
        });
  }

  initForm() {
    this.usersGroupForm = this.formBuilder.group({
      groups: ['', [
        Validators.required
      ]],
      users: ['', [
        Validators.required
      ]],
      canRead: ['true'],
      canWrite: ['true'],
      canChangeAccess: ['true']
    });

    this.usersGroupForm.valueChanges
      .subscribe(() => {
        this.formService.onValueChanged(this.usersGroupForm, this.formErrorsUsersGroupForm, this.validationMessagesUsersGroupForm);
      });
  }

  submit() {
    if (this.usersGroupForm.valid) {
      this.groupService.addUsersToGroup(this.usersGroupForm.value.groups, this.loadObj())
        .subscribe(data => {
          this.messageService.showSnackBar({
            message: 'Успішно',
            isError: false
          });
          this.initForm();
        }, error1 => {
          this.messageService.showSnackBar({
            message: 'Помилка',
            isError: true
          });
        });
    } else {
      this.messageService.showSnackBar({
        message: 'Заповніть форму',
        isError: true
      });
    }
  }

  loadObj() {
    return this.usersGroupForm.value.users.map(user => {
      return {
        canChangeAccess: this.usersGroupForm.value.canChangeAccess,
        canRead: this.usersGroupForm.value.canRead,
        canWrite: this.usersGroupForm.value.canWrite,
        userId: user
      };
    });
  }

}
