import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IAccLoadedEventArgs, AccumulationChartComponent, AccumulationTheme } from '@syncfusion/ej2-ng-charts';
import { EmptyPointMode } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Sample for Pie chart empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pie-empty-point.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PieEmptyPointChartComponent {

    public data: Object[] = [
        { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
        { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
        { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
        { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
    ];
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true, format: '${series.name}<br>${point.x} : ${point.y}'
    };
    //Initializing DataLabel
    public dataLabel: Object = {
        visible: true, position: 'Inside', font: {
            fontWeight: '600',
            color: '#ffffff'
        }
    };
    public title: string = 'Annual Product-Wise Profit Analysis';
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
                this.chart.refresh();
            }
        });
        this.emptyPointMode.appendTo('#selectmode');
    }
    constructor() {
        // code
     };
}