import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskToUsersFormComponent } from './task-to-users-form.component';

describe('TaskToUsersFormComponent', () => {
  let component: TaskToUsersFormComponent;
  let fixture: ComponentFixture<TaskToUsersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskToUsersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskToUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
