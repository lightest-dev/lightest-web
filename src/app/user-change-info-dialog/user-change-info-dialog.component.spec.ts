import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangeInfoDialogComponent } from './user-change-info-dialog.component';

describe('UserChangeInfoDialogComponent', () => {
  let component: UserChangeInfoDialogComponent;
  let fixture: ComponentFixture<UserChangeInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangeInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangeInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
