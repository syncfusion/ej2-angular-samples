/**
 * ListView Group Temlate Sample
 */

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { grouptemplatedata } from './dataSource';
import { SBDescriptionComponent } from '../common/dp.component';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'group-template.html',
    styleUrls: ['group-template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ListViewAllModule, SBDescriptionComponent]
})

export class GroupTemplateListViewComponent {

    //Define an array of JSON data
    public dataSource: object = grouptemplatedata;

    //Map the appropriate columns to fields property
    public fields: Object = { text: 'Name', groupBy: 'order' };
    public headerTitle: string = 'Settings';
    public cssClass: string = 'e-list-template';

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['group-template.css'];
    }

}
