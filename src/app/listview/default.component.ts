/**
 * ListView Default Sample
 */

import { Component, Inject } from '@angular/core';
import { groupData, checkboxdata } from './dataSource';
import { SBDescriptionComponent } from '../common/dp.component';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['listview.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, ListViewAllModule, SBDescriptionComponent]
})

export class DefaultListViewComponent {

    //Define an array of JSON data
    public data: Object[] = checkboxdata;

    //Define an array of JSON data
    public groupData: { [key: string]: Object }[] = groupData;

    //Map the appropriate columns to fields property
    public fields: Object = { groupBy: 'category' };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['listview.css'];
    }

}
