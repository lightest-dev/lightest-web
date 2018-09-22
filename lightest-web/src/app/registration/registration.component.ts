import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationUserForm: FormGroup;
  password;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // check if already logged in if yes redirect to PP (personal page)
    this.initFormValidators();
  }

  initFormValidators() {
    this.registrationUserForm = this.formBuilder.group({
      firstName: ['',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      secondName: ['',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      email: ['',[
        Validators.required,
        Validators.pattern(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/)
      ]],
      login: ['',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
        password: ['',[
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
        ]],
        passwordRepeat: ['',[
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/),
       // compare with password 
        ]]
    })
  }

  register() {
    console.log("Iam register");
  }



}
