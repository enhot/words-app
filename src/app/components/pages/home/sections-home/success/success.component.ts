import { Component } from '@angular/core';
import { ChangeThemeService } from '../../../../../services/change-theme.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
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
export class SuccessComponent {
  constructor(private themeService: ChangeThemeService) {}
  get changeImg() {
    return this.themeService.isTrue;
  }
}
