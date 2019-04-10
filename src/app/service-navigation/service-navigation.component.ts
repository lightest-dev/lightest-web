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
      icon: 'group',
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
      icon: 'playlist_add_check',
      link: 'account/table/tasks'
    },
    {
      name: 'Групи',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'people_outline',
      link: 'account/table/groups'
    },
    {
      name: 'Категорї',
      tooltip: 'Переглянути список',
      description: '',
      icon: 'category',
      link: 'account/table/categories'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  linkTo(link) {
    this.router.navigate([link]);
  }

}
