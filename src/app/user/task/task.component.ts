import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  step = -1;
  @Input() tasks;
  constructor(private router: Router) { }

  ngOnInit() {
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

  doExcercise() {
    this.router.navigate(['account/editor']);
  }
}
