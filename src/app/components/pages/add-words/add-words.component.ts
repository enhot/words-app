import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WordsService } from '../../../services/words.service';
import { HttpClientModule } from '@angular/common/http';
import { WordsForCards } from '../../../interfaces/words-for-cards';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../services/loading.service';
import { Observable, finalize, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-words',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './add-words.component.html',
  styleUrl: './add-words.component.scss',
  providers: [WordsService],
})
export class AddWordsComponent implements OnInit {
  public sendWordsForm: FormGroup;
  public sendWordsArray: WordsForCards[] = [];
  public loader$!: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private wordsServer: WordsService,
    private loader: LoadingService
  ) {
    this.sendWordsForm = fb.group({
      englishWord: ['', [Validators.required]],
      rusWord: ['', [Validators.required, Validators.pattern(/^[а-яА-Я]+$/)]],
    });
  }
  ngOnInit(): void {
    this.loader$ = this.loader.loading$;
  }

  public addWords(): void {
    // Первая буква заглавная
    const englishWord: string = this.capitalizeFirstLetter(
      this.sendWordsForm.value.englishWord
    );
    const rusWord: string = this.capitalizeFirstLetter(
      this.sendWordsForm.value.rusWord
    );
    // Создал новый объект слов из формы
    const newWord: WordsForCards = {
      englishWord: englishWord,
      rusWord: rusWord,
    };
    this.loader.loadingOn();

    // Отправляем на сервер
    this.wordsServer
      .sendWordOnServer(newWord)
      .pipe(
        tap((response) => {
          this.sendWordsArray.push(response);
          this.sendWordsForm.reset(); // сброс input
        }),
        finalize(() => this.loader.loadingOff())
      )
      .subscribe();
  }

  public deleteWord(index: number): void {
    const wordToDelete = this.sendWordsArray[index];

    this.loader.loadingOn();

    if (wordToDelete.id) {
      this.wordsServer
        .deleteWordById(wordToDelete.id)
        .pipe(
          tap(() => {
            this.sendWordsArray.splice(index, 1);
          }),
          finalize(() => this.loader.loadingOff())
        )
        .subscribe(() => {
          console.log('Word deleted successfully');
        });
    }
  }
  public capitalizeFirstLetter(word: string): string {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
