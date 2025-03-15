/* istanbul ignore file */
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { LoadingComponent } from "./loading.components";


@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private overlayRef: OverlayRef
  public loadingEvent$ = new Subject<boolean>()
  public _hasLoading$ = new BehaviorSubject<boolean>(true)
  readonly hasLoading$: Observable<boolean> = this._hasLoading$.asObservable()

  constructor(private overlay: Overlay) { }


  showLoading() {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      panelClass: 'loadingCircle'
    })
    this.overlayRef.attach(new ComponentPortal(LoadingComponent))
  }

  hideLoading() {
    this.overlayRef.detach()
  }

  removeAllLoading() {
    const backdropOverlay = document.querySelector('.cdk-overlay-backdrop')
    const loadingCircle = document.querySelector('.loadingCircle')
    backdropOverlay.remove()
    loadingCircle.remove()
  }


}
