/**
 * Avatar Default Sample
 */

import { Component, Inject, ViewEncapsulation } from '@angular/core';
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
    public dataSource: { [key: string]: Object }[] = [
        { "id": "s_01", "text": "Robert", "avatar": "", "pic": "pic04", "color": "" },
        { "id": "s_02", "text": "Nancy", "avatar": "N", "pic": "", "color": "green" },
        { "id": "s_05", "text": "John", "pic": "pic01", "avatar": "", "color": "" },
        { "id": "s_03", "text": "Andrew", "avatar": "A", "pic": "", "color": "blue" },
        { "id": "s_06", "text": "Michael", "pic": "pic02", "avatar": "", "color": "" },
        { "id": "s_07", "text": "Steven", "pic": "pic03", "avatar": "", "color": "" },
        { "id": "s_08", "text": "Margaret", "avatar": "M", "pic": "", "color": "red" }
    ];
    public headerTitle: string = 'Contacts';
    public sortOrder: string = 'Ascending';
}
