import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { listdata } from './dataSource';
/**
 *  Sample for CSS Basic Layout Badge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'listview.html',
    styleUrls: ['listview.css'],
    encapsulation: ViewEncapsulation.None
})

export class ListviewController {
    // Datasource for listview, badge field is the class data for Badges
    public dataSource: { [key: string]: Object }[] = listdata;

    // Map fields
    public fields: object = { groupBy: 'type' };

    public onActionComplete() {
        let list: HTMLElement = document.getElementById('lists').getElementsByClassName('e-list-group-item')[0] as HTMLElement;
        list.style.display = 'none';
    }
}
