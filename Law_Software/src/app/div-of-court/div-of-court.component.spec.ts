import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivOfCourtComponent } from './div-of-court.component';

describe('DivOfCourtComponent', () => {
  let component: DivOfCourtComponent;
  let fixture: ComponentFixture<DivOfCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivOfCourtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DivOfCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
