/**
 * ListView Default Sample
 */

import { Component, Inject } from '@angular/core';
import * as dataSource from './dataSource.json';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls:['list-view.css']
})

export class DefaultListViewComponent {

    //Define an array of JSON data
    public data: Object[] = (dataSource as any).checkboxdata;

    //Define an array of JSON data
    public groupData: { [key: string]: Object }[] = (dataSource as any).groupData;

    //Map the appropriate columns to fields property
    public fields: Object = { groupBy: 'category' };

    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['list-view.css'];
    }

}
