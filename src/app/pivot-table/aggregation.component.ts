import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, SummaryTypes, FieldListService, PivotViewModule, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Aggregation Sample.
 */
/* tslint:disable */
declare var require: any;
let data: IDataSet[] = require('./rData.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'aggregation.html',
    encapsulation: ViewEncapsulation.None,
    providers: [FieldListService],
    styleUrls: ['aggregation.css'],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule]
})
export class AggregationComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public options: { [key: string]: Object }[] = [
        { value: 'Sum', text: 'Sum' },
        { value: 'Avg', text: 'Avg' },
        { value: 'Median', text: 'Median' },
        { value: 'Min', text: 'Min' },
        { value: 'Max', text: 'Max' },
        { value: 'Count', text: 'Count' },
        { value: 'DistinctCount', text: 'DistinctCount' },
        { value: 'Product', text: 'Product' },
        { value: 'Index', text: 'Index' },
        { value: 'PopulationStDev', text: 'PopulationStDev' },
        { value: 'SampleStDev', text: 'SampleStDev' },
        { value: 'PopulationVar', text: 'PopulationVar' },
        { value: 'SampleVar', text: 'SampleVar' },
        { value: 'RunningTotals', text: 'RunningTotals' },
        { value: 'DifferenceFrom', text: 'DifferenceFrom' },
        { value: 'PercentageOfDifferenceFrom', text: 'PercentageOfDifferenceFrom' },
        { value: 'PercentageOfGrandTotal', text: 'PercentageOfGrandTotal' },
        { value: 'PercentageOfColumnTotal', text: 'PercentageOfColumnTotal' },
        { value: 'PercentageOfRowTotal', text: 'PercentageOfRowTotal' },
        { value: 'PercentageOfParentTotal', text: 'PercentageOfParentTotal' },
        { value: 'PercentageOfParentColumnTotal', text: 'PercentageOfParentColumnTotal' },
        { value: 'PercentageOfParentRowTotal', text: 'PercentageOfParentRowTotal' }
    ];

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('pricedrpdwn')
    public balanceDropDown: DropDownListComponent;
    @ViewChild('freightdrpdwn')
    public summaryDropDown: DropDownListComponent;

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
        this.pivotObj.dataSourceSettings.dataSource = data;
    }

    setSummaryType(fieldName: string, summaryType: SummaryTypes): void {
        let isAvail: boolean = false;
        for (let vCnt: number = 0; vCnt < this.pivotObj.dataSourceSettings.values.length; vCnt++) {
            if (this.pivotObj.dataSourceSettings.values[vCnt].name === fieldName) {
                if (this.pivotObj.dataSourceSettings.values[vCnt].name === 'PowUnits' && summaryType === 'Avg') {
                    this.pivotObj.setProperties({ dataSourceSettings: { formatSettings: [{ name: 'PowUnits', format: 'N2' }, { name: 'ProCost', format: 'C' }] } }, true);
                } else {
                    this.pivotObj.setProperties({ dataSourceSettings: { formatSettings: [{ name: 'PowUnits', format: 'N' }, { name: 'ProCost', format: 'C' }] } }, true);
                }
                this.pivotObj.dataSourceSettings.values[vCnt].type = summaryType;
                isAvail = true;
            }
        }
        if (isAvail) {
            this.pivotObj.updateDataSource();
        }
    }

    changePricedrpdwn (args: ChangeEventArgs) {
        this.setSummaryType('ProCost', args.value as SummaryTypes);
    }

    changeFreightdrpdwn (args: ChangeEventArgs) {
        this.setSummaryType('PowUnits', args.value as SummaryTypes);
    }

    ngOnInit(): void {

        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSourceSettings = {
            enableSorting: true,
            formatSettings: [{ name: 'PowUnits', format: 'N' }, { name: 'ProCost', format: 'C' }],
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