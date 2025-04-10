import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtOfficerComponent } from './court-officer.component';

describe('CourtOfficerComponent', () => {
  let component: CourtOfficerComponent;
  let fixture: ComponentFixture<CourtOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtOfficerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
