import { Component, OnInit, ViewChild } from '@angular/core';
import {EditorService} from '../shared/services/editor.service';

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
  constructor(public editorService: EditorService) { }

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

}
