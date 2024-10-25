import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  httpUrls:any= {
    'filterRoom':'https://www.e2xinfotech.com/hotelapi/roomsForReservation',
      'createReservation' : 'https://www.e2xinfotech.com/hotelapi/roomsForReservation'
  }

  constructor(public http:HttpClient) { }


  getData(d:any,url:any,callback:any){
    return this.http.get(url).subscribe((data:any)=>{callback(data)},(error:any)=>callback(error));
  }

  postData(d:any,url:any,callback:any){
    return this.http.post(url,d).subscribe((data:any)=>{callback(data)},(error:any)=>callback(error));
  }

}
