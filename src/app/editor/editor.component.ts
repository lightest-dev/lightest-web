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
    console.log('love sucks nahui suka tak');
    // this.uploadService.uploadTaskSolution(this.loadObjectForUpload());
    this.loadObjectForUpload();
  }

  loadObjectForUpload() {
    console.log(this.editorService.getState());
  }

}
