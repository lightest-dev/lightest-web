import { Component, OnInit } from '@angular/core';
import {TaskService} from '../shared/services/task.service';
import {AccountService} from '../shared/services/account.service';
import {TaskShort} from '../shared/models/TaskShort';

@Component({
  selector: 'app-add-task-to-users-page',
  templateUrl: './add-task-to-users-page.component.html',
  styleUrls: ['./add-task-to-users-page.component.scss']
})
export class AddTaskToUsersPageComponent implements OnInit {

  tasks: TaskShort[];
  users;

  constructor(private taskService: TaskService,
              private accountService: AccountService) { }

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
        console.log(data);
        this.users = data;
      });
  }

}
