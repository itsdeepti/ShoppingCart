import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './Models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }

  public create(products: Product) {
    return this.db.list('/products').push(products);
  }

  public getAll() {
    return (this.db.list('/products').snapshotChanges()
      .pipe(
        map(products => products.map(product => {
          const data = product.payload.val();
          const key = product.payload.key;
          return { key, data } as Product;
        }))
      ));
  }

  public get(productId: string): Observable<any> {
    return this.db.object('/products/' + productId).valueChanges() as Observable<any>;
  }

  public update(product: Product) {
    this.db.object('/products/' + product.id).update(
      {
        category: product.data.category,
        imageUrl: product.data.imageUrl,
        price: product.data.price,
        title: product.data.title
      });
  }

  public delete(id: string) {
    this.db.object('/products/' + id).remove();
  }
}
