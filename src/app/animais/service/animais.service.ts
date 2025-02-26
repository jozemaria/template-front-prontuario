import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {
  readonly http = inject(HttpClient)

  private readonly urlAPIHorseRecor = environment.URL_BASE + 'horse_records/'
  private readonly urlAPIHorse = environment.URL_BASE + 'horses/'
  private readonly urlAPIBase = environment.URL_BASE


  getAllAnimal(): Observable<any> {
    return this.http.get(this.urlAPIHorse, {
      headers:
        { 'Authorization': localStorage.getItem('access_token') }
    })
  }

  getAnimalById(id: number): any {
    return this.http.get(this.urlAPIHorse + id, { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

  saveNewAnimal(horse: any): any {
    return this.http.post(this.urlAPIHorse, horse, { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

  salvarNoProntuario(rota: string, valueModal: any): any {
    console.log(rota, valueModal)
    return this.http.post(this.urlAPIBase + rota, valueModal, { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

  deleteAnimal(id: number): any {
    return this.http.delete(this.urlAPIHorse + id, { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

  updateAnimal(idHorse: number, horseUpdate: any): any {
    return this.http.put(this.urlAPIHorse + idHorse, horseUpdate, { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

  openMedicalRecord(idHorse: number): any {
    return this.http.get(this.urlAPIHorseRecor + idHorse + '/is_active', { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

  get baiasCadastradas(): any {
    return this.http.get(environment.URL_BASE + 'baias', { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

  historicoProntuario(idHorse: number): any {
    return this.http.get(this.urlAPIHorseRecor + idHorse, { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

  editarStatus(type: string, idHorse: number) {
    return this.http.patch(this.urlAPIHorse + idHorse, type, { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

  abrirAtendimento(idHorse: number) {
    console.log(`atendimento`)
    return this.http.get(this.urlAPIHorseRecor + idHorse + '/open', { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }
  fecharAtendimento(idHorse: number) {
    return this.http.get(this.urlAPIHorseRecor + idHorse + '/close', { headers: { 'Authorization': localStorage.getItem('access_token') } })
  }

}
