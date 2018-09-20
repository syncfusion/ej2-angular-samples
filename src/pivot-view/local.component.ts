import { Component, OnInit } from '@angular/core';
import { IDataOptions } from '@syncfusion/ej2-angular-pivotview';
import { renewableEnergy } from './data-source';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView sample for Local data source.
 */

@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['local.css'],
    templateUrl: 'local.html'
})

export class LocalComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 120
        } as GridSettings;

        this.dataSource = {
            data: renewableEnergy,
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
    }
}