import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { WordsForCards } from '../interfaces/words-for-cards';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  private apiUrl: string = 'http://localhost:3000/dictinary';
  private words$ = new BehaviorSubject<WordsForCards[]>([]);
  public wordsLength!: number;
  constructor(public http: HttpClient) {
    this.fetchWords();
  }
  private fetchWords(): void {
    this.http
      .get<WordsForCards[]>(this.apiUrl)
      .pipe(
        tap((data) => {
          this.words$.next(data);
          this.wordsLength = data.length;
        }),
        catchError((error) => {
          console.log('Ошибка получения', error);
          return [];
        })
      )
      .subscribe();
  }

  public sendWordOnServer(word: WordsForCards): Observable<WordsForCards> {
    return this.http.post<WordsForCards>(this.apiUrl, word).pipe(
      tap((newWord) => this.updateWordsArray(newWord)),
      catchError((err) => {
        console.log('Ошибка при отправке', err);
        throw err;
      })
    );
  }
  public getWords(): Observable<WordsForCards[]> {
    return this.words$.asObservable();
  }
  public deleteWordById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(() => this.fetchWords()), // Перезагрузка списка слов после удаления
      catchError((err) => {
        console.error('Ошибка при удалении', err);
        throw err;
      })
    );
  }

  private updateWordsArray(newWord: WordsForCards): void {
    this.words$.next([...this.words$.getValue(), newWord]);
    this.wordsLength = this.words$.getValue().length;
  }
}
