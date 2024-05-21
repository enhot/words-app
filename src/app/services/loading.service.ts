import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  public loadingOn(): void {
    this.loadingSubject.next(true);
  }
  public loadingOff(): void {
    this.loadingSubject.next(false);
  }
}
