import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.scss']
})
export class TaskPreviewComponent implements OnInit {

  @Input() task;
  constructor() { }

  ngOnInit(): void {
  }

}
