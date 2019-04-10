import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {SnackbarService} from '../shared/services/snackbar.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  categories;
  tableObj;

  constructor(private categoriesService: CategoriesService,
              private messageService: SnackbarService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories()
      .subscribe(data => {
        this.categories = data;
      }, error1 => {
          this.messageService.showSnackBar({
            message: 'Не вдалось отримати дані',
            isError: true
          });
        },
        () => {
          this.moderateData();
          this.loadObjForTable();
        });
  }


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
      data: this.categories
    };
  }

  moderateData() {
    this.categories.map((el, index) => {
      el.number = index + 1;
    });
  }

  delete(data) {
    this.categoriesService.deleteCategory(data.id)
      .subscribe(data => {
        if (data) {
          this.messageService.showSnackBar({
            message: 'Успішно',
            isError: false
          });
          this.getCategories();
        }
      }, error1 => {
        this.messageService.showSnackBar({
          message: 'Помилка: ' + error1.status,
          isError: true
        });
      });
  }

}
