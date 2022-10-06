import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  product: any;
  

  constructor(private http:HttpClient, private productservice:ProductService) { }


  ngOnInit(): void {
    
    this.productservice.getproducts().subscribe((product) => {
      this.product = product;
      console.log(product);
    });
    
     

   
    
  }
  

  
  


  checkout(quantity: any) {
    console.log(quantity);
    this.productservice
      .checkout(quantity.value)
      .subscribe((url) => {
        window.location.href = url;
        
      });
  }

}

