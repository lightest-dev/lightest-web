import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
        private formBuilder: FormBuilder
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
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.userForm) { return; }
        const form = this.userForm;
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
}
