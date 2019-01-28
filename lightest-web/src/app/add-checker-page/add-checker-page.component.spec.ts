import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckerPageComponent } from './add-checker-page.component';

describe('AddCheckerPageComponent', () => {
  let component: AddCheckerPageComponent;
  let fixture: ComponentFixture<AddCheckerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCheckerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCheckerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
