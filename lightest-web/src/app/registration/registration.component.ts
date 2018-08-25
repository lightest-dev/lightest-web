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
        Validators.required
      ]],
      login: ['',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      password: ['',[
        Validators.required,
        // find regualar expr for this field !!!
      ]],
      passwordRepeat: ['',[
        Validators.required
      ]]
    })
  }

  register() {
    console.log("Iam register");
  }

}
