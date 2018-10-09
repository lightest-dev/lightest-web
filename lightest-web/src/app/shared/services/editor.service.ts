import { Injectable, Inject } from '@angular/core';

@Injectable()
export class EditorService {
  options;
  languages = ['c++', 'python', 'pascal', 'c'];
  themes = ['vs-dark', 'hc-black'];

  constructor() {
    this.options = {
      theme: this.themes[0],
      language: this.languages[0]
    };
  }

  getLanguages () {
    return this.languages;
  }

  getThemes () {
    return this.themes;
  }


}
