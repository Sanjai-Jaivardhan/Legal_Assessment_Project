import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtfilingsComponent } from './courtfilings.component';

describe('CourtfilingsComponent', () => {
  let component: CourtfilingsComponent;
  let fixture: ComponentFixture<CourtfilingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtfilingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtfilingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
