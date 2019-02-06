/**
 * ListView Default Sample
 */

import { Component, Inject } from '@angular/core';
import { groupData, checkboxdata } from './dataSource';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['listview.css']
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
