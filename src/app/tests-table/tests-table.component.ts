import { Component, OnInit } from '@angular/core';
import {TestService} from '../shared/services/test.service';
import {SnackbarService} from '../shared/services/snackbar.service';
import {TaskService} from '../shared/services/task.service';
import {concatAll, map, mergeAll, mergeMap, subscribeOn} from 'rxjs/operators';

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
      .pipe(
        mergeMap(data => {
          return Object.assign([], data.map(task => task.id)).map( id => {
            return this.taskService.getTask(id);
          });
        })
      ).subscribe(data => {
        console.log(data);
      });
      // .subscribe(data => {
      //   this.tasks = data;
      // }, error1 => {
      //   this.messageService.showSnackBar({
      //       message: 'Не вдалось отримати дані',
      //       isError: true,
      //     });
      // }, () => {
      //
      // });
  }

  // getTests() {
  //   const taskIds = Object.assign([], this.tasks.map(task => task.id));
  //   taskIds.forEach(taskId => {
  //     this.taskService.getTask(taskId)
  //       .pipe(
  //         mergeMap((data) => {
  //           this.tests = this.tests.concat(data.tests);
  //       }).subscribe(data => {
  //         console.log(data);
  //     })
  //   });
  // }

  loadObjForTable() {
    this.tableObj = {
      labels: ['number', 'name', 'public', 'details', 'delete', 'edit'],
      labelsName: {
        number: '№',
        name: 'Назва',
        public: 'Публічне',
        details: 'Деталі',
        delete: 'Видалити',
        edit: 'Редагувати'
      },
      data: this.tests
    };
  }

  moderateData() {
    this.tests.map((el, index) => {
      el.number = index + 1;
      el.details = 'Деталі';
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
