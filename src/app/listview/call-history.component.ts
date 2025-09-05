/**
 * ListView Call History Sample
 */

import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { callHistoryData } from './dataSource';
import { SBDescriptionComponent } from '../common/dp.component';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'call-history.html',
    styleUrls: ['call-history.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, TabAllModule, ListViewAllModule, SBDescriptionComponent]
})

export class CallHistoryListViewComponent {

    public listObjects: any;

    // Mapping Tab items Header property
    public tabHeader: Object = [{ text: 'All' }, { text: 'Received' }, { text: 'Missed' }];

    public callHistoryData: { [key: string]: Object }[] = callHistoryData;

    public listFields: { [key: string]: string } = { text: 'text', groupBy: 'category' };
    public missedData: any;
    public receivedData: any;

    filterData(dataSource: { [key: string]: Object }[], value: string): { [key: string]: Object }[] {
        let newData: { [key: string]: Object }[] = [];
        dataSource.filter((data: { [key: string]: Object }) => {
            if ((<string>data.id).indexOf(value) !== -1) {
                newData.push(data);
            }
        });
        return newData;
    }
    public types: string[] = ['', 'received', 'missed'];
    onSelected(args: any) {
        let element01: any = document.getElementById('all');
        let element02: any = document.getElementById('received');
        let element03: any = document.getElementById('missed');
        if (element01.ej2_instances !== undefined) {
            this.listObjects = [element01.ej2_instances[0], element02.ej2_instances[0], element03.ej2_instances[0]];
            let newData: any;
            newData = this.filterData(this.callHistoryData, this.types[args.selectedIndex]);
            this.listObjects[args.selectedIndex].dataSource = newData;
        }

    }
}
