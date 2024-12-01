import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  // Fetch all orders
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Delete order by ID
  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // // Ship order by ID
  // shipOrder(id: string): Observable<any> {
  //   return this.http.put<any>(`${this.baseUrl}/${id}`, { status: 'shipped' });
  // }

  confirmeOrder(object: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`,object);
  }

}
