import { Component, OnInit, ViewChild } from '@angular/core';
import {EditorService} from '../shared/services/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  options;
  language;
  theme;
  code = `/* write your code here*/ `;
  constructor(public editorService: EditorService) { }

  ngOnInit() {
    this.initLanguageType();
    this.initTheme();
    this.loadOption();
  }

  initLanguageType () {
    this.editorService.getLanguages().subscribe(data => {
     console.log(data);
    }, error => { console.log(error); });
  }

  initTheme() {
    this.theme = this.editorService.getDefaultTheme();
  }

  loadOption() {
    this.options = {
      theme: this.theme,
      language: this.language
    };
  }

}
