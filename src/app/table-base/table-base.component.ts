import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {AccountService} from '../shared/services/account.service';

@Component({
  selector: 'app-table-base',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.scss']
})

export class TableBaseComponent implements OnInit {
  dataSource;
  data;
  labels;
  labelsName;
  displayedColumns;
  customButtons: {
    icon?: string;
    handler(data: any): void;
  }[];

  @Input() tableData;
  @Output() deleteItem = new EventEmitter();
  @Output() editItem = new EventEmitter();
  @Output() viewItem = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.initData();
  }

  ngOnChanges() {
    this.initData();
  }

  initData() {
    this.data = this.tableData.data;
    this.labels = this.tableData.labels;
    this.labelsName = this.tableData.labelsName;
    this.displayedColumns = this.labels;
    this.customButtons = this.tableData.customButtons;
    this.dataSource = new MatTableDataSource(this.data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleDelete(event) {
    this.deleteItem.emit(event);
  }

  handleEdit(event) {
    this.editItem.emit(event);
  }

  handleView(event) {
    this.viewItem.emit(event);
  }
}
