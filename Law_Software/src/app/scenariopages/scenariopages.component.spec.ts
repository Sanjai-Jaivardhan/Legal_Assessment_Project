import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariopagesComponent } from './scenariopages.component';

describe('ScenariopagesComponent', () => {
  let component: ScenariopagesComponent;
  let fixture: ComponentFixture<ScenariopagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenariopagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenariopagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
