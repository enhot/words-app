import { Component } from '@angular/core';
import { ChangeThemeService } from '../../../../../services/change-theme.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.7s linear', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0s linear', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class HeroComponent {
  constructor(private themeService: ChangeThemeService) {}
  get themeIs() {
    return this.themeService.isTrue;
  }
}
