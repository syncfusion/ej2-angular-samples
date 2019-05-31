import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import * as dataSource from './dataSource.json';
/**
 *  Sample for CSS Basic Layout Badge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'list-view.html',
    styleUrls: ['list-view.css'],
    encapsulation: ViewEncapsulation.None
})

export class ListviewController {
    // Datasource for listview, badge field is the class data for Badges
    public dataSource: { [key: string]: Object }[] = (dataSource as any).listdata;

    // Map fields
    public fields: object = { groupBy: 'type' };

    public onActionComplete() {
        let list: HTMLElement = document.getElementById('lists').getElementsByClassName('e-list-group-item')[0] as HTMLElement;
        list.style.display = 'none';
    }
}
