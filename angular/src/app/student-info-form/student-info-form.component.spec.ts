import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoFormComponent } from './student-info-form.component';

describe('StudentInfoFormComponent', () => {
  let component: StudentInfoFormComponent;
  let fixture: ComponentFixture<StudentInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
