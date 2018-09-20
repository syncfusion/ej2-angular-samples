import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { renewableEnergy } from './data-source';
import { IDataOptions, PivotView, SummaryTypes, FieldListService } from '@syncfusion/ej2-angular-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Aggregation Sample.
 */

@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'aggregation.html',
    encapsulation: ViewEncapsulation.None,
    providers: [FieldListService],
    styleUrls: ['aggregation.css']
})
export class AggregationComponent implements OnInit {
    public dataSource: IDataOptions;
    public balanceDropDown: DropDownList;
    public quantityDropDown: DropDownList;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;

    setSummaryType(fieldName: string, summaryType: SummaryTypes): void {
        let isAvail: boolean = false;
        for (let vCnt: number = 0; vCnt < this.pivotGridObj.dataSource.values.length; vCnt++) {
            if (this.pivotGridObj.dataSource.values[vCnt].name === fieldName) {
                this.pivotGridObj.dataSource.values[vCnt].type = summaryType;
                isAvail = (<any>this.pivotGridObj.dataSource.values[vCnt]).properties ? false : true;
            }
        }
        if (isAvail) {
            this.pivotGridObj.updateDataSource();
        }
    }

    ngOnInit(): void {

        let balanceDropDown: DropDownList = new DropDownList({
            placeholder: 'Cost',
            floatLabelType: 'Auto',
            change: (args: ChangeEventArgs) => {
                this.setSummaryType('ProCost', args.value as SummaryTypes);
            }
        });
        balanceDropDown.appendTo('#pricedrpdwn');

        let summaryDropDown: DropDownList = new DropDownList({
            placeholder: 'Units',
            floatLabelType: 'Auto',
            change: (args: ChangeEventArgs) => {
                this.setSummaryType('PowUnits', args.value as SummaryTypes);
            }
        });
        summaryDropDown.appendTo('#freightdrpdwn');

        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource  = {
            enableSorting: true,
            formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
            drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
            columns: [
                { name: 'EnerType', caption: 'Energy Type' },
                { name: 'EneSource', caption: 'Energy Source' }
            ],
            data: renewableEnergy,
            expandAll: false,
            rows: [
                { name: 'Year', caption: 'Production Year' },
                { name: 'HalfYear', caption: 'Half Year' },
                { name: 'Quarter', caption: 'Quarter Year' }
            ],
            values: [
                { name: 'PowUnits', caption: 'Units (GWh)' },
                { name: 'ProCost', caption: 'Cost (MM)' }
            ],
            filters: []
        };
    }
}