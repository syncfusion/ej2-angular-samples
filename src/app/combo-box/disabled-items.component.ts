/**
 * ComboBox Disabled Sample
 */
import { Component } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'disabled-items.html',
    styleUrls: ['disabled-items.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, ComboBoxModule, SBDescriptionComponent]
})
export class DisabledItemsComboBoxComponent {
    // defined the default disabled data
    public status: { [key: string]: Object }[] = [

        { "ID": 'state1', "Text": "Open", "State": false },
        { "ID": 'state2', "Text": "Waiting for Customer", "State": false },
        { "ID": 'state3', "Text": "On Hold", "State": true },
        { "ID": 'state4', "Text": "Follow-up", "State": false },
        { "ID": 'state5', "Text": "Closed", "State": true },
        { "ID": 'state6', "Text": "Solved", "State": false },
        { "ID": 'state7', "Text": "Feature Request", "State": false },

    ];
    // map the field with Disabled column
    public defaultFields: object = { value: "ID", text: "Text", disabled: "State" };
    // set the placeholder to ComboBox input element
    public defaultText: string = "Select Status";
    // defined the grouping with disabled data
    public groupingData: { [key: string]: Object }[] = [
        { "Vegetable": "Cabbage", "Category": "Leafy and Salad", "Id": "item1", "State": true },
        { "Vegetable": "Pumpkins", "Category": "Leafy and Salad", "Id": "item2", "State": false },
        { "Vegetable": "Spinach", "Category": "Leafy and Salad", "Id": "item3", "State": true },
        { "Vegetable": "Wheat grass", "Category": "Leafy and Salad", "Id": "item4", "State": false },
        { "Vegetable": "Yarrow", "Category": "Leafy and Salad", "Id": "item5", "State": false },
        { "Vegetable": "Chickpea", "Category": "Beans", "Id": "item6", "State": true },
        { "Vegetable": "Green bean", "Category": "Beans", "Id": "item7", "State": false },
        { "Vegetable": "Horse gram", "Category": "Beans", "Id": "item8", "State": true },
        { "Vegetable": "Garlic", "Category": "Bulb and Stem", "Id": "item9", "State": false },
        { "Vegetable": "Nopal", "Category": "Bulb and Stem", "Id": "item10", "State": true },
        { "Vegetable": "Onion", "Category": "Bulb and Stem", "Id": "item11", "State": false }
    ];
    // map the field with Disabled column
    public groupingFields: object = { groupBy: 'Category', text: 'Vegetable', value: 'Id', disabled: 'State' };
    // set the placeholder to ComboBox input element
    public groupingText: string = "Select Vegetable";
}