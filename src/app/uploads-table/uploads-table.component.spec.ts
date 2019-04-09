import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsTableComponent } from './uploads-table.component';

describe('UploadsTableComponent', () => {
  let component: UploadsTableComponent;
  let fixture: ComponentFixture<UploadsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
