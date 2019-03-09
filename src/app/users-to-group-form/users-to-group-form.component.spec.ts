import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersToGroupFormComponent } from './users-to-group-form.component';

describe('UsersToGroupFormComponent', () => {
  let component: UsersToGroupFormComponent;
  let fixture: ComponentFixture<UsersToGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersToGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersToGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
