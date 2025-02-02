import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

type ITypeIcon = 'success' | 'error' | 'warning' | 'info'

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  alert(icone: ITypeIcon, title: any, message: any) {
    Swal.fire({
      icon: icone,
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 3500
    });
  }

  confirmAlert(icone: ITypeIcon, titulo: any, texto_principal: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      Swal.fire({
        title: titulo,
        text: texto_principal,
        icon: icone,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}
