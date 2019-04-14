import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UploadService} from '../shared/services/upload.service';
import {TaskService} from '../shared/services/task.service';

@Component({
  selector: 'app-uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.scss']
})
export class UploadsListComponent implements OnInit {
  step = -1;
  uploads;
  task;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private uploadService: UploadService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.uploadService.getTaskUploads(params.get('id')).subscribe(data => {
          this.uploads = data;
        }, error1 => {},
        () => {
          this.taskService.getTask(params.get('id'))
            .subscribe(data => {
              this.task = data;
             if (this.task.points > 0) {
               this.task.completed = true;
             }
            });
        });
    });
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

}
