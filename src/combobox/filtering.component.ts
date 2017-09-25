/**
 * ComboBox Filtering Sample
 */
import { Component } from '@angular/core';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'filtering.html'
})
export class FilteringComboBoxComponent {
    public data: { [key: string]: Object; }[] = [
        { name: 'Australia', code: 'AU' },
        { name: 'Bermuda', code: 'BM' },
        { name: 'Canada', code: 'CA' },
        { name: 'Cameroon', code: 'CM' },
        { name: 'Denmark', code: 'DK' },
        { name: 'France', code: 'FR' },
        { name: 'Finland', code: 'FI' },
        { name: 'Germany', code: 'DE' },
        { name: 'Greenland', code: 'GL' },
        { name: 'Hong Kong', code: 'HK' },
        { name: 'India', code: 'IN' },
        { name: 'Italy', code: 'IT' },
        { name: 'Japan', code: 'JP' },
        { name: 'Mexico', code: 'MX' },
        { name: 'Norway', code: 'NO' },
        { name: 'Poland', code: 'PL' },
        { name: 'Switzerland', code: 'CH' },
        { name: 'United Kingdom', code: 'GB' },
        { name: 'United States', code: 'US' }
    ];
    public fields: Object = { text: 'name', value: 'code' };
    public height: string = '220px';
    public watermark: string = 'Select a country';
    public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
        let query: Query = new Query();
        query = (e.text !== '') ? query.where('name', 'startswith', e.text, true) : query;
        e.updateData(this.data, query);
    }
}