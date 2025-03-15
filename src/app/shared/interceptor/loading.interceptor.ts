import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/components/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  readonly loadingService = inject(LoadingService)

  activeRequests = 0
  routerPath = false

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.activeRequests === 0) {
      this.loadingService.showLoading();
      this.loadingService.loadingEvent$.next(true)
    }
    this.activeRequests++

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--
        if (this.activeRequests === 0) {
          this.loadingService.hideLoading();
          this.loadingService.loadingEvent$.next(false)

        }
      })
    );
  }
}
