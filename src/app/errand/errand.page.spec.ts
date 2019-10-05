import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrandPage } from './errand.page';

describe('ErrandPage', () => {
  let component: ErrandPage;
  let fixture: ComponentFixture<ErrandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrandPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
