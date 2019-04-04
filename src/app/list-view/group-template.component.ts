/**
 * ListView Group Temlate Sample
 */

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import * as dataSource from './dataSource.json';

@Component({
    selector: 'control-content',
    templateUrl: 'group-template.html',
    styleUrls: ['group-template.css'],
    encapsulation: ViewEncapsulation.None
})

export class GroupTemplateListViewComponent {

    //Define an array of JSON data
    public dataSource: object = (dataSource as any).grouptemplatedata;

    //Map the appropriate columns to fields property
    public fields: Object = { text: 'Name', groupBy: 'order' };
    public headerTitle: string = 'Settings';
    public cssClass: string = 'e-list-template';

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['group-template.css'];
    }

}
