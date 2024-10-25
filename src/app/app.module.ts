import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateSelectionModule } from './component/date-selection/date-selection.module';
import { ReservationModule } from './component/reservation/reservation.module';
import { HotelSelectionModule } from './component/hotel-selection/hotel-selection.module';
import {HttpClientModule} from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DateSelectionModule,
    ReservationModule,
    HotelSelectionModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
