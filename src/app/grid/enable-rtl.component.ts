import { Component, OnInit } from '@angular/core';
import { EditService, FilterService, GridComponent, GroupService, ReorderService, SortService, GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { data } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';



@Component({
    selector: 'ej2-gridrtl',
    templateUrl: 'enable-rtl.html',
    providers: [GroupService, SortService, ReorderService, EditService, FilterService, PageService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class RtlComponent implements OnInit {
    public data: Object[];
    public initialPage: Object;
    public editSettings: Object;
    public filterSettings: Object;

    ngOnInit(): void {
        this.data = data;
        this.initialPage = { pageSize: 10, pageCount: 2 };
        this.editSettings = { allowEditing: true, allowAdding: false, allowDeleting: false, mode: 'Normal' };
        this.filterSettings = { type: 'Menu' };
    }
}