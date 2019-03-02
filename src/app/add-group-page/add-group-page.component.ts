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
import {FormService} from '../shared/services/form.service';

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
    private formService: FormService,
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
      .subscribe(() => this.onValueChanged(this.groupForm, this.formErrors, this.validationMessages));

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

  onValueChanged(form, errorForm, validationMessages) {
    this.formService.onValueChanged(form, errorForm, validationMessages);
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
