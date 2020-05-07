import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  // login = false;
   

  public appPages = [
    {
      title: 'home',
      url: '/home',
      image: 'assets/imgs/ic_home.png', 
    }, 
	  
	{
      title: 'home_cat_title',
      url: '/category',
      image: 'assets/imgs/ic_categories.png', 
    },
	{
      title: 'my_orders',
      url: '/my-orders',
      image: 'assets/imgs/ic_my_orders.png', 
    },	
     {
      title: 'change_language',
      url: '/change-language',
      image: 'assets/imgs/ic_language.png', 
    },
	 {
      title: 'about',
      url: '/about',
      image: 'assets/imgs/ic_about.png', 
    },
	 {
      title: 'faq',
      url: '/faq',
      image: 'assets/imgs/ic_help.png', 
    },
	 {
      title: 'connect_us',
      url: '/connect-us',
      image: 'assets/imgs/ic_contact_us.png', 
    },
	  {
      title: 'logout',
      url: '/sign-in/signout',
      image: 'assets/imgs/ic_logout.png', 
    },
	  
  ];
   

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
	private translate: TranslateService,
	private navCtrl: NavController, 
  public storage: Storage
  ) 
  {

    

    this.initializeApp();
   translate.setDefaultLang('en');
  
 /*   this.storage.get('token')
      .then( (login) => function (token_value) { alert();
        if(token_value != ''){ alert(token_value);
           this.login = true;
        }
      });*/

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

/*    let token = this.storage.get('token');
   token.then(token_value => { 
        if(token_value != null){
           this.login = true;
        }   
   
});
  */

  }
	
	
 my_account() { 
    this.navCtrl.navigateRoot(['./my-account']);
  }
}
