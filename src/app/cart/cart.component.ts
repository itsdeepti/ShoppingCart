import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/product';
import { ProductsService } from '../products.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  sumCart: number;
  products: any;
  productsWithName: Product[];
  productsToShow: any[];
  orderTotal: number;
  


  constructor(private shoppingCartService: ShoppingCartService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAll().subscribe(resp => {
      this.productsWithName = resp;
      this.getShoppingCartSubscription();
    })

  }
  getShoppingCartSubscription() {
    const cartId = localStorage.getItem("cartId");
    this.shoppingCartService.getCart().subscribe(resp => {
      const products: any = resp;
      this.sumCart = 0;
      this.products = products;
      this.mapToLocalProduct();
   
      for (var product of products) {
        if (product)
          this.sumCart = this.sumCart + product.quantity;          
      }
    })
  }


  mapToLocalProduct() {
    this.productsToShow = [];
    this.orderTotal= 0;
    if(this.products){
    for (var key of Object.keys(this.products)) {
      const data = this.productsWithName.find(e => e.key === key).data;
      const name = data["title"];
      const price = data["price"];
      const quantity = this.products[key].quantity;
      const totalPrice = Number(price.toString().replace('$', '')) * quantity;
      if(quantity!==0) 
      this.productsToShow.push({ name, quantity, key, price, totalPrice });
      this.orderTotal = this.orderTotal+ totalPrice;
    }
    }
  }
  clearCart(){
    this.shoppingCartService.clearCart();
  }
}
