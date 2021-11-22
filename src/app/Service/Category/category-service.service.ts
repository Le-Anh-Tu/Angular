import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../../module/category";
import {Observable} from "rxjs";
import {API_URL, CATEGORIES} from "../../url-constant";

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http: HttpClient) {

  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/${CATEGORIES}`);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${API_URL}/${CATEGORIES}`, category);
  }
}
