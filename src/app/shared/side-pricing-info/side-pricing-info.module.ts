import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePricingInfoComponent } from './side-pricing-info.component';



@NgModule({
  declarations: [SidePricingInfoComponent],
  imports: [
    CommonModule
  ],
  exports:[SidePricingInfoComponent]
})
export class SidePricingInfoModule { }
