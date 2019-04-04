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
        { x: 'Argentina', y: 505370, r: '100' },
        { x: 'Belgium', y: 551500, r: '118.7' },
        { x: 'Cuba', y: 312685, r: '124.6' },
        { x: 'Dominican Republic', y: 350000, r: '137.5' },
        { x: 'Egypt', y: 301000, r: '150.8' },
        { x: 'Kazakhstan', y: 300000, r: '155.5' },
        { x: 'Somalia', y: 357022, r: '160.6' }
    ];
    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    //Initializing Legend
    public legendSettings: Object = {
        visible: true,
    };
    //Initializing Datalabel
    public dataLabel: Object = {
        visible: true, position: 'Outside',
        name: 'x'
    };
      // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    }
      // custom code end
    public startAngle: number = 0;
    public endAngle: number = 360;
    public radius: string = 'r';
    public enableAnimation: boolean = true;
    public enableSmartLabels: boolean = true;
    public tooltip: Object = {
        enable: true
    };
    public title: string = '';
    constructor() {
        //code
    };

}


