import { Component, OnInit, ViewChild } from '@angular/core';
import {EditorService} from '../shared/services/editor.service';
import {UploadService} from '../shared/services/upload.service';
import {TaskSolution} from '../shared/models/TaskSolution';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {
  options;
  languages;
  theme;
  code = `/* write your code here*/ `;
  constructor(public editorService: EditorService,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.initTheme();
    this.initLanguages();
  }

  initLanguages () {
    this.editorService.getLanguages().subscribe(data => {
      this.languages = data;
    }, error => console.log(error),
      () =>  this.loadEditorOptions(this.theme[0], this.languages[0].name));
  }


  initTheme() {
    this.theme = this.editorService.getThemes();
  }

  loadEditorOptions(theme: string, language: string) {
    this.options = {
      theme: theme.toLocaleLowerCase(),
      // language: language.toLocaleLowerCase()
      language: 'javascript'
    };
  }

  upload() {
    this.uploadService.uploadTaskSolution(this.loadObjectForUpload())
      .subscribe(data => {
        console.log(data);
      });
  }

  loadObjectForUpload() {
    const temp = this.editorService.getState();
    return {
      code: this.code,
      taskId: temp.taskId,
      languageId: temp.languages[0].id
    };
  }

}
