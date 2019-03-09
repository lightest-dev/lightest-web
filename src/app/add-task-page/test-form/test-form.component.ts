import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../shared/services/form.service';

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

  deleteFlag = false;
  testForm: FormGroup;
  @Input() data;
  @Output() form = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private formService: FormService) { }

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
    if (this.deleteFlag) {
      this.form.emit({delete: true, id: this.data.id});
    } else {
      this.form.emit({data: this.testForm.value, valid: this.testForm.valid, id: this.data.id});
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
