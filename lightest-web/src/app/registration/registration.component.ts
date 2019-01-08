import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import {AuthErrorMsgService} from '../shared/services/authErrorMsg.service';
import {Message} from '../shared/models/Message';
import {MatSnackBar} from '@angular/material';
import {MessageComponent} from '../message/message.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  messageInfo: Message = {message: '', isError: false};
  registrationUserForm: FormGroup;
  formErrors = {
    'firstName': '',
    'secondName': '',
    'email': '',
    'login': '',
    'password': '',
    'passwordRepeat': ''
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
    },
    'email': {
      'required': `Обов'язкове поле`,
      'pattern': `Некоректна форма email`
    },
    'login': {
      'required': `Обов'язкове поле`,
      'minlength': `Мінімальна кількість символів 3`,
      'maxlength': `Максимальна кількість символів 25`
    },
    'password': {
      'required': `Обов'язкове поле`,
      'pattern': `Пароль повинен містити: великі, малі літери, цифри та символи`
    },
    'passwordRepeat': {
      'required': `Обов'язкове поле`,
      'compare': `Паролі не збігаються`
    }
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private authErrorMsgService: AuthErrorMsgService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.initFormValidators();
  }

  initFormValidators() {
    this.registrationUserForm = this.formBuilder.group({
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
      email: ['', [
        Validators.required,
        Validators.pattern(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/)
      ]],
      login: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
        password: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
        ]],
        passwordRepeat: ['', [
          Validators.required
        ]]
    }, {validators: this.checkPasswords });

    this.registrationUserForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  checkPasswords(group: FormGroup) {
    let password = group.controls.password.value;
    let passwordRepeat = group.controls.passwordRepeat.value;
    return password === passwordRepeat ? null : { notSame: true }
  }

  register() {
    this.authService.register(this.registrationUserForm.value.login,
                              this.registrationUserForm.value.password,
                              this.registrationUserForm.value.email)
    .subscribe(data => {
      this.messageInfo.message = 'Ви зареєстровані. Тепер увійдіть в систему';
      this.messageInfo.isError = false;
      this.openSnackBar(false);
      this.router.navigate(['login']);
    }, (err) => {
        this.authErrorMsgService.handleRegistrationError(err);
    });
  }

  onValueChanged(data?: any) {
    if (!this.registrationUserForm) { return; }
    const form = this.registrationUserForm;
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

  openSnackBar(isError) {
    if(!isError) {
      this.snackBar.openFromComponent(MessageComponent, { data: this.messageInfo, panelClass: ['snackbar-success-message'] } )
    }
  }

}
