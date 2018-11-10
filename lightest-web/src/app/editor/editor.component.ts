import { Component, OnInit, ViewChild } from '@angular/core';
import {EditorService} from '../shared/services/editor.service';
import {Language} from '../api/models/language';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  options;
  languages;
  theme;
  code = `/* write your code here*/ `;
  constructor(public editorService: EditorService) { }

  ngOnInit() {
    this.initTheme();
    this.initLanguages();
    //this.loadEditorOptions(this.theme[0], this.languages[0]);
  }

  initLanguages () {
    this.editorService.getLanguages().subscribe(data => {
      this.languages = data;
    }, error => console.log(error));
  }


  initTheme() {
    this.theme = this.editorService.getThemes();
  }

  loadEditorOptions(theme: string, language: string) {
    this.options = {
      theme: theme,
      language: language
    };
  }

}
