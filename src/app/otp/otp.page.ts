import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavController, MenuController, ToastController, AlertController, LoadingController} from '@ionic/angular';
import {AuthService} from '../api/auth.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';


@Component({
    selector: 'app-otp',
    templateUrl: './otp.page.html',
    styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

    public obj = document.getElementById('partitioned');
    public inputFocus1: boolean;
    public inputFocus2: boolean;
    public inputFocus3: boolean;
    public inputFocus4: boolean;
    public otpInput1: any;
    public otpInput2: any;
    public otpInput3: any;
    public otpInput4: any;
    public phoneNumber: any;
    public errorMsg = false;
    public resendMsgToggle = false;
    otpForm: FormGroup;
    submitted = false;

    constructor(
        private route: Router,
        private menuCtrl: MenuController,
        public actvRoute: ActivatedRoute,
        public authService: AuthService,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        private fb: FormBuilder,
        public storage: Storage,
    ) {
        this.actvRoute.params.subscribe((params) => {
            this.phoneNumber = params.mobile;
        });
        this.inputFocus2 = true;
        this.otpForm = this.fb.group({
            otpInput1: ['', Validators.compose([
                Validators.required
            ])],
            otpInput2: ['', Validators.compose([
                Validators.required
            ])],
            otpInput3: ['', Validators.compose([
                Validators.required
            ])],
            otpInput4: ['', Validators.compose([
                Validators.required
            ])]
        });
    }

    ngOnInit() {
        // this.storage.get('auth-token').then(res => {
        //     if (res) {
        //         this.navCtrl.navigateRoot('/home');
        //     }
        // });
    }


    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    async verify() {
        const loader = await this.loadingCtrl.create({});
        loader.present();
        const otpInp1 = this.otpForm.get('otpInput1').value;
        const otpInp2 = this.otpForm.get('otpInput2').value;
        const otpInp3 = this.otpForm.get('otpInput3').value;
        const otpInp4 = this.otpForm.get('otpInput4').value;
        this.submitted = true;
        if (this.otpForm.invalid) {
            return;
        }
        this.otpForm.reset();
        const otp = otpInp1 + otpInp2 + otpInp3 + otpInp4;
        this.authService.otpVerify(this.phoneNumber, otp).subscribe(async res => {
            await this.loadingCtrl.dismiss();
            if (res.status) {  console.log(res);

                 const toast = await this.toastCtrl.create({
                   // showCloseButton: true,
                    message: res.msg,
                    duration: 3000,
                    position: 'bottom'
                });

                toast.present();

           this.storage.set('token', res.token);
                /*     let token = this.storage.get('token');

                token.then(data => {
                    this.navCtrl.navigateRoot('/home');

});*/
                this.navCtrl.navigateRoot('/home');
                /*
              this.storage.forEach(entry => {
      if (typeof entry !== 'boolean') {
        console.log(entry);
      }
    }).then(()=> console.log('for each is done'))*/
                /*this.storage.set('auth-token', 'Bearer '+token).then(() => {
                     this.navCtrl.navigateRoot('/home');
                });*/
               // this.output=this.storage.set('token', res.token);
              /*  this.authService.getUserDetail(userID).subscribe(result => {
                    this.createUser(result.data);
                    localStorage.setItem('first_name', result.data.first_name);
                    localStorage.setItem('last_name', result.data.last_name);
                    localStorage.setItem('profile', result.data.profile);
                    localStorage.setItem('userEmail', result.data.email);
                    localStorage.setItem('mobile', result.data.mobile_no);
                });*/
               
                // this.route.navigateByUrl('/home', { skipLocationChange: true });
            } else {

              const toast = await this.toastCtrl.create({
                   // showCloseButton: true,
                    message: res.msg,
                    duration: 3000,
                    position: 'bottom'
                });

                toast.present();


               // this.inValidLogin();
            }
        }, error => {
            console.log(error.toString());
        });
    }


    onchange(num) {
        if (num === 1) {
            this.inputFocus1 = false;
            this.inputFocus2 = true;
        } else if (num === 2) {
            this.inputFocus3 = true;
        } else if (num === 3) {
            this.inputFocus4 = true;
        } else {
            this.inputFocus1 = false;
            this.inputFocus2 = false;
            this.inputFocus3 = false;
            this.inputFocus4 = false;
        }

    }

      sign_in() {
    this.route.navigate(['./sign-in']);
  } 


    next(el, val) {
        const numberRegex = /^[0-9\s]*$/;
        const regexp = /^\S*$/;
        if (val === '1' && numberRegex.test(this.otpInput1) && regexp.test(this.otpInput1)) {
            el.setFocus();
        } else if (val === '2' && numberRegex.test(this.otpInput2) && regexp.test(this.otpInput2)) {
            el.setFocus();
        } else if (val === '3' && numberRegex.test(this.otpInput3) && regexp.test(this.otpInput3)) {
            el.setFocus();
        }
    }

    preview(el) {
        if (el === 'otp4') {
            el.setFocus();
        }
    }

    timerFunction(flag, fg) {
        const d1 = new Date();
        const d2 = new Date(d1);
        d2.setMinutes(d1.getMinutes() + 5);
        document.getElementById('timer' + fg).style.display = 'none';
        document.getElementById('timer' + flag).style.display = 'block';
        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = d2.getTime() - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById('timer' + flag).innerHTML = minutes + 'm ' + seconds + 's ';
            if (distance < 0) {
                clearInterval(x);
                document.getElementById('timer' + flag).innerHTML = 'EXPIRED';
            }
        }, 1000);

    }

   

    async inValidLogin() {
        this.errorMsg = true;
        setTimeout(() => this.errorMsg = false, 3000);
    }


}
