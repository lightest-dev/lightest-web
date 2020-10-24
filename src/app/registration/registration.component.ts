import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import {AuthErrorMsgService} from '../shared/services/authErrorMsg.service';
import {Message} from '../shared/models/Message';
import {ProfileService} from '../shared/services/profile.service';
import {SnackbarService} from '../shared/services/snackbar.service';
import {FormService} from '../shared/services/form.service';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hide1: boolean;
  hide2: boolean;
  messageInfo: Message = {message: '', isError: false};
  registrationUserForm: FormGroup;
  formErrors = {
    'email': '',
    'login': '',
    'password': '',
    'passwordRepeat': ''
  };

  validationMessages = {
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
    private accountService: AccountService,
    private authErrorMsgService: AuthErrorMsgService,
    public snackBar: SnackbarService,
    public profileService: ProfileService,
    private formService: FormService
  ) { }

  ngOnInit() {
    this.initFormValidators();
  }

  initFormValidators() {
    this.registrationUserForm = this.formBuilder.group({
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
      .subscribe(() => this.onValueChanged(this.registrationUserForm, this.formErrors, this.validationMessages));
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls.password.value;
    const passwordRepeat = group.controls.passwordRepeat.value;
    return password === passwordRepeat ? null : { notSame: true };
  }

  register() {
    this.accountService.register(this.registrationUserForm.value.login,
                              this.registrationUserForm.value.password,
                              this.registrationUserForm.value.email)
    .subscribe(() => {
        this.login();
    }, (err) => {
        this.authErrorMsgService.handleRegistrationError(err);
    });
  }

  login() {
      this.authService.login({login: this.registrationUserForm.value.login, password: this.registrationUserForm.value.password})
        .subscribe(() => {
          this.authService.confirmLogin();
          this.messageInfo.message = 'Успішно';
          this.messageInfo.isError = false;
          this.openSnackBar(this.messageInfo);
          this.router.navigate(['']);
        });
    }

  onValueChanged(form, errorForm, validationMessages) {
    this.formService.onValueChanged(form, errorForm, validationMessages);
  }

  openSnackBar(message: Message) {
      this.snackBar.showSnackBar(message);
  }

}
