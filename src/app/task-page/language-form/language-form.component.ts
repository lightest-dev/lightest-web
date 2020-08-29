import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../shared/services/form.service';

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

  deleteFlag = false ;
  languageForm: FormGroup;
  @Input() data: any;
  @Output() form = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private formService: FormService) { }

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
    if (this.deleteFlag) {
      this.form.emit({delete: true, id: this.data.id});
    } else {
      this.form.emit({data: this.languageForm.value, valid: this.languageForm.valid, id: this.data.id});
    }
  }

  onValueChanged(form, errorForm, validationMessages) {
    this.formService.onValueChanged(form, errorForm, validationMessages);
  }

  delete() {
    this.deleteFlag = true;
    this.emitData();
  }
}
