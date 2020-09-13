import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {CategoriesService} from '../shared/services/categories.service';
import {Category} from '../shared/models/Category';
import {Message} from '../shared/models/Message';
import {SnackbarService} from '../shared/services/snackbar.service';
import {FormService} from '../shared/services/form.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  category: Category;
  isEdit: Boolean;
  id?: string;
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
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private categoryService: CategoriesService,
      public snackBar: SnackbarService,
      private formService: FormService,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.categoryService.getCategory(this.id).subscribe((category) => {
        this.category = category;
        this.categoryForm.patchValue({
          'categoryName':  category.name,
          'publicCategory': category.public
        });
      });
    }

    this.initForm();
  }

  submit() {
    const errorHandler = err => {
      console.log(err);
      this.message.isError = true;
      this.message.message = 'Помилка';
      this.openSnackBar(this.message);
    };

    const showMessage = () => {
      this.message.isError = false;
      this.message.message = 'Успішно';
      this.openSnackBar(this.message);
    };

    const category = this.loadObject(this.categoryForm.value);

    if (this.isEdit) {
      this.categoryService.putCategory(category.id, category)
        .subscribe(showMessage, errorHandler);
    } else {
      this.categoryService.addCategory(category)
        .subscribe(data => {
            if (data) {
              showMessage();
              this.router.navigate([`l/categories/edit/${data.id}`]);
            }
        }, errorHandler);
    }
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
      id: this.id,
      name: currentCategory.categoryName,
      public: currentCategory.publicCategory,
      parentId: this.category?.parentId
    };
    return category;
  }

    openSnackBar(message: Message) {
      this.snackBar.showSnackBar(message);
    }
}
