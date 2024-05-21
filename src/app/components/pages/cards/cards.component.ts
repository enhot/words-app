import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';

import { WordsForCards } from '../../../interfaces/words-for-cards';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { CardsHelpPipe } from '../../../pipes/cards-help.pipe';
import { CardsSlidOptionsService } from '../../../services/cards-options.service';
import { WordsService } from '../../../services/words.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

register();
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, CardsHelpPipe, HttpClientModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateY(179deg)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SpeechSynthesisUtterance, CardsSlidOptionsService, WordsService],
})
export class CardsComponent implements OnInit {
  public flip: string = 'inactive';
  public showHelp: boolean = false;
  public firstLetter: string = '';
  public words$!: Observable<WordsForCards[]>;

  // public words$ = new BehaviorSubject<WordsForCards[]>([]);
  constructor(
    private slidOptionsServer: CardsSlidOptionsService,
    private getWordsServer: WordsService
  ) {}
  ngOnInit(): void {
    this.words$ = this.getWordsServer.getWords();

    //Сервис для настроек слайда
    this.slidOptionsServer.slidesOptions();
  }

  public toggleFlip(event: Event) {
    this.flip = this.flip == 'inactive' ? 'active' : 'inactive';
    this.showHelp = false;
  }

  public helperLamp(event: Event) {
    event.stopPropagation(); // Предотвращаем всплытие события
    this.showHelp = !this.showHelp;
  }

  public speakWord(word: string, event: Event, rate: number, lang: string) {
    event.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = rate;
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  }
}
