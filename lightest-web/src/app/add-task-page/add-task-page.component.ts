import {ApplicationRef, Component, ComponentFactoryResolver, EmbeddedViewRef, OnInit, ViewChild} from '@angular/core';
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
import { mergeMap } from 'rxjs/operators';
import {DomService} from '../shared/services/dom.service';
import {merge} from 'rxjs';
import {AdItem} from '../shared/directives/ad.item';
import {LanguageFormComponent} from '../language-form/language-form.component';
import {AdComponent} from '../shared/directives/ad.component';
import {AdDirective} from '../shared/directives/ad.directive';
import {TestFormComponent} from '../test-form/test-form.component';
import {until} from 'selenium-webdriver';
import elementTextContains = until.elementTextContains;
import {SnackbarService} from '../shared/services/snackbar.service';
@Component({
  selector: 'app-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.scss']
})
export class AddTaskPageComponent implements OnInit {

  ads;
  taskId;
  message: Message = {message: '', isError: false};
  checkers: CheckerShort[];
  categories: Category[];
  languages: Language[];
  taskForm: FormGroup;
  languageForm: FormGroup;
  testForm: FormGroup;

  languageForms = [];
  languageFormsCount = 0;

  testForms = [];
  testFormsCount = 0;

  formErrorstaskForm = {
      'taskName': '',
      'taskPoints': '',
      'taskDescription': '',
      'examples': '',
      'category': '',
      'checker': ''
  };

  formErrorsLanguageForm = {
    'language': '',
    'timeLimit': '',
    'memoryLimit': ''
  };

  formErrorsTestForm = {
    'inputTest': '',
    'outputTest': ''
  };

  validationMessagestaskForm = {
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

  validationMessagesLanguageForm = {
    'language': {
      'required': `Обов'язкове поле`
    },
    'timeLimit': {
      'required': `Обов'язкове поле`
    },
    'memoryLimit': {
      'required': `Обов'язкове поле`
    }
  };

  validationMessagesTestForm = {
    'inputTest': {
      'required': `Обов'язкове поле`
    },
    'outputTest': {
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
    public snackBar: SnackbarService,
    public domService: DomService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
  ) { }

  ngOnInit() {
    this.getCheckers();
    this.getCategories();
    this.getLanguages();
    this.initForms();
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

  initForms() {
    this.initTaskForm();
    this.initLanguageForm();
    this.initTestForm();
  }

  initTaskForm() {
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
      ]]
    });

      this.taskForm.valueChanges
        .subscribe(() =>
          this.onValueChanged(this.taskForm, this.formErrorstaskForm, this.validationMessagestaskForm)
        );
  }

  initLanguageForm() {
    this.languageForm = this.formBuilder.group({
      language: ['', [
        Validators.required
      ]],
      timeLimit: ['', [
        Validators.required
      ]],
      memoryLimit: ['', [
        Validators.required
      ]]
    });

    this.taskForm.valueChanges
      .subscribe(() =>
        this.onValueChanged(this.languageForm, this.formErrorsLanguageForm, this.validationMessagesLanguageForm)
      );
  }

  initTestForm() {
    this.testForm = this.formBuilder.group({
      inputTest: ['', [
        Validators.required
      ]],
      outputTest: ['', [
        Validators.required
      ]]
    });

    this.taskForm.valueChanges
      .subscribe(() =>
        this.onValueChanged(this.testForm, this.formErrorsTestForm, this.validationMessagesTestForm)
      );
  }

  submit() {
    if(this.isValidForms()) {
      this.taskService.addNewTask(this.loadTaskObject(this.taskForm.value))
        .pipe(
          mergeMap(data =>
            merge(
              this.taskId = data['id'],
              this.taskService.addTestsForTask(data['id'], this.getTestObj()),
              this.taskService.addLanguagesForTask(data['id'], this.getLanguagesObj())
            )
          )
        ).subscribe(res => {
          this.openSnackBar({message: 'Успішно', isError: false});
          this.taskForm.reset();
        },
        error1 => {
          if (error1) {
            this.openSnackBar({message: 'Помилка', isError: true});
          }
        });
    } else {
      this.openSnackBar({message: 'Заповніть необхідні поля форми', isError: true});
    }
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

  getLanguagesObj() {
    let allLanguages = [];
    allLanguages =  this.languageForms.map(languageForm => {
      return this.loadLanguageObject(languageForm.data)
    });
    allLanguages.push(this.loadLanguageObject(this.languageForm.value));
    return allLanguages;
  }

  getTestObj() {
    let allTests = [];
    allTests =  this.testForms.map(testForm => {
      return this.loadTestsObject(testForm.data)
    });
    allTests.push(this.loadTestsObject(this.testForm.value));
    return allTests;
  }

  loadTestsObject(obj): Test{
    const tests =
      {
        taskId: this.taskId,
        input: obj.inputTest,
        output: obj.outputTest,
      };
    return tests;
  }

  loadLanguageObject(obj): LanguageForTask {
    const languages: LanguageForTask =
      {
        languageId: obj.language,
        taskId: this.taskId,
        timeLimit: obj.timeLimit,
        memoryLimit: obj.memoryLimit
      };
    return languages;
  }

  onValueChanged(_form, errorForm, validationMessages) {
      if (!_form) { return; }
      const form = _form;
      for (const field in errorForm) {
          if (errorForm.hasOwnProperty(field)) {
              // clear previous error message (if any)
              errorForm[field] = '';
              const control = form.get(field);
              if (control && control.dirty && !control.valid) {
                  const messages = validationMessages[field];
                  for (const key in control.errors) {
                      if (control.errors.hasOwnProperty(key)) {
                        errorForm[field] += messages[key] + ' ';
                      }
                  }
              }
          }
      }
  }

  openSnackBar(message: Message) {
    this.snackBar.showSnackBar(message);
  }

  addLanguageForm() {
    this.languageFormsCount ++;
    this.languageForms.push({data: {}, id: this.languageFormsCount, valid: false});

    this.domService.appendComponent(LanguageFormComponent, '.dynamic-language-forms', {languages: this.languages, id: this.languageFormsCount})
      .subscribe(result => {
        this.handleLanguageForms(result);
      });
  }

  handleLanguageForms(formObj) {
    let flag = false;
    for (let i=0; i<this.languageForms.length; i++) {
      if(this.languageForms[i].id == formObj.id) {
        this.languageForms[i] = Object.assign({}, formObj);
        flag = true;
      }
    }

    if(!flag) {
      this.languageForms.push(formObj);
    }
  }

  isValidLanguageForms() {
    let isValid = this.languageForms.find(form => {
      return form.valid == false;
    });
    return isValid == undefined ? true : false;
  }

  handleTestForms(formObj) {
    let flag = false;
    for (let i=0; i<this.testForms.length; i++) {
      if(this.testForms[i].id == formObj.id) {
        this.testForms[i] = Object.assign({}, formObj);
        flag = true;
      }
    }

    if(!flag) {
      this.testForms.push(formObj);
    }
  }

  isValidTestForms() {
    let isValid = this.testForms.find(form => {
      return form.valid == false;
    });
    return isValid == undefined ? true : false;
  }


  addTestForm() {
    this.testFormsCount ++;
    this.testForms.push({data: {}, id: this.testFormsCount, valid: false});

    this.domService.appendComponent(TestFormComponent, '.dynamic-test-forms', {id: this.testFormsCount})
      .subscribe(result => {
        this.handleTestForms(result);
      });
  }

  isValidForms () {
    return !this.taskForm.invalid && this.isValidLanguageForms() && this.isValidTestForms();
  }
}
