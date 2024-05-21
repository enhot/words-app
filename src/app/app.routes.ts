import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CardsComponent } from './components/pages/cards/cards.component';
import { AddWordsComponent } from './components/pages/add-words/add-words.component';
import { CheckYourSelfComponent } from './components/pages/check-your-self/check-your-self.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'addWords', component: AddWordsComponent },
  { path: 'checkYours', component: CheckYourSelfComponent },
  { path: '**', component: HomeComponent },
];
