import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import  dataSource from './dataSource.json';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
/**
 *  Sample for CSS Basic Layout Badge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'list-view.html',
    styleUrls: ['list-view.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ListViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class ListviewController {
    // Datasource for listview, badge field is the class data for Badges
    public dataSource: { [key: string]: Object }[] = dataSource.listdata;

    // Map fields
    public fields: object = { groupBy: 'type' };

    public onActionComplete() {
        let list: HTMLElement = document.getElementById('lists').getElementsByClassName('e-list-group-item')[0] as HTMLElement;
        list.style.display = 'none';
    }
}
