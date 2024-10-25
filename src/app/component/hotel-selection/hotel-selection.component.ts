import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hotel-selection',
  templateUrl: './hotel-selection.component.html',
  styleUrls: ['./hotel-selection.component.scss']
})
export class HotelSelectionComponent {
  @Output() next = new EventEmitter();
  @Output() back = new EventEmitter();
  loader:boolean=false;

  hotels: any = [];
  dataRooms:any=[];

  selectedHotel: any = null;
  selectedHotelIdx: any = null;
  reservationConfig:any=[];
  bookingConfig:any={};

  ngOnInit(){
    this.loader=true;
    this.bookingConfig = JSON.parse(<any>localStorage.getItem("bookingConfig"));
    setTimeout(() => {
      this.hotels =  localStorage.getItem("hotels") != 'undefined' ? JSON.parse(<any>localStorage.getItem("hotels")) : null;
      this.dataRooms = localStorage.getItem("rooms") != 'undefined' ? JSON.parse(<any>localStorage.getItem("rooms")) : null;
      this.loader=false;
    }, 500);
    
  }

  hotelWithRoom(){
      this.hotels.forEach((e:any)=>{
          this.dataRooms.forEach((proom:any)=>{
            proom.rooms.forEach((room:any)=>{
                e['roomData'] = room;
            })
          })
      });
  }

  selectHotel(hotel: any, didx:any,pidx:any,ridx:any) {
    this.selectedHotel = hotel;
    this.selectedHotelIdx = didx;
    this.dataRooms[didx].rooms[pidx].rooms[ridx].selected = !this.dataRooms[didx].rooms[pidx].rooms[ridx].selected;
    
    if(this.reservationConfig.length>0){

      let isExist:any = this.reservationConfig.find((item:any)=>item.parentRoomId == this.dataRooms[didx].rooms[pidx].parentRoomId);

      if(isExist){
          this.dataRooms[didx].rooms[pidx].rooms[ridx].selected ? this.reservationConfig.push(isExist) : this.reservationConfig.splice(this.reservationConfig.indexOf(isExist),1);
      }else{
        this.reservationConfig.push({
          adult: this.dataRooms[didx].no_of_adults,
          child: this.dataRooms[didx].no_of_childs,
          parentRoomId: this.dataRooms[didx].rooms[pidx].parentRoomId,
          internal_room_id : this.dataRooms[didx].rooms[pidx].rooms[ridx].room_id,
          checkIn:this.bookingConfig.checkIn,
          checkOut:this.bookingConfig.checkOut,
          price:this.dataRooms[didx].rooms[pidx].rooms[ridx].default_price
        });
      }
    }else{
      this.reservationConfig.push({
        adult: this.dataRooms[didx].no_of_adults,
        child: this.dataRooms[didx].no_of_childs,
        parentRoomId: this.dataRooms[didx].rooms[pidx].parentRoomId,
        internal_room_id : this.dataRooms[didx].rooms[pidx].rooms[ridx].room_id,
        checkIn:this.bookingConfig.checkIn,
        checkOut:this.bookingConfig.checkOut,
        price:+this.dataRooms[didx].rooms[pidx].rooms[ridx].default_price
      });
    }

    localStorage.setItem("reservationConfig",JSON.stringify(this.reservationConfig));
    }

  onNext() {
    if (this.selectedHotel) {
      this.next.emit(3);
    }
  }

  onBack() {
    this.back.emit(2);
  }

}
