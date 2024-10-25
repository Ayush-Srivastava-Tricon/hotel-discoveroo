import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }


  fetchDefaultPropertyRooms(params: any, callback: any) {
    const url: any = `https://www.e2xinfotech.com/hotelapi/roomsForReservation/filterReservationByAdultsChkInChkOut?property_id=18&start_date=${params.checkIn}&end_date=${params.checkOut}&total_adults=${params.adults}&total_childs=${params.childs}&available=${params.rooms}`
    this.getData({},url,callback);
  }

  fetchRoomBySearch(params:any,callback:any){
    this.postData(params,this.httpUrls['filterRoom']+'/filterReservationByAdultsChkInChkOut',callback)
  }

  createReservation(params:any,callback:any){
    this.postData(params,this.httpUrls['createReservation'],callback);
  }
}
