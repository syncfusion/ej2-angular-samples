import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { orderDetails } from './data';
import { SelectionService } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej-gridselect',
    templateUrl: 'checkboxselection.html',
    providers: [SelectionService],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxSelectionComponent implements OnInit {
    public data: Object[];
    public selectOptions: Object;

    public ngOnInit(): void {
        this.data = orderDetails;
        this.selectOptions = { persistSelection: true };
    }
}