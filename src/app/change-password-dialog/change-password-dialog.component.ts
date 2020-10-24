import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddToRoleDialogComponent } from '../add-to-role-dialog/add-to-role-dialog.component';
import { AccountService } from '../shared/services/account.service';
import { FormService } from '../shared/services/form.service';
import { SnackbarService } from '../shared/services/snackbar.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {

  changePasswordForm: FormGroup;
  newPassword: string;
  confirmationPassword: string;
  inProgress = false;

  hidePassword = true;
  hideConfirmation = true;

  formErrors = {
    newPassword: '',
    confirmationPassword: '',
  };

  validationMessages = {
    newPassword: {
      required: `Обов'язкове поле`,
      pattern: `Пароль повинен містити: великі, малі літери, цифри та символи`
    },
    confirmationPassword: {
      required: `Обов'язкове поле`,
      compare: `Паролі не збігаються`
    },
  }

  constructor(
    private dialogRef: MatDialogRef<AddToRoleDialogComponent>,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private accountService: AccountService,
    private messageService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.initFormValidators();
  }

  initFormValidators() {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
        ]],
        confirmationPassword: ['', [
          Validators.required
        ]]
    });

    this.changePasswordForm.valueChanges
      .subscribe(() => this.formService.onValueChanged(this.changePasswordForm, this.formErrors, this.validationMessages));
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.inProgress = true;
    this.accountService.changePassword({
      newPassword: this.changePasswordForm.value.newPassword
    }).subscribe(() => {
      this.messageService.showSnackBar({
        isError: false,
        message: 'Змінено успішно!'
      });

      this.dialogRef.close();
    }, () => {
      this.messageService.showSnackBar({
        isError: true,
        message: 'Не вдалося змінити пароль.',
      });
      this.inProgress = false;
    });
  }

}
