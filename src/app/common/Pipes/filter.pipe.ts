import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterOn:any): any {
    if(value == undefined || value == null) return;
    else if(value.length > 0 && typeof value[0] === 'object' && typeof filterOn === 'object'){
      // console.log(filterOn);
      const filterArray = []
      value.forEach(item => {
          let flag = true
          for(let key in filterOn){
            if (filterOn[key] == undefined || filterOn[key] == 'undefined' || filterOn[key] == null || filterOn[key] == 'null' || filterOn[key] == 'all')
              continue; 
            if (item[key] != filterOn[key])
              flag = false
          }
          if(flag)
            filterArray.push(item)
      });
      return filterArray
    }
    else{
      return value
    }
  }

}
