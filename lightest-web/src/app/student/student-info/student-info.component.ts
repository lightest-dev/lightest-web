import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  tabsForTasks = [
    {
      icon: 'list',
      tabName: 'Завдання'
    },
    {
      icon: 'done_all',
      tabName: 'Виконані'
    },
    {
      icon: 'notifications',
      tabName: 'Потрібно виконати'
    }
  ]; // get content from accountService (from studentComponent)

  tasks = [
    {
      name: 'Назва завдання',
      courseName: 'Назва курсу',
      icon: 'done',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
      'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      name: 'Назва завдання',
      courseName: 'Назва курсу',
      icon: 'done',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
      'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      name: 'Назва завдання',
      courseName: 'Назва курсу',
      icon: 'notifications',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
      'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      name: 'Назва завдання',
      courseName: 'Назва курсу',
      icon: 'done',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
      'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      name: 'Назва завдання',
      courseName: 'Назва курсу',
      icon: 'notifications',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
      'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
      'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
      'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ];

  constructor() {}

  ngOnInit() {
  }

}
