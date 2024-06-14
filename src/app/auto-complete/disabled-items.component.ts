/**
 * AutoComplete Disabled Item Sample
 */
import { Component } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'disabled-items.html',
    styleUrls: ['disabled-items.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, AutoCompleteModule, SBDescriptionComponent]
})
export class DisabledItemsAutoCompleteComponent {
    // defined the default disabled data
    public status: { [key: string]: Object }[] = [

        { "Status": "Open", "State": false },
        { "Status": "Waiting for Customer", "State": false },
        { "Status": "On Hold", "State": true },
        { "Status": "Follow-up", "State": false },
        { "Status": "Closed", "State": true },
        { "Status": "Solved", "State": false },
        { "Status": "Feature Request", "State": false },

    ];
    // map the field with Disabled column
    public defaultFields: object = { value: "Status", disabled: "State" };
    // set the placeholder to AutoComplete input element
    public defaultText: string = "Select Status";
    // defined the grouping with disabled data
    public groupingData: { [key: string]: Object }[] = [
        { "Vegetable": "Cabbage", "Category": "Leafy and Salad", "State": true },
        { "Vegetable": "Pumpkins", "Category": "Leafy and Salad", "State": false },
        { "Vegetable": "Spinach", "Category": "Leafy and Salad", "State": true },
        { "Vegetable": "Wheat grass", "Category": "Leafy and Salad", "State": false },
        { "Vegetable": "Yarrow", "Category": "Leafy and Salad", "State": false },
        { "Vegetable": "Chickpea", "Category": "Beans", "State": true },
        { "Vegetable": "Green bean", "Category": "Beans", "State": false },
        { "Vegetable": "Horse gram", "Category": "Beans", "State": true },
        { "Vegetable": "Garlic", "Category": "Bulb and Stem", "State": false },
        { "Vegetable": "Nopal", "Category": "Bulb and Stem", "State": true },
        { "Vegetable": "Onion", "Category": "Bulb and Stem", "State": false }
    ];
    // map the field with Disabled column
    public groupingFields: object = { groupBy: 'Category', value: 'Vegetable', disabled: 'State' };
    // set the placeholder to AutoComplete input element
    public groupingText: string = "Select Vegetable";
}