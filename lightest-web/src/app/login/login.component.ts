import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../api/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initFormValidators();
  }

  initFormValidators() {
    this.loginUserForm = this.formBuilder.group({
      login: ['',[
        Validators.required
      ]],
      password: ['',[
        Validators.required
      ]]
    })
  }

  login() {
    console.log("I am login");
    this.authService.login(this.loginUserForm.value.login, this.loginUserForm.value.password, true).subscribe(
       data => {console.log(data) }
    )
  }

}
