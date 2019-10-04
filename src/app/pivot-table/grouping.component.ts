import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, GroupingBarService, PivotView, DateGroup, IDataSet, LoadEventArgs } from '@syncfusion/ej2-angular-pivotview';
import { ColumnRenderEventArgs } from '@syncfusion/ej2-angular-pivotview';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple, extend } from '@syncfusion/ej2-base';
import { MultiSelect, SelectEventArgs, RemoveEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { GroupSettingsModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/datasourcesettings-model';
enableRipple(false);
MultiSelect.Inject(CheckBoxSelection);

/**
 * Pivot Table Grouping Sample
 */
declare var require: any;
let data: any = require('./gData.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'grouping.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['grouping.css'],
    providers: [GroupingBarService]
})
export class GroupingComponent implements OnInit {
    public selectedGroups: string[] = ['Years', 'Months', 'Days'];
    public groupData: string[] = ['Years', 'Quarters', 'Months', 'Days'];
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public numberGroup: NumericTextBox;
    public dateGroup: MultiSelect;
    public applyBtn: Button;

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    /* tslint:disable */
    applyGroupSettings(args: any): void {
        if (args.name === 'select') {
            if (this.selectedGroups.indexOf(args.itemData) === -1) {
                this.selectedGroups.push(args.itemData);
            }
        } else {
            if (this.selectedGroups.indexOf(args.itemData) > -1) {
                var index = this.selectedGroups.indexOf(args.itemData);
                this.selectedGroups.splice(index, 1);
            }
        }
    }

    setColumnsRender(args: ColumnRenderEventArgs): void {
        if (args.dataSourceSettings.rows.length > 3 && args.columns[0].width <= 250) {
            args.columns[0].width = 285;
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSourceSettings = {
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'Sold', format: 'N0' },
            { name: 'Date', type: 'date', format: 'dd/MM/yyyy-hh:mm a' }],
            rows: [{ name: 'Date', caption: 'Date' }],
            columns: [{ name: 'Product_ID', caption: 'Product ID' },
            { name: 'Products', caption: 'Products' }],
            values: [{ name: 'Sold', caption: 'Unit Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [],
            groupSettings: [{ name: 'Date', type: 'Date', groupInterval: ['Years', 'Months', 'Days'] },
            { name: 'Product_ID', type: 'Number', rangeInterval: 4 }],
            dataSource: extend([], data, null, true) as IDataSet[]
        };

        this.dateGroup = new MultiSelect({
            dataSource: this.groupData,
            mode: 'CheckBox',
            showDropDownIcon: true,
            enableSelectionOrder: false,
            popupWidth: '150',
            width: '150',
            value: ['Years', 'Months', 'Days'],
            placeholder: 'Select group',
            filterBarPlaceholder: 'Search group',
            select: (args: SelectEventArgs): void => {
                this.applyGroupSettings(args);
            },
            removed: (args: RemoveEventArgs): void => {
                this.applyGroupSettings(args);
            }
        });
        this.dateGroup.appendTo('#dategroup');

        this.numberGroup = new NumericTextBox({
            width: '150',
            format: '###',
            min: 1,
            max: 10,
            value: 4,
            placeholder: "Example: 4"
        });
        this.numberGroup.appendTo('#numbergroup');

        this.applyBtn = new Button({
            isPrimary: true
        });
        this.applyBtn.appendTo('#group-apply');

        document.getElementById('group-apply').onclick = () => {
            let groupSettings: GroupSettingsModel[] = [];
            if (this.selectedGroups.length > 0) {
                groupSettings.push({ name: 'Date', type: 'Date', groupInterval: this.selectedGroups as DateGroup[] });
            }
            if (this.numberGroup.value > 1) {
                groupSettings.push({ name: 'Product_ID', type: 'Number', rangeInterval: this.numberGroup.value });
            }
            this.pivotObj.dataSourceSettings.groupSettings = groupSettings;
        };
    }
}