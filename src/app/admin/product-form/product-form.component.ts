import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { Product } from 'src/app/Models/product';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public categories$;
  public product: Product = {
    key: null,
    data: {
    category: '',
    imageUrl: '',
    price: 0,
    title: ''
    }
  };
  public id: string;
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute) {
    this.categories$ = this.categoryService.getAll();
    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.id = id;
      this.productsService.get(id).subscribe(p => {
        this.product = p;
      });
    }
  }
  public save(product: Product) {
    if (this.id) {
      product.id = this.id;
      this.productsService.update(product);
    } else {
      this.productsService.create(product);

    }
    this.router.navigate(['/admin/admin-products']);
  }
  public delete() {
    if (!confirm('Are you sure you want to delete this product?'))
      return;
    this.productsService.delete(this.id);
    this.router.navigate(['/admin/admin-products']);

  }

  ngOnInit(): void {
  }
}
