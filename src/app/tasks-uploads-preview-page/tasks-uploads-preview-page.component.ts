import { Component, OnInit } from '@angular/core';
import {TaskService} from "../shared/services/task.service";
import {ProfileService} from "../shared/services/profile.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../shared/services/form.service";
import {UploadService} from "../shared/services/upload.service";

@Component({
  selector: 'app-tasks-uploads-preview-page',
  templateUrl: './tasks-uploads-preview-page.component.html',
  styleUrls: ['./tasks-uploads-preview-page.component.scss']
})
export class TasksUploadsPreviewPageComponent implements OnInit {

  public tasks;
  public users;
  public chosenTask;
  public uploads;
  form: FormGroup;

  constructor(private taskService: TaskService,
              private profileService: ProfileService,
              private formBuilder: FormBuilder,
              private formService: FormService,
              private uploadsService: UploadService,
  ) { }

  ngOnInit(): void {
    this.taskService.getAccessibleTasks().subscribe(data => {
      this.tasks = data;
    });

    this.profileService.getUsers().subscribe(data => {
      this.users = data;
    });

    this.form = this.formBuilder.group({
      tasks: ['', [
        Validators.required
      ]],
      users: ['', [
        Validators.required
      ]],
    });

    this.form.valueChanges.subscribe((data) => {
      if(this.form.value.tasks && this.form.value.users) {
        this.chosenTask = this.tasks.find(el => el.id == this.form.value.tasks);
        this.getUploads(this.form.value.tasks, this.form.value.users);
      }
    });
  }

  getUploads(taskId, userId) {
    this.uploadsService.getTaskUploads(taskId, userId).subscribe((data) => {
      this.uploads = data;
    });
  }
}
