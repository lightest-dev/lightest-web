import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
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

  @Input() tableData;
  @Output() itemDelete = new EventEmitter();

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
    this.dataSource = new MatTableDataSource(this.data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleDelete(event) {
    this.itemDelete.emit(event);
  }

}
