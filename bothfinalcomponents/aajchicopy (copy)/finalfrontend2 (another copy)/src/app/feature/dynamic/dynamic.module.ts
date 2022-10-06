import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicRoutingModule } from './dynamic-routing.module';
import { Routes,RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';


const  routes:Routes=[
  {path:'', component:PaymentComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DynamicModule { 
constructor(){
  console.log('Payment successful')
}

}
