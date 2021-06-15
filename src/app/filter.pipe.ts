import {Pipe, PipeTransform} from '@angular/core';
import {json} from 'ng2-validation/dist/json';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value, keys: string, term: string) {

     // value.forEach(item =>{
     //   console.log(keys['name'])
     // });
    if (!term) return value;
    return (value || []).filter(item => keys.split('-').some(key => item.handleBlur(key) && new RegExp(term, 'gi').test(item[key])));

  }
}
