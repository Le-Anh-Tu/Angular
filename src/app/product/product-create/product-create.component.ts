import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Product} from "../../module/product";
import {Category} from "../../module/category";
import {CategoryServiceService} from "../../Service/Category/category-service.service";
import {ProductService} from "../../Service/Product/product-service.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {};
  categories: Category[] = [];
  constructor(private productService: ProductService,
              private categoryService: CategoryServiceService,
              private router: Router) { }

  ngOnInit() {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => console.log(error));
  }
  submit(productForm) {
    let product = productForm.value;
    product.category = {
      id: product.category
    }
    this.productService.create(product).subscribe(() => {
      productForm.resetForm();
      this.router.navigateByUrl('/products');
    }, error => {
    });
  }
}
