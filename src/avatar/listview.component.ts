/**
 * Avatar Default Sample
 */

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { listdata} from './dataSource';

@Component({
    selector: 'control-content',
    templateUrl: 'listview.html',
    styleUrls: ['listview.css'],
    encapsulation: ViewEncapsulation.None
})

export class ListViewAvatarComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['listview.css'];
    }

    // Listview datasource with avatar and image source fields
    public dataSource: { [key: string]: Object; }[] = listdata;
    public headerTitle: string = 'Contacts';
    public sortOrder: string = 'Ascending';
}
