/**
 * ListView Call History Sample
 */

import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { Browser } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'call-history.html',
    styleUrls: ['call-history.css'],
    encapsulation: ViewEncapsulation.None
})

export class CallHistoryListViewComponent {

    public listObjects: any;

    // Mapping Tab items Header property
    public tabHeader: Object = [{ text: 'All' }, { text: 'Received' }, { text: 'Missed' }];

    public callHistoryData: { [key: string]: Object }[] = [
        { text: 'Smith', id: 'received-01', icon: 'e-custom', type: 'received', group: 'Received', time: '2 hours ago', category: 'Today' },
        {
            text: 'Johnson', id: 'received-02', icon: 'e-custom', type: 'received',
            group: 'Received', time: 'Yesterday', category: 'Yesterday'
        },
        { text: 'Williams', id: 'missed-01', icon: 'e-custom', type: 'missed', group: 'Missed', time: '4 hours ago', category: 'Today' },
        { text: 'Jones', id: 'missed-02', icon: 'e-custom', type: 'missed', group: 'Missed', time: 'Yesterday', category: 'Yesterday' },
        {
            text: 'Brown', id: 'received-03', icon: 'e-custom', type: 'received',
            group: 'Received', time: 'Yesterday', category: 'Yesterday'
        },
        {
            text: 'Anderson', id: 'received-01', icon: 'e-custom', type: 'received',
            group: 'Received', time: '12 hours ago', category: 'Today'
        },
        {
            text: 'Thomas', id: 'received-02', icon: 'e-custom', type: 'received',
            group: 'Received', time: 'Yesterday', category: 'Yesterday'
        },
        { text: 'Jackson', id: 'missed-01', icon: 'e-custom', type: 'missed', group: 'Missed', time: 'Yesterday', category: 'Yesterday' },
        { text: 'Emily', id: 'missed-01', icon: 'e-custom', type: 'missed', group: 'Missed', time: '14 hours ago', category: 'Today' },
        { text: 'White', id: 'missed-02', icon: 'e-custom', type: 'missed', group: 'Missed', time: 'Yesterday', category: 'Yesterday' },
        { text: 'Jones', id: 'missed-02', icon: 'e-custom', type: 'missed', group: 'Missed', time: '18 hours ago', category: 'Today' },
        { text: 'Grace', id: 'missed-02', icon: 'e-custom', type: 'missed', group: 'Missed', time: 'Yesterday', category: 'Yesterday' },
        { text: 'Brooklyn', id: 'missed-02', icon: 'e-custom', type: 'missed', group: 'Missed', time: 'Yesterday', category: 'Yesterday' },
        {
            text: 'Arianna', id: 'received-01', icon: 'e-custom', type: 'received',
            group: 'Received', time: 'Yesterday', category: 'Yesterday'
        },
        {
            text: 'Katherine', id: 'received-02', icon: 'e-custom', type: 'received',
            group: 'Received', time: 'Yesterday', category: 'Yesterday'
        },
    ];

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

    ngOnInit() {
        if (!Browser.isDevice) {
            document.getElementsByClassName('layoutWrapper')[0].classList.add('e-device-layout');
        } else {
            document.getElementsByClassName('tabContainer')[0].classList.add('e-visbile-layer');
        }
    }
}
