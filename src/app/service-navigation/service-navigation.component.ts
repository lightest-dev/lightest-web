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
      link: 'account/table/users'
    },
    {
      name: 'Завдання',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'format_list_numbered',
      link: 'account/table/tasks'
    },
    {
      name: 'Програми перевірки',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'how_to_vote',
      link: 'account/table/checkers'
    },
    {
      name: 'Тести',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'check_box',
      link: 'account/table/tasks'
    },
    {
      name: 'Групи',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'group',
      link: 'account/table/groups'
    },
    {
      name: 'Категорї',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'category',
      link: 'account/table/categories'
    },
    {
      name: 'Додати категорію',
      tooltip: 'Створити',
      description: '',
      icon: 'category',
      link: 'account/add-category'
    },
    {
      name: 'Додати групу',
      tooltip: 'Створити',
      description: '',
      icon: 'group_add',
      link: 'account/add-group'
    },
    {
      name: 'Додати завдання',
      tooltip: 'Створити',
      description: '',
      icon: 'playlist_add',
      link: 'account/add-task'
    },
    {
      name: 'Додати тест',
      tooltip: 'Створити',
      description: '',
      icon: 'check_box',
      link: 'tests/add'
    },
    {
      name: 'Додати програму перевірки',
      tooltip: 'Створити',
      description: '',
      icon: 'how_to_vote',
      link: 'account/add-checker'
    },
    {
      name: 'Додати мову',
      tooltip: 'Створити',
      description: '',
      icon: 'language',
      link: 'account/add-language'
    },
    {
      name: 'Додати завдання студентам',
      tooltip: 'Створити',
      description: '',
      icon: 'playlist_add',
      link: 'account/add-task-for-users'
    },
    {
      name: 'Додати студентів до груп',
      tooltip: 'Створити',
      description: '',
      icon: 'group_add',
      link: 'account/add-users-to-group'
    },
    {
      name: 'Додати студентів до курсів',
      tooltip: 'Створити',
      description: '',
      icon: 'category',
      link: 'account/add-users-to-categories'
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  linkTo(link) {
    this.router.navigate([link]);
  }

}
