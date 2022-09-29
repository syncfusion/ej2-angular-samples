import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-angular-charts';

/**
 * Sample for Semi Pie Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'semi-pie.html',
    encapsulation: ViewEncapsulation.None
})
export class SemiPieComponent {
    public data: Object[] = [
        { Browser :  "Chrome", Users : 60, DataLabelMappingName : "Chrome: 60%" },
        { Browser :  "UC Browser", Users : 10, DataLabelMappingName : "UC Browser: 10%" },
        { Browser :  "Opera", Users : 8, DataLabelMappingName : "Opera: 8%" },
        { Browser :  "Safari", Users : 15, DataLabelMappingName : "Safari: 15%" },
        { Browser :  "InternetExplorer", Users : 7, DataLabelMappingName : "Internet Explorer: 7%" },
        { Browser :  "QQ", Users : 10, DataLabelMappingName : "QQ: 10%" },
    ];
    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
    };
    //Initializing DataLabel
    public dataLabel: Object = {
        visible: true, position: 'Outside',
        connectorStyle: { length: '20px', type: 'Curve' }, name: 'DataLabelMappingName',
        font: { fontWeight: '600' }
    };
     // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    }
     // custom code end
    public explode: boolean = true;
    public enableAnimation: boolean = false;
    public startAngle: number = 270;
    public endAngle: number = 90;
    public tooltip: Object = { enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header:'' };
    constructor() {
        //code
    };

}