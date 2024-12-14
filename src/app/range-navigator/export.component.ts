import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, ExportType, IRangeLoadedEventArgs, IChangedEventArgs, DateTime, AreaSeries,
    Chart, StepLineSeries, RangeNavigator, RangeTooltip } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { dataCollection } from './data-service';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RangeNavigatorModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';

/**
 * Sample for range navigator with print and export functionalities.
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
let exportthemes: string[] =  ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
let borderColor : string[] = ['#FF4081', '#007897', '#5A61F6', '#8B5CF6', '#FFD939', '#FD7E14', '#4F46E5', '#FF4081', '#007897', '#428BCA', '#22D3EE', '#FD7E14', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
let regionColor: string[] = ['rgba(253, 126, 20, 0.3)', 'rgba(253, 126, 20, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(255, 217, 57, 0.3)', 'rgba(253, 126, 20, 0.3)', 'rgba(79, 70, 229, 0.3)',
        'rgba(255, 64, 129, 0.3)', 'rgba(0, 120, 151, 0.3)', 'rgba(66, 139, 202, 0.3)', 'rgba(34, 211, 238, 0.3)', 'rgba(253, 126, 20, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)', 'rgba(98, 0, 238, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(47, 64, 116, 0.3)', 'rgba(128, 41, 241, 0.3)'];
    @Component({
    selector: 'control-content',
    templateUrl: 'export.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RangeNavigatorModule, ChartAllModule, ButtonModule]
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
        public border: Object = { width: 2, color: borderColor[exportthemes.indexOf(theme.toLowerCase())] };
        public fill: string = regionColor[exportthemes.indexOf(theme.toLowerCase())];
        public value: Object = [new Date('2013-05-01'), new Date('2013-08-01')];
        public data: Object = dataCollection;
        public legendSettings: Object = { visible: false };
        public theme: string = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
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