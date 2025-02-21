import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessAdministrativePageComponent } from './assess-administrative-page.component';

describe('AssessAdministrativePageComponent', () => {
  let component: AssessAdministrativePageComponent;
  let fixture: ComponentFixture<AssessAdministrativePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessAdministrativePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessAdministrativePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
