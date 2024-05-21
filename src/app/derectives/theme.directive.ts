import { Directive, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { ChangeThemeService } from '../services/change-theme.service';

@Directive({
  selector: '[appTheme]',
  standalone: true,
})
export class ThemeDirective {
  constructor(
    private elementRef: ElementRef,
    private render: Renderer2,
    private themeService: ChangeThemeService
  ) {}

  public ngOnInit() {
    this.themeService.subjectTheme$.subscribe((theme) => {
      this.render.setAttribute(
        this.elementRef.nativeElement,
        'data-theme',
        theme
      );
      const body = document.body;
      if (theme == 'light') {
        this.render.addClass(body, 'light-theme');
        this.render.removeClass(body, 'dark-theme');
      } else {
        this.render.addClass(body, 'dark-theme');
        this.render.removeClass(body, 'light-theme');
      }
    });
  }
}
