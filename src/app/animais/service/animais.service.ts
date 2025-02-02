import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {
  readonly http = inject(HttpClient)

  private readonly urlAPI = environment.URL_BASE + 'horse_records'


  getAllAnimal(): Observable<any> {
    return this.http.get(environment.URL_BASE + 'users', {
      headers:
        { 'Authorization': environment.TOKEN_TEST }
    })
  }

  getAnimalById(id: number): any {
    return this.http.get(this.urlAPI + '/' + id, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  saveNewAnimal(user: any): any {
    return this.http.post(this.urlAPI, user, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  deleteAnimal(id: number): any {
    return this.http.delete(this.urlAPI + '/' + id, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  updateAnimal(idUser: number, userUpdate: any): any {
    return this.http.put(this.urlAPI + '/' + idUser, userUpdate, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  openMedicalRecord(idUser: number): any {
    return this.http.get(this.urlAPI + '/' + idUser + '/is_active', { headers: { 'Authorization': environment.TOKEN_TEST } })
  }
}
