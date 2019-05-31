import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { orderDetails } from './data';
import { EditService, ToolbarService, SelectionService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej-gridselect',
    templateUrl: 'checkbox-selection.html',
    providers: [SelectionService],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxSelectionComponent implements OnInit {
    public data: Object[];
    public selectOptions: Object;
    public editSettings: Object;
    public toolbar: string[];

    public ngOnInit(): void {
        this.data = orderDetails;
        this.selectOptions = { persistSelection: true };
        this.editSettings = { allowDeleting: true };
        this.toolbar = ['Delete'];
    }
}