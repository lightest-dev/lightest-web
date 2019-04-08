import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EditorService} from '../../shared/services/editor.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  step = -1;
  @Input() tasks;
  constructor(private router: Router,
              private editorService: EditorService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
