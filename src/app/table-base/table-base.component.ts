import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";

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

  constructor(public dialog: MatDialog,) {}

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
    this.customButtons = this.tableData.customButtons || [];
    this.dataSource = new MatTableDataSource(this.data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleDelete(event) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteItem.emit(event);
      }
    });
  }

  handleEdit(event) {
    this.editItem.emit(event);
  }

  handleView(event) {
    this.viewItem.emit(event);
  }
}

@Component({
  selector: 'delete-confirm-dialog',
  templateUrl: 'delete-confirm-dialog.html',
})
export class DeleteConfirmDialog {}
