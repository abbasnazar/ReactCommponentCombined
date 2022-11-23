import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "unique"
})
export class UniquePipe implements PipeTransform {
  transform(value: any, key: string): any {
    if (value == undefined || value == null) return;
    else {
      if (value.length > 0 && typeof value[0] === "object") {
        return value.filter(
          (obj, index, filterarr) =>
            obj &&
            filterarr.findIndex(x => {
              if (x[key] != null) return x[key] === obj[key];
              else return;
            }) === index
        );
      } else {
        return value;
      }
    }
  }
}
