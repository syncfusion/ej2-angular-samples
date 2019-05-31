import { Component, OnInit } from '@angular/core';
import { data } from './data';
import { SelectionService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej-gridselection',
    templateUrl: 'selection.html',
    providers: [SelectionService]
})
export class SelectionComponent implements OnInit {
    public data: Object[];
    public selectOptions: Object;
    public pageSettings: Object;

    ngOnInit(): void {
        this.data = data;
        this.selectOptions = { type: 'Multiple' };
        this.pageSettings = { pageCount: 5 };
    }
}