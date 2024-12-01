import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) { }

  // Fetch all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Add a new product
  addProduct(object: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, object);
  }

  // Fetch details of a single product by ID
  getProductDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Delete product by ID
  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Edit (Update) product by ID
  editProduct(id: string, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updatedProduct);
  }
}