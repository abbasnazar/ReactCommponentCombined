import { Pipe, PipeTransform, Injectable } from '@angular/core';
@Pipe({
    name: 'search'
})

@Injectable()
export class SearchPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        
        return items.filter(it => {
            if(typeof it === 'object'){
                for (const key in it) {
                    let temp = String(it[key]).toLowerCase()
                    if(temp.indexOf(searchText.toLowerCase()) !==-1)
                        return true;
                    else
                        continue;    
                }
                return false
            }
            else if(typeof it === 'string'){
                if (it.indexOf(searchText.toLowerCase()) !== -1)
                    return true;
                return false
            }
            return true
        });
    }
}