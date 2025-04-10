import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawaccessComponent } from './lawaccess.component';

describe('LawaccessComponent', () => {
  let component: LawaccessComponent;
  let fixture: ComponentFixture<LawaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawaccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
