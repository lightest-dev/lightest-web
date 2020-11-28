import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";

interface FoodNode {
  name: string;
  link: string;
  tooltip: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Завдання',
    tooltip: 'Переглянути список',
    link: 'l/tasks/table',
    children: [
      {
        name: 'Створити завдання',
        tooltip: 'Створити',
        link: 'l/tasks/add'
      },
      {
        name: 'Додати завдання студентам',
        tooltip: 'Додати',
        link: 'l/add-task-for-users'
      },
      {
        name: 'Розв\'язки',
        tooltip: 'Переглянути розв\'язки',
        link: 'l/tasks-uploads'
      },
    ]
  },
  {
    name: 'Курси',
    tooltip: 'Переглянути список курсів',
    link: 'l/categories/table',
    children: [
      {
        name: 'Створити курс',
        tooltip: 'Створити',
        link: 'l/categories/add'
      },
      {
        name: 'Додати студентів до курсів',
        tooltip: 'Додати',
        link: 'l/add-users-to-categories'
      },
    ]
  },
  {
    name: 'Групи',
    tooltip: 'Переглянути список',
    link: 'l/groups/table',
    children: [
      {
        name: 'Створити групу',
        tooltip: 'Створити',
        link: 'l/groups/add'
      },
      {
        name: 'Додати студентів до груп',
        tooltip: 'Додати',
        link: 'l/add-users-to-group'
      }
    ]
  },
  {
    name: 'Програми перевірки',
    tooltip: 'Переглянути список',
    link: 'l/checkers/table',
    children: [
      {
        name: 'Створити програму перевірки',
        tooltip: 'Створити',
        link: 'l/checkers/add'
      },
      {
        name: 'Створити тест',
        tooltip: 'Створити',
        link: 'l/tests/add'
      }
    ]
  },
  {
    name: 'Користувачі',
    tooltip: 'Переглянути список',
    link: 'l/table/users'
  }
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

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

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  private TREE_DATA: FoodNode[] = TREE_DATA;


  constructor(private router: Router) {
    this.dataSource.data = this.TREE_DATA;
  }

  ngOnInit() {
  }

  linkTo(link) {
    this.router.navigate([link]);
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
