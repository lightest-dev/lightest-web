import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToRoleDialogComponent } from './add-to-role-dialog.component';

describe('AddToRoleDialogComponent', () => {
  let component: AddToRoleDialogComponent;
  let fixture: ComponentFixture<AddToRoleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToRoleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
