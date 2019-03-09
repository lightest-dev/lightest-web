import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersToCategoryFormComponent } from './users-to-category-form.component';

describe('UsersToCategoryFormComponent', () => {
  let component: UsersToCategoryFormComponent;
  let fixture: ComponentFixture<UsersToCategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersToCategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersToCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
