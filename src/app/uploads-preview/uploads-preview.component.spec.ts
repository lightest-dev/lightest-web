import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsPreviewComponent } from './uploads-preview.component';

describe('UploadsPreviewComponent', () => {
  let component: UploadsPreviewComponent;
  let fixture: ComponentFixture<UploadsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
