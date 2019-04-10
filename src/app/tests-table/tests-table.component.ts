import { Component, OnInit } from '@angular/core';
import {TestService} from '../shared/services/test.service';
import {SnackbarService} from '../shared/services/snackbar.service';
import {TaskService} from '../shared/services/task.service';
import {combineLatest} from 'rxjs';
import {map, mapTo, mergeMap, subscribeOn} from 'rxjs/operators';


@Component({
  selector: 'app-tests-table',
  templateUrl: './tests-table.component.html',
  styleUrls: ['./tests-table.component.scss']
})
export class TestsTableComponent implements OnInit {

  tasks;
  tests = [];
  tableObj;

  constructor(private taskService: TaskService,
              private testService: TestService,
              private messageService: SnackbarService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.taskService.getTasks()
      .subscribe(data => {
        this.tasks = data;
      }, error1 => {
        this.messageService.showSnackBar({
            message: 'Не вдалось отримати дані',
            isError: true,
          });
      }, () => {
          this.getTests();
      });
  }

  getTests() {
    const taskIds = Object.assign([], this.tasks.map(task => task.id));
    const $tasksOservers = [];
    taskIds.forEach(taskId => {
        $tasksOservers.push(this.taskService.getTask(taskId));
    });
    const combined = combineLatest($tasksOservers);
    combined.pipe(
      map(data => {
        return data.map(el => el['tests'])
      }),
    ).subscribe(data => {
      data.forEach((array) => {
        array.forEach(el => {
          this.tests.push(el);
        });
      });
    }, error1 => {},
      () => {
        this.setTasksName();
        this.moderateData();
        this.loadObjForTable();
      });
  }

  setTasksName() {
    this.tests.forEach(test => {
      test.taskId = this.getTaskNameById(test.taskId);
    });
  }

  getTaskNameById(id) {
    for(let task of this.tasks) {
      if(task.id == id) {
        return task.name;
      }
    }
  }
  
  loadObjForTable() {
    this.tableObj = {
      labels: ['number', 'input', 'output', 'taskId', 'delete', 'edit'],
      labelsName: {
        number: '№',
        input: 'Вхідні дані',
        output: 'Вихідні дані',
        delete: 'Видалити',
        edit: 'Редагувати',
        taskId: 'Завдання'
      },
      data: this.tests
    };
  }

  moderateData() {
    this.tests.map((el, index) => {
      el.number = index + 1;
      el.delete = true;
      el.edit = true;
    });
  }

  delete(data) {
    this.testService.deleteTest(data.id)
      .subscribe(data => {
        if (data) {
          this.messageService.showSnackBar({
            message: 'Успішно',
            isError: false
          });
          this.getData();
        }
      }, error1 => {
        this.messageService.showSnackBar({
          message: 'Помилка: ' + error1.status,
          isError: true
        });
      });
  }

}
