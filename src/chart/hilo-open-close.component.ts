import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IRangeLoadedEventArgs, IChangedEventArgs,
ChartComponent, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { chartDataValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for HiloOpenClose Series
 */

@Component({
    selector: 'control-content',
    templateUrl: 'hilo-open-close.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class HiloOpenCloseChartComponent {
    @ViewChild('chartcontainer')
    public chart: ChartComponent;
    public data1: Object[] = chartDataValue;

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        crosshairTooltip: { enable: true },
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: 'n0',
        lineStyle: { width: 0 },
        rangePadding: 'None',
        majorTickLines: { width: 0 }
    };

    public tooltip: Object = {
        enable: true,
        shared: true
    };
    public marker: Object = {
        visible: false
    };
    public crosshair: Object = {
        enable: true,
        lineType: 'Vertical', line: {
            width: 0,
        }
    };
    public legendSettings: Object = {
        visible: false
    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
         if (args.axis.title === 'Price') {
                args.text = '$' + args.text;
            }
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    public loadPeriodic(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    public loaded(args: IRangeLoadedEventArgs): void {
        if (!Browser.isDevice) {
            document.getElementById('containerTop_Secondary_Element').style.transform = 'translate(13%)';
        }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
     public periodSelectorSettings: Object = {
        position: 'Top',
        periods: [
                { text: '1M', interval: 1, intervalType: 'Months' },
                { text: '3M', interval: 2, intervalType: 'Months' },
                { text: '2Q', interval: 2, intervalType: 'Quarter' },
                { text: '1Y', interval: 1, intervalType: 'Years' },
                { text: '2Y', interval: 2, intervalType: 'Years', selected: true },
                { text: 'YTD' },
                { text: 'All' }
            ]
    };
    public changed(args: IChangedEventArgs): void {
          let data: Object[] = chartDataValue.filter((data: object) => {
                    /* tslint:disable:no-string-literal */
                    return (data['x'].getTime() >= (args.start as Date).getTime() &&
                        data['x'].getTime() <= (args.end as Date).getTime());
                });
          this.chart.series[0].animation.enable = false;
          this.chart.series[0].dataSource = data;
          this.chart.primaryXAxis.zoomFactor = 1;
          this.chart.primaryXAxis.zoomPosition = 0;
          this.chart.refresh();
    };
    public width: string = Browser.isDevice ? '100%' : '80%';

    constructor() {
        //code
    };

}