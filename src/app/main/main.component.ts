import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  links: object[] = [
    { path: '/login', label: 'Вхід', active: 'button-active', icon: 'home'},
    { path: '/registration', label: 'Реєстрація', active: 'button-active', icon: 'video_library'}
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
