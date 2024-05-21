import { Component } from '@angular/core';
import { HeroComponent } from './sections-home/hero/hero.component';
import { SuccessComponent } from './sections-home/success/success.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, SuccessComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
