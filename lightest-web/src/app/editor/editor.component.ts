import { Component, OnInit, ViewChild } from '@angular/core';
import {EditorService} from '../shared/services/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  options;
  code = `/* write your code here*/ `;
  constructor(public editorService: EditorService) { }

  ngOnInit() {
    this.options = this.editorService.options;
    console.log(this.options);
  }

}
