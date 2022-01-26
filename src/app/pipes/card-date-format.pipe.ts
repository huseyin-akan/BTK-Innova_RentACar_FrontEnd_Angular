import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardDateFormat'
})
export class CardDateFormatPipe implements PipeTransform {

  transform(value: string): string {
    let valueToIterate;
    if(value == null){
      valueToIterate = "";
    }else{
      valueToIterate = value.toString();
    }
    return valueToIterate.substring(0,2) + "/" + valueToIterate.substring(2,4);
  }

}
