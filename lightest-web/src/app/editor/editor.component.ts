import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  options = {
    theme: 'vs-dark',
    language: 'java'
  };
  code = `function hello() {
	 alert('Hello world!');
  }`;
  constructor() { }

  ngOnInit() {}

}
