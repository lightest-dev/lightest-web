import { Component, OnInit } from '@angular/core';
import {CheckerService} from '../shared/services/checker.service';
import {SnackbarService} from '../shared/services/snackbar.service';

@Component({
  selector: 'app-checkers-table',
  templateUrl: './checkers-table.component.html',
  styleUrls: ['./checkers-table.component.scss']
})
export class CheckersTableComponent implements OnInit {

  checkers;
  tableObj;

  constructor(private checkerService: CheckerService,
              private messageService:SnackbarService) { }

  ngOnInit() {
    this.getCheckers();
  }

  getCheckers() {
    this.checkerService.getCheckers()
      .subscribe(data => {
        this.checkers = data;
      }, error1 => {
        this.messageService.showSnackBar({
          message: 'Не вдалось отримати дані',
          isError: true
        });
      }, () => {
        this.moderateData();
        this.loadObjForTable();
      });
  }


  loadObjForTable() {
    this.tableObj = {
      labels: ['number', 'name', 'compiled', 'details', 'delete', 'edit'],
      labelsName: {
        number: '№',
        name: 'Назва',
        compiled: 'Скомпільоване',
        details: 'Деталі',
        delete: 'Видалити',
        edit: 'Редагувати'
      },
      data: this.checkers
    };
  }

  moderateData() {
    this.checkers.map((el, index) => {
      el.number = index + 1;
      el.details = 'Деталі';
      el.delete = true;
      el.edit = true;
    });
  }

  delete(data) {
    this.checkerService.deleteChecker(data.id)
      .subscribe(data => {
        if (data) {
          this.messageService.showSnackBar({
            message: 'Успішно',
            isError: false
          });
          this.getCheckers();
        }
      }, error1 => {
        this.messageService.showSnackBar({
          message: 'Помилка: ' + error1.status,
          isError: true
        });
      });
  }

}
