/**
 * AutoComplete Highlight Sample
 */
import { Component, ViewChild } from '@angular/core';
import { AutoCompleteComponent, ChangeEventArgs, FilterType} from '@syncfusion/ej2-ng-dropdowns';
@Component({
    selector: 'control-content',
    templateUrl: 'highlight.html'
})
export class HighlightAutoCompleteComponent {
    @ViewChild('sample')
    public AutoCompleteObj: AutoCompleteComponent;
    public countriesData: { [key: string]: Object; }[] = [
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
    public fields: Object = { value: 'name' };
    public filterData: string[] = ['Contains', 'StartsWith', 'EndsWith'];
    public width: string = '150px';
    public onChange(e: ChangeEventArgs): void {
        this.AutoCompleteObj.filterType = <FilterType>e.itemData;
    }

}