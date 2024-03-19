import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, PageService, ColumnChooserService, ToolbarService, TreeGridAllModule} from '@syncfusion/ej2-angular-treegrid';
import {PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'columnchooser.html',
    providers: [ PageService, ColumnChooserService, ToolbarService ],
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent]

})
export class ColumnChooserComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: PageSettingsModel;
    public toolbar: string[];


    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
        this.toolbar = ['ColumnChooser'];
    }
}
