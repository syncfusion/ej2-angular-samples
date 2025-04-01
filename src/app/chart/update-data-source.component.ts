import { Component, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { ILoadedEventArgs, IPointRenderEventArgs, IAxisRangeCalculatedEventArgs, ChartTheme, ChartAllModule, Series, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, pointRender } from './theme-color';

/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'update-data-source.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class UpdateDataSourceComponent  implements OnDestroy {
    @ViewChild('chart')
    public chart: ChartComponent;
    public data3: Object[] = [
        { x: 'Jewellery', y: 75 },
        { x: 'Shoes', y: 45 },
        { x: 'Footwear', y: 73 },
        { x: 'Pet Services', y: 53 },
        { x: 'Business Clothing', y: 85},
        { x: 'Office Supplies', y: 68 },
        { x: 'Food', y: 45 }
    ];
    private intervalId: any;
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelStyle: { size: Browser.isDevice ? '11px' : '12px' },
        majorGridLines: { width: 0 },
        labelIntersectAction: 'Rotate90'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Sales (in percentage)', 
        labelFormat: '{value}%', 
        interval: 5, 
        lineStyle: { width: 0 }, 
        majorTickLines: { width: 0 }, minimum: 0, maximum: 100
    };
    public cornerRadius: Object = {
        topLeft: Browser.isDevice ? 10 : 15, 
        topRight: Browser.isDevice ? 10 : 15
    };

    //Initializing DataLabel
    public marker: Object = {
        visible: false, dataLabel: {visible: true, position: 'Top', format: '{value}%', font: { color: '#ffffff' } }
    };
    ngOnDestroy(): void {
        this.clearInterval();
    }
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        this.clearInterval();
        this.intervalId = setInterval(function () {
            var container = document.getElementById('UpdateData');
            if (container && container.id === args.chart.element.id) {
                const newData = (args.chart.series[0].dataSource as Object[]).map((item: { x: string, y: number }) => {
                    const min: number = 10;
                    const max: number = 90;
                    const value: number = Math.floor(Math.random() * (max - min + 1)) + min;
                    return { x: item.x, y: value };
                });
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 500);
                }
            }
            else {
                this.clearInterval();
            }
        }, 1500);
    };
    private clearInterval(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    public pointRender (args: IPointRenderEventArgs): void {
        pointRender(args);
    };
    public axisRangeCalculated (args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.maximum = args.maximum as number > 100 ? 100 : args.maximum;
            if (args.maximum > 80) {
                args.interval = 20;
            } else if(args.maximum > 40){
                args.interval = 10;
            }
        }
    }
    public getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public title: string = 'Sales by product';
    constructor() {
        //code
    };

}