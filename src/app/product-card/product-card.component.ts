import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../Models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() p: Product;
  cartSubscription: Subscription;
  cart: any;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }

  getQuantity(p: Product) {
    return this.shoppingCartService.getQuantity(p,this.cart)
  }

  // decreaseQuantity(product: Product){
  //   this.shoppingCartService.decreaseQuantity(product);
  // }

  ngOnInit(): void {
    this.cartSubscription = this.shoppingCartService.getAll().subscribe(cart => {
      this.cart = cart;
    })
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
