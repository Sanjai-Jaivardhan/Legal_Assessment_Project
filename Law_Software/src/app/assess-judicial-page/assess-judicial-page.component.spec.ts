import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessJudicialPageComponent } from './assess-judicial-page.component';

describe('AssessJudicialPageComponent', () => {
  let component: AssessJudicialPageComponent;
  let fixture: ComponentFixture<AssessJudicialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessJudicialPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessJudicialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
