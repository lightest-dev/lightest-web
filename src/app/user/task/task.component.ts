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

  doExcercise(taskId, languages) {
    this.editorService.saveState({
      taskId: taskId,
      languages: languages
    });
    this.router.navigate(['account/editor']);
  }
}
