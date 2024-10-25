import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/service/application.service';
import { AlertService } from 'src/app/shared/alert.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  @Output() back = new EventEmitter();

  guestConfig: any = [];
  reservationConfig: any = [];
  bookingConfig: any = {};
  paymentMode: any = '';
  loader: boolean = false;
  showModal: boolean = false;
  reservationNumber: any = '';
  guestDetail: any = [];
  constructor(private fb: FormBuilder, private service: ApplicationService, private alert: AlertService) {
  }

  ngOnInit() {
    this.reservationConfig = JSON.parse(<any>localStorage.getItem("reservationConfig"));
    this.bookingConfig = JSON.parse(<any>localStorage.getItem("bookingConfig"));
    let totalOccupancy = this.bookingConfig.adult + this.bookingConfig.child;

    this.reservationConfig.forEach((e: any) => {
      for (let i = 0; i < e.adult + e.child; i++) {
        this.guestDetail.push( {
          first_name: '',
          last_name: '',
          email: '',
          mobile: '',
          language: '',
          travel_agency: '',
          customer_type: 2
        });
      }
    });

    this.calcTotalPrice();

    console.log(this.reservationConfig);
  }

  onBack() {
    this.back.emit(1);
  }

  onSubmit() {
    this.loader = true;
    let params: any = {
      reservationData: {
        property_id: 18,
        total_adult: this.bookingConfig.adult,
        total_child: this.bookingConfig.child,
        total_baby: 0,
        total_room: this.reservationConfig.length,
        special_request: '',
        check_in: this.bookingConfig.checkIn,
        check_out: this.bookingConfig.checkOut,
        arrival_estimate_time: '',
        cancellation_date: '',
        created_by: '',
        colors: '',
        ota_details_id: '',
      },
        guestData: this.guestDetail,
        rooms: this.reservationConfig,
        payments: {
          payment_method_id: this.paymentMode,
          paid_amt: this.calcTotalPrice(),
          payment_date: '',
          received_by: ''
        }
      }
    this.reservationNumber = crypto.randomUUID();
    this.service.createReservation(params,(res:any)=>{
      if(res.status == 200){
        this.alert.alert("success",res.message,"Success",{displayDuration:1000,pos:'top'});
        this.onBack();
        localStorage.clear();
        this.alert.alert("success", "Reservation created successfully", "Success", { displayDuration: 1000, pos: 'top' });
        this.loader = false;
        localStorage.setItem("reservationSuccess", JSON.stringify(true));
        localStorage.setItem("reservationAllData",JSON.stringify(params));
        localStorage.setItem("reservationNumber",JSON.stringify(this.reservationNumber));
        window.location.href = "/thankyou";
      }else{
        this.loader = false;
        localStorage.clear();
        localStorage.setItem("reservationAllData",JSON.stringify(params));
        localStorage.setItem("reservationNumber",JSON.stringify(this.reservationNumber));
        localStorage.setItem("reservationSuccess", JSON.stringify(true));
        window.location.href = "/thankyou";
      }
    })

  }

  calcTotalPrice() {
    let total = 0;
    this.reservationConfig.forEach((e: any) => {
      total = total + (+e.price) * (+e.adult + +e.child);
    })
    this.bookingConfig['totalPrice'] = total;
    localStorage.setItem("bookingConfig", JSON.stringify(this.bookingConfig));
    return total;
  }

  closeModal() {
    this.showModal = false;
    this.onBack();
  }
}
