import { Component, OnInit } from '@angular/core';
import {TaskService} from '../shared/services/task.service';
import {SnackbarService} from '../shared/services/snackbar.service';
import {combineLatest} from 'rxjs';
import {CheckerService} from '../shared/services/checker.service';
import {CategoriesService} from '../shared/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {

  userTableObj;
  tasks;
  checkers;
  categories;

  constructor(private taskService: TaskService,
              private messageService: SnackbarService,
              private checkerService: CheckerService,
              private categoryService: CategoriesService,
              private router: Router) { }

  ngOnInit() {
   this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks()
      .subscribe(data => {
        this.tasks = data;
      }, () => {
        this.messageService.showSnackBar({
          message: 'Не вдалось отримати користувачів',
          isError: true
        });
      }, () => {
        this.moderateData();
        this.loadObjForTable();
        this.getCheckers();
      });
  }

  getCheckers() {
    const checkerIds = Object.assign([], this.tasks.map(task => task.checkerId));
    const $checkerOservers = [];
    checkerIds.forEach(id => {
      $checkerOservers.push(this.checkerService.getChecker(id));
    });
    const combined = combineLatest($checkerOservers);
    combined.subscribe(data => {
      this.checkers = data;
    }, () => {},
      () => {
        for (let i = 0; i < this.tasks.length; i++) {
          this.tasks[i].checkerId = this.checkers[i].name;
        }
        this.getCategories();
      });
  }

  getCategories() {
    const categoriesIds = Object.assign([], this.tasks.map(task => task.categoryId));
    const $categoriesOservers = [];
    categoriesIds.forEach(id => {
      $categoriesOservers.push(this.categoryService.getCategory(id));
    });
    const combined = combineLatest($categoriesOservers);
    combined.subscribe(data => {
        this.categories = data;
      }, () => {},
      () => {
        for (let i = 0; i < this.tasks.length; i++) {
          this.tasks[i].categoryId = this.categories[i].name;
        }
        this.moderateData();
        this.loadObjForTable();
      });
  }

  loadObjForTable() {
    this.userTableObj = {
      labels: ['number', 'name', 'categoryId', 'checkerId', 'public', 'details', 'delete', 'edit'],
      labelsName: {
        number: '№',
        name: 'Ім\'я',
        categoryId: 'Категорія',
        checkerId: 'Програма перевірки',
        public: 'Публічне',
        details: 'Деталі',
        delete: 'Видалити',
        edit: 'Редагувати'
      },
      data: this.tasks
    };
  }

  moderateData() {
    this.tasks.map((task, index) => {
      task.number = index + 1;
      task.details = 'Деталі';
      task.delete = 'Видалити';
      task.edit = true;
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

  edit(data) {
    this.router.navigate([`l/tasks/edit/${data.id}`])
  }

  view(data) {
    this.edit(data);
  }
}
