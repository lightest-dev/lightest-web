import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {

  formErrorsTestForm = {
    'inputTest': '',
    'outputTest': ''
  };
  validationMessagesTestForm = {
    'inputTest': {
      'required': `Обов'язкове поле`
    },
    'outputTest': {
      'required': `Обов'язкове поле`
    }
  };

  testForm: FormGroup;
  @Input() data;
  @Output() form = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initTestForm();
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

    this.testForm.valueChanges
      .subscribe(() => {
        this.onValueChanged(this.testForm, this.formErrorsTestForm, this.validationMessagesTestForm);
        this.emitData();
      });
  }

  emitData() {
    this.form.emit({data: this.testForm.value, valid: this.testForm.valid, id: this.data.id});
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
