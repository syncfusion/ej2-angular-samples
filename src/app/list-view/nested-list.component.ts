/**
 * ListView Nested Sample
 */

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import * as dataSource from './dataSource.json';

@Component({
    selector: 'control-content',
    templateUrl: 'nested-list.html',
    styleUrls: ['list-view.css'],
    encapsulation: ViewEncapsulation.None
})

export class NestedListViewComponent {

    //Define an array of JSON data
    public data: { [key: string]: Object }[] = (dataSource as any).nesteddata;

    //Map appropriate columns to fields property
    public fields: { [key: string]: string } = {
        iconCss: 'icon', tooltip: 'text'
    };

    //Set header title
    public headerTitle: string = 'Folders';

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['list-view.css'];
    }

}
