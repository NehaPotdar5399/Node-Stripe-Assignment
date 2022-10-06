import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './feature/homepage/homepage.component';
import { ProductComponent } from './feature/static/product/product.component';
// import { PaymentComponent } from './feature/dynamic/payment/payment.component';
import { AuthGuard } from './feature/guards/auth.guard';
import { PaymentGuard } from './guard/payment.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent,
  },
  // {
  //   path: 'success',
   
  // component:PaymentComponent,
  
  
    
  // },
  {
    path:'success', loadChildren:()=>import('../app/feature/dynamic/dynamic.module').then((m)=>m.DynamicModule),
    canActivate:[AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
