import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../Models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input() p: Product;
  cart: any;
  cartSubscription: any;

  constructor(private shoppingCartService: ShoppingCartService){

  }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }

  getQuantity(p: Product) {
      return this.shoppingCartService.getQuantity(p,this.cart)
  }

  decreaseQuantity(product: Product) {
    this.shoppingCartService.decreaseQuantity(product);
  }

  ngOnInit(): void {
    this.cartSubscription = this.shoppingCartService.getAll().subscribe(cart => {
      this.cart = cart;
    })
  }

}
