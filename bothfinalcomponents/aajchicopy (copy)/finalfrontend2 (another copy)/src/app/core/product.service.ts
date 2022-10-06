import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getproducts():Observable<any>{
    return this.http.get('http://localhost:3000/product/getproducts');
  }
  checkout(qty: any) {
    return this.http.post(
      'http://localhost:3000/product/checkout',
      {
        
          quantity:qty,
          product_details:{
          product_name:"Apple airpods",
          images:["https://m.media-amazon.com/images/I/71bhWgQK-cL._SL1500_.jpg"],
          price:299
      }}
      
        
      ,
      { responseType: 'text' }
    );
  }
 
}
