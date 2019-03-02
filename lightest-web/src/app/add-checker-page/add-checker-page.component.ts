import { Component, OnInit } from '@angular/core';
import {Message} from '../shared/models/Message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoriesService} from '../shared/services/categories.service';
import {MatSnackBar} from '@angular/material';
import {MessageComponent} from '../message/message.component';
import {Category} from '../shared/models/Category';
import {Checker} from '../shared/models/Checker';
import {CheckerShort} from '../shared/models/CheckerShort';
import {CheckerService} from '../shared/services/checker.service';
import {SnackbarService} from '../shared/services/snackbar.service';

@Component({
  selector: 'app-add-checker-page',
  templateUrl: './add-checker-page.component.html',
  styleUrls: ['./add-checker-page.component.scss']
})
export class AddCheckerPageComponent implements OnInit {

  message: Message = {message: '', isError: false};
  checkerForm: FormGroup;
  formErrors = {
    'checkerName': '',
    'checkerCode': ''
  };
  validationMessages = {
    'checkerName': {
      'required': `Обов'язкове поле`
    },
    'checkerCode': {
      'required': `Обов'язкове поле`
    }
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private checkerService: CheckerService,
    public snackBar: SnackbarService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.checkerForm = this.formBuilder.group({
      checkerName: ['', [
        Validators.required
      ]],
      checkerCode: ['', [
        Validators.required
      ]],
    });

    this.checkerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

  }

  submit() {
    this.checkerService.addChecker(this.loadObject(this.checkerForm.value))
      .subscribe(data => {
        if(data) {
          this.checkerForm.reset();
          this.message.isError = false;
          this.message.message = 'Успішно';
          this.openSnackBar(this.message);
        }
      }, err => {
        this.message.isError = true;
        this.message.message = 'Помилка';
        console.log(err);
      }
    )
  }

  loadObject(currentChecker) {
    const checker: CheckerShort = {
      name: currentChecker.checkerName,
      code: currentChecker.checkerCode,
    };
    return checker;
  }


  onValueChanged(data?: any) {
    if (!this.checkerForm) { return; }
    const form = this.checkerForm;
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
    this.snackBar.showSnackBar(message);
  }

}
