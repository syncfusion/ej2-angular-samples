import { Component, OnInit, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, PivotViewModule,IDataSet, LoadEventArgs } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { enableRipple, isNullOrUndefined } from '@syncfusion/ej2-base';
import { csvdata } from './csvData';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table sample for Local data source.
 */
/* tslint:disable */
declare var require: any;
let data: IDataSet[] = require('./rData.json');
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['local.css'],
    templateUrl: 'local.html',
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule]
})

export class LocalComponent implements OnInit {
    public jsonReport: IDataOptions;
    public csvReport: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    public dropDownData: Object[] = [
        { Id: 'JSON', Data: 'JSON' },
        { Id: 'CSV', Data: 'CSV' }
      ];
    public fields: Object = { text: 'Data', value: 'Id' };
    public waterMark: string = 'Select a Data type';
    public value: string = 'JSON';
    groupDate(data: IDataSet[]): IDataSet[] {
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
        return data;
    }

    getCSVData(): string[][] {
        let dataSource: string[][] = [];
        let jsonObject: string[] = csvdata.split(/\r?\n|\r/);
        for (let i: number = 0; i < jsonObject.length; i++) {
            if (!isNullOrUndefined(jsonObject[i]) && jsonObject[i] !== '') {
                dataSource.push(jsonObject[i].split(','));
            }
        }
        return dataSource;
    }

    onChange(args: ChangeEventArgs): void {
        if (args.value === 'JSON') {
            this.pivotObj.dataSourceSettings = this.jsonReport;
        } else if (args.value === 'CSV') {
            this.csvReport.dataSource = this.getCSVData();
            this.pivotObj.dataSourceSettings = this.csvReport;
        }
    }

    onLoad(args: LoadEventArgs): void {
        if (args.dataSourceSettings.type === 'CSV') {
            args.dataSourceSettings.dataSource = this.getCSVData();
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 120
        } as GridSettings;

        this.jsonReport = {
            dataSource: this.groupDate(data),
            type: 'JSON',
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
            drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
            rows: [
                { name: 'Year', caption: 'Production Year' },
                { name: 'HalfYear', caption: 'Half Year' },
                { name: 'Quarter', caption: 'Quarter' }
            ],
            columns: [
                { name: 'EnerType', caption: 'Energy Type' },
                { name: 'EneSource', caption: 'Energy Source' }
            ],
            values: [
                { name: 'PowUnits', caption: 'Units (GWh)' },
                { name: 'ProCost', caption: 'Cost (MM)' }
            ],
            filters: []
        };

        this.csvReport = {
            type: 'CSV',
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'Total Cost', format: 'C0' }, { name: 'Total Revenue', format: 'C0' }, { name: 'Total Profit', format: 'C0' }],
            drilledMembers: [{ name: 'Item Type', items: ['Baby Food'] }],
            rows: [
                { name: 'Region' },
                { name: 'Country' }
            ],
            columns: [
                { name: 'Item Type' },
                { name: 'Sales Channel' }
            ],
            values: [
                { name: 'Total Cost' },
                { name: 'Total Revenue' },
                { name: 'Total Profit' }
            ],
            filters: []
        };
    }
}