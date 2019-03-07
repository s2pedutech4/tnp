import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStudentsComponent } from './company-students.component';

describe('CompanyStudentsComponent', () => {
  let component: CompanyStudentsComponent;
  let fixture: ComponentFixture<CompanyStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
