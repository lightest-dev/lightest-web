import { Component, OnInit } from '@angular/core';
import {Message} from '../shared/models/Message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LanguageService} from '../shared/services/language.service';
import {Language} from '../shared/models/Language';
import {SnackbarService} from '../shared/services/snackbar.service';
import {FormService} from '../shared/services/form.service';

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss']
})
export class LanguagePageComponent implements OnInit {

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
    private formBuilder: FormBuilder,
    public snackBar: SnackbarService,
    private languageService: LanguageService,
    private formServie: FormService
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
      .subscribe( () =>
        this.onValueChanged(this.languageForm, this.formErrors, this.validationMessages));
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

  onValueChanged(form, errorForm, validationMessages) {
    this.formServie.onValueChanged(form, errorForm, validationMessages);
  }

  openSnackBar(message: Message) {
    this.snackBar.showSnackBar(message);
  }

}
