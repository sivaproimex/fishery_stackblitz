import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'sign-in',   pathMatch: 'full'
  },	
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'create-account/:mobile', 
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'otp/:mobile', 
    loadChildren: () => import('./otp/otp.module').then(m => m.OtpPageModule)
  },
  {
    path: 'sign-in/:signout', 
     loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  }

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
