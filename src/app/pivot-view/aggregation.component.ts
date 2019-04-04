import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, SummaryTypes, FieldListService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Aggregation Sample.
 */
/* tslint:disable */
declare var require: any;
let data: IDataSet[] = require('./rData.json');
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
    onLoad(): void {
        if (data[0].Year === undefined) {
            let date: Date;
            for (let ln: number = 0, lt: number = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                let dtYr: number = date.getFullYear();
                let dtMn: number = date.getMonth();
                let dtdv: number = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        this.pivotGridObj.dataSource.data = data;
    }

    setSummaryType(fieldName: string, summaryType: SummaryTypes): void {
        let isAvail: boolean = false;
        for (let vCnt: number = 0; vCnt < this.pivotGridObj.dataSource.values.length; vCnt++) {
            if (this.pivotGridObj.dataSource.values[vCnt].name === fieldName) {
                this.pivotGridObj.dataSource.values[vCnt].type = summaryType;
                isAvail = true;
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

        this.dataSource = {
            enableSorting: true,
            formatSettings: [{ name: 'ProCost', format: 'C' }],
            drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
            columns: [
                { name: 'EnerType', caption: 'Energy Type' },
                { name: 'EneSource', caption: 'Energy Source' }
            ],
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