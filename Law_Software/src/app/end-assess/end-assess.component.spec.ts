import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndAssessComponent } from './end-assess.component';

describe('EndAssessComponent', () => {
  let component: EndAssessComponent;
  let fixture: ComponentFixture<EndAssessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndAssessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
