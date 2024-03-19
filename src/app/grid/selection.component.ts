import { Component, OnInit } from '@angular/core';
import { data } from './data';
import { SelectionService, SortService, GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridselection',
    templateUrl: 'selection.html',
    providers: [SelectionService, SortService, PageService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
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