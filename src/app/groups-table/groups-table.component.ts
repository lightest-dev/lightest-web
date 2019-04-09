import { Component, OnInit } from '@angular/core';
import {GroupService} from '../shared/services/group.service';
import {SnackbarService} from '../shared/services/snackbar.service';

@Component({
  selector: 'app-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.scss']
})
export class GroupsTableComponent implements OnInit {

  tableObj;
  groups;

  constructor(private groupService: GroupService,
              private messageService: SnackbarService) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.groupService.getGroups()
      .subscribe(data => {
        this.groups = data;
      }, error1 => {
        this.messageService.showSnackBar({
          message: 'Не вдалось отримати дані. Помилка: ' + error1,
          isError: true
        });
      }, () => {
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
      data: this.groups
    };
  }

  moderateData() {
    this.groups.map((el, index) => {
      el.number = index + 1;
      el.details = 'Деталі';
      el.delete = true;
      el.edit = true;
    });
  }

  delete(data) {
    this.groupService.deleteGroup(data.id)
      .subscribe(data => {
        if (data) {
          this.messageService.showSnackBar({
            message: 'Успішно',
            isError: false
          });
          this.getGroups();
        }
      }, error1 => {
        this.messageService.showSnackBar({
          message: 'Помилка: ' + error1.status,
          isError: true
        });
      });
  }
}
