import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import {MatSnackBar} from '@angular/material';
import {MessageComponent} from '../message/message.component';
import {Message} from '../shared/models/Message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;
  messageInfo: Message = {message: '', isError: false};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar
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
        console.log(data);
        this.authService.confirmLogin();
        this.messageInfo.message = 'Успішно';
        this.messageInfo.isError = true;
        this.openSnackBar(false);
        this.router.navigate(['']);
      }, (error) => {
        if(error) {
          this.messageInfo.message = 'Вхід відхилено. Щось пішло не так';
          this.messageInfo.isError = true;
          this.openSnackBar(true);
        }
    });
  }

  openSnackBar(isError) {
      isError ?
          this.snackBar.openFromComponent(MessageComponent, { data: this.messageInfo, panelClass: ['snackbar-error-message'] } ) :
          this.snackBar.openFromComponent(MessageComponent, { data: this.messageInfo, panelClass: ['snackbar-success-message'] } );
  }

}
