import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MessageComponent} from '../message/message.component';
import {Message} from '../shared/models/Message';
import {AuthErrorMsgService} from '../shared/services/authErrorMsg.service';
import {SnackbarService} from '../shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean;
  loginUserForm: FormGroup;
  messageInfo: Message = {message: '', isError: false};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public snackBar: SnackbarService,
    public authErrorMsgService: AuthErrorMsgService,
  ) { }

  ngOnInit() {
    this.initFormValidators();
  }

  initFormValidators() {
    this.loginUserForm = this.formBuilder.group({
      login: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      rememberMe: [false]
    });
  }

  login() {
   this.authService.login(this.loginUserForm.value)
    .subscribe(data => {
        this.authService.confirmLogin();
        this.messageInfo.message = 'Успішно';
        this.messageInfo.isError = false;
        this.openSnackBar(this.messageInfo);
        this.router.navigate(['']);
      }, (error) => {
        this.authErrorMsgService.handleLoginError(error);
    });
  }

  openSnackBar(message: Message) {
      this.snackBar.showSnackBar(message);
  }

}
