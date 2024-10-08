import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { ChangeThemeService } from './services/change-theme.service';
import { HeaderComponent } from './components/header/header.component';
import { ThemeDirective } from './derectives/theme.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ThemeDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ChangeThemeService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
