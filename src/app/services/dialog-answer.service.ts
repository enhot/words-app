import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowAnswerComponent } from '../components/pages/check-your-self/show-answer/show-answer.component';

@Injectable({
  providedIn: 'root',
})
export class DialogAnswerService {
  public userAnswer: {
    englishWord: string;
    rusWord: string;
    answerWord: string;
  }[] = [];

  constructor(private dialog: MatDialog) {}
  public dialogAnswer(): void {
    this.dialog.open(ShowAnswerComponent, {
      data: this.userAnswer,
      width: '100%',
      maxWidth: '700px',
      height: '100%',
      maxHeight: '600px',
    });
  }
}
