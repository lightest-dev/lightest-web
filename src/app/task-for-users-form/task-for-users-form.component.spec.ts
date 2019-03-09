import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForUsersFormComponent } from './task-for-users-form.component';

describe('TaskForUsersFormComponent', () => {
  let component: TaskForUsersFormComponent;
  let fixture: ComponentFixture<TaskForUsersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskForUsersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskForUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
