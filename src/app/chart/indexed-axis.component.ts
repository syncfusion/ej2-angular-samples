import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for indexed category axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'indexed-axis.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class IndexedAxisChartComponent {
    public data1: Object[] = [
        { x: 'India', y: 7.3 },
        { x: 'Myanmar', y: 7.9 },
        { x: 'Bangladesh', y: 6.0 },
        { x: 'Cambodia', y: 7.0 },
        { x: 'China', y: 6.9 }
    ];
    public data2: Object[] = [
        { x: 'Australia', y: 2.7 },
        { x: 'Poland', y: 2.5 },
        { x: 'Singapore', y: 2.0 },
        { x: 'Canada', y: 1.4 },
        { x: 'Germany', y: 1.8 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1, crosshairTooltip: { enable: true },
        isIndexed: true,  
        labelRotation: Browser.isDevice ? -45 : 0,
        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}%'
    };
    public marker: Object = {
        visible: false,
        height: 10,
        width: 10,
        dataLabel: {
            visible: true,
            position:'Top',   
            enableRotation: Browser.isDevice ? true : false,
            angle: -90, 
            font: {
                fontWeight: '600',
              
            }
        }
    };
    public marker1: Object = {
        visible: false,
        height: 10,
        width: 10,
        dataLabel: {
            visible: true,
            position: 'Top',
            enableRotation: Browser.isDevice ? true : false,
            angle: -90, 
            font: {
                fontWeight: '600',
            }
        }
    };
    //Initializing Crosshair
    public tooltip: Object = { enable: false };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    // custom code end
    public title: string = 'GDP by Countries';
    @ViewChild('chart')
    public chart: ChartComponent;
    public isIndexed(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.primaryXAxis.isIndexed = element.checked;
        if (this.chart.primaryXAxis.isIndexed) {
            this.chart.series[0].type = 'Column';
            this.chart.series[1].type = 'Column';
            this.chart.series[0].marker.visible = false;
            this.chart.series[0].marker.dataLabel.font.color = '#ffffff';
            this.chart.series[1].marker.visible = false;
            this.chart.series[1].marker.dataLabel.font.color = '#ffffff';
            this.chart.primaryXAxis.labelRotation = 0;
        } else {
            this.chart.series[0].type = 'Line';
            this.chart.series[1].type = 'Line';
            this.chart.series[0].marker.visible = true;
            this.chart.series[1].marker.visible = true;
            this.chart.series[0].marker.dataLabel.visible = true;
            this.chart.series[0].marker.dataLabel.position = 'Top';
            this.chart.series[0].marker.dataLabel.enableRotation = false;
            this.chart.series[0].marker.dataLabel.font.color = '';
            this.chart.series[1].marker.dataLabel.visible = true;
            this.chart.series[1].marker.dataLabel.position = 'Top';
            this.chart.series[1].marker.dataLabel.enableRotation = false;
            this.chart.series[1].marker.dataLabel.font.color = '';
            this.chart.primaryXAxis.labelRotation = 90;
        }
        this.chart.refresh();
    }
    constructor() {
        //code
    };

}
