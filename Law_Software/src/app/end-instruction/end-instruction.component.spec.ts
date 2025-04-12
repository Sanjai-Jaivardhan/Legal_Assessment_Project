import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndInstructionComponent } from './end-instruction.component';

describe('EndInstructionComponent', () => {
  let component: EndInstructionComponent;
  let fixture: ComponentFixture<EndInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndInstructionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
