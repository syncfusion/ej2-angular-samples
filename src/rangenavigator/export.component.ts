import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, ExportType, IRangeLoadedEventArgs, IChangedEventArgs, DateTime, AreaSeries,
    Chart, StepLineSeries, RangeNavigator, RangeTooltip } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { dataCollection } from './data-service';

/**
 * Sample for range navigator with print and export functionalities.
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
let themes: string[] = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
let borderColor: string[] = ['#FF4081', '#007897', '#428BCA', '#FFD939'];
let regionColor: string[] = ['rgba(255, 64, 129, 0.3)', ' rgba(0, 120, 151, 0.3)',
    'rgba(66, 139, 202, 0.3)', 'rgba(255, 217, 57, 0.3)'];

    @Component({
        selector: 'control-content',
        templateUrl: 'export.html',
        encapsulation: ViewEncapsulation.None
    })

    export class RangeNavigatorExportComponent {
        @ViewChild('chartExport')
        public chart: Chart;
        @ViewChild('containerExport')
        public rangeNavigator: RangeNavigator;

        public primaryXAxis:Object = {
            valueType: 'DateTime', crosshairTooltip: { enable: true },
            edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }
        };

        public chartArea: Object = { border: { width: 0 } };
        public primaryYAxis: Object = {
            minimum: 81, maximum: 87, interval: 2,
            majorTickLines: { width: 0 }, lineStyle: { width: 0 },
            labelFormat: '{value}M', title: 'Million in USD'
        };
        public crosshair: Object = { enable: false, lineType: 'None'};
        public chartTooltip: Object = { enable: true, shared: true };
        public width: string = '100%';
        public border: Object = { width: 2, color: borderColor[themes.indexOf(theme)] };
        public fill: string = regionColor[themes.indexOf(theme)];
        public value: Object = [new Date('2013-05-01'), new Date('2013-08-01')];
        public data: Object = dataCollection;
        public legendSettings: Object = { visible: false };
        public theme: string = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        public changed(args: IChangedEventArgs): void {
            this.chart.primaryXAxis.zoomFactor = args.zoomFactor;
            this.chart.primaryXAxis.zoomPosition = args.zoomPosition;
            this.chart.dataBind();
        };
        public onClick(e: Event): void {
            let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
            this.chart.exportModule.export(<ExportType>this.exportType.value, fileName, null, [this.rangeNavigator, this.chart]);
        };
        public mode(e: Event): void {
        this.rangeNavigator.print(['containerExport', 'chartExport']);
    }
        public exportType: DropDownList;
        ngOnInit(): void {
            this.exportType = new DropDownList({
                index: 0,
                width: 90,
            });
            this.exportType.appendTo('#exporttype');
        }

    }