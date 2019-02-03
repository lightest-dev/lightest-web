import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestPageComponent } from './add-test-page.component';

describe('AddTestPageComponent', () => {
  let component: AddTestPageComponent;
  let fixture: ComponentFixture<AddTestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
