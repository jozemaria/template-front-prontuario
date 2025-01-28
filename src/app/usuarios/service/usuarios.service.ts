import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface IDadosUsuario {
  id: number;
  name: string;
  email: string;
  document: string;
  registration: string;
  graduation: string;
  role: string;
  crm: string;
  single_access_token: string;
  password_digest: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}
@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private readonly urlAPI = environment.URL_BASE + 'users'

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any> {
    return this.http.get(environment.URL_BASE + 'users', {
      headers:
        { 'Authorization': environment.TOKEN_TEST }
    })
  }

  getUserById(id: number): any {
    return this.http.get(this.urlAPI + '/' + id, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  saveNewUser(user: any): any {
    return this.http.post(this.urlAPI, user, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  deleteUser(id: number): any {
    return this.http.delete(this.urlAPI + '/' + id, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  updateUser(userUpdate: any): any {
    return this.http.patch(this.urlAPI + '/' + userUpdate.user.id, userUpdate, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }
}
