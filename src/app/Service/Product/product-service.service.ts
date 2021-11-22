import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../module/product";
import {API_URL, PRODUCT} from "../../url-constant";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/${PRODUCT}`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/${PRODUCT}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${API_URL}/${PRODUCT}`, product);
  }

  edit(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${API_URL}/${PRODUCT}/${id}`, product);
  }

  delete(id: number): Observable<Product> {
    return this.http.delete(`${API_URL}/${PRODUCT}/${id}`);
  }
}
