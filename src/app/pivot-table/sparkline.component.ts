import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    IDataOptions, IDataSet, PivotViewModule, PivotView
} from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { Sparkline, SparklineTooltip } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { Observable } from 'rxjs';

enableRipple(false);

/**
 * Pivot Table Exporting Its Own Format Sample.
 */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./SparklineData.json');
let chartType: string = 'Column';
let isDropDownExist: boolean = true;
let chartData: string[] = ['Line', 'Column', 'Area', 'WinLoss'];
let obj = {};
let sparkline: Sparkline;
Sparkline.Inject(SparklineTooltip);
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['sparkline.css'],
    templateUrl: 'sparkline.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class SparklineComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public observable = new Observable();

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    onDataBound(): void {
        if (isDropDownExist) {
                isDropDownExist = false;
                let chartTypeDropDown: DropDownList = new DropDownList({
                    floatLabelType: 'Auto',
                    dataSource: chartData,
                    value:chartType,
                    width: 200,
                    change: (args: any) => {
                      chartType = args.value as any;
                      this.pivotObj.refreshData();
                    },
                  });
              chartTypeDropDown.appendTo('#grandTotal_dropdown');
            }
            let keys = Object.keys(obj);
            for (let i = 0; i < Object.keys(obj).length; i++) {
                sparkline = new Sparkline({
                    height: '30px',
                    lineWidth: 1,
                    type: chartType as any,
                    valueType: 'Category',
                    dataSource: obj[keys[i]],
                    xName: 'xval',
                    yName: 'yval',
                    markerSettings: {
                        visible: ['High', 'Low'],
                        size: 3,
                    },
                    highPointColor: 'blue',
                    lowPointColor: 'red',
                    tiePointColor: 'pink',
                    tooltipSettings: {
                        format: '${xval}: $ ${yval}',
                        visible: true,
                        trackLineSettings: {
                            visible: true,
                            color: '#033e96',
                            width: 1
                        }
                    },
                });
                sparkline.appendTo('#chart' + keys[i]);
            }
    };

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 110,
            rowHeight: 70,
            columnRender: this.observable.subscribe((args: any) => {
                args.columns[0].width = 175;
                for (let i = 1; i < args.columns.length - 1; i++) {
                    args.columns[i].width = 140;
                }
                args.columns[args.columns.length-1].width = 500;
            }) as any,
            headerCellInfo: this.observable.subscribe((args: any) => {
                if (args.cell?.column?.customAttributes?.cell.type == 'grand sum') {
                    let input = document.createElement('input');
                    input.type = 'text';
                    input.tabIndex = 1;
                    input.id = 'grandTotal_dropdown';
                    args.node.style.textAlign = 'right';
                    args.node.querySelector('.e-pivotcell-container').appendChild(input);
                    args.node.querySelector('.e-headertext').style.alignSelf = 'unset';
                    args.node.querySelector('.e-headertext').innerText = 'Total Sales Comparison';
                    isDropDownExist = true;
                }
            }) as any,
            queryCellInfo: this.observable.subscribe((args: any) => {
                let colIndex = Number(args.cell.getAttribute('aria-colindex')) - 1;
                if (args.data[colIndex].isGrandSum && args.data[colIndex].columnHeaders == '') {
                    args.cell.innerText = '';
                    let div = document.createElement('div');
                    div.id = 'chart' + args.data[colIndex].rowIndex;
                    div.style.marginTop = '20px';
                    args.cell.appendChild(div);

                    let data: any = [];
                    for (let i = 1; i < Object.keys(args.data).length - 1; i++) {
                        let object = {
                            x: i,
                            xval: args.data[i].columnHeaders,
                            yval: args.data[i].actualValue,
                        };
                        data.push(object);
                    }
                    obj[args.data[colIndex].rowIndex] = data;
                }
            }) as any
        } as GridSettings;

        this.dataSourceSettings = {
            enableSorting: true,
            dataSource: Pivot_Data,
            rows: [{ name: 'Region' }, { name: 'Product' }],
            columns: [{ name: 'Year' }],
            values: [{ name: 'Amount' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'Month' }],
            sortSettings: [{ name: 'Month', membersOrder: ['January'] }],
            expandAll: false,
            filters: [],
            drilledMembers: [{ name: 'Region', items: ['Asia'] }]
        };
    }
}