import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioAssessmentComponent } from './scenario-assessment.component';

describe('ScenarioAssessmentComponent', () => {
  let component: ScenarioAssessmentComponent;
  let fixture: ComponentFixture<ScenarioAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScenarioAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
