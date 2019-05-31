import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, IDataSet, VirtualScrollService } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
enableRipple(false);

@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'virtual-scrolling.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['virtual-scrolling.css'],
    providers: [VirtualScrollService]
})
export class VirtualScrollingComponent implements OnInit {
    public gridSettings: GridSettings;
    public dataSource: IDataOptions;
    public customername: string[] = ['TOM', 'Hawk', 'Jon', 'Chandler', 'Monica', 'Rachel', 'Phoebe', 'Gunther',
        'Ross', 'Geller', 'Joey', 'Bing', 'Tribbiani', 'Janice', 'Bong', 'Perk', 'Green', 'Ken', 'Adams'];
    public city: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'Austin',
        'San Francisco', 'Columbus', 'Washington', 'Portland', 'Oklahoma', 'Las Vegas', 'Virginia', 'St. Louis', 'Birmingham'];
    public date1: number;
    public date2: number;
    public isInit: boolean;
    @ViewChild('pivotview')
    public pivotGridObj: PivotView;
    @ViewChild('loadbtn')
    public applyBtn: Button;

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

    show(): void {
        document.getElementById('popup').style.display = 'inline-block';
    }

    applyData(e: Event): void {
        this.show();
        this.isInit = true;
        this.pivotGridObj.dataSource.data = this.data(100000) as IDataSet[];
        this.date1 = new Date().getTime();
    }

    ondataBound(args: any): void {
        if (this.date1 && this.isInit) {
            this.date2 = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (this.date2 - this.date1) / 1000 + ' sec';
        }
        this.isInit = false;
        this.applyBtn.disabled = true;
        document.getElementById('popup').style.display = 'none';
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            data: [],
            enableSorting: false,
            expandAll: true,
            formatSettings: [{ name: 'Price', format: 'C0' }],
            rows: [{ name: 'ProductID' }],
            columns: [{ name: 'Year' }],
            values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }]
        };
    }
}