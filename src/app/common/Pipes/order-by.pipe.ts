import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log('value',value,'argfa',args);
    
    if(value.length == 0) return;
    
    value.sort((a:any,b:any)=>{
      if(a[args] < b[args]){
        return -1;
      }
      else if(a[args] > b[args]){
        return 1;
      }
      else{
        return 0
      }
    })
    return value
  }

}
