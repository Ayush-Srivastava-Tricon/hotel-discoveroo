import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateSelectionRoutingModule } from './date-selection-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateSelectionComponent } from './date-selection.component';
import { SidePricingInfoModule } from 'src/app/shared/side-pricing-info/side-pricing-info.module';


@NgModule({
  declarations: [DateSelectionComponent],
  imports: [
    CommonModule,
    DateSelectionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SidePricingInfoModule
  ],
  exports:[DateSelectionComponent]
})
export class DateSelectionModule { }
