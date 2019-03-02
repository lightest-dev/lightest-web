import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../shared/services/form.service';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
  selector: 'app-user-change-info-dialog',
  templateUrl: './user-change-info-dialog.component.html',
  styleUrls: ['./user-change-info-dialog.component.scss']
})
export class UserChangeInfoDialogComponent implements OnInit {

    userForm: FormGroup;
    formErrors = {
        'firstName': '',
        'secondName': '',
    };

    validationMessages = {
        'firstName': {
          'required': `Обов'язкове поле`,
          'minlength': `Мінімальна кількість символів 3`,
          'maxlength': `Максимальна кількість символів 25`
        },
        'secondName': {
          'required': `Обов'язкове поле`,
          'minlength': `Мінімальна кількість символів 3`,
          'maxlength': `Максимальна кількість символів 25`
        }
    };

    constructor(
        public dialogRef: MatDialogRef<UserChangeInfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private formBuilder: FormBuilder,
        private formService: FormService,
    ) {}

  ngOnInit() {
      this.initFormValidators();
  }

  sumbit() {

  }

  initFormValidators() {
      this.userForm = this.formBuilder.group({
          firstName: ['', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25)
          ]],
          secondName: ['', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25)
          ]],

      });

      this.userForm.valueChanges
          .subscribe(() =>
            this.onValueChanged(this.userForm, this.formErrors, this.validationMessages));
  }

    onValueChanged(form, errorForm, validationMessages) {
        this.formService.onValueChanged(form, errorForm, validationMessages);
    }
}
