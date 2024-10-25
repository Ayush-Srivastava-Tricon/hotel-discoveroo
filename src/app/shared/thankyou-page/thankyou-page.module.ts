import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankyouPageRoutingModule } from './thankyou-page-routing.module';
import { ThankyouPageComponent } from './thankyou-page.component';


@NgModule({
  declarations: [ThankyouPageComponent],
  imports: [
    CommonModule,
    ThankyouPageRoutingModule
  ],
  exports: [ThankyouPageComponent]
})
export class ThankyouPageModule { }
