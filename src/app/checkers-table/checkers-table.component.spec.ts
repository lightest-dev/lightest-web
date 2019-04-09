import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckersTableComponent } from './checkers-table.component';

describe('CheckersTableComponent', () => {
  let component: CheckersTableComponent;
  let fixture: ComponentFixture<CheckersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
