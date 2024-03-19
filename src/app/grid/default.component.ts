import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';
import { SortService, GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'default.html',
    providers: [SortService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class DefaultComponent implements OnInit {
    public data: Object[] = [];
    ngOnInit(): void {
        this.data = orderDetails;
    }
}