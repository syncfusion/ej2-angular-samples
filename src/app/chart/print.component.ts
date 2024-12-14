import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IPointRenderEventArgs, ChartComponent, ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
/**
 * Sample for Chart Print
 */
@Component({
    selector: 'control-content',
    templateUrl: 'print.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ChartAllModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class PrintChartComponent {

    public data: Object[] = [
        { x: 'John', y: 10, dataLabelMappingName: "$10k"  }, { x: 'Jake', y: 12, dataLabelMappingName: "$12k" }, { x: 'Peter', y: 18, dataLabelMappingName: "$18k"},
    { x: 'James', y: 11, dataLabelMappingName: "$11k" }, { x: 'Mary', y: 9.7, dataLabelMappingName: "$9.7k"}
    ];
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
     // custom code end
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
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
        let pointBootstrap5Colors: string[] = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384', '#DC3545',
            '#FFC107', '#198754', '#0DCAF0','#FD7E14', '#6610F2'];
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
        let pointTailwind3Colors: string[] = ['#2F4074', '#03B4B4', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822'];
        let pointTailwind3DarkColors: string[] = ['#8029F1', '#1ABC9C', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822'];
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
            else if (selectedTheme === 'bootstrap5' || selectedTheme === 'bootstrap5-dark') {
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
            } else if (selectedTheme === 'tailwind3') {
                args.fill = pointTailwind3Colors[args.point.index % 10];
            } else if (selectedTheme === 'tailwind3-dark') {
                args.fill = pointTailwind3DarkColors[args.point.index % 10];
            }
            else
            {
                args.fill = pointBootstrapColors[args.point.index % 10];           
            }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '${value}k',
        minimum: 0,
        maximum: 20,
        lineStyle: {width : 0},
        minorTickLines: {width: 0},
        interval: 4,
        majorTickLines: {width : 0},
    };
   
    public marker: Object = {
        dataLabel: { visible: true, position: 'Top', name:'dataLabelMappingName', font:{fontWeight: 600} }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    @ViewChild('chart')
    public chart: ChartComponent;
    public title: string = 'Sales Comparision';
    public mode(e: Event): void {
        this.chart.print();
    }
    constructor() {
        //code
    };

}
