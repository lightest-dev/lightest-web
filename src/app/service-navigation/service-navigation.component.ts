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
      name: 'Категорії',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'category',
      link: 'l/categories/table'
    },
    {
      name: 'Додати категорію',
      tooltip: 'Створити',
      description: '',
      icon: 'category',
      link: 'l/categories/add'
    },
    {
      name: 'Додати групу',
      tooltip: 'Створити',
      description: '',
      icon: 'group_add',
      link: 'l/groups/add'
    },
    {
      name: 'Додати завдання',
      tooltip: 'Створити',
      description: '',
      icon: 'playlist_add',
      link: 'l/tasks/add'
    },
    {
      name: 'Додати тест',
      tooltip: 'Створити',
      description: '',
      icon: 'check_box',
      link: 'l/tests/add'
    },
    {
      name: 'Додати програму перевірки',
      tooltip: 'Створити',
      description: '',
      icon: 'how_to_vote',
      link: 'l/checkers/add'
    },
    {
      name: 'Додати мову',
      tooltip: 'Створити',
      description: '',
      icon: 'language',
      link: 'l/languages/add'
    },
    {
      name: 'Додати завдання студентам',
      tooltip: 'Створити',
      description: '',
      icon: 'playlist_add',
      link: 'l/add-task-for-users'
    },
    {
      name: 'Додати студентів до груп',
      tooltip: 'Створити',
      description: '',
      icon: 'group_add',
      link: 'l/add-users-to-group'
    },
    {
      name: 'Додати студентів до курсів',
      tooltip: 'Створити',
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
