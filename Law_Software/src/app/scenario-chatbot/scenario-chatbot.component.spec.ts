import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioChatbotComponent } from './scenario-chatbot.component';

describe('ScenarioChatbotComponent', () => {
  let component: ScenarioChatbotComponent;
  let fixture: ComponentFixture<ScenarioChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioChatbotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScenarioChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
