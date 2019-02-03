import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../shared/services/task.service';
import {TaskShort} from '../shared/models/TaskShort';
import {CheckerService} from '../shared/services/checker.service';
import {CategoriesService} from '../shared/services/categories.service';
import {CheckerShort} from '../shared/models/CheckerShort';
import {Category} from '../shared/models/Category';
import {Message} from '../shared/models/Message';
import {MessageComponent} from '../message/message.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.scss']
})
export class AddTaskPageComponent implements OnInit {

    message: Message = {message: '', isError: false};
    checkers: CheckerShort[];
    categories: Category[];
    taskForm: FormGroup;
    formErrors = {
        'taskName': '',
        'taskPoints': '',
        'taskDescription': '',
        'examples': '',
        'category': '',
        'checker': ''
    };
    validationMessages = {
        'taskName': {
            'required': `Обов'язкове поле`
        },
        'taskPoints': {
            'required': `Обов'язкове поле`
        },
        'taskDescription': {
            'required': `Обов'язкове поле`
        },
        'examples': {
            'required': `Обов'язкове поле`
        },
        'category': {
            'required': `Обов'язкове поле`
        },
        'checker': {
            'required': `Обов'язкове поле`
        }
    };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private checkerService: CheckerService,
    private categoryService: CategoriesService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getCheckers();
    this.getCategories();
    this.initForm();
  }

  getCheckers() {
    this.checkerService.getCheckers()
      .subscribe(data => {
        this.checkers = data;
      })
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;
      })
  }


  initForm() {
    this.taskForm = this.formBuilder.group({
      taskName: ['', [
        Validators.required
      ]],
      taskPoints: ['', [
        Validators.required
      ]],
      taskDescription: ['', [
        Validators.required
      ]],
      examples: ['', [
        Validators.required
      ]],
      publicTask: ['true'],
      category:  ['', [
          Validators.required
      ]],
      checker: ['', [
          Validators.required
      ]],
    });

      this.taskForm.valueChanges
          .subscribe(data => this.onValueChanged(data));

      this.onValueChanged();
  }

  submit() {
    this.taskService.addNewTask(this.loadTaskObject(this.taskForm.value))
      .subscribe(data => {
        if(data) {
          this.taskForm.reset();
          this.message.isError = false;
          this.message.message = 'Успішно';
          this.openSnackBar(this.message);
        }
      }, err => {
        console.log(err);
        this.message.isError = true;
        this.message.message = 'Помилка';
        this.openSnackBar(this.message);
      });
  }

  loadTaskObject(currentTask): TaskShort {
   const task: TaskShort = {
       name: currentTask.taskName,
       points: currentTask.taskPoints,
       public: currentTask.publicTask,
       checkerId: currentTask.checker,
       categoryId: currentTask.category,
       description: currentTask.taskDescription,
       examples: currentTask.examples
   };

    return task;
  }

    onValueChanged(data?: any) {
        if (!this.taskForm) { return; }
        const form = this.taskForm;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

  openSnackBar(message: Message) {
    this.snackBar.openFromComponent(MessageComponent, { data: message,
      panelClass: message.isError ? ['snackbar-error-message'] : ['snackbar-success-message'] } );
  }
}
