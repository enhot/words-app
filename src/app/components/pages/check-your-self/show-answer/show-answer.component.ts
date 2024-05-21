import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { WordsForCards } from '../../../../interfaces/words-for-cards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-answer',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, CommonModule],
  templateUrl: './show-answer.component.html',
  styleUrl: './show-answer.component.scss',
})
export class ShowAnswerComponent implements OnInit {
  public correctAnswersCount: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public answer: {
      englishWord: string;
      rusWord: string;
      answerWord: string;
    }[]
  ) {}
  ngOnInit(): void {
    this.calculateCorrectAnswers();
  }
  private calculateCorrectAnswers(): void {
    this.answer.forEach((a) => {
      if (a.rusWord === a.answerWord) {
        this.correctAnswersCount++;
      }
    });
  }
}
