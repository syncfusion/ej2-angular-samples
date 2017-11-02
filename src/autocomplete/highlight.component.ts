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
    public autoCompleteObj: AutoCompleteComponent;
    public countriesData: { [key: string]: Object; }[] = [
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
        { Name: 'Italy', Code: 'IT' },
        { Name: 'Japan', Code: 'JP' },
        { Name: 'Mexico', Code: 'MX' },
        { Name: 'Norway', Code: 'NO' },
        { Name: 'Poland', Code: 'PL' },
        { Name: 'Switzerland', Code: 'CH' },
        { Name: 'United Kingdom', Code: 'GB' },
        { Name: 'United States', Code: 'US' }
    ];
    public fields: Object = { value: 'Name' };
    public filterData: string[] = ['Contains', 'StartsWith', 'EndsWith'];
    public width: string = '150px';
    public onChange(e: ChangeEventArgs): void {
        this.autoCompleteObj.filterType = <FilterType>e.itemData;
    }

}