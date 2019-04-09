import { Component, OnInit } from '@angular/core';
import {TaskService} from '../shared/services/task.service';
import {SnackbarService} from '../shared/services/snackbar.service';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {

  userTableObj;
  tasks;

  constructor(private taskService: TaskService,
              private messageService: SnackbarService) { }

  ngOnInit() {
   this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks()
      .subscribe(data => {
        this.tasks = data;
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
      labels: ['number', 'name', 'categoryId', 'checkerId', 'public', 'details', 'delete'],
      labelsName: {
        number: '№',
        name: 'Ім\'я',
        categoryId: 'Категорія',
        checkerId: 'Програма перевірки',
        public: 'Публічне',
        details: 'Деталі',
        delete: 'Видалити'
      },
      data: this.tasks
    };
  }

  moderateData() {
    this.tasks.map((task, index) => {
      task.number = index + 1;
      task.details = 'Деталі';
      task.delete = 'Видалити';
    });
  }

  deleteTask(task) {
    this.taskService.deleteTask(task.id)
      .subscribe(data => {
        if (data) {
          this.messageService.showSnackBar({
            message: 'Успішно',
            isError: false
          });
          this.getTasks();
        }
      }, error1 => {
        this.messageService.showSnackBar({
          message: 'Помилка: ' + error1.status,
          isError: true
        });
      });
  }


}
