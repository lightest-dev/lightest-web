import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskToUsersPageComponent } from './add-task-to-users-page.component';

describe('AddTaskToUsersPageComponent', () => {
  let component: AddTaskToUsersPageComponent;
  let fixture: ComponentFixture<AddTaskToUsersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskToUsersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskToUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
