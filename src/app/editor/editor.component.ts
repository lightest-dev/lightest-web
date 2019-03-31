import { Component, OnInit, ViewChild } from '@angular/core';
import {EditorService} from '../shared/services/editor.service';
import {UploadService} from '../shared/services/upload.service';
import {TaskSolution} from '../shared/models/TaskSolution';
import {LanguageService} from '../shared/services/language.service';
import {TaskService} from '../shared/services/task.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UserChangeInfoDialogComponent} from '../user-change-info-dialog/user-change-info-dialog.component';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';

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
          this.uploadService.getTaskUploads(this.task.id)
            .subscribe(data => {
              this.results = data;
              const lastResult = this.results.filter(result => {
                 if (result.id === uploadId) {
                   return result;
                 }
              });

              this.openInfoDialog(lastResult);
            });
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
    console.log(language);
    this.activeLanguage = language;
    this.loadEditorOptions();
  }

  openInfoDialog(results) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '375px',
      data: results,
    });
  }
}
