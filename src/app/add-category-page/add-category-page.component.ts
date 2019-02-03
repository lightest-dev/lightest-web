import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TaskService} from '../shared/services/task.service';
import {CategoriesService} from '../shared/services/categories.service';
import {Category} from '../shared/models/Category';
import {MessageComponent} from '../message/message.component';
import {MatSnackBar} from '@angular/material';
import {Message} from '../shared/models/Message';

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
      public snackBar: MatSnackBar,
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

      this.$valueChange = this.categoryForm.valueChanges
          .subscribe(data => this.onValueChanged(data));

  }

  onValueChanged(data?: any) {
      if (!this.categoryForm) { return; }
      const form = this.categoryForm;
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

  loadObject(currentCategory) {
    const category: Category = {
        name: currentCategory.categoryName,
        public: currentCategory.publicCategory,
        parentId: ''
    };
    return category;
  }

    openSnackBar(message: Message) {
            this.snackBar.openFromComponent(MessageComponent, { data: message,
                panelClass: message.isError ? ['snackbar-error-message'] : ['snackbar-success-message'] } );
    }
}
