import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, IPointRenderEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { LabelIntersectAction, EdgeLabelPlacement, AxisPosition } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';


/**
 * Sample for smart axis labels Positions
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multi-level-label.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MultiLevelLabelsChartComponent {

    public data: Object[] = [
        { x: 'Grapes', y: 28 }, { x: 'Apples', y: 87 },
        { x: 'Pears', y: 42 }, { x: 'Grapes', y: 13 },
        { x: 'Apples', y: 13 }, { x: 'Pears', y: 10 },
        { x: 'Tomato', y: 31 }, { x: 'Potato', y: 96 },
        { x: 'Cucumber', y: 41 }, { x: 'Onion', y: 59 }];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', labelRotation: 90,
        border: { width: 1, type: 'Rectangle' },
        isIndexed: true, interval: 1, majorGridLines: { width: 0 }, labelIntersectAction : Browser.isDevice ? 'Rotate90' : 'Trim',
        multiLevelLabels: (Browser.isDevice ? ([
            {
                border: { type: 'Rectangle' },
                categories: [
                    { start: -0.5, end: 2.5, text: 'In Season', },
                    { start: 2.5, end: 5.5, text: 'Out of Season', },
                    { start: 5.5, end: 7.5, text: 'In Season', },
                    { start: 7.5, end: 9.5, text: 'Out of Season', },
                ]
            }, {
                border: { type: 'Rectangle' },
                textStyle: { fontWeight: 'Bold' },
                categories: [
                    { start: -0.5, end: 5.5, text: 'Fruits', },
                    { start: 5.5, end: 9.5, text: 'Vegetables', },
                ]
            }]) : [
                {
                    border: { type: 'Rectangle' },
                    categories: [
                        { start: -0.5, end: 0.5, text: 'Seedless', },
                        { start: 0.5, end: 2.5, text: 'Seeded', },
                        { start: 2.5, end: 3.5, text: 'Seedless', },
                        { start: 3.5, end: 5.5, text: 'Seeded', },
                        { start: 5.5, end: 6.5, text: 'Seedless', },
                        { start: 6.5, end: 7.5, text: 'Seeded', },
                        { start: 7.5, end: 8.5, text: 'Seedless', },
                        { start: 8.5, end: 9.5, text: 'Seeded', }
                    ]
                }, {
                    border: { type: 'Rectangle' },
                    categories: [
                        { start: -0.5, end: 2.5, text: 'In Season', },
                        { start: 2.5, end: 5.5, text: 'Out of Season', },
                        { start: 5.5, end: 7.5, text: 'In Season', },
                        { start: 7.5, end: 9.5, text: 'Out of Season', },
                    ]
                }, {
                    border: { type: 'Rectangle' },
                    textStyle: { fontWeight: 'Bold' },
                    categories: [
                        { start: -0.5, end: 5.5, text: 'Fruits', },
                        { start: 5.5, end: 9.5, text: 'Vegetables', },
                    ]
                }])
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 120, interval: 30,
        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
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
    public width: string = Browser.isDevice ? '100%' : '75%';
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
            position: 'Outer',
        }
    };
    public tooltip: Object = {
        enable: false
    };
    public title: string = 'Fruits and Vegetables - Season';
    constructor() {
        // code
    };
}