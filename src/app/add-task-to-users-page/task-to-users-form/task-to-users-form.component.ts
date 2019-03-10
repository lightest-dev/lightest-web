import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../shared/services/form.service';
import {TaskService} from '../../shared/services/task.service';
import {TaskShort} from '../../shared/models/TaskShort';
import {AccountService} from '../../shared/services/account.service';

@Component({
  selector: 'app-task-to-users-form',
  templateUrl: './task-to-users-form.component.html',
  styleUrls: ['./task-to-users-form.component.scss']
})
export class TaskToUsersFormComponent implements OnInit {

  validationMessagesUsersTaskForm = {
    'task': {
      'required': `Обов'язкове поле`
    },
    'date': {
      'required': `Обов'язкове поле`
    },
    'users': {
      'required': `Обов'язкове поле`
    }
  };

  formErrorsUsersTaskForm = {
    'task': '',
    'date': '',
    'users': ''
  };

  usersTaskForm: FormGroup;
  tasks: TaskShort[];
  users;

  constructor(private formBuilder: FormBuilder,
              private formService: FormService,
              private taskService: TaskService,
              private accountService: AccountService) { }

  ngOnInit() {
    this.getUsers();
    this.getTasks();
    this.initTaskForm();
  }

  getTasks() {
    this.taskService.getTasks()
      .subscribe(data => {
        this.tasks = data;
      });
  }

  getUsers() {
    this.accountService.getUsers()
      .subscribe(data => {
        console.log(data);
        this.users = data;
      });
  }

  initTaskForm() {
    this.usersTaskForm = this.formBuilder.group({
      task: ['', [
        Validators.required
      ]],
      date: ['', [
        Validators.required
      ]],
      users: ['', [
        Validators.required
      ]],
      canRead: ['true'],
      canWrite: [''],
      canChangeAccess: [''],
      isOwner:  ['']
    });

    this.usersTaskForm.valueChanges
      .subscribe(() =>
        this.onValueChanged(this.usersTaskForm, this.formErrorsUsersTaskForm, this.validationMessagesUsersTaskForm)
      );
  }

  onValueChanged(form, errorForm, validationMessages) {
    this.formService.onValueChanged(form, errorForm, validationMessages);
  }

}
