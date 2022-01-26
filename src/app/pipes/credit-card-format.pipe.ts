import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardFormat'
})
export class CreditCardFormatPipe implements PipeTransform {

  transform(value: string):  string {
    
    let formattedValue = "";

    for (let i = 0; i < value.length; i++) {
      if(i>15){
        return formattedValue;
      }
      if(i%4 == 0 && i != 0){
        formattedValue += " ";
      }
      formattedValue += value.charAt(i);
    }
    return formattedValue;
    
  }

}
