/**
 * Avatar Default Sample
 */

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import  dataSource from './dataSource.json';
import { SBDescriptionComponent } from '../common/dp.component';
import { NgIf } from '@angular/common';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'list-view.html',
    styleUrls: ['list-view.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ListViewModule, NgIf, SBDescriptionComponent]
})

export class ListViewAvatarComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['list-view.css'];
    }

    // Listview datasource with avatar and image source fields
    public dataSource: { [key: string]: Object }[] = dataSource.listdata;
    public headerTitle: string = 'Contacts';
    public sortOrder: string = 'Ascending';
}
