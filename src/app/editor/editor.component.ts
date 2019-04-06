import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EditorService} from '../shared/services/editor.service';
import {UploadService} from '../shared/services/upload.service';
import {TaskSolution} from '../shared/models/TaskSolution';
import {LanguageService} from '../shared/services/language.service';
import {TaskService} from '../shared/services/task.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UserChangeInfoDialogComponent} from '../user-change-info-dialog/user-change-info-dialog.component';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';
import {delay, first, map, pluck, repeat, timeout} from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {
  options;
  task;
  languages;

  themes;
  code = `/* write your code here*/ `;
  activeLanguage = {name: 'cpp', id: ''};
  activeTheme = 'vs-dark';
  results;

  @ViewChild('sidenav') sidenav: ElementRef;

  constructor(public  route: Router,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              public  editorService: EditorService,
              private uploadService: UploadService,
              private languageService: LanguageService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.initTheme();

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

  initLanguages () {
    this.languages = this.task.languages;
  }

  initTheme() {
    this.themes = this.editorService.getThemes();
  }

  loadEditorOptions() {
    this.options = {
      theme: this.activeTheme,
      language: this.activeLanguage.name
    };
  }

  upload() {
    let uploadId;
    this.uploadService.uploadTaskSolution(this.loadObjectForUpload())
      .subscribe(data => {
        uploadId = data;
      }, error1 => {},
        () => {
          this.getResult();
        });
  }

  getResult() {
    this.uploadService.getTaskUploads(this.task.id)
      .subscribe(data => {
        if (data[0]['status'] === 'TESTING' || data[0]['status'] === 'NEW' || data[0]['status'] === 'QUEUE') {
          console.log('loading');
         this.getResult();
        } else  {
          console.log('bad');
          this.openInfoDialog(data[0], 'Помилка', 'Завдання шото там....', false);
        }
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

  openInfoDialog(results, message, status, success) {
   this.dialog.open(InfoDialogComponent, {
      width: '450px',
      panelClass: success ? ['success-upload'] : ['failed-upload'],
      data: {
        points: results.points,
        messageFromServer: results.message,
        statusFromServer: results.status,
        message: message,
        status: status,
        success: success
      }
    });
  }

  openTaskDescription(func) {
    func.toggle();

  }
}
