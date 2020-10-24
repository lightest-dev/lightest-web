import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '../shared/services/snackbar.service';
import {ProfileService} from '../shared/services/profile.service';
import {FormService} from '../shared/services/form.service';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
  selector: 'app-add-users-to-categories',
  templateUrl: './add-users-to-categories.component.html',
  styleUrls: ['./add-users-to-categories.component.scss']
})
export class AddUsersToCategoriesComponent implements OnInit {

  categories;

  validationMessagesUsersCategoryForm = {
    'categories': {
      'required': `Обов'язкове поле`
    },
    'users': {
      'required': `Обов'язкове поле`
    }
  };

  formErrorsUsersCategoryForm = {
    'categories': '',
    'users': ''
  };

  groups;
  users;
  usersCategoryForm: FormGroup;

  constructor(private categoriesService: CategoriesService,
              private messageService: SnackbarService,
              private profileService: ProfileService,
              private formBuilder: FormBuilder,
              private formService: FormService) {
  }

  ngOnInit() {
    this.initForm();
    this.getCategories();
    this.getUsers();
  }


  initForm() {
    this.usersCategoryForm = this.formBuilder.group({
      categories: ['', [
        Validators.required
      ]],
      users: ['', [
        Validators.required
      ]],
      canRead: [true],
      canWrite: [false],
      canChangeAccess: [false]
    });

    this.usersCategoryForm.valueChanges
      .subscribe(() => {
        this.formService.onValueChanged(this.usersCategoryForm, this.formErrorsUsersCategoryForm, this.validationMessagesUsersCategoryForm);
      });
  }

  getCategories() {
    this.categoriesService.getCategories()
      .subscribe(data => {
        this.categories = data;
      });
  }

  getUsers() {
    this.profileService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  submit() {
    if (this.usersCategoryForm.valid) {
      this.categoriesService.addUsersToCategory(this.usersCategoryForm.value.categories, this.loadObj())
        .subscribe(() => {
          this.messageService.showSnackBar({
            message: 'Успішно',
            isError: false
          });
          this.initForm();
        }, () => {
          this.messageService.showSnackBar({
            message: 'Помилка',
            isError: true
          });
        });
    } else {
      this.messageService.showSnackBar({
        message: 'Заповніть форму',
        isError: true
      });
    }
  }

  loadObj() {
    return this.usersCategoryForm.value.users.map(user => {
      return {
        canChangeAccess: this.usersCategoryForm.value.canChangeAccess,
        canRead: this.usersCategoryForm.value.canRead,
        canWrite: this.usersCategoryForm.value.canWrite,
        userId: user
      };
    });
  }

}
