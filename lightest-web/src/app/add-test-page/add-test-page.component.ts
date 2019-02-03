import { Component, OnInit } from '@angular/core';
import {TaskService} from '../shared/services/task.service';
import {Message} from '../shared/models/Message';
import {MessageComponent} from '../message/message.component';
import {CheckerShort} from '../shared/models/CheckerShort';
import {Category} from '../shared/models/Category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CheckerService} from '../shared/services/checker.service';
import {CategoriesService} from '../shared/services/categories.service';
import {MatSnackBar} from '@angular/material';
import {TaskShort} from '../shared/models/TaskShort';
import {TestService} from '../shared/services/test.service';
import {Test} from '../shared/models/Test';

@Component({
  selector: 'app-add-test-page',
  templateUrl: './add-test-page.component.html',
  styleUrls: ['./add-test-page.component.scss']
})
export class AddTestPageComponent implements OnInit {

  tasks: TaskShort[];
  message: Message = {message: '', isError: false};
  testForm: FormGroup;
  formErrors = {
    'inputTest': '',
    'outputTest': '',
    'task': ''
  };
  validationMessages = {
    'inputTest': {
      'required': `Обов'язкове поле`
    },
    'outputTest': {
      'required': `Обов'язкове поле`
    },
    'task': {
      'required': `Обов'язкове поле`
    }
  };


  constructor(
    private taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.getTasks();
    this.initForm();
  }

  initForm() {
    this.testForm = this.formBuilder.group({
      inputTest: ['', [
        Validators.required
      ]],
      outputTest: ['', [
        Validators.required
      ]],
      task: ['', [
        Validators.required
      ]]
    });

    this.testForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  getTasks() {
    this.taskService.getTasks()
      .subscribe(data => {
        if(data) {
            this.tasks = data;
        }
      })
  }

  submit() {
    this.testService.addTest(this.loadObject(this.testForm.value))
      .subscribe(data => {
        if(data){
          this.testForm.reset();
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

  loadObject(currentTest): Test {
    const test: Test = {
      input: currentTest.inputTest,
      output: currentTest.outputTest,
      taskId: currentTest.task
    };

    return test;
  }

  onValueChanged(data?: any) {
    if (!this.testForm) { return; }
    const form = this.testForm;
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
