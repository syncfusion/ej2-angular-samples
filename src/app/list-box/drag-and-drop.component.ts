import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { FieldSettingsModel, DragEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';
import { ListBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
/**
 * Drag And Drop ListBox sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'drag-and-drop.html',
    styleUrls: ['drag-and-drop.css'],
    encapsulation: ViewEncapsulation.None
})

export class DragAndDropListBoxComponent {
    @ViewChild('listbox1') public listObj1: ListBoxComponent; @ViewChild('listbox2') public listObj2: ListBoxComponent;
    public dataA: DataManager = new DataManager({
        json: [
            { Name: 'Australia', Code: 'AU' },
            { Name: 'Bermuda', Code: 'BM' },
            { Name: 'Canada', Code: 'CA' },
            { Name: 'Cameroon', Code: 'CM' },
            { Name: 'Denmark', Code: 'DK' },
            { Name: 'France', Code: 'FR' },
            { Name: 'Finland', Code: 'FI' },
            { Name: 'Germany', Code: 'DE' },
            { Name: 'Hong Kong', Code: 'HK' }
        ]
    });
    public fields: FieldSettingsModel = { text: 'Name' };
    public dataB: DataManager = new DataManager({
        json: [
            { Name: 'India', Code: 'IN' },
            { Name: 'Italy', Code: 'IT' },
            { Name: 'Japan', Code: 'JP' },
            { Name: 'Mexico', Code: 'MX' },
            { Name: 'Norway', Code: 'NO' },
            { Name: 'Poland', Code: 'PL' },
            { Name: 'Switzerland', Code: 'CH' },
            { Name: 'United Kingdom', Code: 'GB' },
            { Name: 'United States', Code: 'US' }
        ]
    });
    public modifiedDataA: ModifiedRecords = { addedRecords: [], deletedRecords: [], changedRecords: [] };
    public modifiedDataB: ModifiedRecords = { addedRecords: [], deletedRecords: [], changedRecords: [] };
    public saveChanges(): void {
        this.dataA.saveChanges(this.modifiedDataA, this.fields.text);
        this.dataB.saveChanges(this.modifiedDataB, this.fields.text);
        this.modifiedDataA.addedRecords = []; this.modifiedDataB.addedRecords = [];
    }
    public onDropGroupA(args: DragEventArgs): void {
        args.items.forEach((item: { [key: string]: Object; }): void => {
            /*Preventing item manipulation while doing drag and drop within same list box.*/
            if (!this.listObj1.getDataByValue(item[this.fields.text] as string)) {
                this.modifiedDataB.addedRecords.push(item);
                this.modifiedDataA.deletedRecords.push(item);
            }
        });
    }
    public onDropGroupB(args: DragEventArgs): void {
        args.items.forEach((item: { [key: string]: Object; }): void => {
            if (!this.listObj2.getDataByValue(item[this.fields.text] as string)) {
                this.modifiedDataA.addedRecords.push(item);
                this.modifiedDataB.deletedRecords.push(item);
            }
        });
    }
}
interface ModifiedRecords {
    addedRecords: { [key: string]: Object }[];
    deletedRecords: { [key: string]: Object }[];
    changedRecords: { [key: string]: Object }[];
}
