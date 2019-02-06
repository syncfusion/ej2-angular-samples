import { Component, OnInit, ViewChild } from '@angular/core';
import { orderDataSource } from './data';
import { EditService, ToolbarService, PageService, NewRowPosition } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'ej-gridnormaledit',
    templateUrl: 'normal-edit.html',
    providers: [ToolbarService, EditService, PageService]
})
export class NormalEditComponent implements OnInit {
    @ViewChild('ddsample')
    public dropDown: DropDownListComponent;
    public data: Object[];
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public editparams: Object;
    public pageSettings: Object;
    public formatoptions: Object;

    public ngOnInit(): void {
        this.data = orderDataSource;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.freightrules = { required: true };
        this.editparams = { params: { popupHeight: '300px' } };
        this.pageSettings = { pageCount: 5 };
        this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' }
    }

    public newRowPosition: { [key: string]: Object }[] = [
        { id: 'Top', newRowPosition: 'Top' },
        { id: 'Bottom', newRowPosition: 'Bottom' }
    ];
    public localFields: Object = { text: 'newRowPosition', value: 'id' };

    public onChange(e: ChangeEventArgs): void {
        let gridInstance: any = (<any>document.getElementById('Normalgrid')).ej2_instances[0];
        (gridInstance.editSettings as any).newRowPosition = <NewRowPosition>this.dropDown.value;
    }

    actionBegin(args: any) :void {
        let gridInstance: any = (<any>document.getElementById('Normalgrid')).ej2_instances[0];
        if (args.requestType === 'save') {
            if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
                args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
            } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
                args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
            }
        }
    }
}
