import { ElementRef, Injectable, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeThemeService implements OnInit {
  public subjectTheme: BehaviorSubject<string> = new BehaviorSubject('light');
  public subjectTheme$: Observable<string> = this.subjectTheme.asObservable();
  public isTrue: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  public toogleTheme(): void {
    this.isTrue = !this.isTrue;
    const currentValue = this.subjectTheme.value;
    const currentTheme = currentValue === 'light' ? 'dark' : 'light';

    this.subjectTheme.next(currentTheme);
  }
}
