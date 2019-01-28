import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../shared/services/task.service';
import {TaskShort} from '../shared/models/TaskShort';

@Component({
  selector: 'app-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.scss']
})
export class AddTaskPageComponent implements OnInit {

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
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.initForm();
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
      publicTask: [],
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
    console.log(this.taskForm.value);
    // Todo: find categoryId and checkerId by its names
    this.taskService.addNewTask(this.loadTaskObject(this.taskForm.value));
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
}
