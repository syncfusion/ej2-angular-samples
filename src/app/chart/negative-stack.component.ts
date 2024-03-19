import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, ITooltipRenderEventArgs, IAxisLabelRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Sample for Negative Stack Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'negative-stack.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class TornadoChartComponent {

    public data: Object[] = [
        { Height : "4.5", Female : 31, Male : -31, Text : "31 KG", Female_Text : "31 KG" },
        { Height : "4.8", Female : 37, Male : -39, Text : "39 KG", Female_Text : "37 KG" },
        { Height : "5.1", Female : 49, Male : -52, Text : "52 KG", Female_Text : "49 KG" },
        { Height : "5.4", Female : 57, Male : -64, Text : "64 KG", Female_Text : "57 KG" },
        { Height : "5.7", Female : 63, Male : -70, Text : "70 KG", Female_Text : "63 KG" },
        { Height : "6", Female : 69, Male : -74, Text : "74 KG", Female_Text : "69 KG" }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        title: 'Height in Inches',
        majorTickLines: { width: 0 },
        interval: 1,
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Weight (kg)',
        labelFormat: '{value}',
        rangePadding: 'Round',
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
    };
    public marker: Object = {
        dataLabel: {
            visible: true,
            name: 'Female_Text',
            position: 'Top',
            font: {
                fontWeight: '600'
            }
        }
    }
    public marker1: Object = {
        dataLabel: {
            name: 'Text',
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
    public width: string = Browser.isDevice ? '100%' : '75%';

    public title: string = 'Height vs Weight';
    public tooltip: Object = {
        enable: true
    };
    public legend: Object = {
        position: Browser.isDevice ? 'Bottom' : 'Right',
        enableHighlight : true
    }
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
     // custom code end
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        args.text = args.text.indexOf('-') > 0 ? args.text.replace('-', '') : args.text;
        args.text = args.text + " " + "<b>kg</b>";
    };
    public labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.value < 0) {
            args.text = (-args.value).toString();
        }
    };
    constructor() {
        //code
    };

}