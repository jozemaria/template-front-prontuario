import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';

const DEFAULT_IMAGE_FALLBACK = 'assets/images/app/logo-sesed.png';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
    this.registerImageFallback();
  }

  private registerImageFallback(): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.addEventListener(
      'error',
      (event: Event) => {
        const target = event.target as HTMLImageElement | null;

        if (!(target instanceof HTMLImageElement)) {
          return;
        }

        const currentSrc = target.currentSrc || target.src || '';
        const fallbackSrc = new URL(DEFAULT_IMAGE_FALLBACK, window.location.origin).toString();

        if (
          !currentSrc ||
          currentSrc === 'about:blank' ||
          currentSrc.includes('null') ||
          currentSrc.includes('undefined') ||
          currentSrc === fallbackSrc ||
          target.dataset['fallbackApplied'] === 'true'
        ) {
          return;
        }

        target.dataset['fallbackApplied'] = 'true';
        target.src = DEFAULT_IMAGE_FALLBACK;
      },
      true
    );
  }
}


