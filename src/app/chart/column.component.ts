import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, IAxisLabelRenderEventArgs, ITooltipRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class ColumnChartComponent {

    public columnData: Object[] = [
        { country: 'Chile', walnuts: 175000, almonds: 11300 },
        { country: 'European Union', walnuts: 140000, almonds: 135000 },
        { country: 'Turkey', walnuts: 67000, almonds: 24000 },
        { country: 'India', walnuts: 33000, almonds: 4200 },
        { country: 'Australia', walnuts: 12000, almonds: 154000 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1,
        labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
        labelRotation: Browser.isDevice ? -45 : 0,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Metric Tons',
        interval: 40000,
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 }
    };
    public marker: Object = { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
    public title: string = 'Walnuts and Almonds Estimated Production for 2023';
    public subTitle: string = 'Source: fas.usda.gov';
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.x}</b>',
        format: '${series.name}: <b>${point.y}</b>',
        enableHighlight: true
    };
    public legend: Object = {
        visible: true,
        enableHighlight: true,
        shapeWidth: 9,
        shapeHeight: 9
    };
    public cornerRadius: Object = { 
        topLeft: 4, 
        topRight: 4
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public axisLabelRender = (args: IAxisLabelRenderEventArgs) => {
        const value: number = parseInt(args.text.replace(/,/g, ''), 10);
        if (value >= 1000) {
            args.text = value / 1000 + 'K';
        }
    };
    public tooltipRender = (args: ITooltipRenderEventArgs) => {
        if (args.text) {
            let value: string = args.point.y.toLocaleString('en-US');
            args.text = `${args.series.name}: <b>${value}</b>`;
        }
    };
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    constructor() {
        //code
    };

}