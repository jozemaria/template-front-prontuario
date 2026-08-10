import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { TokenService } from 'src/app/shared/services/token.service';

export interface LoginUser {
  registration?: string | unknown;
  password?: string | unknown;
}
export interface Token {
  token?: string | unknown;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  loginClient(dataUser: LoginUser): Observable<Token> {
    return this.http.post(environment.URL_BASE + 'login', dataUser)
  }

  get isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }
}
