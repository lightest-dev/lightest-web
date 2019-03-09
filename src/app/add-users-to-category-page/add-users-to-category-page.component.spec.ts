import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersToCategoryPageComponent } from './add-users-to-category-page.component';

describe('AddUsersToCategoryPageComponent', () => {
  let component: AddUsersToCategoryPageComponent;
  let fixture: ComponentFixture<AddUsersToCategoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersToCategoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersToCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
