import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { IAxisLabelRenderEventArgs, ILoadedEventArgs, IPointRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Chart, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Sample for Remote-Data binding
 */
@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    styleUrls: ['remotedata.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class RemoteDataChartComponent {

    public data: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/angular/production/api/orders'
    });
    @ViewChild('chart')
    public chart: ChartComponent;
    public query: Query = new Query().take(5);
    public chartArea: Object = {
        border: { width: 0 }
    };
    
    public loadedChart(args: Chart): void {
        let div: HTMLElement = document.getElementById('waitingpopup') as HTMLElement;
        div.style.display = 'none';
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
    let pointBootstrap5Colors: string[] = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384', '#DC3545', '#FFC107', '#198754', '#0DCAF0'];
    let pointBootstrap5DarkColors: string[] = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384', '#DC3545', '#FFC107', '#198754', '#0DCAF0'];
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
    public tooltipRender(args): void {
        args.text = args.data.pointX + ': <b>' + '$' +args.data.pointY * 1000+ '</b>';
    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text =  ''+args.value * 1000;
            }
    };
    public loadChart(args: ILoadedEventArgs): void {
        let div: HTMLElement = document.getElementById('waitingpopup');
        div.style.display = 'block';
        let width: number = args.chart.element.offsetWidth;
        let height: number = args.chart.element.offsetHeight;
        div.style.top = (height ? height : 300 / 2 - 25) + 'px';
        div.style.left = (width / 2 - 25) + 'px';
        div.style.display = '';
         let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        // custom code end
    };
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        rangePadding: 'Additional',
        valueType: 'Category',
        labelRotation: Browser.isDevice ? -45 : 0,
        labelIntersectAction: Browser.isDevice ? 'None': 'Rotate45',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
    };
    //Initializing Marker
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: {
                fontWeight: '600', color: '#ffffff'
            },
            format:"{value}K"
        }
    }
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        majorGridLines: { width: 1 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        title: 'Freight rate in U.S dollars'
    };
    public legend: Object = {
        visible: false
    };
    public width: Object = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = {
        enable: true,
        header: '<b>Freight rate</b>'
    };
    public title: string = 'Container freight rate';
    constructor() {
        //Code
    };

}