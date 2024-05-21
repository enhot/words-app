import { Injectable, signal } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Injectable({
  providedIn: 'root',
})
export class CardsSlidOptionsService {
  public swiperElement = signal<SwiperContainer | null>(null);

  constructor() {}

  public slidesOptions(): void {
    const swiperElementConstructor = document.querySelector('swiper-container');
    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,
      keyboard: true,
      pagination: true,
      navigation: true,
      parallax: true,
    };
    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
}
