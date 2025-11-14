import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentInfoFormComponent } from './parent-info-form.component';

describe('ParentInfoFormComponent', () => {
  let component: ParentInfoFormComponent;
  let fixture: ComponentFixture<ParentInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
