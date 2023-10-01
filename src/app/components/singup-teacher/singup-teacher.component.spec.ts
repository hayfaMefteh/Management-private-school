import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupTeacherComponent } from './singup-teacher.component';

describe('SingupTeacherComponent', () => {
  let component: SingupTeacherComponent;
  let fixture: ComponentFixture<SingupTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingupTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingupTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
