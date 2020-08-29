import { Component, OnInit } from '@angular/core';
import {Message} from '../shared/models/Message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {CategoriesService} from '../shared/services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {GroupService} from '../shared/services/group.service';
import {Category} from '../shared/models/Category';
import {MessageComponent} from '../message/message.component';
import {GroupShort} from '../shared/models/GroupShort';
import {SnackbarService} from '../shared/services/snackbar.service';
import {FormService} from '../shared/services/form.service';
import { Group } from '../shared/models/Group';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {

  group: Group;
  isEdit: Boolean;
  id?: string;
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
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    public snackBar: SnackbarService,
    private formService: FormService,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.groupService.getGroup(this.id).subscribe((group) => {
        this.group = group;
        this.groupForm.patchValue({
          'groupName':  group.name,
          'publicGroup': group.public
        });
      });
    }

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

    const group = this.loadObject(this.groupForm.value);

    if (this.isEdit) {
      this.groupService.changeGroupInfo(group.id, group)
        .subscribe(showMessage, errorHandler);
    } else {
      this.groupService.addGroup(group)
        .subscribe(data => {
          if(data) {
            showMessage();
            this.router.navigate([`groups/edit/${data.id}`]);
          }
        }, errorHandler);
    }
  }

  onValueChanged(form, errorForm, validationMessages) {
    this.formService.onValueChanged(form, errorForm, validationMessages);
  }

  loadObject(currentGroup) {
    const group: GroupShort = {
      id: this.id,
      name: currentGroup.groupName,
      public: currentGroup.publicGroup,
      parentId: this.group?.parent?.id
    };
    return group;
  }

  openSnackBar(message: Message) {
    this.snackBar.showSnackBar(message);
  }
}
