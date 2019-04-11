import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersToCategoriesComponent } from './add-users-to-categories.component';

describe('AddUsersToCategoriesComponent', () => {
  let component: AddUsersToCategoriesComponent;
  let fixture: ComponentFixture<AddUsersToCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersToCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersToCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
