import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'age',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  public transform(value: Date | undefined): string {
    return formatDistanceToNowStrict(value ?? new Date(), {
      locale: es,
      unit: 'year',
      roundingMethod: 'floor',
    });
  }
}
