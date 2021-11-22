import { Component, OnInit } from '@angular/core';
import {Product} from "../../module/product";
import {ProductService} from "../../Service/Product/product-service.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  id;
  product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe((data: any) => {
      this.products = data.content;
    }, error => {
      console.log(error);
    })
  }

  findProductById(id) {
    this.id = id;
  }

}
