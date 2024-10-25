import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelSelectionRoutingModule } from './hotel-selection-routing.module';
import { HotelSelectionComponent } from './hotel-selection.component';
import { SidePricingInfoModule } from 'src/app/shared/side-pricing-info/side-pricing-info.module';


@NgModule({
  declarations: [HotelSelectionComponent],
  imports: [
    CommonModule,
    HotelSelectionRoutingModule,
    SidePricingInfoModule
  ],
  exports:[HotelSelectionComponent]
})
export class HotelSelectionModule { }
