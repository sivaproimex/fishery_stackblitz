import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController,MenuController } from '@ionic/angular';
//import { CartPage } from '../cart/cart.page';  

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  timeInSeconds;
  remainingTime;
  time ;
  runTimer;
  hasStarted;
  hasFinished;
   displayTime ;
 
  constructor(private route: Router, private modalController: ModalController,public menuCtrl: MenuController) { }

slideOpts = {
effect: 'flip',
autoplay: {
delay: 2000
}
};
slideOpt = {
effect: 'flip',
autoplay: {
delay: 3000
}
};

      toggleMenu() {
        this.menuCtrl.enable(true, 'custom');
    this.menuCtrl.open('custom');
   // this.menuCtrl.toggle(); //Add this method to your button click function
  }
  ngOnInit() {
   this.initTimer(); this. startTimer();

  }


  initTimer() {
     // Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) { 
      this.timeInSeconds = 150000; 
    }
  
    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;
    
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }
  
  startTimer() {
     this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }
  
  pauseTimer() {
    this.runTimer = false;
  }
  
  resumeTimer() {
    this.startTimer();
  }
  
  timerTick() {
    setTimeout(() => {
  
      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
      }
    }, 1000);
  }
  
  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }


  category() {
    this.route.navigate(['./item-list']);
  } 
 search() {
    this.route.navigate(['./search']);
  }
/*  cart(){
    this.modalController.create({component:CartPage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  } */
}
