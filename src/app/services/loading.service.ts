import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LoadingComponent } from '../entry/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay
  ) { }

  public show() {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });
    this.overlayRef.attach(new ComponentPortal(LoadingComponent));
    of({})
      .pipe()
      .subscribe(() => this.hide());
  }

  public hide() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
