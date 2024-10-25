import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotel-discoveroo';
  currentStep = 1;
  hasBookingConfig:boolean=false;
  hasReservationConfig:boolean=false;

  constructor(){}

  ngOnInit(){
    if(!localStorage.getItem("currentStep")){
      this.updateCurrentStepIntoLocal()
        this.setActiveStep(this.currentStep);
    }else{
      let currentStep:any = JSON.parse(<any>localStorage.getItem("currentStep"));
       this.setActiveStep(currentStep);
    }

    this.hasBookingConfig = JSON.parse(<any>localStorage.getItem("bookingConfig")) ? true : false;
    this.hasReservationConfig = JSON.parse(<any> localStorage.getItem("reservationConfig")) ? true : false;
    console.log(this.hasBookingConfig,this.hasReservationConfig);
  }

  updateCurrentStepIntoLocal(){
    localStorage.setItem("currentStep",JSON.stringify(this.currentStep));
  }

  nextStep(event:any) {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.setActiveStep(event);
      this.updateCurrentStepIntoLocal();
    }
  }

  previousStep(event:any) {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.setActiveStep(event);
      this.updateCurrentStepIntoLocal();
    }
  }

   setActiveStep(stepNumber:any) {
    this.currentStep = stepNumber
    // Reset all steps and separators
    const steps = document.querySelectorAll('.step');
    const separators = document.querySelectorAll('.step-separator');

    steps.forEach(step => {
        step.classList.remove('completed', 'active');
    });
    separators.forEach(separator => {
        separator.classList.remove('completed');
    });

    // Mark all steps up to the clicked one as completed
    for (let i = 1; i <= stepNumber; i++) {
      let el:any =  document.querySelector(`.step[data-step="${i}"]`);
      el.classList.add(i < stepNumber ? 'completed' : 'active');
        if (i < stepNumber) {
          let ele:any = document.getElementById(`separator-${i}`);
          ele.classList.add('completed');
        }
    }
    this.updateCurrentStepIntoLocal()
}
}
