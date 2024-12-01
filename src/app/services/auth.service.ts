import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

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
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('authToken', btoa(JSON.stringify({ email: user.email, role: user.isAdmin , isBlocked : user.isBlocked , id : user.id})));
          return true;
        }
        return false;
      })
    );
  }

  generateRandomId(length: number = 16): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const decodedToken = JSON.parse(atob(authToken));
          return decodedToken.isBlocked === false;
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    }
    return false;
  }

  isAuthenticatedASAdmin(): boolean {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const decodedToken = JSON.parse(atob(authToken));
          return decodedToken.role === true;
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    }
    return false;
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => users.length > 0) 
    );
  }
  
  register(name: string, email: string, password: string): Observable<User> {
    return this.checkEmailExists(email).pipe(
      map((emailExists) => {
        if (emailExists) {
          throw new Error('Email already exists');
        }
        const newUser: User = {
          id: this.generateRandomId(8),
          name,
          email,
          isBlocked: false,
          isAdmin: false
        };
        
        return { ...newUser, password };
      }),
      switchMap((userWithPassword) =>
        this.http.post<User>(this.apiUrl, userWithPassword)
      ),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
