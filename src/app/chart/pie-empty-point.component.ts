import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IAccLoadedEventArgs, AccumulationChartComponent, AccumulationTheme, IAccTextRenderEventArgs, AccumulationChartAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ChartTheme, EmptyPointMode } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Pie chart empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pie-empty-point.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, AccumulationChartAllModule, ChartAllModule, SBDescriptionComponent]
})
export class PieEmptyPointChartComponent {

    public data: Object[] = [
        { x: 'Action', y: 35,}, { x: 'Drama', y: 25 }, { x: 'Comedy', y: null },
        { x: 'Romance', y: 20 }, { x: 'Horror', y: 10 }, { x: 'Sci-Fi', y: null }
    ];
      // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = loadAccumulationChartTheme(args);
        if(selectedTheme === 'bootstrap5-dark'){
            args.chart.series[0].emptyPointSettings.fill = '#FF7F7F';
        }
    };
      // custom code end
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true, format: '<b>${point.x}</b><br> Profit: <b>$${point.y}K</b>', header:'', enableHighlight: true
    };
    //Initializing DataLabel
    DataLabelRenderEvent(args: IAccTextRenderEventArgs) {
        args.text = args.point.x + ": $" + args.point.y + "K";
      }
    public dataLabel: Object = {
        visible: true, position: 'Inside', font: {
            fontWeight: '600', size: Browser.isDevice ? '8px' : '12px'
        }, enableRotation: true, 
    };
    public radius: string = '80%';
    public border: Object = { width: 1, color: '#ffffff' };
    public title: string = 'Movie Genre Revenue Share';
    public legend: Object = { visible: false};
    public emptyPointSettings: Object = {
        fill: '#e6e6e6',
    };
    @ViewChild('chart')
    public chart: AccumulationChartComponent;
    public emptyPointMode: DropDownList;
    ngOnInit(): void {
        this.emptyPointMode = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let mode: string = this.emptyPointMode.value.toString();
                this.chart.series[0].emptyPointSettings.mode = <EmptyPointMode>mode;
                this.chart.series[0].emptyPointSettings.fill = '#e6e6e6';
                this.chart.series[0].animation.enable = false;
                this.chart.refresh();
            }
        });
        this.emptyPointMode.appendTo('#selectmode');
    }
    constructor() {
        // code
     };
}