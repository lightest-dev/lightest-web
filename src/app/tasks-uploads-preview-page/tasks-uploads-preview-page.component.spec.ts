import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksUploadsPreviewPageComponent } from './tasks-uploads-preview-page.component';

describe('TasksUploadsPreviewPageComponent', () => {
  let component: TasksUploadsPreviewPageComponent;
  let fixture: ComponentFixture<TasksUploadsPreviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksUploadsPreviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksUploadsPreviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
