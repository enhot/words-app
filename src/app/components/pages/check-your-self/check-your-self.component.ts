import { Component, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { WordsService } from '../../../services/words.service';
import { WordsForCards } from '../../../interfaces/words-for-cards';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DialogAnswerService } from '../../../services/dialog-answer.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-check-your-self',
  standalone: true,
  imports: [
    MatRadioModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './check-your-self.component.html',
  styleUrl: './check-your-self.component.scss',
  providers: [WordsService],
})
export class CheckYourSelfComponent implements OnInit {
  public words$!: Observable<WordsForCards[]>;
  public wordsLength!: number;
  public currentIndex: number = 0;
  public userChoice!: string;
  public randomWord!: string;
  public randomIndex!: number;
  constructor(
    private getWordsService: WordsService,
    private openDialogService: DialogAnswerService
  ) {}
  public ngOnInit(): void {
    this.words$ = this.getWordsService.getWords();
    this.words$.subscribe((data) => {
      this.wordsLength = data.length;
      // Генерируем случайный индекс для первого слова
      if (data.length > 0) {
        this.randomIndex = Math.floor(Math.random() * data.length);
        this.randomWord = data[this.randomIndex].rusWord;
        data[this.randomIndex].englishWord;
      }
    });
  }

  public nextWord(): void {
    this.words$
      .subscribe((data) => {
        this.randomIndex = Math.floor(Math.random() * data.length);

        const usersAnswer = {
          englishWord: data[this.currentIndex].englishWord,
          rusWord: data[this.currentIndex].rusWord,
          answerWord: this.userChoice,
        };
        // ЧТобы индексы не совпадали
        if (
          data[this.currentIndex].rusWord === this.randomWord[this.randomIndex]
        ) {
          this.randomWord = data[this.randomIndex - 1].rusWord;
        } else {
          this.randomWord = data[this.randomIndex].rusWord;
        }

        this.openDialogService.userAnswer.push(usersAnswer);
      })
      .unsubscribe();

    this.currentIndex++;
    this.userChoice = '';
  }
  public reload(): void {
    this.currentIndex = 0;
    this.openDialogService.userAnswer.length = 0;
  }
  public dialogAnswer() {
    this.openDialogService.dialogAnswer();
  }
}
