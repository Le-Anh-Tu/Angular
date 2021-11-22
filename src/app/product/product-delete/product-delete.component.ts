import {Component, OnInit} from '@angular/core';
import {Product} from '../../module/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from "../../Service/Product/product-service.service";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {};
  id: number;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.productService.getById(this.id).subscribe(product => {
        this.product = product;
      });
    });
  }

  ngOnInit() {
  }

  delete() {
    this.productService.delete(this.id).subscribe(() => {
      this.router.navigateByUrl('/products');
    });
  }
  list(){
    this.router.navigateByUrl('/products');
  }
}
