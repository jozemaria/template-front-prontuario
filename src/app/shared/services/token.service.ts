import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'access_token';

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  decodeToken<T = JwtPayload>(): T | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode<T>(token);
    } catch {
      return null;
    }
  }

  isTokenExpired(token?: string): boolean {
    const decoded = this.decodeToken();
    if (!decoded?.exp) {
      return true;
    }
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }

  isValidToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    if (!this.isJwtFormat(token)) {
      return false;
    }
    if (this.isTokenExpired()) {
      return false;
    }
    return true;
  }

  isLoggedIn(): boolean {
    return this.isValidToken();
  }

  private isJwtFormat(token: string): boolean {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }
    try {
      parts.forEach(part => {
        const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
        atob(base64);
      });
      return true;
    } catch {
      return false;
    }
  }
}
