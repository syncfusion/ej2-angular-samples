import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'selection-limit.html',
    styleUrls: ['checkbox.css'],
    encapsulation: ViewEncapsulation.None
})
export class SelectLimitComponent implements OnInit {
    @ViewChild('checkbox')
    public mulObj: MultiSelectComponent;
    @ViewChild('selectall')
    public checkboxObj: CheckBoxComponent;
    public mode: string;
    public filterPlaceholder: string;
    //define the data with category
    public countries: { [key: string]: Object }[] = [
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
    // map the groupBy field with category column
    public checkFields: Object = { text: 'Name', value: 'Code' };
    // set the placeholder to the MultiSelect input
    public checkWaterMark: string = 'Select countries';
    // set the MultiSelect popup height
    public popHeight: string = '350px';
    // set the maximum selection length in Multiselect.
    public maxSelection: number = 3;
    ngOnInit(): void {
        this.mode = 'CheckBox';
        this.filterPlaceholder = 'Search countries';
    }
    clickMe(): void {
        this.mulObj.value = null;
        this.mulObj.maximumSelectionLength = parseFloat((document.getElementById('maxSel') as HTMLInputElement).value);
    }
}