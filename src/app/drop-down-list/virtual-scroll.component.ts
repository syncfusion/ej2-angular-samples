/**
 * AutoComplete Default functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DropDownListComponent, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

DropDownListComponent.Inject(VirtualScroll);

@Component({
    selector: 'control-content',
    templateUrl: 'virtual-scroll.html',
    styleUrls: ['virtual-scroll.css'],
    encapsulation: ViewEncapsulation.None
})
export class VirtualScrollDropDownListComponent {
    
    public listObj: DropDownListComponent;
    // defined the array of data
    public records: { [key: string]: Object }[] = [];
    constructor() {
        for (let i = 1; i <= 150; i++) {
            let item: { [key: string]: Object } = {};
            item.id = 'id' + i;
            item.text = `Item ${i}`;
        
            // Generate a random number between 1 and 4 to determine the group
            const randomGroup = Math.floor(Math.random() * 4) + 1;
            switch (randomGroup) {
                case 1:
                    item.group = 'Group A';
                    break;
                case 2:
                    item.group = 'Group B';
                    break;
                case 3:
                    item.group = 'Group C';
                    break;
                case 4:
                    item.group = 'Group D';
                    break;
                default:
                    break;
            }
            this.records.push(item);
        }
    }
    // bind the DataManager instance to dataSource property
    public customerData: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/js/production/api/orders',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    // maps the appropriate column to fields property
    public fields: { [key: string]: string } = { text: 'text', value: 'id' };
    public customerField: { [key: string]: string } = { text: 'OrderID', value: 'OrderID' };
    public groupField: { [key: string]: string } = { groupBy: 'group', text: 'text', value: 'id' };
    public waterMark: string = 'e.g. Item 1';
    public customerWaterMark: string = 'OrderId';
}