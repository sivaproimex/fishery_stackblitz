import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavController, MenuController, ToastController, AlertController, LoadingController} from '@ionic/angular';
import {AuthService} from '../api/auth.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

    public onLoginForm: FormGroup;
    showCloseButton;
    submitted = false;

  constructor(
        private navCtrl: NavController,
        public loadingCtrl: LoadingController,
         public toastCtrl: ToastController,
        private formBuilder: FormBuilder,
        private route: Router,
        public actvRoute: ActivatedRoute,
        public authService: AuthService,
        public storage: Storage,
     ) { 

               /* this.storage.get('token').then(res => {
                 if (res) {
                     this.navCtrl.navigateRoot('/home');
                 } else {
                    this.navCtrl.navigateRoot('/sign-in');
                 }
             });*/
/*      this.actvRoute.params.subscribe((params) => {
           if(params.signout == 'signout'){
             this.storage.clear();
           }
        });*/
  }

  ngOnInit() {

            this.onLoginForm = this.formBuilder.group({
               'mobile': ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
        });

  }



    async clickSubmit(mobile) {
        // this.navCtrl.navigateRoot('/home-results');
        this.submitted = true;
        if (this.onLoginForm.invalid) {
            return;
        }
        const loader = await this.loadingCtrl.create({});
        loader.present();
        this.authService.userLogin(mobile).subscribe(async res => {
            await this.loadingCtrl.dismiss();
            if (res.status) { //console.log(res.msg);
                const toast = await this.toastCtrl.create({
                   // showCloseButton: true,
                    message: res.msg,
                    duration: 3000,
                    position: 'bottom'
                });

                toast.present();
                this.navCtrl.navigateRoot(['./otp', res.mobile_number]);
              /*  localStorage.setItem('admin_id', res.user_data.admin_id);
                const adminID = localStorage.getItem('admin_id');*/

              /*  this.storage.set('auth-token', 'Bearer 1234567').then(() => {
                });*/
                // this.navCtrl.navigateRoot(['/otp', res.mobile_number]);
             //   this.navCtrl.navigateRoot('/home-results');
            } else  {
                const toast = await this.toastCtrl.create({
                  //  showCloseButton: true,
                    message: res.msg,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                this.navCtrl.navigateRoot(['./create-account', mobile]);
            }
        }, async error => {
            console.log(error.toString());
            await this.loadingCtrl.dismiss();
        });
    }

 home() {
    this.navCtrl.navigateRoot(['./home']);
  } 
 sign_up() {
    this.route.navigate(['./create-account']);
  } 
 password() {
    this.route.navigate(['./password']);
  } 
}
