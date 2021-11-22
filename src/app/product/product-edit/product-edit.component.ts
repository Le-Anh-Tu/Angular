import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from "../../module/product";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../module/category";
import {CategoryServiceService} from "../../Service/Category/category-service.service";
import {ProductService} from "../../Service/Product/product-service.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editProductForm: FormGroup = new FormGroup({
    id: new FormControl('0'),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl()
  });
  product: Product = {};
  id: number;
  categories: Category[] = [];
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryServiceService,
              private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.productService.getById(this.id).subscribe(product => {
        this.product = product;
        this.editProductForm = new FormGroup({
          id: new FormControl(this.product.id),
          name: new FormControl(this.product.name, Validators.required),
          price: new FormControl(this.product.price, Validators.required),
          quantity: new FormControl(this.product.quantity, Validators.required),
          image: new FormControl(this.product.image, Validators.required),
          description: new FormControl(this.product.description, Validators.required),
          category: new FormControl(this.product.category.id)
        })
      });
    })
  }
  ngOnInit() {
    this.getAllCategories();
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => console.log(error));
  }
  // editProduct() {
  //   this.productService.edit(this.id, this.editProductForm.value).subscribe();
  // }

  get name() {
    return this.editProductForm.get('name');
  }

  submit(productForm) {
    let product = productForm.value;
    product.category = {
      id: product.category
    }
    this.productService.edit(this.id, product).subscribe((data) => {
      this.product = data;
      this.router.navigate(['/products']);
    }, error => {
      alert("Lỗi :(((");
    });
  }
}
