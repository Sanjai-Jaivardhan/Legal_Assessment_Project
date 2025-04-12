import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseMonitorDialogComponent } from './case-monitor-dialog.component';

describe('CaseMonitorDialogComponent', () => {
  let component: CaseMonitorDialogComponent;
  let fixture: ComponentFixture<CaseMonitorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseMonitorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseMonitorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
