import * as moment from 'jalali-moment';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'jalali'
})
export class JalaliPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const MomentDate = moment(value, 'YYYY/MM/DD');
        return MomentDate.locale('fa').format('YYYY/M/D');
    }
}
