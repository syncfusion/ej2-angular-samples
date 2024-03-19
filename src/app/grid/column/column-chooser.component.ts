import { Component, OnInit } from '@angular/core';
import { ToolbarService, ColumnChooserService, SortService, GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { data } from './data';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'column-chooser.html',
    providers: [ToolbarService, ColumnChooserService, SortService, PageService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class ColumnChooserComponent implements OnInit {
    public data: Object[];
    public toolbar: string[];
    public pageSettings: Object;
    ngOnInit(): void {
         this.data = data;
         this.toolbar = ['ColumnChooser'];
         this.pageSettings ={ pageCount: 5 };
    }
}