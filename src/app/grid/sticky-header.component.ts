import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';
import { SortService, GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridscroll',
    templateUrl: 'sticky-header.html',
    providers: [SortService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class StickyHeaderComponent implements OnInit {
    public data: Object[];

    public ngOnInit(): void {
        this.data = orderDetails.slice(0, 50);
     }
}
