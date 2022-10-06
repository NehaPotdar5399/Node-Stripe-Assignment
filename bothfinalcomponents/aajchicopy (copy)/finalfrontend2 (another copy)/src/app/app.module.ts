import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './feature/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './feature/static/product/product.component';
import { ProductDetailsComponent } from './feature/static/product-details/product-details.component';
import {StripeModule} from 'stripe-angular';
import { PaymentComponent } from './feature/dynamic/payment/payment.component';
import { AuthGuard } from './feature/guards/auth.guard';
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductComponent,
    ProductDetailsComponent,
    PaymentComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxStripeModule.forRoot("pk_test_51Leen4SHmDLVBwLpwcVyj1CsQe4Vdvdt9ivQYPohdyHbn1MKwtLLyEgZ3zRCp9nRizLED5lCWe1BA3GvMjf4kuvf00SA5cS4KA")
      ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
