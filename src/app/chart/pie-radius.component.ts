import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    AccumulationChart, AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-angular-charts';

/**
 * Sample for Pie with Various Radius
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pie-radius.html',
    encapsulation: ViewEncapsulation.None
})
export class PieRadiusComponent {
    public data: Object[] = [
        { Country : " Argentina", Population : 505370, Radius : "100"},
        { Country : " Belgium",    Population : 551500, Radius : "118.7"},
        { Country : " Cuba",  Population : 312685 , Radius : "124.6"},
        { Country : " Dominican Republic", Population : 350000 , Radius : "137.5"},
        { Country : " Egypt", Population : 301000 , Radius : "150.8"},
        { Country : " Kazakhstan", Population : 300000, Radius : "155.5"},
        { Country : " Somalia",  Population : 357022, Radius : "160.6"}
    ];
    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    //Initializing Legend
    public legendSettings: Object = {
        visible: true,
        reverse: true
    };
    //Initializing Datalabel
    public dataLabel: Object = {
        visible: true, position: 'Outside',
        name: 'Country',
        connectorStyle: { length: '20px', type:'Curve' },
        font: {
            fontWeight: '600'
        },
    };
      // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    }
      // custom code end
    public radius: string = 'Radius';
    public enableAnimation: boolean = true;
    public enableSmartLabels: boolean = true;
    public tooltip: Object = {
        enable: true,
        header: '',
        format: '<b>${point.x}</b><br>Area in square km: <b>${point.y}</b><br>Population density per square km: <b>${point.tooltip}',
        name: 'Radius'
    };
    public title: string = 'Pie with different Radius';
    constructor() {
        //code
    };

}


