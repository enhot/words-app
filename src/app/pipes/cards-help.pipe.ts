import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter',
  standalone: true,
})
export class CardsHelpPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.slice(0, 1).toUpperCase() + ' . . .';
  }
}
