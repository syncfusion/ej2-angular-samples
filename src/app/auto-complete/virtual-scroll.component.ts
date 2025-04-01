/**
 * AutoComplete Default functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AutoCompleteComponent, VirtualScroll, AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

AutoCompleteComponent.Inject(VirtualScroll);
@Component({
    selector: 'control-content',
    templateUrl: 'virtual-scroll.html',
    styleUrls: ['virtual-scroll.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, AutoCompleteModule, SBDescriptionComponent]
})
export class VirtualScrollAutoCompleteComponent {
    @ViewChild('sample1')
    public localAutoCompleteObj: AutoCompleteComponent;
    @ViewChild('sample2')
    public remoteAutoCompleteObj: AutoCompleteComponent;
    @ViewChild('sample3')
    public groupAutoCompleteObj: AutoCompleteComponent;
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
    ngAfterViewInit(): void {
        if (this.localAutoCompleteObj) {
            this.localAutoCompleteObj.refresh();
        }
        if (this.remoteAutoCompleteObj) {
            this.remoteAutoCompleteObj.refresh();
        }
        if (this.groupAutoCompleteObj) {
            this.groupAutoCompleteObj.refresh();
        }
    }
    // bind the DataManager instance to dataSource property
    public customerData: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/js/production/api/VirtualDropdownData',
        adaptor: new UrlAdaptor,
        crossDomain: true
    });
    // maps the appropriate column to fields property
    public fields: { [key: string]: string } = { value: 'text' };
    public customerField: { [key: string]: string } = { value: 'OrderID' };
    public groupField: { [key: string]: string } = { groupBy: 'group', value: 'text' };
    public waterMark: string = 'e.g. Item 1';
    public customerWaterMark: string = 'OrderId';
}