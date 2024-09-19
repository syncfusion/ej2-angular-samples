/**
 * MultiSelect Virtualization Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MultiSelectComponent, VirtualScroll, MultiSelectModule, DropDownListComponent, DropDownListModule, visualMode } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

MultiSelectComponent.Inject(VirtualScroll);

@Component({
    selector: 'control-content',
    templateUrl: 'virtual-scroll.html',
    styleUrls: ['virtual-scroll.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiSelectModule, DropDownListModule, CheckBoxModule, SBDescriptionComponent]
})
export class VirtualScrollMultiSelectComponent {
    @ViewChild('local')
    public local: MultiSelectComponent;
    @ViewChild('remote')
    public remote: MultiSelectComponent;
    @ViewChild('default')
    public default: MultiSelectComponent;
    @ViewChild('group')
    public group: MultiSelectComponent;
    @ViewChild('template')
    public template: MultiSelectComponent;
    @ViewChild('allowFiltering')
    public allowFiltering: CheckBoxComponent;
    @ViewChild('allowCustomValue')
    public allowCustomValue: CheckBoxComponent;
    @ViewChild('hideSelectedItem')
    public hideSelectedItem: CheckBoxComponent;
    @ViewChild('closePopupOnSelect')
    public closePopupOnSelect: CheckBoxComponent;
    @ViewChild('mode')
    // country DropDownList instance
    public mode: DropDownListComponent;
    // defined the array of data
    public records: { [key: string]: Object }[] = [];
    constructor() {
        for (let i = 1; i <= 150; i++) {
            let item: { [key: string]: Object } = {};
            item.id = 'id' + i;
            item.text = `Item ${i}`;
        
            // Generate a random number between 1 and 4 to determine the group
            const randomGroup = Math.floor(Math.random() * 4) + 1;
            switch (randomGroup) {
                case 1:
                    item.group = 'Group A';
                    break;
                case 2:
                    item.group = 'Group B';
                    break;
                case 3:
                    item.group = 'Group C';
                    break;
                case 4:
                    item.group = 'Group D';
                    break;
                default:
                    break;
            }
            this.records.push(item);
        }
    }
    public defaultMode : string = 'Default';
    public box : string = 'Box';
    public delimiter : string = 'Delimiter';
    public checkBox : string = 'CheckBox';
    // bind the DataManager instance to dataSource property
    public customerData: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/angular/production/api/VirtualDropdownData',
        adaptor: new UrlAdaptor,
        crossDomain: true
    });
    public onChange(): void {
        // enable or disable the select all in Multiselect based on CheckBox checked state
        this.local.allowFiltering = this.allowFiltering.checked;
        this.remote.allowFiltering = this.allowFiltering.checked;
        this.group.allowFiltering = this.allowFiltering.checked;
        this.default.allowFiltering = this.allowFiltering.checked;
        this.template.allowFiltering = this.allowFiltering.checked;
    }
    public onChangeCustom(): void {
        // enable or disable the select all in Multiselect based on CheckBox checked state
        this.local.allowCustomValue = this.allowCustomValue.checked;
        this.remote.allowCustomValue = this.allowCustomValue.checked;
        this.group.allowCustomValue = this.allowCustomValue.checked;
        this.default.allowCustomValue = this.allowCustomValue.checked;
        this.template.allowCustomValue = this.allowCustomValue.checked;
    }
    public onChangeHide(): void {
        // enable or disable the select all in Multiselect based on CheckBox checked state
        this.local.hideSelectedItem = this.hideSelectedItem.checked;
        this.remote.hideSelectedItem = this.hideSelectedItem.checked;
        this.default.hideSelectedItem = this.hideSelectedItem.checked;
        this.template.hideSelectedItem = this.hideSelectedItem.checked;
    }
    public onChangeClose(): void {
        // enable or disable the select all in Multiselect based on CheckBox checked state
        this.local.closePopupOnSelect = this.closePopupOnSelect.checked;
        this.remote.closePopupOnSelect = this.closePopupOnSelect.checked;
        this.default.closePopupOnSelect = this.closePopupOnSelect.checked;
        this.template.closePopupOnSelect = this.closePopupOnSelect.checked;
    }
    // maps the appropriate column to fields property
    public fields: { [key: string]: string } = { text: 'text', value: 'id' };
    public value = ['id10', 'id50', 'id100', "custom"];
    public customerField: { [key: string]: string } = { text: 'OrderID', value: 'OrderID' };
    public groupField: { [key: string]: string } = { groupBy: 'group', text: 'text', value: 'id' };
    public waterMark: string = 'e.g. Item 1';
    public customerWaterMark: string = 'e.g OrderId';
}