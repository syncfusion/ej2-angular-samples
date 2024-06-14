import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Step line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'step-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class StepLineChartComponent {

    public data: Object[] = [
        { Period : new Date(1975, 1, 1), CHN_UnemploymentRate : 16, AUS_UnemploymentRate : 35, ITA_UnemploymentRate : 3.4 },
        { Period : new Date(1978, 1, 1), CHN_UnemploymentRate : 12.5, AUS_UnemploymentRate : 45, ITA_UnemploymentRate : 4.4 },
        { Period : new Date(1981, 1, 1), CHN_UnemploymentRate : 19, AUS_UnemploymentRate : 55, ITA_UnemploymentRate : 6 },
        { Period : new Date(1984, 1, 1), CHN_UnemploymentRate : 14.4, AUS_UnemploymentRate : 20, ITA_UnemploymentRate : 7 },
        { Period : new Date(1987, 1, 1), CHN_UnemploymentRate : 11.5, AUS_UnemploymentRate : 10, ITA_UnemploymentRate : 11.3 },
        { Period : new Date(1990, 1, 1), CHN_UnemploymentRate : 14, AUS_UnemploymentRate : 42, ITA_UnemploymentRate : 10.1 },
        { Period : new Date(1993, 1, 1), CHN_UnemploymentRate : 10, AUS_UnemploymentRate : 35, ITA_UnemploymentRate : 7.8 },
        { Period : new Date(1996, 1, 1), CHN_UnemploymentRate : 16, AUS_UnemploymentRate : 22, ITA_UnemploymentRate : 8.5 },
        { Period : new Date(2000, 1, 1), CHN_UnemploymentRate : 16, AUS_UnemploymentRate : 65, ITA_UnemploymentRate : 8.5 },
        { Period : new Date(2005, 1, 1), CHN_UnemploymentRate : 16, AUS_UnemploymentRate : 65, ITA_UnemploymentRate : 8.5 },
        { Period : new Date(2010, 1, 1), CHN_UnemploymentRate : 16, AUS_UnemploymentRate : 58, ITA_UnemploymentRate : 8.5 }
    ];
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        minimum : new Date(1971,6,11),
        maximum : new Date(2012,6,11), valueType: 'DateTime', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Production(In Percentage)',
        lineStyle: { width: 0 },
        interval: 10,
        majorTickLines: { width: 0 },
        labelFormat: '{value}%'
    };
    public marker: Object = {
        visible: true,
        width: 7,
        height: 7
    };
    public tooltip: Object = {
        enable: true,
        header: "<b>Fruit Production</b>",
        shared: true,
        format: '${point.x} : <b> ${point.y} </b>',
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
     // custom code end
    public title: string = 'Fruit Production Statistics';
    constructor() {
        //code
    };

}