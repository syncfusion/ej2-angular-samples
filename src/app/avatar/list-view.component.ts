/**
 * Avatar Default Sample
 */

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import * as dataSource from './dataSource.json';

@Component({
    selector: 'control-content',
    templateUrl: 'list-view.html',
    styleUrls: ['list-view.css'],
    encapsulation: ViewEncapsulation.None
})

export class ListViewAvatarComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['list-view.css'];
    }

    // Listview datasource with avatar and image source fields
    public dataSource: { [key: string]: Object; }[] = (dataSource as any).listdata;
    public headerTitle: string = 'Contacts';
    public sortOrder: string = 'Ascending';
}
