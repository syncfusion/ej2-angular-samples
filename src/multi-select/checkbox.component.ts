import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'checkbox.html',
    styleUrls: ['checkbox.css'],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxMultiSelectComponent implements OnInit {
    @ViewChild('checkbox')
    public mulObj: MultiSelectComponent;
    @ViewChild('selectall')
    public checkboxObj: CheckBoxComponent;
    @ViewChild('dropdown')
    public dropdownObj: CheckBoxComponent;
    @ViewChild('select')
    public reorderObj: CheckBoxComponent;
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
    ngOnInit(): void {
        this.mode = 'CheckBox';
        this.filterPlaceholder = 'Search countries';
    }
    public onChange(): void {
        // enable or disable the select all in Multiselect based on CheckBox checked state
        this.mulObj.showSelectAll = this.checkboxObj.checked;
    }
    public onChangeDrop(): void {
        // enable or disable the dropdown button in Multiselect based on CheckBox checked state
        this.mulObj.showDropDownIcon = this.dropdownObj.checked;
    }
    public onChangeReorder(): void {
        // enable or disable the list reorder in Multiselect based on CheckBox checked state
        this.mulObj.enableSelectionOrder = this.reorderObj.checked;
    }
}