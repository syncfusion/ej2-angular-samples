import { Component, ViewEncapsulation, ViewChild  } from '@angular/core';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { MultiSelectComponent, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
@Component({
    selector: 'control-content',
    templateUrl: 'filtering.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiSelectModule, SBDescriptionComponent, NumericTextBoxModule]
})
export class FilteringMultiSelectComponent {
    @ViewChild('sample')
    public multiSelectObj: MultiSelectComponent;
    @ViewChild('numericTextBox')
    public numericTextBoxObj: NumericTextBoxComponent;
    // define the JSON of filtering data
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
        { Name: 'Italy', Code: 'IT' },
        { Name: 'Japan', Code: 'JP' },
        { Name: 'Mexico', Code: 'MX' },
        { Name: 'Norway', Code: 'NO' },
        { Name: 'Poland', Code: 'PL' },
        { Name: 'Switzerland', Code: 'CH' },
        { Name: 'United Kingdom', Code: 'GB' },
        { Name: 'United States', Code: 'US' }
    ];

    public query: Query = new Query();
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name', value: 'Code' };
    public watermarks: string = 'Select countries';
     public debounceDelay:string ='300';
    // filtering event handler to filter a country
    public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
        let query: Query = new Query();
        //frame the query based on search string with filter type.
        query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
        //pass the filter data source, filter query to updateData method.
        e.updateData(this.data, query);
    };
     public onChange(): void {
        this.multiSelectObj.debounceDelay = this.numericTextBoxObj.value;
    }
}