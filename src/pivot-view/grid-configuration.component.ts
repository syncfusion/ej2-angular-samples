import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { defaultData } from './data-source';
import { IDataOptions, PivotView, FieldListService } from '@syncfusion/ej2-angular-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs as Change } from '@syncfusion/ej2-angular-buttons';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { CheckBox } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView sample with Grid Configurations.
 */

@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'grid-configuration.html',
    styleUrls: ['grid-configuration.css'],
    providers: [FieldListService],
    encapsulation: ViewEncapsulation.None
})
export class GridConfigComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridLineType: DropDownList;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    changeHandler(args: Change): void {
        if ((args.event.target as HTMLElement).id === 'reorder') {
            this.pivotGridObj.gridSettings.allowReordering = args.checked;
        } else if ((args.event.target as HTMLElement).id === 'resize') {
            this.pivotGridObj.gridSettings.allowResizing = args.checked;
        } else {
            this.pivotGridObj.gridSettings.allowTextWrap = args.checked;
        }
    }

    change(args: ChangeEventArgs): void {
        (this.pivotGridObj.gridSettings.gridLines as any) = args.value;
    }

    ngOnInit(): void {
        this.gridSettings = {
            allowReordering: true,
            allowResizing: true,
            columnWidth: 140
        } as GridSettings;

        let reorder: CheckBox = new CheckBox({ label: 'Allow Reordering', checked: true, change: this.changeHandler.bind(this) });
        reorder.appendTo('#reorder');

        let resize: CheckBox = new CheckBox({ label: 'Allow Resizing', checked: true, change: this.changeHandler.bind(this) });
        resize.appendTo('#resize');

        let autowrap: CheckBox = new CheckBox({ label: 'Allow Text Wrap', checked: false, change: this.changeHandler.bind(this) });
        autowrap.appendTo('#autowrap');

        let lines: { [key: string]: Object }[] = [
            { id: 'Default', type: 'Default' },
            { id: 'Both', type: 'Both' },
            { id: 'None', type: 'None' },
            { id: 'Horizontal', type: 'Horizontal' },
            { id: 'Vertical', type: 'Vertical' }
        ];

        this.gridLineType = new DropDownList({
            placeholder: 'GridLines',
            floatLabelType: 'Auto',
            dataSource: lines,
            fields: { text: 'type', value: 'id' },
            value: 'Both',
            change: this.change.bind(this)
        });

        this.gridLineType.appendTo('#gridlines');

        this.dataSource = {
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Quarter' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
            data: defaultData,
            expandAll: false,
            filters: []
        };
    }
}