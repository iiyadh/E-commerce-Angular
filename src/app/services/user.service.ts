import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  // Fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // Delete user by ID
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Handle Block/Unblock state
  blockUser(id: string, updatedUser: User): Observable<User> {
    updatedUser.isBlocked = !updatedUser.isBlocked;
    return this.http.put<User>(`${this.baseUrl}/${id}`, updatedUser);
  }
}
