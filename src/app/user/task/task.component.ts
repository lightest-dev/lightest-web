import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {EditorService} from '../../shared/services/editor.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserData} from '../../table-base/table-base.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  step = -1;

  @Input() tasks;
  constructor(private router: Router) {}

  ngOnInit() {}

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  doExcercise(taskId) {
    this.router.navigate([`account/editor/${taskId}`]);
  }

}
