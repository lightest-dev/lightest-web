import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanguagePageComponent } from './add-language-page.component';

describe('AddLanguagePageComponent', () => {
  let component: AddLanguagePageComponent;
  let fixture: ComponentFixture<AddLanguagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLanguagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLanguagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
