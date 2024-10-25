import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/service/application.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.scss']
})
export class DateSelectionComponent {
  @Output() next = new EventEmitter();

  todayDate: any = this.formateDate(new Date());
  loader:boolean=false;

  roomModalConfig: any = [{
    room: 1,
    adult: 1,
    children: 0
  }];

  showRoomModal: boolean = false;
  selectDays: any = '';
  totalRoomAdultChild: any = { adult: 1, children: 0, room: 1 };
  checkIn: any = '';
  checkOut: any = '';
  diffBetweenDays: number = 0;

  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  clickedDays: number = 0;
  startDate: Date | null = null;
  endDate: Date | null = null;
  monthNames: string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  dayNames: string[] = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  bookedDates: string[][] = [];
  selectedDates: any[] = [];
  calendarDays: { date: number, class: string, isDatePassed: boolean }[] = [];

  constructor(private service: ApplicationService, private fb: FormBuilder,private alert:AlertService) {
  }

  ngOnInit() {
    
    this.displayCalendar();
  }


  updateGuests(type: any, change: any, config: any) {
    if (type === 'adults') {
      config.adult = config.adult + change;
    } else if (type === 'children') {
      config.children = config.children + change;
    }
    this.calcTotalAdultChildRoom();
  }

  addMoreRoomConfig() {
    let roomConfigObj: any = {
      adult: 0,
      children: 0,
      room: this.roomModalConfig.length - 1
    };
    this.roomModalConfig.push(roomConfigObj);

    this.calcTotalAdultChildRoom();
  }

  toggleDay(value: any, days: any) {
    this.selectDays = value;
    let checkInDate: any = this.formateDate(new Date());
    const threeDaysLater = new Date(checkInDate);
    threeDaysLater.setDate(threeDaysLater.getDate() + days);
    let checkOutDate: any = this.formateDate(threeDaysLater);
    this.checkIn = checkInDate;
    this.checkOut = checkOutDate;
    this.differenceDays();
    this.fetchRooms(checkInDate, checkOutDate);
  }

  differenceDays() {
    const date1: any = new Date(this.checkIn);
    const date2: any = new Date(this.checkOut);
    const diffTime: any = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    this.diffBetweenDays = diffDays;
    console.log(this.diffBetweenDays);
  }

  fetchRooms(checkInDate: any, checkOutDate: any) {
    let params: any = {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults: this.totalRoomAdultChild.adult,
      childs: this.totalRoomAdultChild.children,
      rooms: this.totalRoomAdultChild.room
    };

    this.service.fetchDefaultPropertyRooms(params, (res: any) => {
      if (res.status == 200) {
        localStorage.setItem("hotels", JSON.stringify(res.responseData.property_data));
        localStorage.setItem("rooms", JSON.stringify(res.responseData.displayData));
      }
    })

  }

  emitToParent() {
    this.searchRoom();
    localStorage.setItem("bookingConfig", JSON.stringify({
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      diffBetweenDays: this.diffBetweenDays,
      days:this.diffBetweenDays,
      adult: this.totalRoomAdultChild.adult,
      child: this.totalRoomAdultChild.children,
      rooms: this.totalRoomAdultChild.room
    }));
  }

  deleteExtraRoom(idx: any) {
    this.roomModalConfig.splice(idx, 1);
    this.calcTotalAdultChildRoom();

  }

  resetTotal() {
    this.totalRoomAdultChild = { adult: 0, children: 0, room: this.roomModalConfig.length };
  }

  calcTotalAdultChildRoom() {
    this.resetTotal();
    this.roomModalConfig.forEach((e: any) => {
      this.totalRoomAdultChild.adult = this.totalRoomAdultChild.adult + e.adult;
      this.totalRoomAdultChild.children = this.totalRoomAdultChild.children + e.children;
    });
  }

  getConfigValue() {
    return this.roomModalConfig.map((e: any) => { return { adult: e.adult, child: e.children } });
  }


  displayCalendar() {
    const days = this.daysInMonth(this.currentMonth + 1);
    const firstDayOffset = this.firstDayOffset(new Date(this.currentYear, this.currentMonth, 1));

    this.calendarDays = [];

    for (let i = 1; i < firstDayOffset; i++) {
      this.calendarDays.push({ date: 0, class: '', isDatePassed: false });
    }

    for (let i = 1; i <= days; i++) {
      const day = new Date(this.currentYear, this.currentMonth, i).getDay();
      const dateString = `${this.dayNames[day]}-${i}-${this.monthNames[this.currentMonth]}-${this.currentYear}`;
      let className = 'month-selector clickable';

      if (this.isDateSelected(dateString)) {
        className += ' clicked';
      }

      this.calendarDays.push({ date: i, class: className, isDatePassed: this.isDatePassed(dateString) });
    }
  }

  daysInMonth(month: number): number {
    return new Date(this.currentYear, month, 0).getDate();
  }

  firstDayOffset(date: Date): number {
    return date.getDay();
  }

  isDateBooked(dateString: string): boolean {
    return this.bookedDates.some(dates => dates.includes(dateString));
  }

  isDateSelected(dateString: any): boolean {
    return this.selectedDates.includes(dateString);
  }

  isDatePassed(date: any): boolean {
    const inputDate = new Date(date);
    const currentDate = new Date();
    return inputDate < currentDate;
  }

  monthClick(day: number) {
    console.log(232);

    if (day === 0) return;

    this.clickedDays += 1;

    if (this.clickedDays === 1) {
      this.startDate = new Date(this.currentYear, this.currentMonth, day);
      this.checkIn = this.formateDate(this.startDate);
      this.selectedDates.push(this.formatDate(this.startDate));
    } else {
      this.endDate = new Date(this.currentYear, this.currentMonth, day);
      this.checkOut = this.formateDate(this.endDate);
    }

    if (this.endDate && this.startDate && this.endDate > this.startDate) {
      this.selectedDates = this.getDates(this.startDate, this.endDate);

    }
    this.differenceDays();
    this.displayCalendar();
  }

  getDates(startDate: Date, stopDate: Date): string[] {
    const dateArray: string[] = [];
    let currentDate = new Date(startDate);
    while (currentDate <= stopDate) {
      dateArray.push(this.formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  formateDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  formatDate(date: Date): string {
    return `${this.dayNames[date.getDay()]}-${date.getDate()}-${this.monthNames[date.getMonth()]}-${date.getFullYear()}`;
  }

  clearCalendar() {
    this.clickedDays = 0;
    this.startDate = null;
    this.endDate = null;
    this.selectedDates = [];
    this.displayCalendar();
  }

  previousMonth() {
    if (this.currentMonth > 0) {
      this.currentMonth -= 1;
    } else {
      this.currentMonth = 11;
      this.currentYear -= 1;
    }
    this.displayCalendar();
  }

  nextMonth() {
    if (this.currentMonth < 11) {
      this.currentMonth += 1;
    } else {
      this.currentMonth = 0;
      this.currentYear += 1;
    }
    this.displayCalendar();
  }

  searchRoom() {
    this.loader=true;
    let params: any = {
      "property_id": 18,
      "start_date": this.checkIn,
      "end_date": this.checkOut,
      "available": 1,
      "customer_data":this.getConfigValue()
    }
    
    this.service.fetchRoomBySearch(params,(res:any)=>{
      if(res.status == 200){
        this.loader=false;
        this.alert.alert("success",res.message,"Success",{displayDuration:1000,pos:'top'});
        localStorage.setItem("hotels", JSON.stringify(res.responseData.property_data));
        localStorage.setItem("rooms", JSON.stringify(res.responseData.responseData));
        this.next.emit(2);
        
      }else{
        this.loader=false;
        this.alert.alert("trash","No Rooms Found","Success",{displayDuration:1000,pos:'top'});
      }
    });
  }

}
