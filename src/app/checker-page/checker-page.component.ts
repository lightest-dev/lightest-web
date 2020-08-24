import { Component, OnInit } from '@angular/core';
import {Message} from '../shared/models/Message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {CheckerShort} from '../shared/models/CheckerShort';
import {CheckerService} from '../shared/services/checker.service';
import {SnackbarService} from '../shared/services/snackbar.service';
import {FormService} from '../shared/services/form.service';

@Component({
  selector: 'app-checker-page',
  templateUrl: './checker-page.component.html',
  styleUrls: ['./checker-page.component.scss']
})
export class CheckerPageComponent implements OnInit {

  id?: string;
  isEdit: boolean;
  message: Message = {message: '', isError: false};
  checkerForm: FormGroup;
  formErrors = {
    'checkerName': '',
    'checkerCode': ''
  };
  validationMessages = {
    'checkerName': {
      'required': `Обов'язкове поле`
    },
    'checkerCode': {
      'required': `Обов'язкове поле`
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private checkerService: CheckerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public snackBar: SnackbarService,
    private formService: FormService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.checkerService.getChecker(this.id).subscribe((checker) => {
        this.checkerForm.patchValue({
          'checkerName':  checker.name,
          'checkerCode': checker.code,
        });
      });
    }

    this.initForm();
  }

  initForm() {
    this.checkerForm = this.formBuilder.group({
      checkerName: ['', [
        Validators.required
      ]],
      checkerCode: ['', [
        Validators.required
      ]],
    });

    this.checkerForm.valueChanges
      .subscribe(() => this.onValueChanged(this.checkerForm, this.formErrors, this.validationMessages));

  }

  submit() {
    const errorHandler = err => {
      console.error(err);
      this.message.isError = true;
      this.message.message = 'Помилка';
      this.openSnackBar(this.message);
    };

    const showMessage = () => {
      this.message.isError = false;
      this.message.message = 'Успішно';
      this.openSnackBar(this.message);
    };

    const checker = this.loadObject(this.checkerForm.value);

    if (this.isEdit) {
      this.checkerService.changeChecker(checker.id, checker)
        .subscribe(showMessage, errorHandler);
    } else {
      this.checkerService.addChecker(checker)
        .subscribe(data => {
          showMessage();
          this.router.navigate([`checkers/edit/${data.id}`]);
        }, errorHandler);
    }
  }

  loadObject(currentChecker) {
    const checker: CheckerShort = {
      id: this.id,
      name: currentChecker.checkerName,
      code: currentChecker.checkerCode,
    };
    return checker;
  }

  onValueChanged(form, errorForm, validationMessages) {
    this.formService.onValueChanged(form, errorForm, validationMessages);
  }

  openSnackBar(message: Message) {
    this.snackBar.showSnackBar(message);
  }

}
