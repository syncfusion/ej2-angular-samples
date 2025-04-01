import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, IPointRenderEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { LabelIntersectAction, EdgeLabelPlacement, AxisPosition } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, pointRender } from './theme-color';

/**
 * Sample for smart axis labels Positions
 */
@Component({
    selector: 'control-content',
    templateUrl: 'smart-axis-labels.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, NumericTextBoxModule, SBDescriptionComponent]
})
export class SmartAxisLabelsChartComponent {

    public data: Object[] = [
        { x: 'South Korea', y: 39 }, { x: 'India', y: 61 },
        { x: 'Pakistan', y: 20 }, { x: 'Germany', y: 65 },
        { x: 'Australia', y: 16 }, { x: 'Italy', y: 29 },
        { x: 'France', y: 45 }, { x: 'United Arab Emirates', y: 10 },
        { x: 'Russia', y: 41 }, { x: 'Mexico', y: 31 },
        { x: 'Brazil', y: 76 }, { x: 'China', y: 51 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1,
        majorGridLines: { width: 0 },
        labelIntersectAction: 'Hide',
        majorTickLines: {width : 0},
        minorTickLines: {width: 0}
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelStyle: { size: '0px' },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 0 },
        lineStyle: { width: 0 },
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public legendSettings: Object = {
        visible: false
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {       
        loadChartTheme(args);
      };
       // custom code end
    public pointRender(args: IPointRenderEventArgs): void {
        pointRender(args);
    };
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            enableRotation: Browser.isDevice ? true : false,
            angle: -90,
            format: "{value}M",
            font: { fontWeight: '600', color: '#ffffff' }
        }
    };
    public tooltip: Object = {
        enable: true, 
        header: '',
        format: '<b>${point.x}</b> <br> Internet Users : <b>${point.y}M</b>'
    };
    public trim(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.primaryXAxis.enableTrim = element.checked;
        this.chart.series[0].animation.enable = false;
        this.chart.refresh();
    }
    public labelWidth(e: Event): void {
        this.chart.primaryXAxis.maximumLabelWidth = this.labelwidth.value;
        this.chart.series[0].animation.enable = false;
        this.chart.refresh();
    };
    @ViewChild('width')
    public labelwidth: NumericTextBox;
    public title: string = 'Internet Users in Millions';
    @ViewChild('chart')
    public chart: ChartComponent;
    public labelIntersect: DropDownList;
    public edgePlacement: DropDownList;
    public labelPosition: DropDownList;
    ngOnInit(): void {
        this.labelIntersect = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let type: string = this.labelIntersect.value.toString();
                this.chart.primaryXAxis.labelIntersectAction = <LabelIntersectAction>type;
                this.chart.dataBind();
            }
        });
        this.labelIntersect.appendTo('#intersecttype');
        this.edgePlacement = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let type: string = this.edgePlacement.value.toString();
                this.chart.primaryXAxis.edgeLabelPlacement = <EdgeLabelPlacement>type;
                this.chart.dataBind();
            }
        });
        this.edgePlacement.appendTo('#labelplacement');
        this.labelPosition = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let type: string = this.labelPosition.value.toString();
                this.chart.primaryXAxis.labelPosition = <AxisPosition>type;
            }
        });
        this.labelPosition.appendTo('#labelPosition');
    }
    constructor() {
        // code
    };
}