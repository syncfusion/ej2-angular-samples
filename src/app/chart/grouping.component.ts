import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChartComponent, IAccTextRenderEventArgs,ChartAllModule, AccumulationChart, GroupModes, IAccPointRenderEventArgs, IAccLoadedEventArgs, AccumulationTheme, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';

/**
 * Sample for groping in pie chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'grouping.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class GroupingPieComponent {
    public data: Object[] = [
        { x: 'China', y: 40, text: 'China: 40' },
        { x: 'Japan', y: 20, text: Browser.isDevice ? 'Japan:<br> 20' : 'Japan: 20' },
        { x: 'Australia', y: 18, text: Browser.isDevice ? 'Australia:<br> 18' : 'Australia: 18' },
        { x: 'France', y: 16, text: 'France: 16' },
        { x: 'Netherlands', y: 15, text: 'Netherlands: 15' },
        { x: 'Great Britain', y: 14, text: 'Great Britain: 14' },
        { x: 'South Korea', y: 13, text: 'South Korea: 13' },
        { x: 'Germany', y: 12, text: Browser.isDevice ? 'Germany:<br> 12' : 'Germany: 12' },
        { x: 'Italy', y: 12, text: Browser.isDevice ? 'Italy:<br> 12' : 'Italy: 12' },
        { x: 'Canada', y: 9, text: Browser.isDevice ? 'CA: 9' : 'Canada: 9' },
        { x: 'Hungary', y: 6, text: Browser.isDevice ? 'HU: 6' : 'Hungary: 6' },
        { x: 'Spain', y: 5, text: 'Spain: 5' },
        { x: 'Kenya', y: 4, text: 'Kenya: 4' },
        { x: 'Brazil', y: 3, text: 'Brazil: 3' }
    ];
    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    public radius: string = Browser.isDevice ? '40%' : '55%';
    public explode: boolean = true;
    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
    };
    public border: Object = { width: 1, color: '#ffffff' };
    //Initializing DataLabel
    public dataLabel: Object = {
        visible: true,
        position: 'Outside', name: 'text',
        connectorStyle: { type: 'Curve', length: Browser.isDevice ? '10px' : '20px' },
        font: {
             size: Browser.isDevice ? '8px' : '13px', 
            fontWeight: '600'
        }
    };
    public onChange(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        let currentValue: number = element.value === 'Point' ? 9 : 8;
        this.pie.series[0].groupMode = <GroupModes>element.value;
        this.pie.series[0].groupTo = currentValue.toString();
        this.pie.series[0].animation.enable = false;
        document.getElementById('clubtext').innerHTML = currentValue.toString();
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    public onClubvalue(e: Event): void {
        let clubvalue: string = (document.getElementById('clubvalue') as HTMLSelectElement).value;
        this.pie.series[0].groupTo = clubvalue;
        this.pie.series[0].animation.enable = false;
        document.getElementById('clubtext').innerHTML = clubvalue;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    };
    // custom code start
    public load(args: IAccLoadedEventArgs): void {
       loadAccumulationChartTheme(args);
    };
    // custom code end
    public clubvalue: string = '9';
    public startAngle: number = -20;
    public endAngle: number = 340;
    public tooltip: Object = { enable: true, header:'', format:'<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>', enableHighlight: true };
    public title: string = 'Summer Olympic 2024 - Gold Medals';
    public subTitle: string = 'Source: wikipedia.org';
    public groupMode: DropDownList;
    ngOnInit(): void {
        this.groupMode = new DropDownList({
            index: 0,
            width: 120,
            change: () => {
                let mode: string = this.groupMode.value.toString();
                let currentValue: number = mode === 'Point' ? 9 : 8;
                this.pie.series[0].groupMode = <GroupModes>mode;
                this.pie.series[0].groupTo = currentValue.toString();
                this.pie.series[0].animation.enable = false;
                document.getElementById('clubtext').innerHTML = currentValue.toString();
                (document.getElementById('clubvalue') as HTMLInputElement).value = currentValue.toString();
                this.pie.removeSvg();
                this.pie.refreshSeries();
                this.pie.refreshChart();
            }
        });
        this.groupMode.appendTo('#mode');
    }
    constructor() {
        //code
    };

}