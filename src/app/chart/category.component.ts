import { Component, ViewEncapsulation } from '@angular/core';
import { IPointRenderEventArgs, ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Category axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'category.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CategoryChartComponent {
    public data: Object[] = [
        { x: 'Germany', y: 72, country: 'GER: 72M'},
        { x: 'Russia', y: 103.1, country: 'RUS: 103.1M'},
        { x: 'Brazil', y: 139.1, country: 'BRZ: 139.1M'},
        { x: 'India', y: 462.1, country: 'IND: 462.1M'},
        { x: 'China', y: 721.4, country: 'CHN: 721.4M'},
        { x: 'United States<br>Of America', y: 286.9, country: 'USA:  286.9M'},
        { x: 'Great Britain', y: 115.1, country: 'GBR: 115.1M'},
        { x: 'Nigeria', y: 97.2, country: 'NGR: 97.2M'},
    ];
    public tooltipMappingName: 'country';
    public marker: Object = {
        dataLabel: {
            visible: true,
            position:  'Top', font: {
                fontWeight: '600',
                color:  '#ffffff'
            }
        }
    }
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        enableTrim: false,
        majorTickLines: {width : 0},
        minorTickLines: {width: 0}
    };
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
        let pointBootstrap5Colors: string[] = ['#6355C7', '#FFB400', '#2196F5', '#F7523F', '#963C70', '#4BE0BC', '#FD7400', '#C9E422', '#DE3D8A', 
            '#162F88'];
        let pointBootstrap5DarkColors: string[] = ['#8F80F4', '#FFD46D', '#6CBDFF', '#FF7F71', '#FF6DB3', '#63F5D2', '#FCAA65', '#ECFF77', '#EF8EFF', 
            '#5F82FD'];
        let pointFluentColors: string[] = ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF', '#FF7266', '#1BD565', '#EE993D', '#5887FF', '#EC548D', 
            '#7D39C0'];
        let pointFluentDarkColors: string[] =  ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF', '#FF7266', '#1BD565', '#EE993D', '#5887FF', '#EC548D', 
            '#7D39C0'];
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
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
      // custom code end
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0,
        maximum: 800,
        labelFormat: '{value}M',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: {
            color: 'transparent'
        }
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: false, format: '${point.tooltip}'
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public legend: Object = {
        visible: false
    }
    public width: string = Browser.isDevice ? '100%' : '75%';

    public title: string = 'Internet Users – 2016';
    constructor() {
        //code
    };

}