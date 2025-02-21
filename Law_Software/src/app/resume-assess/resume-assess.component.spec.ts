import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeAssessComponent } from './resume-assess.component';

describe('ResumeAssessComponent', () => {
  let component: ResumeAssessComponent;
  let fixture: ComponentFixture<ResumeAssessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeAssessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
