import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyeraccessComponent } from './lawyeraccess.component';

describe('LawyeraccessComponent', () => {
  let component: LawyeraccessComponent;
  let fixture: ComponentFixture<LawyeraccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawyeraccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawyeraccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
