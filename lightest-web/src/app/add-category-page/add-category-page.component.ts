import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TaskService} from '../shared/services/task.service';
import {CategoriesService} from '../shared/services/categories.service';
import {Category} from '../shared/models/Category';
import {MessageComponent} from '../message/message.component';
import {MatSnackBar} from '@angular/material';
import {Message} from '../shared/models/Message';
import {SnackbarService} from '../shared/services/snackbar.service';
import {FormService} from '../shared/services/form.service';

@Component({
  selector: 'app-add-category-page',
  templateUrl: './add-category-page.component.html',
  styleUrls: ['./add-category-page.component.scss']
})
export class AddCategoryPageComponent implements OnInit {

    $valueChange;
    message: Message = {message: '', isError: false};
    categoryForm: FormGroup;
    formErrors = {
        'categoryName': ''
    };
    validationMessages = {
        'categoryName': {
            'required': `Обов'язкове поле`
        }
    };

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private categoryService: CategoriesService,
      public snackBar: SnackbarService,
      private formService: FormService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  submit() {
    this.categoryService.addCategory(this.loadObject(this.categoryForm.value))
        .subscribe(data => {
            if (data) {
              this.categoryForm.reset();
              this.message.message = 'Успішно';
              this.message.isError = false;
              this.openSnackBar(this.message);
            }
        }, error => {
          console.log(error);
          this.message.message = 'Помилка';
          this.message.isError = true;
          this.openSnackBar(this.message);
        });
  }

  initForm() {
      this.categoryForm = this.formBuilder.group({
          categoryName: ['', [
              Validators.required
          ]],
          publicCategory: [true]
      });

      this.categoryForm.valueChanges
          .subscribe(() => this.onValueChanged(this.categoryForm, this.formErrors, this.validationMessages));

  }

  onValueChanged(form, errorForm, validationMessages) {
     this.formService.onValueChanged(form, errorForm, validationMessages);
  }

  loadObject(currentCategory) {
    const category: Category = {
        name: currentCategory.categoryName,
        public: currentCategory.publicCategory,
        parentId: ''
    };
    return category;
  }

    openSnackBar(message: Message) {
      this.snackBar.showSnackBar(message);
    }
}
