import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { IDataOptions, PivotView,PivotViewModule, IDataSet, VirtualScrollService } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { Browser, enableRipple } from '@syncfusion/ej2-base';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Performance Sample.
 */
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'performance.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['performance.css'],
    providers: [VirtualScrollService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule]
})
export class PerformanceComponent implements OnInit {
    public gridSettings: GridSettings;
    public dataSourceSettings: IDataOptions;
    public options: { [key: string]: Object }[] = [
        { text: '10,000 Rows and 10 Columns', value: 10000 },
        { text: '1,00,000 Rows and 10 Columns', value: 100000 },
        { text: '1,000,000 Rows and 10 Columns', value: 1000000 }
    ];
    public fields: object = { text: 'text', value: 'value' };
    public customername: string[] = ['TOM', 'Hawk', 'Jon', 'Chandler', 'Monica', 'Rachel', 'Phoebe', 'Gunther',
        'Ross', 'Geller', 'Joey', 'Bing', 'Tribbiani', 'Janice', 'Bong', 'Perk', 'Green', 'Ken', 'Adams'];
    public city: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'Austin',
        'San Francisco', 'Columbus', 'Washington', 'Portland', 'Oklahoma', 'Las Vegas', 'Virginia', 'St. Louis', 'Birmingham'];
    public date1: number;
    public date2: number;
    public isInit: boolean = true;
    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('#performance')
    public performanceDropDown: DropDownListComponent;
    public width: string | number;

    data(count: number): Object[] {
        let result: Object[] = [];
        let dt: number = 0;
        for (let i: number = 1; i < (count + 1); i++) {
            dt++;
            let round: string;
            let toString: string = i.toString();
            if (toString.length === 1) {
                round = '0000' + (i);
            }
            else if (toString.length === 2) {
                round = '000' + i;
            }
            else if (toString.length === 3) {
                round = '00' + i;
            } else if (toString.length === 4) {
                round = '0' + i;
            } else {
                round = toString;
            }
            result.push({
                ProductID: 'PRO-' + round,
                City: this.city[Math.round(Math.random() * this.city.length)] || this.city[0],
                Year: "FY " + (dt + 2013),
                CustomerName: this.customername[Math.round(Math.random() * this.customername.length)] || this.customername[0],
                Price: Math.round(Math.random() * 5000) + 5000,
                Sold: Math.round(Math.random() * 80) + 10,
            });
            if (dt / 4 == 1) {
                dt = 0;
            }
        }
        return result;
    };


    onChange(args: ChangeEventArgs) {
        this.isInit = true;
        this.pivotObj.dataSourceSettings.dataSource = this.data(args.value as number) as IDataSet[];
        this.date1 = new Date().getTime();
    }

    ondataBound(args: any): void {
        if ((this.pivotObj.dataSourceSettings.dataSource as IDataSet[]).length > 0) {
            if (this.date1 && this.isInit) {
                this.date2 = new Date().getTime();
                (document as any).getElementById('performanceTime').innerHTML = 'Time Taken: ' + (this.date2 - this.date1) / 1000 + ' sec';
            }
            this.isInit = false;
        }
        if (Browser.isDevice && this.pivotObj && this.pivotObj.enableRtl) {
            (document as any).querySelector('.control-section').classList.add('e-rtl');
        }
    }

    load(): void {
        if (this.isInit) {
            this.date1 = new Date().getTime();
        }
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 120
        } as GridSettings;

        this.dataSourceSettings = {
            dataSource: this.data(10000) as IDataSet[],
            enableSorting: false,
            expandAll: true,
            formatSettings: [{ name: 'Price', format: 'C0' }],
            rows: [{ name: 'ProductID' }],
            columns: [{ name: 'Year' }],
            values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }]
        };

        this.width = '100%';

    }
}