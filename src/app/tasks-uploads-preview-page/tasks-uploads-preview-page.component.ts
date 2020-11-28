import { Component, OnInit } from '@angular/core';
import {TaskService} from "../shared/services/task.service";
import {ProfileService} from "../shared/services/profile.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../shared/services/form.service";
import {UploadService} from "../shared/services/upload.service";
import {CategoriesService} from "../shared/services/categories.service";
import {LanguageService} from "../shared/services/language.service";

@Component({
  selector: 'app-tasks-uploads-preview-page',
  templateUrl: './tasks-uploads-preview-page.component.html',
  styleUrls: ['./tasks-uploads-preview-page.component.scss']
})
export class TasksUploadsPreviewPageComponent implements OnInit {

  public categoriesDetails;
  public categories;
  public tasks;
  public users;
  public languages;
  public chosenTask;
  public uploads;
  form: FormGroup;

  constructor(private taskService: TaskService,
              private profileService: ProfileService,
              private formBuilder: FormBuilder,
              private formService: FormService,
              private uploadsService: UploadService,
              private categoriesService: CategoriesService,
              private languageService: LanguageService,
  ) { }

  ngOnInit(): void {
    // this.categoriesService.getCategories().subscribe(data => {
    //   this.categories = data;
    //   console.log(data);
    // }, () => {},
    //   () => {
    //   this.categories.forEach(el => {
    //      this.categoriesService.getCategory(el.id).subscribe(data => {
    //        this.categoriesDetails = data;
    //     });
    //   });
    //   });

    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });

    this.profileService.getUsers().subscribe(data => {
      this.users = data;
    });

    // this.languageService.getLanguages().subscribe(data => {
    //   this.languages = data;
    //   console.log(data);
    // });

    this.form = this.formBuilder.group({
      tasks: ['', [
        Validators.required
      ]],
      users: ['', [
        Validators.required
      ]],
      categories: ['', [
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
      // data.map((el) => {
      //   return {
      //     ...el,
      //     language: this.languages.find((l) => l.id == el.languageId)?.name,
      //   };
      // });
    });
  }
}
