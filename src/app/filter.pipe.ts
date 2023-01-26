import { Pipe, PipeTransform } from '@angular/core';
import { Link } from 'src/app/models/links.models';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(links: Link[], search:string=''): Link[] {
    const filteredCards = links.filter(card=>card.title.includes(search))
    return filteredCards;
  }
}
