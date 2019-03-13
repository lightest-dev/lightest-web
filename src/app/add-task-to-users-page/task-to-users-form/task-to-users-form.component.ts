import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() form = new EventEmitter();
  @Input() data;

  constructor(private formBuilder: FormBuilder,
              private formService: FormService) { }

  ngOnInit() {
    if(this.data) {
      this.initTaskForm();
    }
  }

  ngOnChanges () {
    if (this.data) {
      this.initTaskForm();
    }
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
      canWrite: ['false'],
      canChangeAccess: ['false'],
      isOwner:  ['false']
    });

    this.usersTaskForm.valueChanges
      .subscribe(() => {
          this.onValueChanged(this.usersTaskForm, this.formErrorsUsersTaskForm, this.validationMessagesUsersTaskForm);
          this.form.emit({data: this.usersTaskForm.value, valid: this.usersTaskForm.valid, id: this.data.id});
      });
  }

  onValueChanged(form, errorForm, validationMessages) {
    this.formService.onValueChanged(form, errorForm, validationMessages);
  }

}
