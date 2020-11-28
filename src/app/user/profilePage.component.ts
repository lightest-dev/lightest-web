import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../shared/services/auth.service';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {User} from '../shared/models/User';
import { Location } from '@angular/common';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";

interface Node {
  name: string;
  link?: string;
  checkAccess?: boolean;
  children?: Node[];
}

const TREE_DATA: Node[] = [
  {
    name: 'Моя сторінка',
    link: 'account',
    checkAccess: false,
  },
  {
    name: 'Завдання',
    link: 'tasks/table',
    checkAccess: true,
    children: [
      {
        name: 'Створити завдання',
        link: 'tasks/add',
        checkAccess: true,
      },
      {
        name: 'Додати завдання студентам',
        link: 'add-task-for-users',
        checkAccess: true,
      },
      {
        name: 'Розв\'язки',
        link: 'tasks-uploads',
        checkAccess: true,
      },
    ]
  },
  {
    name: 'Курси',
    link: 'categories/table',
    checkAccess: true,
    children: [
      {
        name: 'Створити курс',
        link: 'categories/add',
        checkAccess: true,
      },
      {
        name: 'Додати студентів до курсів',
        link: 'add-users-to-categories',
        checkAccess: true,
      },
    ]
  },
  {
    name: 'Групи',
    link: 'groups/table',
    checkAccess: true,
    children: [
      {
        name: 'Створити групу',
        link: 'groups/add',
        checkAccess: true,
      },
      {
        name: 'Додати студентів до груп',
        link: 'add-users-to-group',
        checkAccess: true,
      }
    ]
  },
  {
    name: 'Програми перевірки',
    link: 'checkers/table',
    checkAccess: true,
    children: [
      {
        name: 'Створити програму перевірки',
        link: 'checkers/add',
        checkAccess: true,
      }
    ]
  },
  {
    name: 'Користувачі',
    link: 'table/users',
    checkAccess: true,
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  link: string;
  level: number;
}

@Component({
  selector: 'app-student',
  templateUrl: './profilePage.component.html',
  styleUrls: ['./profilePage.component.scss']
})

export class ProfilePageComponent implements OnInit {

  user = new User();
  mobileQuery: MediaQueryList;
  userRole;

  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link: node.link,
      checkAccess: node.checkAccess,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node?.level, node => node?.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node?.level, node => node?.expandable, node => node?.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  private TREE_DATA: Node[] = TREE_DATA;

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private routerLink: Router,
    public dialog: MatDialog,
    private location: Location
  ) {
    this.dataSource.data = this.TREE_DATA;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.checkAccess();
  }

  logout() {
    this.authService.logout().subscribe(() => {
        this.routerLink.navigate(['/login']);
      }, (err) => {
      console.log(err.status);
    });
  }

  stepBack() {
    this.location.back();
  }

  checkAccess() {
    if (this.authService.getUserInfo().isAdmin || this.authService.getUserInfo().isTeacher) {
     this.userRole = true;
    } else {
      this.userRole = false;
    }
  }
}
