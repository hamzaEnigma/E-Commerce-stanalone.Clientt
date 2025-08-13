import { effect, inject, Injectable } from '@angular/core';
import { User } from '../../interfaces/user/user.model';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthResponse } from '../../interfaces/user/AuthResponse.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../../interfaces/user/login.model';
import { RegisterForm } from '../../interfaces/user/userForm.model';
import { Router } from '@angular/router';
const api_user = 'https://localhost:7228/api/Auth/';
const ACCESS_KEY = 'auth.token';
const USER_KEY = 'auth.user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private router = inject(Router);
  currentUserSubject = new BehaviorSubject<User | undefined>(this.loadUser());
  currentUser$ = this.currentUserSubject.asObservable();
  private authChangedSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  authChanged$ = this.authChangedSubject.asObservable();

  constructor() {
    this.currentUserSubject.subscribe(user=>{
      console.log('----- START user service : -------');
      console.log('currentUser$ :', user);
      console.log('----- END user service : -------');
    })
  }

  async createUser(user: RegisterForm): Promise<User> {
    const response = await fetch(api_user + 'Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    if (response.ok) {
      return body as User;
    } else {
      throw new Error(body);
    }
  }

  register(registerForm: RegisterForm): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(api_user + 'Register', registerForm)
      .pipe(
        tap((res) => this.saveAuth(res)),
        tap(() => this.authChangedSubject.next(true))
      );
  }

  loginUser(loginModel: Login): Observable<User> {
    return this.http.post<AuthResponse>(api_user + 'Login', loginModel).pipe(
      tap((res) => {this.saveAuth(res)}),
      tap((res) => console.log('------ User service login ------ user from back', res.user)),
      tap(() => this.authChangedSubject.next(true)),
      map((res) => { return res.user }),
      tap(() => this.router.navigate(['/products'])),
      catchError((err) => throwError(() => err))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(api_user + 'Update', user, { headers: this.getAuthHeaders() }).pipe(
      tap((user) => console.log('------ User service Update ------ user from back', user)),
    )
  }

  saveAuth(res: AuthResponse) {
    localStorage.setItem(ACCESS_KEY, res.token);
    if (res.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      this.currentUserSubject.next(res.user);
    } else {
      localStorage.removeItem(USER_KEY);
      this.currentUserSubject.next(undefined);
    }
  }

  logOut(): void {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUserSubject.next(undefined)
    this.authChangedSubject.next(false);
    this.router.navigate(['/sign-in']); // ✅ redirect after logout
  }

  retieveToken(): string | null {
    return localStorage.getItem(ACCESS_KEY) || null;
  }

  loadUser(): User | undefined {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return undefined;
    try {
      const dto = JSON.parse(raw);
      const user = dto;
      return user;
    } catch {
      localStorage.removeItem(USER_KEY);
      return undefined;
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_KEY);
  }

  isAuthenticated(): boolean {
    const t = this.getAccessToken();
    if (!t) return false;
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      return payload.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }
}
