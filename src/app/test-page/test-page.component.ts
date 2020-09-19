import { Component, OnInit } from '@angular/core';
import {TaskService} from '../shared/services/task.service';
import {Message} from '../shared/models/Message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TestService} from '../shared/services/test.service';
import {Test} from '../shared/models/Test';
import {SnackbarService} from '../shared/services/snackbar.service';
import {FormService} from '../shared/services/form.service';
import { BaseTask } from '../shared/models/tasks/BaseTask';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
  isEdit: Boolean;
  id?: string;
  tasks: BaseTask[];
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
    private formBuilder: FormBuilder,
    public snackBar: SnackbarService,
    private testService: TestService,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.testService.getTest(this.id).subscribe((test) => {
        this.testForm.patchValue({
          'inputTest':  test.input,
          'outputTest': test.output,
          'task': test.taskId
        });
        const taskSelect = this.testForm.get('task');
        taskSelect.disable();
      });
    }

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
      .subscribe(() => this.onValueChanged(this.testForm, this.formErrors, this.validationMessages));
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
    const test = this.loadObject(this.testForm.value);

    const errorHandler = err => {
      console.error(err);
      this.message.isError = true;
      this.message.message = 'Помилка';
      this.openSnackBar(this.message);
    };

    const showMessage = () => {
      this.message.isError = false;
      this.message.message = 'Успішно';
      this.openSnackBar(this.message);
    };

    if (this.isEdit) {
      this.testService.changeTest(test.id, test)
        .subscribe(showMessage, errorHandler);
    } else {
      this.testService.addTest(test).subscribe(data => {
        showMessage();
        this.router.navigate([`l/tests/edit/${data.id}`]);
    }, errorHandler);
    }
  }

  loadObject(currentTest): Test {
    const test: Test = {
      id: this.id,
      input: currentTest.inputTest,
      output: currentTest.outputTest,
      taskId: currentTest.task
    };

    return test;
  }

  onValueChanged(form, errorForm, validationMessages) {
    this.formService.onValueChanged(form, errorForm, validationMessages);
  }

  openSnackBar(message: Message) {
    this.snackBar.showSnackBar(message);
  }
}
