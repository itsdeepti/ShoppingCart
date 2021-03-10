import { Component, OnDestroy, OnInit } from '@angular/core';
import { listChanges } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Models/product';
//import { Product } from 'src/app/Models/product';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  public products: Product[];
  public filteredProducts: any[];
  subscription: Subscription;
  query: string;
  columnDefs: object[];
  rowData: any[];
  constructor(private productsService: ProductsService) {
    this.subscription = this.productsService.getAll().subscribe(products => {
      this.products = products;
      this.filteredProducts = this.products;
      this.setTableData();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  filter() {
    console.log(this.query);
    this.filteredProducts = this.products.filter(e => {
      return e.data.title.toLowerCase().includes(this.query.toLowerCase())
    });
  }

  ngOnInit(): void {
  }

  private setTableData() {
    let count=1;
    let productList=[];
    this.products.forEach(ele=>{
      const product = {
        slno:count,
        title:ele.data.title,
        price:ele.data.price,
      }
      productList.push(product);
      count++;
    });
    this.columnDefs = [
      { headerName: "Slno",field:"slno",sortable:true},
      { headerName: "Title", field: "title",sortable:true,filter:true},
      { headerName: "Price", field: "price",sortable:true, filter:true}
    ]
    this.rowData =productList;
  
  }
  // product ={key: key , data.ttile}
}
