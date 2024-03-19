import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { MultiSelectComponent, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'grouping-with-checkbox.html',
    styleUrls: ['grouping-with-checkbox.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiSelectModule, SBDescriptionComponent]
})
export class CheckboxGroupingMultiSelectComponent {
    //define the data with category
    public vegetables: { [key: string]: Object }[] = [
        { "Vegetable": "Cabbage", "Category": "Leafy and Salad", "Id": "item1" },
        { "Vegetable": "Chickpea", "Category": "Beans", "Id": "item2" },
        { "Vegetable": "Garlic", "Category": "Bulb and Stem", "Id": "item3" },
        { "Vegetable": "Green bean", "Category": "Beans", "Id": "item4" },
        { "Vegetable": "Horse gram", "Category": "Beans", "Id": "item5" },
        { "Vegetable": "Nopal", "Category": "Bulb and Stem", "Id": "item6" },
        { "Vegetable": "Onion", "Category": "Bulb and Stem", "Id": "item7" },
        { "Vegetable": "Pumpkins", "Category": "Leafy and Salad", "Id": "item8" },
        { "Vegetable": "Spinach", "Category": "Leafy and Salad", "Id": "item9" },
        { "Vegetable": "Wheat grass", "Category": "Leafy and Salad", "Id": "item10" },
        { "Vegetable": "Yarrow", "Category": "Leafy and Salad", "Id": "item11" }
    ];
    // map the groupBy field with category column
    public checkFields: Object = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    // set the placeholder to the MultiSelect input
    public checkWaterMark: string = 'Select vegetables';
    // set enableGroupCheckBox value to the Multiselect input
    public enableGroupCheckBox: boolean = true;
    // set mode value to the multiselect input
    public mode: string = 'CheckBox';
    // set filterBarPlaceholder value to the Multiselect input
    public filterBarPlaceholder: string = 'Search Vegetables'
}