import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    IDataOptions, IDataSet, PivotViewModule, PivotView
} from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { Observable } from 'rxjs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DataManager, JsonAdaptor, Query } from '@syncfusion/ej2-data';

enableRipple(false);

/**
 * Pivot Table Exporting Its Own Format Sample.
 */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./PivotData.json');
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['external-data-based-filtering.css'],
    templateUrl: 'external-data-based-filtering.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DatePickerModule, ButtonModule]
})

export class ExternalDataBasedFilteringComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public observable = new Observable();
    public startDate: Date = new Date('2024-01-01');
    public endDate: Date = new Date('2024-12-01');
    public minStartDate = new Date(2019, 0, 1);
    public maxStartDate = new Date(2024, 10, 31);
    public minEndDate = new Date(2019, 1, 1);
    public maxEndDate = new Date(2024, 11, 31);

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    onLoad() {
        this.applyDateFilter();
    };

    applyDateFilter() {
        if (this.startDate && this.endDate) {
            this.startDate.setHours(0, 0, 0, 0);
            this.endDate.setHours(23, 59, 59, 999);
            let pivotData = (Pivot_Data as any).map((item: any) => ({
                ...item,
                OrderDate: new Date(item.OrderDate),
            }));
            new DataManager({ json: pivotData, adaptor: new JsonAdaptor() }).executeQuery(
                new Query()
                    .where('OrderDate', 'greaterthanorequal', this.startDate)
                    .where('OrderDate', 'lessthanorequal', this.endDate)
            )
            .then((e) => {
                this.pivotObj.dataSourceSettings.dataSource = (e as any).result;
            });
        }
    };
    
    onStartDateChange(args: any) {
        this.startDate = args.value as Date;
    }

    onEndDateChange(args: any) {
        this.endDate = args.value as Date;
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        document.getElementById('apply').onclick = () => {
          this.applyDateFilter();
        };

        this.dataSourceSettings = {
            enableSorting: true,
            dataSource: [],
            expandAll: true,
            columns: [
                { name: 'Country' },
                { name: 'Product' }
            ],
            rows: [
                { name: 'OrderDate' }
            ],
            values: [
                { name: 'Amount', caption: 'Total Sales' }
            ],
            drilledMembers: [{name: 'Country',items: ['Canada']}],
            formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'OrderDate', format: 'dd/MM/yyyy', type: 'date' }],
            filters: [],
            groupSettings:[{name: 'OrderDate', groupInterval: ['Years', 'Months']}]
        };
    }
}