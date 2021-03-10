import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './Models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private async getOrCreateCartId(product: Product) {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.db.list('/shopping-cart').push({ ts: new Date().getTime() });
      cartId = result['path'].pieces_[1];
      localStorage.setItem('cartId', cartId);
      this.addCart(product, cartId);
      return;
    }
    this.updateCart(product, cartId);
  }

  addToCart(product: Product) {
    this.getOrCreateCartId(product);
  }

  addCart(product: Product, cartId: string) {
    this.db.object(`/shopping-cart/${cartId}/items/${product.key}`).update({
      quantity: 1
    });
  }

  updateCart(product: Product, cartId: string) {
    const subscription = this.db.object(`/shopping-cart/${cartId}/items/${product.key}`).valueChanges().subscribe(existCart => {
      subscription.unsubscribe();
      if (existCart) {
        const currentQuantity = existCart["quantity"];
        this.db.object(`/shopping-cart/${cartId}/items/${product.key}`).update({
          quantity: currentQuantity + 1
        })
      }
      else {
        this.addCart(product, cartId);
      }

    });
  }
  getAll(){
    const cartId = localStorage.getItem("cartId");
    return this.db.object(`/shopping-cart/${cartId}/items`).valueChanges();
  }

  // decreaseQuantity(product: Product, cartId: string) {
  //   debugger;
  //   const subscription = this.db.object(`/shopping-cart/${cartId}/${product.key}`).valueChanges().subscribe(existCart => {
  //     subscription.unsubscribe();
  //   if (existCart) {
  //     const currentQuantity = existCart["quantity"];
  //     this.db.object(`/shopping-cart/${cartId}/${product.key}`).update({
  //       quantity: currentQuantity - 1
  //     })
  //   } 
  // }
  getCart(){
    let cartId = localStorage.getItem('cartId');
    return this.db.object(`/shopping-cart/${cartId}/items`).valueChanges()
  }

  decreaseQuantity(product: Product){
    let cartId = localStorage.getItem('cartId');
    const subscription = this.db.object(`/shopping-cart/${cartId}/items/${product.key}`).valueChanges().subscribe(existCart => {
      subscription.unsubscribe();
      if (existCart) {
        const currentQuantity = existCart["quantity"];
        this.db.object(`/shopping-cart/${cartId}/items/${product.key}`).update({
          quantity: currentQuantity - 1
        })
      }
    });
  }

  getQuantity(p: Product,cart) {
    if (cart) {
      return cart[p.key] ? cart[p.key].quantity : 0;
    }
    return 0;
  }

  clearCart(){
    let cartId = localStorage.getItem('cartId');
    this.db.object(`/shopping-cart/${cartId}/items`).remove();
  }
}
