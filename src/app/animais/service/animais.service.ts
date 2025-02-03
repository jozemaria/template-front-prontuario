import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {
  readonly http = inject(HttpClient)

  private readonly urlAPIHorseRecor = environment.URL_BASE + 'horse_records'
  private readonly urlAPIHorse = environment.URL_BASE + 'horses'


  getAllAnimal(): Observable<any> {
    return this.http.get(this.urlAPIHorse, {
      headers:
        { 'Authorization': environment.TOKEN_TEST }
    })
  }

  getAnimalById(id: number): any {
    return this.http.get(this.urlAPIHorse + '/' + id, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  saveNewAnimal(horse: any): any {
    return this.http.post(this.urlAPIHorse, horse, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  deleteAnimal(id: number): any {
    return this.http.delete(this.urlAPIHorse + '/' + id, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  updateAnimal(idHorse: number, horseUpdate: any): any {
    return this.http.put(this.urlAPIHorse + '/' + idHorse, horseUpdate, { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  openMedicalRecord(idHorse: number): any {
    return this.http.get(this.urlAPIHorseRecor + '/' + idHorse + '/is_active', { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

  get baiasCadastradas(): any {
    return this.http.get(environment.URL_BASE + 'baias', { headers: { 'Authorization': environment.TOKEN_TEST } })
  }

}
