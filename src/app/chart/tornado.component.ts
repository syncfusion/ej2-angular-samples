import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, ITooltipRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Tornado Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'tornado.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class TornadoChartComponent {

    public data: Object[] = [
        { x: '4.5', y: 31 }, { x: '4.8', y: 37 },
        { x: '5.1', y: 49 }, { x: '5.4', y: 57 },
        { x: '5.7', y: 63 }, { x: '6', y: 69 }
    ];
    public data1: Object[] = [
        { x: '4.5', y: -31, text: '31 KG' }, { x: '4.8', y: -39, text: '39 KG' },
        { x: '5.1', y: -52, text: '52 KG' }, { x: '5.4', y: -64, text: '64 KG' },
        { x: '5.7', y: -70, text: '70 KG' }, { x: '6', y: -74, text: '74 KG' }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        title: 'Height in Inches',
        minorGridLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value} KG',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: {
            color: 'transparent'
        }
    };
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: {
                fontWeight: '600'
            }
        }
    }
    public marker1: Object = {
        dataLabel: {
            name: 'text',
            visible: true,
            position: 'Top',
            font: {
                fontWeight: '600'
            }
        }
    }
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '80%';

    public title: string = 'Height vs Weight';
    public tooltip: Object = {
        enable: true
    };
    public legend: Object = {
        position: Browser.isDevice ? 'Auto' : 'Right'
    }
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        args.text = args.text.indexOf('-') > 0 ? args.text.replace('-', '') : args.text;
    };
    constructor() {
        //code
    };

}