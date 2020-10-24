import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserShort } from '../shared/models/UserShort';
import { AccountService } from '../shared/services/account.service';
import { AuthService } from '../shared/services/auth.service';
import { FormService } from '../shared/services/form.service';
import { SnackbarService } from '../shared/services/snackbar.service';

export interface AddToRoleData {
  users: UserShort[];
}

@Component({
  selector: 'app-add-to-role-dialog',
  templateUrl: './add-to-role-dialog.component.html',
  styleUrls: ['./add-to-role-dialog.component.scss']
})
export class AddToRoleDialogComponent implements OnInit {
  roleForm: FormGroup;
  userId: string;
  role: string;
  roles: {
    name: string;
    label: string;
  }[];
  inProgress = false;

  formErrors = {
    userId: '',
    role: '',
  };

  validationMessages = {
    userId: {
      required: `Обов'язкове поле`
    },
    role: {
      required: `Обов'язкове поле`
    }
  }

  constructor(
    private dialogRef: MatDialogRef<AddToRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddToRoleData,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private accountService: AccountService,
    private messageService: SnackbarService,) { 
      this.userId = data.users[0].id;
      this.roles = [
        {
          name: 'Teacher',
          label: 'Викладач'
        },
        {
          name: 'Admin',
          label: 'Адміністратор'
        }
      ]
      this.role = this.roles[0].name;
    }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      userId: [this.userId, [
        Validators.required
      ]],
      role: [this.role, [
        Validators.required
      ]]
    });

    this.roleForm.valueChanges.subscribe(() =>
      this.formService.onValueChanged(this.roleForm,
        this.formErrors, this.validationMessages));
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.inProgress = true;
    this.accountService.addToRole({
      userId: this.userId,
      role: this.role,
    }).subscribe(() => {
      this.messageService.showSnackBar({
        isError: false,
        message: 'Додано успішно!'
      });

      this.dialogRef.close();
      }, (response) => {
        let message = 'Не вдалося додати користувача в роль.'
        if (response.error === 'Role') {
          message = 'Вибрана роль не існує на сервері.';
        } else if (response.error === 'UserId') {
          message = 'Вибраний користувач не існує на сервері.';
        }

        this.messageService.showSnackBar({
          isError: true,
          message: message,
        });
        this.inProgress = false;
      });
  }
}
