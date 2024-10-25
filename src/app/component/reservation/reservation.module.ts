import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationComponent } from './reservation.component';
import { SidePricingInfoModule } from 'src/app/shared/side-pricing-info/side-pricing-info.module';


@NgModule({
  declarations: [ReservationComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SidePricingInfoModule
  ],
  exports:[ReservationComponent]
})
export class ReservationModule { }
