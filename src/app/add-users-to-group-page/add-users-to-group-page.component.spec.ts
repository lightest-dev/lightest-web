import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersToGroupPageComponent } from './add-users-to-group-page.component';

describe('AddUsersToGroupPageComponent', () => {
  let component: AddUsersToGroupPageComponent;
  let fixture: ComponentFixture<AddUsersToGroupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersToGroupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersToGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
