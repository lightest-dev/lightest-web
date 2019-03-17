import { Component, OnInit } from '@angular/core';
import {TaskService} from '../shared/services/task.service';
import {AccountService} from '../shared/services/account.service';
import {TaskShort} from '../shared/models/TaskShort';
import {DomService} from '../shared/services/dom.service';
import {TaskToUsersFormComponent} from './task-to-users-form/task-to-users-form.component';

@Component({
  selector: 'app-add-task-to-users-page',
  templateUrl: './add-task-to-users-page.component.html',
  styleUrls: ['./add-task-to-users-page.component.scss']
})
export class AddTaskToUsersPageComponent implements OnInit {

  tasks: TaskShort[];
  users;
  formFirst;
  allForms = [];
  data;
  formCounts = 1;

  constructor(private taskService: TaskService,
              private accountService: AccountService,
              private domService: DomService) { }

  ngOnInit() {
    this.getTasks();
    this.getUsers();
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
        this.users = data;
      }, error1 => {},
        () => {
          this.initFormObj();
        });
  }

  initFormObj() {
    this.data = {id: this.formCounts, tasks: this.tasks, users: this.users, valid: false};
    this.allForms = [{id: this.formCounts, valid: false, data: {}}];
  }

  formOnChange(form) {
    console.log(this.allForms);
    if (form.valid) {
      this.handleForms(form);
    }
  }

  addForm () {
    this.formCounts++;
    this.allForms.push({id: this.formCounts, data: {}, valid: false});

    const compRef = this.domService.appendComponent(TaskToUsersFormComponent, '.dynamic-component-wrapper', {users: this.users, tasks: this.tasks, id: this.formCounts});
    compRef.instance['form'].subscribe(result => {
      // this.compRefLang.push({ref: compRef, id: result.id});

        this.handleForms(result);
    });
  }

  handleForms (formObj) {
    for (let i = 0; i < this.allForms.length; i++) {
      if (this.allForms[i].id === formObj.id) {
        this.allForms[i] = Object.assign({}, formObj);
      }
    }
  }

  submit () {
    if (this.isValidForms()) {
      console.log('good');
      let tasksForUesers = this.loadFormObjectsArray();
      tasksForUesers.forEach(obj => {
        this.taskService.assignTaskToUsers(obj[0].taskId, obj).subscribe(data => {

        }, error1 => { console.log(error1); });
      });
    } else {
      console.log('bad');
    }
    console.log(this.loadFormObjectsArray()); // return obj for request
  }



  isValidForms() {
    const isValid = this.allForms.find(form => {
      return form.valid === false;
    });
    return isValid === undefined ? true : false;
  }

  loadFormObjectsArray () {
     let forms = [];
    this.allForms.map(form => {
       forms.push(this.loadFormObject(form.data));
       console.log(forms);
    });
    return forms;
  }

  loadFormObject (form) {
    const temp = form.users.map(user => {
      return {
        canRead: form.canRead,
        canWrite: form.canWrite,
        canChangeAccess: form.canChangeAccess,
        isOwner: form.isOwner,
        deadline: form.date,
        taskId: form.task,
        userId: user
      };
    });
    return temp;
  }
}


