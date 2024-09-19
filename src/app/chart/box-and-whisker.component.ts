import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ILoadedEventArgs, ChartComponent, BoxPlotMode, IPointRenderEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { getSaturationColor} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Sample for box and whisker series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'box-and-whisker.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class BoxandWhiskerChartComponent {
    public data1: Object[] = [
        { x: 'Development', y: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
        { x: 'Testing', y: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
        { x: 'Finance', y: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
        { x: 'R&D', y: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
        { x: 'Sales', y: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
        { x: 'Inventory', y: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
        { x: 'Graphics', y: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
        { x: 'Training', y: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
        { x: 'HR', y: [28, 29, 30, 31, 32, 34, 35, 36] }
    ];
    public pointRender(args: IPointRenderEventArgs): void {
        let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
            '#ea7a57', '#404041', '#00bdae'];
        let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
            '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
        let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
            '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
        let fluentColors: string[] = ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF', '#FF7266', '#1BD565', '#EE993D', '#5887FF', '#EC548D', 
            '#7D39C0'];
        let fluentDarkColors: string[] =  ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF', '#FF7266', '#1BD565', '#EE993D', '#5887FF', '#EC548D', 
            '#7D39C0'];
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
        let pointBootstrap5Colors: string[] = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384', '#DC3545', '#FFC107', '#198754', '#0DCAF0', '#FD7E14', '#6610F2'];
        let pointBootstrap5DarkColors: string[] = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384', '#DC3545', '#FFC107', '#198754', '#0DCAF0', '#FD7E14', '#6610F2'];
        let pointFluentColors: string[] = ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF', '#FF7266', '#1BD565', '#EE993D', '#5887FF', '#EC548D', 
            '#7D39C0'];
        let pointFluentDarkColors: string[] =  ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF', '#FF7266', '#1BD565', '#EE993D', '#5887FF', '#EC548D', 
            '#7D39C0'];
        let pointTailwindColors: string[] = ["#5A61F6", "#65A30D", "#334155", "#14B8A6", "#8B5CF6", "#0369A1", "#F97316", "#9333EA", "#F59E0B",
            "#15803D"];
        let pointTailwindDarkColors: string[] = ["#8B5CF6", "#22D3EE", "#F87171", "#4ADE80", "#E879F9", "#FCD34D", "#F97316", "#2DD4BF", "#F472B6",
            "#10B981"];
        let pointFluent2Colors: string[] = ['#6200EE', '#09AF74', '#0076E5', '#CB3587', '#E7910F', '#0364DE', '#66CD15', '#F3A93C', '#107C10',
            '#C19C00'];
        let pointFluent2HighContrastColors: string[] = ['#9BB449', '#2A72D5', '#43B786', '#3F579A', '#584EC6', '#E85F9C', '#6E7A89', '#EA6266',
            '#0B6A0B', '#C19C00'];       
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    
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
            else if (selectedTheme === 'fluent2') {
                args.fill = pointFluent2Colors[args.point.index % 10];
            } else if (selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'fluent2-dark') {
                args.fill = pointFluent2HighContrastColors[args.point.index % 10];
            }
            else
            {
                args.fill = pointBootstrapColors[args.point.index % 10];           
            }
    };
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        labelIntersectAction : Browser.isDevice ? 'None' : 'Rotate90',
        majorTickLines: {width : 0},
        minorTickLines: {width: 0},
        labelRotation: Browser.isDevice ? -45 : 0
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 10,
        maximum: 60,
        interval: 10,
        title: 'Age',
        majorGridLines: { width: 1 },
        majorTickLines: { width: 0 },
        lineStyle: {width: 0}
    };
    public marker: Object = {
        visible: true,
        height: 7,
        width: 7,
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    //Initializing Tooltip
    public tooltip: Object = { enable: true };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    public title: string = 'Employee Age Group in various department';
    @ViewChild('chart')
    public chart: ChartComponent;
    public check(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.series[0].showMean = element.checked;
        this.chart.series[0].animation.enable = false;
        this.chart.refresh();
    };
    public legend: Object = {
        visible: false
    }
    public onChange(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.series[0].boxPlotMode = <BoxPlotMode>element.value;
        this.chart.series[0].animation.enable = false;
        this.chart.refresh();
    }
    public boxPlotMode: DropDownList;
    ngOnInit(): void {
        this.boxPlotMode = new DropDownList({
            index: 0,
            width: 120,
            change: () => {
                let mode: string = this.boxPlotMode.value.toString();
                this.chart.series[0].boxPlotMode = <BoxPlotMode>mode;
                this.chart.series[0].animation.enable = false;
                this.chart.refresh();
            }
        });
        this.boxPlotMode.appendTo('#selmode');
    }
    constructor() {
        //code
    };

}