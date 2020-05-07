import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {APIURL} from '../enum';
import {AlertController} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
        private http: HttpClient,
        private  alertCtrl: AlertController
    ) {
    }

      userLogin(mobile_number): Observable<any> {
        const url = APIURL.LIVE + 'api/login_generating_otp';
        const data = new FormData();
        data.append('mobile_number', mobile_number);
        return this.http.post<any>(url, data)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((Error: Response) => {
                this.errorMessage();
                return throwError(Error.status);
            }));
    }


     otpVerify(mobile, otp): Observable<any> {
        const url = APIURL.LIVE + 'api/login_otp/';
        const data = new FormData();
        data.append('mobile_number', mobile);
        data.append('otp', otp);
        return this.http.post<any>(url, data)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((Error: Response) => {
                return throwError(Error.status);
            }));
    }


    userRegister(full_name, email,mobile): Observable<any> {
         
        const url = APIURL.LIVE + 'api/register';
        const data = new FormData();
        data.append('full_name', full_name);
        data.append('email', email);
        data.append('mobile_number', mobile);
        return this.http.post<any>(url, data)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((Error: Response) => {
                return throwError(Error.status);
            }));
    
    }
    

       async errorMessage() {
        const alert = await this.alertCtrl.create({
            header: 'Oops!',
            message: 'Something went wrong. Please try again',
            buttons: ['Dismiss']
        });
        await alert.present();
    }

}
