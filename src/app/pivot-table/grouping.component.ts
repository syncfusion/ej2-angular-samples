import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, GroupingBarService, PivotViewModule,PivotView, DateGroup, IDataSet, LoadEventArgs } from '@syncfusion/ej2-angular-pivotview';
import { ColumnRenderEventArgs } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple, extend } from '@syncfusion/ej2-base';
import { MultiSelect, MultiSelectModule, SelectEventArgs, RemoveEventArgs, CheckBoxSelection } from '@syncfusion/ej2-angular-dropdowns';
import { GroupSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Observable } from 'rxjs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

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
    providers: [GroupingBarService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, NumericTextBoxModule, ButtonModule, PivotViewModule, MultiSelectModule]
})
export class GroupingComponent implements OnInit {
    public selectedGroups: string[] = ['Years', 'Months', 'Days'];
    public groupData: string[] = ['Years', 'Quarters', 'Months', 'Days'];
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public value: string[] =  ['Years', 'Months', 'Days'];
    public waterMark: string = 'Select group';
    public filterBarWaterMark: string = 'Search group';
    public mode: string = 'CheckBox';
    public observable = new Observable();

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('numbergroup')
    public numberGroup: NumericTextBoxComponent;
    @ViewChild('apply')
    public applyBtn: ButtonComponent;
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

    select (args: SelectEventArgs): void {
        this.applyGroupSettings(args);
    }
    removed (args: RemoveEventArgs): void {
        this.applyGroupSettings(args);
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140,
            columnRender: this.observable.subscribe(args => {
                if (((args as any).dataSourceSettings.rows as any).length > 3 && (args as any).columns[0].width <= 250) {
                    (args as any).columns[0].width = 285;
                }
            }) as any
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