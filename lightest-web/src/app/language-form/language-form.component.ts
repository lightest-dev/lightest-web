import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent implements OnInit {

  formErrorsLanguageForm = {
    'language': '',
    'timeLimit': '',
    'memoryLimit': ''
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

  languageForm: FormGroup;
  @Input() data: any;
  @Output() form = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initLanguageForm();
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

    this.languageForm.valueChanges
      .subscribe(() => {
        this.onValueChanged(this.languageForm, this.formErrorsLanguageForm, this.validationMessagesLanguageForm);
        this.emitData();
      });
  }

  emitData() {
    this.form.emit({data: this.languageForm.value, valid: this.languageForm.valid, id: this.data.id});
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

}
