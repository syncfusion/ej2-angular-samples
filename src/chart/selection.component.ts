import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent, ILoadedEventArgs } from '@syncfusion/ej2-ng-charts';
import { SelectionMode } from '@syncfusion/ej2-charts';
/**
 * Selection
 */
@Component({
    selector: 'control-content',
    templateUrl: 'selection.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SelectionChartComponent {

    public data: Object[] = [
        { x: 'CHN', y: 17 },
        { x: 'USA', y: 19 },
        { x: 'IDN', y: 29 },
        { x: 'JAP', y: 13 },
        { x: 'BRZ', y: 24 },
        { x: 'RUS', y: 16 },
        { x: 'GER', y: 13 },
        { x: 'NGR', y: 44 },
        { x: 'GBR', y: 18 },
        { x: 'FRA', y: 19 }
    ];
    public data1: Object[] = [
        { x: 'CHN', y: 54 },
        { x: 'USA', y: 67 },
        { x: 'IDN', y: 65 },
        { x: 'JAP', y: 61 },
        { x: 'BRZ', y: 68 },
        { x: 'RUS', y: 70 },
        { x: 'GER', y: 66 },
        { x: 'NGR', y: 53 },
        { x: 'GBR', y: 65 },
        { x: 'FRA', y: 63 }
    ];
    public data2: Object[] = [
        { x: 'CHN', y: 9 },
        { x: 'USA', y: 14 },
        { x: 'IDN', y: 6 },
        { x: 'JAP', y: 26 },
        { x: 'BRZ', y: 8 },
        { x: 'RUS', y: 14 },
        { x: 'GER', y: 21 },
        { x: 'NGR', y: 3 },
        { x: 'GBR', y: 17 },
        { x: 'FRA', y: 18 }
    ];
    @ViewChild('chart')
    public chart: ChartComponent;
    public previousType: SelectionMode = 'Point';
    public onChange(e: Event): void {
        let element: HTMLSelectElement = <HTMLSelectElement>e.target;
        this.chart.selectionMode = <SelectionMode>element.value;
        if ((this.chart.selectionMode).indexOf('Drag') !== -1  && this.previousType.indexOf('Drag') === -1 ) {
            this.chart.series[0].type = 'Scatter';
            this.chart.series[1].type = 'Scatter';
            this.chart.series[2].type = 'Scatter';
            this.chart.series[0].marker = { visible: true, height: 10, width: 10 };
            this.chart.series[1].marker = { visible: true, height: 10, width: 10 };
            this.chart.series[2].marker = { visible: true, height: 10, width: 10 };
            this.chart.refresh();
        } else if (this.chart.selectionMode.indexOf('Drag') === -1 && this.previousType.indexOf('Drag') !== -1) {
            this.chart.series[0].type = 'Column'; this.chart.series[1].type = 'Column';
            this.chart.series[2].type = 'Column';
            this.chart.refresh();
        } else if (this.previousType === 'None' || this.chart.selectionMode === 'None') {
            this.chart.refresh();
        } else {
            this.chart.dataBind();
        }
        if ((this.chart.selectionMode).indexOf('Drag') !== -1) {
            (<HTMLInputElement>document.getElementById('select')).disabled = true;
        } else {
            (<HTMLInputElement>document.getElementById('select')).disabled = false;
        }
        this.previousType = <SelectionMode>element.value;
        this.chart.dataBind();
    }
    public setMultiSelect(e: Event): void {
        this.chart.isMultiSelect = (<HTMLInputElement>e.target).checked === true;
        this.chart.dataBind();
    }
    public primaryXAxis: Object = {
        title: 'Countries',
        valueType: 'Category',
        interval: 1,
        labelIntersectAction : 'Rotate90'
    };
    public primaryYAxis: Object = {
        title: 'Percentage (%)',
        labelFormat: '{value}%',
        minimum: 0,
        maximum: 80
    };
    public legend: Object = {
        visible: true,
        toggleVisibility: false
    };

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public title: string = 'Age Distribution by Country';
    constructor() {
        //code
    };

}