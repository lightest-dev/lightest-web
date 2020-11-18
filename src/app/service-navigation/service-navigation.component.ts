import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-service-navigation',
  templateUrl: './service-navigation.component.html',
  styleUrls: ['./service-navigation.component.scss']
})
export class ServiceNavigationComponent implements OnInit {

  cards = [
    {
      name: 'Користувачі',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'people_outline',
      link: 'l/table/users'
    },
    {
      name: 'Завдання',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'format_list_numbered',
      link: 'l/tasks/table'
    },
    {
      name: 'Програми перевірки',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'how_to_vote',
      link: 'l/checkers/table'
    },
    {
      name: 'Групи',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'group',
      link: 'l/groups/table'
    },
    {
      name: 'Курси',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'category',
      link: 'l/categories/table'
    },
    {
      name: 'Створити курс',
      tooltip: 'Створити',
      description: '',
      icon: 'category',
      link: 'l/categories/add'
    },
    {
      name: 'Створити групу',
      tooltip: 'Створити',
      description: '',
      icon: 'group_add',
      link: 'l/groups/add'
    },
    {
      name: 'Створити завдання',
      tooltip: 'Створити',
      description: '',
      icon: 'playlist_add',
      link: 'l/tasks/add'
    },
    {
      name: 'Створити тест',
      tooltip: 'Створити',
      description: '',
      icon: 'check_box',
      link: 'l/tests/add'
    },
    {
      name: 'Створити програму перевірки',
      tooltip: 'Створити',
      description: '',
      icon: 'how_to_vote',
      link: 'l/checkers/add'
    },
    {
      name: 'Додати завдання студентам',
      tooltip: 'Додати',
      description: '',
      icon: 'playlist_add',
      link: 'l/add-task-for-users'
    },
    {
      name: 'Додати студентів до груп',
      tooltip: 'Додати',
      description: '',
      icon: 'group_add',
      link: 'l/add-users-to-group'
    },
    {
      name: 'Додати студентів до курсів',
      tooltip: 'Додати',
      description: '',
      icon: 'category',
      link: 'l/add-users-to-categories'
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  linkTo(link) {
    this.router.navigate([link]);
  }

}
