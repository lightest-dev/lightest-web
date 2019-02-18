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
import {Test} from '../shared/models/Test';
import {LanguageForTask} from '../shared/models/LanguageForTask';
import {LanguageService} from '../shared/services/language.service';
import {Language} from '../shared/models/Language';

@Component({
  selector: 'app-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.scss']
})
export class AddTaskPageComponent implements OnInit {

    taskId;
    message: Message = {message: '', isError: false};
    checkers: CheckerShort[];
    categories: Category[];
    languages: Language[];
    taskForm: FormGroup;
    formErrors = {
        'taskName': '',
        'taskPoints': '',
        'taskDescription': '',
        'examples': '',
        'category': '',
        'checker': '',
        'language': '',
        'timeLimit': '',
        'memoryLimit': '',
        'inputTest': '',
        'outputTest': '',
        'task': ''
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
        },
        'language': {
          'required': `Обов'язкове поле`
        },
        'timeLimit': {
          'required': `Обов'язкове поле`
        },
        'memoryLimit': {
          'required': `Обов'язкове поле`
        },
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
    private router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private checkerService: CheckerService,
    private categoryService: CategoriesService,
    private languageService: LanguageService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getCheckers();
    this.getCategories();
    this.getLanguages();
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

  getLanguages() {
    this.languageService.getLanguages()
      .subscribe(data => {
        console.log(data);
        this.languages = data;
      });
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
      language: ['', [
        Validators.required
      ]],
      timeLimit: ['', [
        Validators.required
      ]],
      memoryLimit: ['', [
        Validators.required
      ]],
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

      this.taskForm.valueChanges
          .subscribe(data => this.onValueChanged(data));

      this.onValueChanged();
  }

  submit() {
    this.taskService.addNewTask(this.loadTaskObject(this.taskForm.value))
      .subscribe(data => {
        if(data) {
          this.taskId = data['id'];
          // this.taskForm.reset();
          // this.message.isError = false;
          // this.message.message = 'Успішно';
          // this.openSnackBar(this.message);
        }
      }, err => {
        console.log(err);
        this.message.isError = true;
        this.message.message = 'Помилка';
        this.openSnackBar(this.message);
      }, () => {
        this.submitTests();
        this.submitLanguages();
      });
  }

  submitTests() {
    this.taskService.addTestsForTask(this.taskId, this.loadTestsObject(this.taskForm.value))
      .subscribe(data => {
        console.log(data);
      })
  }

  submitLanguages() {
    this.taskService.addLanguagesForTask(this.taskId, this.loadLanguageObject(this.taskForm.value))
      .subscribe(data => {
        console.log(data);
      })
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

  loadTestsObject(obj): Test[]{
    const tests: Test[] = [
      {
        taskId: this.taskId,
        input: obj.input,
        output: obj.output,
      }
    ];
    return tests;
  }

  loadLanguageObject(obj): LanguageForTask[] {
    const languages: LanguageForTask[] = [
      {
        languageId: obj.language,
        taskId: this.taskId,
        timeLimit: obj.timeLimit,
        memoryLimit: obj.memoryLimit
      }
    ];
    return languages;
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
