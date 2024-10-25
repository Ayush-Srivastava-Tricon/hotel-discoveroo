import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePricingInfoComponent } from './side-pricing-info.component';

describe('SidePricingInfoComponent', () => {
  let component: SidePricingInfoComponent;
  let fixture: ComponentFixture<SidePricingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidePricingInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePricingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
