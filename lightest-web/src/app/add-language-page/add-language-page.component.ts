import { Component, OnInit } from '@angular/core';
import {TaskShort} from '../shared/models/TaskShort';
import {Message} from '../shared/models/Message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../shared/services/task.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {TestService} from '../shared/services/test.service';
import {LanguageService} from '../shared/services/language.service';
import {Test} from '../shared/models/Test';
import {MessageComponent} from '../message/message.component';
import {Language} from '../shared/models/Language';
import {SnackbarService} from '../shared/services/snackbar.service';

@Component({
  selector: 'app-add-language-page',
  templateUrl: './add-language-page.component.html',
  styleUrls: ['./add-language-page.component.scss']
})
export class AddLanguagePageComponent implements OnInit {

  message: Message = {message: '', isError: false};
  languageForm: FormGroup;
  formErrors = {
    'languageName': '',
    'extension': '',
  };
  validationMessages = {
    'languageName': {
      'required': `Обов'язкове поле`
    },
    'extension': {
      'required': `Обов'язкове поле`
    }
  };


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public snackBar: SnackbarService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.languageForm = this.formBuilder.group({
      languageName: ['', [
        Validators.required
      ]],
      extension: ['', [
        Validators.required
      ]]
    });

    this.languageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }


  submit() {
    this.languageService.addLanguage(this.loadObject(this.languageForm.value))
      .subscribe(data => {
        if(data){
          this.languageForm.reset();
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

  loadObject(currentLanguage): Language {
    const language: Language = {
      name: currentLanguage.languageName,
      extension: currentLanguage.extension,
    };

    return language;
  }

  onValueChanged(data?: any) {
    if (!this.languageForm) { return; }
    const form = this.languageForm;
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
