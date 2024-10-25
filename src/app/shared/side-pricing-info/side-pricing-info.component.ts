import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-pricing-info',
  templateUrl: './side-pricing-info.component.html',
  styleUrls: ['./side-pricing-info.component.scss']
})
export class SidePricingInfoComponent {

  @Input() roomConfig:any={};

  hotelDetail:any={};

  constructor(){
    
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * On component initialization, gets the bookingConfig from localStorage and assigns it to roomConfig
   */
/******  9ca99e76-7b43-446f-8060-d8a8735d3888  *******/  }


  ngOnInit(){
    this.roomConfig = JSON.parse(<any>localStorage.getItem("bookingConfig"));
    this.hotelDetail = JSON.parse(<any>localStorage.getItem("hotels"));
  }

}
