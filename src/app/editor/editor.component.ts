import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EditorService} from '../shared/services/editor.service';
import {UploadService} from '../shared/services/upload.service';
import {TaskSolution} from '../shared/models/TaskSolution';
import {LanguageService} from '../shared/services/language.service';
import {TaskService} from '../shared/services/task.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {UserChangeInfoDialogComponent} from '../user-change-info-dialog/user-change-info-dialog.component';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';
import {delay, first, map, pluck, repeat, timeout} from 'rxjs/operators';
import {SnackbarService} from '../shared/services/snackbar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../shared/services/group.service';
import {FormService} from '../shared/services/form.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {
  options;
  task;
  languages;

  uploadId: string;

  themes;
  code = `/* write your code here*/ `;
  activeLanguage = {name: 'cpp', id: ''};
  activeTheme = 'vs-dark';

  // TODO: move it server? (it is client-specific though)
  // Edit this map when adding new languages
  nameReplacement = {
    'c++' : 'cpp',
    'c' : 'cpp',
    'c#': 'csharp',
    'python3': 'python',
    'pas': 'pascal'
  }

  editorOptionsForm: FormGroup;
  formErrors = {
    'languages': ''
  };
  validationMessages = {
    'languages': {
      'required': `Обов'язкове поле`
    }
  };

  @ViewChild('sidenav') sidenav: ElementRef;
  @ViewChild('languageSelected') selectedLanguage: ElementRef;

  constructor(public  route: Router,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              public  editorService: EditorService,
              private uploadService: UploadService,
              private languageService: LanguageService,
              private taskService: TaskService,
              private messageService: SnackbarService,
              private formBuilder: FormBuilder,
              private formService: FormService) { }

  ngOnInit() {
    this.initTheme();
    this.initForm();

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.taskService.getTask(params.get('id')).subscribe(data => {
        this.task = data;
      }, error1 => {},
        () => {
          this.initLanguages();
          this.loadEditorOptions();
        });
    });
  }

  initForm() {
    this.editorOptionsForm = this.formBuilder.group({
      languages: ['', [
        Validators.required
      ]],
      theme: ['vs-dark', []]
    });

    this.editorOptionsForm.valueChanges
      .subscribe(() => this.formService.onValueChanged(this.editorOptionsForm, this.formErrors, this.validationMessages));
  }

  initLanguages () {
    this.languages = this.task.languages;
  }

  initTheme() {
    this.themes = this.editorService.getThemes();
  }

  loadEditorOptions() {
    const lowerCaseName = this.activeLanguage.name.toLowerCase();
    const linterName = this.nameReplacement[lowerCaseName] || lowerCaseName;

    this.options = {
      theme: this.activeTheme,
      language: linterName
    };
  }

  upload() {
    if (this.editorOptionsForm.valid) {
      this.uploadService.uploadTaskSolution(this.loadObjectForUpload())
        .subscribe(data => {
            this.uploadId = data;
            this.getResult();
          },
          error => {
            console.error(error);
          });
    }
  }

  getResult() {
    this.uploadService.getUploadStatus(this.uploadId)
      .subscribe(data => {
          this.openInfoDialog(data, 'Стан завдання', true);
      });
  }

  loadObjectForUpload() {
    return {
      code: this.code,
      taskId: this.task.id,
      languageId: this.activeLanguage.id
    };
  }

  themeOnChange(theme) {
    this.activeTheme = theme;
    this.loadEditorOptions();
  }

  languageOnChange(language) {
    this.activeLanguage = language;
    this.loadEditorOptions();
  }

  openInfoDialog(results, message, success) {
   this.dialog.open(InfoDialogComponent, {
      width: '450px',
      data: {
        points: results.points,
        messageFromServer: results.message,
        statusFromServer: results.status,
        message: message,
        success: success
      }
    });
  }

  openTaskDescription(func) {
    func.toggle();
  }
}
