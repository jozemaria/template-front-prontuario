import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private readonly urlAPI = environment.URL_BASE + 'dashboard'

  constructor(private http: HttpClient) { }

  getListHorse(): Observable<any> {
    return this.http.get(this.urlAPI, { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

}
