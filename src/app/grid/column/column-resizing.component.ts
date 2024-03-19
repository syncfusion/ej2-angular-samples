import { Component, OnInit } from '@angular/core'
import { ResizeService, SortService, GridModule } from '@syncfusion/ej2-angular-grids';
import { orderDetails } from './data';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'column-resizing.html',
    providers: [ResizeService, SortService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class ColumnResizingComponent implements OnInit {
    public data: Object[];
    ngOnInit(): void {
         this.data = orderDetails;
    }
}