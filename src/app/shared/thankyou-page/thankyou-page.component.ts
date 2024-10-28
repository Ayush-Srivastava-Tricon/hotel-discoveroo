import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou-page',
  templateUrl: './thankyou-page.component.html',
  styleUrls: ['./thankyou-page.component.scss']
})
export class ThankyouPageComponent {

  reservationData: any = {};
  reservationNumber: any = '';

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.reservationData = JSON.parse(<any>localStorage.getItem("reservationAllData"));
    this.reservationNumber = JSON.parse(<any>localStorage.getItem("reservationNumber"));
  }

  goHome() {
    localStorage.clear()
    window.location.href= "/";
  }

}

