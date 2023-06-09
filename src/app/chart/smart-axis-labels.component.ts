import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, IPointRenderEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { LabelIntersectAction, EdgeLabelPlacement, AxisPosition } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-angular-inputs';

/**
 * Sample for smart axis labels Positions
 */
@Component({
    selector: 'control-content',
    templateUrl: 'smart-axis-labels.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
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
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
      };
       // custom code end
    public pointRender(args: IPointRenderEventArgs): void {
        let pointMaterialColors: string[] = ["#00bdae", "#404041", "#357cd2", "#e56590", "#f8b883", "#70ad47", "#dd8abd", "#7f84e8", "#7bb4eb",
        "#ea7a57", "#404041", "#00bdae"];
    let pointMaterialDarkColors: string[] = ["#9ECB08", "#56AEFF", "#C57AFF", "#61EAA9", "#EBBB3E", "#F45C5C", "#8A77FF", "#63C7FF", "#FF84B0",
        "#F7C928"];
    let pointFabricColors: string[] = ["#4472c4", "#ed7d31", "#ffc000", "#70ad47", "#5b9bd5", "#c1c1c1", "#6f6fe2", "#e269ae", "#9e480e",
        "#997300", "#4472c4", "#70ad47", "#ffc000", "#ed7d31"];
    let pointBootstrapColors: string[] = ["#a16ee5", "#f7ce69", "#55a5c2", "#7ddf1e", "#ff6ea6", "#7953ac", "#b99b4f", "#407c92", "#5ea716",
        "#b91c52"];
    let pointHighContrastColors: string[] = ["#79ECE4", "#E98272", "#DFE6B6", "#C6E773", "#BA98FF", "#FA83C3", "#00C27A", "#43ACEF", "#D681EF",
        "#D8BC6E"];
    let pointBootstrap5Colors: string[] = ["#262E0B", "#668E1F", "#AF6E10", "#862C0B", "#1F2D50", "#64680B", "#311508", "#4C4C81", "#0C7DA0",
        "#862C0B"];
    let pointBootstrap5DarkColors: string[] = ["#5ECB9B", "#A860F1", "#EBA844", "#557EF7", "#E9599B", "#BFC529", "#3BC6CF", "#7A68EC", "#74B706",
        "#EA6266"];
    let pointFluentColors: string[] = ["#614570", "#4C6FB1", "#CC6952", "#3F579A", "#4EA09B", "#6E7A89", "#D4515C", "#E6AF5D", "#639751",
        "#9D4D69"];
    let pointFluentDarkColors: string[] = ["#8AB113", "#2A72D5", "#43B786", "#584EC6", "#E85F9C", "#6E7A89", "#EA6266", "#EBA844", "#26BC7A",
        "#BC4870"];
    let pointTailwindColors: string[] = ["#5A61F6", "#65A30D", "#334155", "#14B8A6", "#8B5CF6", "#0369A1", "#F97316", "#9333EA", "#F59E0B",
        "#15803D"];
    let pointTailwindDarkColors: string[] = ["#8B5CF6", "#22D3EE", "#F87171", "#4ADE80", "#E879F9", "#FCD34D", "#F97316", "#2DD4BF", "#F472B6",
        "#10B981"];
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';

        if (selectedTheme==='material-dark')
        {
            args.border.color = pointMaterialDarkColors[args.point.index % 10];
        }
        else if(selectedTheme==='material')
        {
            args.fill = pointMaterialColors[args.point.index % 10];
        }
        else if (selectedTheme==='fabric-dark' || selectedTheme==='fabric')
        {
            args.fill= pointFabricColors[args.point.index % 10];
        }
        else if (selectedTheme==='bootstrap5-dark')
        {
            args.fill = pointBootstrap5DarkColors[args.point.index % 10];
        }
        else if (selectedTheme==='bootstrap5')
        {
            args.fill = pointBootstrap5Colors[args.point.index % 10];
        }
        else if (selectedTheme==='fluent-dark')
        {
            args.fill = pointFluentDarkColors[args.point.index % 10];
        }
        else if (selectedTheme==='fluent')
        {
            args.fill = pointFluentColors[args.point.index % 10];
        }
        else if (selectedTheme==='bootstrap4' || selectedTheme==='bootstrap')
        {
                args.fill = pointBootstrapColors[args.point.index % 10];           
        }
        else if (selectedTheme==='tailwind-dark')
        {
            args.fill = pointTailwindDarkColors[args.point.index % 10];                     

        }
        else if (selectedTheme==='tailwind')
        {                    
            args.fill = pointTailwindColors[args.point.index % 10];
        }
        else if (selectedTheme==='highcontrast')
        {
            args.fill = pointHighContrastColors[args.point.index % 10];           
        }
        else
        {
            args.fill = pointBootstrapColors[args.point.index % 10];           
        }
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
        format: "<b>${point.x}</b> <br> Internet Users : <b>${point.y}M</b>"
    };
    public trim(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.primaryXAxis.enableTrim = element.checked;
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
                this.chart.refresh();
            }
        });
        this.labelPosition.appendTo('#labelPosition');
    }
    constructor() {
        // code
    };
}