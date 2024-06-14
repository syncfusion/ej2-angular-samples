import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAnnotationSettingsModel, ILegendClickEventArgs, Chart, IZoomCompleteEventArgs, IMouseEventArgs, ISelectionCompleteEventArgs, ChartComponent, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { withLatestFrom } from 'rxjs/operators';
import { synchronizedData } from './financial-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'synchronized-chart.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ChartAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SynchronizedChartsComponent {

    @ViewChild('chart')
    public chart: ChartComponent;

    @ViewChild('chartobj')
    public chartobj: ChartComponent;

    @ViewChild('chart3')
    public chart3: ChartComponent;

    @ViewChild('chart4')
    public chart4: ChartComponent;

    public charts: ChartComponent[] = [];
    ngAfterViewInit() {
        this.charts = [this.chart, this.chartobj, this.chart3, this.chart4];
    }
    public zoomFactor: number = 0;
    public zoomPosition: number = 0;
    public isZoom: boolean = false;
    public selectedData: any[] = [];
    public count: number = 0;
    public legendCount: number = 0;

    public primaryXAxis: Object = {
        minimum: new Date(2023, 1, 18),
        maximum: new Date(2023, 7, 18),
        valueType: 'DateTime',
        labelFormat: 'MMM d',
        lineStyle: { width: 0 },
        majorGridLines: { width: 0 },
        edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
        labelRotation: Browser.isDevice ? -45 : 0,
        interval: Browser.isDevice ? 2 : 1
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: 'n2',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        minimum: 0.86,
        maximum: 0.96,
        interval: 0.025
    };
    public primaryYAxis2: Object = {
        labelFormat: '{value}',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        minimum: 120,
        maximum: 152,
        interval: 8,
        labelPadding: 8
    };
    public primaryYAxis3: Object = {
        labelFormat: 'n2',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        minimum: 1.30,
        maximum: 1.37,
        interval: 0.0175
    };
    public primaryYAxis4: Object = {
        labelFormat: 'n1',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        minimum: 79,
        maximum: 85,
        interval: 1.5
    };
    //Initializing Primary Y Axis

    public chartArea: Object = {
        border: {
            width: 0
        }
    };

    public zoomSettings: Object = {
        enableMouseWheelZooming: true,
        enablePinchZooming: true,
        enableScrollbar: false,
        enableDeferredZooming: false,
        enablePan: true,
        mode: 'X',
        toolbarItems: ['Pan', 'Reset']
    };

    public width: number = 2;

    public title: string = 'US to Euro';

    public title2: string = 'US to Yen';

    public title3: string = 'US to SGD';

    public title4: string = 'US to INR';

    public titleStyle: Object = { textAlignment: 'Near' };

    public tooltip: Object = { enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header:'', format: '<b>€${point.y}</b><br>${point.x} 2023', enableMarker: false };

    public tooltip2: Object = { enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header:'', format: '<b>¥${point.y}</b><br>${point.x} 2023', enableMarker: false };

    public tooltip3: Object = { enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header:'', format: '<b>$${point.y}</b><br>${point.x} 2023', enableMarker: false };

    public tooltip4: Object = { enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header:'', format: '<b>₹${point.y}</b><br>${point.x} 2023', enableMarker: false };

    public crosshair: Object = { enable: true, lineType: 'Vertical', dashArray: '2,2' };

    public dataSource = synchronizedData;

    public border: Object = {
        width: 2
    };

    public opacity: number = 0.6;

    public emptyPointSettings= { mode: 'Drop' };

    public zoomComplete(args: IZoomCompleteEventArgs): void {
        if (args.axis.name === 'primaryXAxis') {
            this.zoomFactor = args.currentZoomFactor;
            this.zoomPosition = args.currentZoomPosition;
            this.zoomCompleteFunction(args);
        }
    };
    public chartMouseLeave(args: IMouseEventArgs): void {
        this.chartobj.hideCrosshair();
        this.chart3.hideCrosshair();
        this.chart4.hideCrosshair();
        this.chartobj.hideTooltip();
        this.chart3.hideTooltip();
        this.chart4.hideTooltip();
    };
    public chartMouseMove(args: IMouseEventArgs): void {
        if ((!Browser.isDevice && !this.chart.isTouch && !this.chart.isChartDrag)  || this.chart.startMove) {
            this.chartobj.startMove = this.chart3.startMove = this.chart4.startMove = this.chart.startMove;
            this.chartobj.showTooltip(args.x, args.y);
            this.chart3.showTooltip(args.x, args.y);
            this.chart4.showTooltip(args.x, args.y);
            this.chartobj.showCrosshair(args.x, args.y);
            this.chart3.showCrosshair(args.x, args.y);
            this.chart4.showCrosshair(args.x, args.y);
        }
    };
    public chartMouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart.startMove) {
            this.chartobj.hideCrosshair();
            this.chart3.hideCrosshair();
            this.chart4.hideCrosshair();
            this.chartobj.hideTooltip();
            this.chart3.hideTooltip();
            this.chart4.hideTooltip();
        }
    };
    public chartobjMouseLeave(args: IMouseEventArgs): void {
        this.chart.hideCrosshair();
        this.chart3.hideCrosshair();
        this.chart4.hideCrosshair();
        this.chart.hideTooltip();
        this.chart3.hideTooltip();
        this.chart4.hideTooltip();
    };
    public chartobjMouseMove(args: IMouseEventArgs): void {
        if ((!Browser.isDevice && !this.chartobj.isTouch && !this.chartobj.isChartDrag) || this.chartobj.startMove) {
            this.chart.startMove = this.chart3.startMove = this.chart4.startMove = this.chartobj.startMove;
            this.chart.showTooltip(args.x, args.y);
            this.chart3.showTooltip(args.x, args.y);
            this.chart4.showTooltip(args.x, args.y);
            this.chart.showCrosshair(args.x, args.y);
            this.chart3.showCrosshair(args.x, args.y);
            this.chart4.showCrosshair(args.x, args.y);
        }
    };
    public chartobjMouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chartobj.startMove) {
            this.chart.hideCrosshair();
            this.chart3.hideCrosshair();
            this.chart4.hideCrosshair();
            this.chart.hideTooltip();
            this.chart3.hideTooltip();
            this.chart4.hideTooltip();
        }
    };
    public chart3MouseLeave(args: IMouseEventArgs): void {
        this.chartobj.hideCrosshair();
        this.chart.hideCrosshair();
        this.chart4.hideCrosshair();
        this.chartobj.hideTooltip();
        this.chart.hideTooltip();
        this.chart4.hideTooltip();
    };
    public chart3MouseMove(args: IMouseEventArgs): void {
        if ((!Browser.isDevice && !this.chart3.isTouch && !this.chart3.isChartDrag)|| this.chart3.startMove) {
            this.chart.startMove = this.chartobj.startMove = this.chart4.startMove = this.chart3.startMove;
            this.chartobj.showTooltip(args.x, args.y);
            this.chart.showTooltip(args.x, args.y);
            this.chart4.showTooltip(args.x, args.y);
            this.chartobj.showCrosshair(args.x, args.y);
            this.chart.showCrosshair(args.x, args.y);
            this.chart4.showCrosshair(args.x, args.y);
        }
    };
    public chart3MouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart3.startMove) {
            this.chartobj.hideCrosshair();
            this.chart.hideCrosshair();
            this.chart4.hideCrosshair();
            this.chartobj.hideTooltip();
            this.chart.hideTooltip();
            this.chart4.hideTooltip();
        }
    };
    public chart4MouseLeave(args: IMouseEventArgs): void {
        this.chartobj.hideCrosshair();
        this.chart3.hideCrosshair();
        this.chart.hideCrosshair();
        this.chartobj.hideTooltip();
        this.chart3.hideTooltip();
        this.chart.hideTooltip();
    };
    public chart4MouseMove(args: IMouseEventArgs): void {
        if ((!Browser.isDevice && !this.chart4.isTouch && !this.chart4.isChartDrag) || this.chart4.startMove) {
            this.chart.startMove = this.chartobj.startMove = this.chart3.startMove = this.chart4.startMove;
            this.chartobj.showTooltip(args.x, args.y);
            this.chart3.showTooltip(args.x, args.y);
            this.chart.showTooltip(args.x, args.y);
            this.chartobj.showCrosshair(args.x, args.y);
            this.chart3.showCrosshair(args.x, args.y);
            this.chart.showCrosshair(args.x, args.y);
        }
    };
    public chart4MouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart4.startMove) {
            this.chartobj.hideCrosshair();
            this.chart3.hideCrosshair();
            this.chart.hideCrosshair();
            this.chartobj.hideTooltip();
            this.chart3.hideTooltip();
            this.chart.hideTooltip();
        }
    };

    public zoomCompleteFunction(args): void {
        for (let i: number = 0; i < this.charts.length; i++) {
            if (args.axis.series[0].chart.element.id !== this.charts[i].element.id) {
                this.charts[i].primaryXAxis.zoomFactor = this.zoomFactor;
                this.charts[i].primaryXAxis.zoomPosition = this.zoomPosition;
                this.charts[i].zoomModule.isZoomed = args.axis.series[0].chart.zoomModule.isZoomed;
                this.charts[i].zoomModule.isPanning = args.axis.series[0].chart.zoomModule.isPanning;
            }
        }
    }

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        let themeColor: string[] = [];
        let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590'];
        let materialDarkColors: string[] = ['#9ECB08', '#56AEFF', '#C57AFF', '#61EAA9'];
        let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47'];
        let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e'];
        let highContrastColors: string[] = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773'];
        let bootstrap4Colors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e'];
        let bootstrap5Colors: string[] = ['#6355C7', '#FFB400', '#2196F5', '#F7523F'];
        let bootstrap5DarkColors: string[] = ['#8F80F4', '#FFD46D', '#6CBDFF', '#FF7F71'];
        let fluentColors: string[] = ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF'];
        let tailwindColors: string[] = ['#5A61F6', '#65A30D', '#334155', '#14B8A6'];
        let tailwindDarkColors: string[] = ['#8B5CF6', '#22D3EE', '#F87171', '#4ADE80'];
        let fabricdarkColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47'];
        let material3Colors: string[] = ['#6355C7', '#00AEE0', '#FFB400', '#F7523F'];
        let material3DarkColors: string[] = ['#4EAAFF', '#FA4EAB', '#FFF500', '#17EA58'];
        let fluent2Colors: string[] = ['#6200EE', '#09AF74', '#0076E5', '#CB3587'];
        let fluent2DarkColors: string[] = ['#9BB449', '#2A72D5', '#43B786', '#3F579A'];
        // check the theme
        if (args.chart.theme === 'MaterialDark') {
            themeColor = materialDarkColors;
        }
        else if (args.chart.theme === 'Material') {
            themeColor = materialColors;
        }
        else if (args.chart.theme === "Fabric") {
            themeColor = fabricColors;
        }
        else if (args.chart.theme === "FabricDark") {
            themeColor = fabricdarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5Dark') {
            themeColor = bootstrap5DarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5') {
            themeColor = bootstrap5Colors;
        }
        else if (args.chart.theme === "Bootstrap4") {
            themeColor = bootstrap4Colors;
        }
        else if (args.chart.theme === 'TailwindDark') {
            themeColor = tailwindDarkColors;
        }
        else if (args.chart.theme === 'Tailwind') {
            themeColor = tailwindColors;
        }
        else if (args.chart.theme === "HighContrast") {
            themeColor = highContrastColors;
        }
        else if (args.chart.theme === 'FluentDark') {
            themeColor = fluentColors;
        }
        else if (args.chart.theme === 'Bootstrap') {
            themeColor = bootstrapColors;
        }
        else if (args.chart.theme === 'BootstrapDark') {
            themeColor = bootstrapColors;
        }
        else if (args.chart.theme === 'Material3') {
            themeColor = material3Colors;
        }
        else if (args.chart.theme === 'Material3Dark') {
            themeColor = material3DarkColors;
        }
        else if (args.chart.theme === 'Fluent2') {
            themeColor = fluent2Colors;
        }
        else if (args.chart.theme === 'Fluent2Dark') {
            themeColor = fluent2DarkColors;
        }
        else {
            themeColor = fluentColors;
        }
        // check the container
        if (args.chart.element.id === 'container3') {
            args.chart.series[0].fill = themeColor[0];
        }
        else if (args.chart.element.id === 'container4') {
            args.chart.series[0].fill = themeColor[1];
        }
        else if (args.chart.element.id === 'container1') {
            args.chart.series[0].fill = themeColor[2];
        }
        else if (args.chart.element.id === 'container2') {
            args.chart.series[0].fill = themeColor[3];
        }
    };

    constructor() {
        // code
    };
}