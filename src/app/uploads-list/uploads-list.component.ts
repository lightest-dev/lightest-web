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
  uploads;
  task;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private uploadService: UploadService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.uploadService.getCurrentUserUploads(params.get('id')).subscribe(data => {
          this.uploads = data;
        }, error1 => {},
        () => {
          this.taskService.getTask(params.get('id'))
            .subscribe(data => {
              this.task = data;
            });
        });
    });
  }

  navigateToTaskResolve() {
    this.router.navigate([`l/editor/${this.task.id}`])
  }
}
