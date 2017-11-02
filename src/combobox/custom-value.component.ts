/**
 * ComboBox Filtering Sample
 */
import { Component, ViewChild } from '@angular/core';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { ComboBoxComponent } from '@syncfusion/ej2-ng-dropdowns';

@Component({
    selector: 'control-content',
    styleUrls: ['custom-value.css'],
    templateUrl: 'custom-value.html'
})
export class CustomValueComboBoxComponent {
    public data: { [key: string]: Object; }[] = [
        { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' },
        { Name: 'Greenland', Code: 'GL' },
        { Name: 'Hong Kong', Code: 'HK' },
        { Name: 'India', Code: 'IN' },
        { Name: 'Italy', Code: 'IT' }
    ];
    public fields: Object = { text: 'Name', value: 'Code' };
    public height: string = '220px';
    public watermark: string = 'Select a country';
    public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
        let query: Query = new Query();
        query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
        e.updateData(this.data, query);
    }
    @ViewChild('sample')
    public comboObj: ComboBoxComponent;
    public addNewItem = () => {
        let customValue: string = (document.getElementsByClassName('e-input')[0] as HTMLInputElement).value;
        let newItem: { [key: string]: Object; } = {'Name': customValue, 'Code': customValue };
        (this.comboObj.dataSource as Object[]).push(newItem);
        this.comboObj.hidePopup();
        this.comboObj.addItem(newItem);
        this.comboObj.value = customValue;
    }
}