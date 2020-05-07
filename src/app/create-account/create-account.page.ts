import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavController, MenuController, ToastController, AlertController, LoadingController} from '@ionic/angular';
import {AuthService} from '../api/auth.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

signupForm: FormGroup;
mobileNo: string;
submitted = false;
minDate: any = (new Date()).getFullYear() - 30;
maxData: any = (new Date()).getFullYear() + 1;

  constructor(
        private http: HttpClient,
        private route: Router,
        private fb: FormBuilder,
        public loadingCtrl: LoadingController,
        public authService: AuthService,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        public menuCtrl: MenuController,
        public actvRoute: ActivatedRoute,
    ) {

           this.signupForm = this.fb.group({
          full_name: [null, Validators.compose([
              Validators.required,
          ])],
          mobile_number: [null, Validators.compose([
              Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
          ])],
          email: [null, Validators.compose([
              Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
          ])]
      });
      this.actvRoute.params.subscribe((params) => {
          this.mobileNo = params.mobile;
          this.signupForm.get('mobile_number').setValue(params.mobile);
      });

     }

  ngOnInit() {
  }

   sign_in() {
    this.route.navigate(['./sign-in']);
  } 

    async dateChange($event) {
        const dateFull = $event.target.value;
        const date = dateFull.split('T');
        // this.paymentType = $event.target.value;
    }


    async gotVerification() {
        this.submitted = true;
        if (this.signupForm.invalid) {
            return;
        }
    }

    async inValidLogin() {
        const alert = await this.alertCtrl.create({
            header: 'Invalid Login!',
            message: 'Please Enter Valid Login Details.',
        });
        await alert.present();
    }

    skip() {
        this.route.navigate(['home']);
    }

    async resntOtp() {
        console.log('ResentOTP');
    }

    async onRegisterSubmit() {
        this.submitted = true;
        if (this.signupForm.invalid) {
            return;
        }
        const loader = await this.loadingCtrl.create();
        loader.present();
        const full_name = this.signupForm.value.full_name;
        const email     = this.signupForm.value.email;
        const mobile    = this.signupForm.value.mobile_number;

        this.authService.userRegister(full_name, email,mobile).subscribe(async res => {
            await this.loadingCtrl.dismiss();

            const toast = await this.toastCtrl.create({
                   // showCloseButton: true,
                    message: res.msg,
                    duration: 3000,
                    position: 'bottom'
                });

                toast.present();

            if (res.status) {
                
                this.route.navigate(['/sign-in']);
            } else { 
                this.navCtrl.navigateRoot(['./create-account', mobile]);
            }
            loader.present();
        }, error => {

            this.navCtrl.navigateRoot(['./create-account', mobile]);
        });
    }
}
