import { Component, OnInit } from '@angular/core';
import {Message} from '../shared/models/Message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoriesService} from '../shared/services/categories.service';
import {MatSnackBar} from '@angular/material';
import {GroupService} from '../shared/services/group.service';
import {Category} from '../shared/models/Category';
import {MessageComponent} from '../message/message.component';
import {GroupShort} from '../shared/models/GroupShort';
import {SnackbarService} from '../shared/services/snackbar.service';

@Component({
  selector: 'app-add-group-page',
  templateUrl: './add-group-page.component.html',
  styleUrls: ['./add-group-page.component.scss']
})
export class AddGroupPageComponent implements OnInit {

  message: Message = {message: '', isError: false};
  groupForm: FormGroup;
  formErrors = {
    'groupName': ''
  };
  validationMessages = {
    'groupName': {
      'required': `Обов'язкове поле`
    }
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    public snackBar: SnackbarService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.groupForm = this.formBuilder.group({
      groupName: ['', [
        Validators.required
      ]],
      publicGroup: [true]
    });

    this.groupForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

  }

  submit() {
    this.groupService.addGroup(this.loadObject(this.groupForm.value))
      .subscribe(data => {
        if(data) {
          this.groupForm.reset();
          this.message.isError = false;
          this.message.message = 'Успішно';
          this.openSnackBar(this.message);
        }
      }, err => {
        console.log(err);
        this.message.isError = true;
        this.message.message = 'Помилка';
        this.openSnackBar(this.message);
      })
  }

  onValueChanged(data?: any) {
    if (!this.groupForm) { return; }
    const form = this.groupForm;
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

  loadObject(currentGroup) {
    const group: GroupShort = {
      name: currentGroup.groupName,
      public: currentGroup.publicGroup,
      parentId: ''
    };
    return group;
  }

  openSnackBar(message: Message) {
    this.snackBar.showSnackBar(message);
  }
}
