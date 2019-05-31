import { Component, ViewEncapsulation } from '@angular/core';
import { FieldSettingsModel, ChangeEventArgs, SelectionMode, SelectionSettingsModel } from '@syncfusion/ej2-angular-dropdowns';
import { SortOrder } from '@syncfusion/ej2-lists';
/**
 * ListBox Api sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.css'],
    encapsulation: ViewEncapsulation.None
})

export class ApiListBoxComponent {
    public data: { [key: string]: Object }[] = [
        { Vegetable: 'Cabbage', Category: 'Leafy and Salad', Id: 'item1' },
        { Vegetable: 'Spinach', Category: 'Leafy and Salad', Id: 'item2' },
        { Vegetable: 'Wheat grass', Category: 'Leafy and Salad', Id: 'item3' },
        { Vegetable: 'Yarrow', Category: 'Leafy and Salad', Id: 'item4' },
        { Vegetable: 'Pumpkins', Category: 'Leafy and Salad', Id: 'item5' },
        { Vegetable: 'Chickpea', Category: 'Beans', Id: 'item6' },
        { Vegetable: 'Green bean', Category: 'Beans', Id: 'item7' },
        { Vegetable: 'Horse gram', Category: 'Beans', Id: 'item8' },
        { Vegetable: 'Garlic', Category: 'Bulb and Stem', Id: 'item9' },
        { Vegetable: 'Nopal', Category: 'Bulb and Stem', Id: 'item10' },
        { Vegetable: 'Onion', Category: 'Bulb and Stem', Id: 'item11' }
    ];
    // Map the appropriate columns to fields property along with groupBy option.
    public fields: FieldSettingsModel = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    public selectionSettings: SelectionSettingsModel = { mode: 'Multiple' };
    public sortOrder: SortOrder = 'None';
    public ddlData1: { [key: string]: Object }[] = [{ type: 'None' }, { type: 'Ascending' }, { type: 'Descending' }];
    public ddlData2: { [key: string]: Object }[] = [{ type: 'Single' }, { type: 'Multiple' }];
    public ddlFields: Object = { text: 'type', value: 'type' };
    public selectionChange(args: ChangeEventArgs) {
        this.selectionSettings = { mode: args.value as SelectionMode };
    }
    public sortChange(args: ChangeEventArgs) {
        this.sortOrder = args.value as SortOrder;
    }
}
