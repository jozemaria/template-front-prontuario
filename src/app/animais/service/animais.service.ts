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
    return this.http.get(this.urlAPIHorse)
  }
  getAllAnimalByStatus(type: string = ''): Observable<any> {
    return this.http.get(this.urlAPIBase + `horses?query_status=${type}`)
  }

  getAnimalById(id: number): any {
    return this.http.get(this.urlAPIHorse + id)
  }

  saveNewAnimal(horse: any): any {
    return this.http.post(this.urlAPIHorse, horse)
  }

  salvarNoProntuario(rota: string, valueModal: any): any {
    return this.http.post(this.urlAPIBase + rota, valueModal)
  }

  salvarFotoEvolucao(valueModal: any): any {
    return this.http.post(this.urlAPIBase + 'horse_photos/', valueModal)
  }

  deleteAnimal(id: number): any {
    return this.http.delete(this.urlAPIHorse + id)
  }

  updateAnimal(idHorse: number, horseUpdate: any): any {
    return this.http.put(this.urlAPIHorse + idHorse, horseUpdate)
  }

  openMedicalRecord(idHorse: number): any {
    return this.http.get(this.urlAPIHorseRecor + idHorse + '/is_active')
  }

  get baiasCadastradas(): any {
    return this.http.get(environment.URL_BASE + 'baias')
  }

  historicoProntuario(idHorse: number): any {
    return this.http.get(this.urlAPIHorseRecor + idHorse)
  }

  editarStatus(type: string, idHorse: number) {
    return this.http.patch(this.urlAPIHorse + idHorse, type)
  }

  abrirAtendimento(idHorse: number) {
    return this.http.get(this.urlAPIHorseRecor + idHorse + '/open')
  }
  fecharAtendimento(idHorse: number) {
    return this.http.get(this.urlAPIHorseRecor + idHorse + '/close')
  }

  pegarHistorico(idHorse: number) {
    return this.http.get(this.urlAPIBase + 'history_horse_records/' + idHorse + '/search')
  }

  salvarFerradura(ferradura: any) {
    return this.http.post(this.urlAPIBase + 'horseshoes', ferradura)
  }
}
