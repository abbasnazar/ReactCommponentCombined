import { NgModule } from "@angular/core";
import { UniquePipe } from "./unique.pipe";
import { FilterPipe } from "./filter.pipe";
import { SearchPipe } from "./search.pipe";
import { OrderByPipe } from './order-by.pipe';


@NgModule({
    declarations:[UniquePipe,FilterPipe,SearchPipe, OrderByPipe],
    exports: [UniquePipe, FilterPipe, SearchPipe, OrderByPipe]
})

export class PipeModule {}