import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  // products: any;
  categories$: any;
  category: string;
  filterdProducts: any;
  products: any;


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private categoryService: CategoryService) {
    // this.products$ = this.productsService.getAll();
    this.categories$ = this.categoryService.getAll();
    this.route.queryParams.subscribe(p => {
      this.category = p.category;
      this.checkAndGetProducts();
    });
  }
  checkAndGetProducts() {
    if (!this.products) {
      this.productsService.getAll().subscribe(res => {
        this.products = res;
        this.filterProducts();
      });
    }
    else {
      this.filterProducts();
    }
  }

  filterProducts() {
    if (this.category !="all") {
      this.filterdProducts = this.products.filter(p => {
        return p.data['category'] == this.category;
      });
    }
    else{
      this.filterdProducts=this.products;
    }
  }

  ngOnInit(): void {
  }

}
