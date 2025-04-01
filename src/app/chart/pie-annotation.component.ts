import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, IMouseEventArgs, ChartComponent, IAccLoadedEventArgs, AccumulationTheme,AccumulationChartModule, SelectionMode, ChartTheme, Series, IAccResizeEventArgs, ChartAnnotationSettingsModel, IAxisLabelRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import {
    AccumulationChart, AccumulationDataLabel
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationDataLabel);
import { Browser } from '@syncfusion/ej2-base';
import { chartDatas } from './financial-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Annotation in chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pie-annotation.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,AccumulationChartModule, ChartAllModule, SBDescriptionComponent]
})
export class AnnotationChartComponent {
    public pie: AccumulationChart;
    public render: boolean = false;
    @ViewChild('chart')
    public chart: ChartComponent;
    public legend: Object = {
        visible: true,
        toggleVisibility: false
    };
    //Initializing dataSource
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Distance',
        labelFormat: 'N2',
        majorGridLines: { width: 0 },                   
    };
    public data1: Object[] = chartDatas;
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public marker: Object = {
        height: 7,
        width: 7,
        fill: 'rgb(247, 206, 105,0.7',
    };
    public animation: Object = {
        enable: false
    };
    public tooltip: Object = {
        enable: true,
        showNearestTooltip: true,
        header: "",
        enableMarker: "",
        format: "Distance: ${point.x} KM <br> ${point.y} KM/H",
        fill: "white",
        textStyle: {
            color: 'black'
        },
        border:{
            
                color:'rgb(247, 206, 105)',
                width: 2
        },

    };

    public labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryXAxis' )
        {
        args.text = args.text + " KM";
        }
   };
    public border: Object = {
        color: '#000000',
        width: 2.5
    };
    public annotations: ChartAnnotationSettingsModel[] = [
        {
            content : '<div class="first-box-bottom" > Senna S </div>', x:'0.360', y:'80' , coordinateUnits:'Point'
        },
        {
            content : '<div class="second-box-bottom" > Descida do Lego </div>',  x:'1.400', y:'130' , coordinateUnits:'Point'
        },
        {
            content :  '<div class="third-box-bottom" > Ferradura </div>', x:'2.100', y:'200' , coordinateUnits:'Point'
        },
        {
            content :'<div class="box-left" > Curva do Sol </div>', x:'0.85', y:'155' , coordinateUnits:'Point'
        },
        {
            content :'<div class="box-top-left" > Reta Oposta </div>', x:'0.700', y:'292'  ,coordinateUnits:'Point'
        },
        {
            content : '<div class="box-bottom" > Bico de Pato </div>',  x:'2.750', y:'80' , coordinateUnits:'Point'
        },
        {
            content : '<div class="box-top" > Mergulho </div>', x:'3.136', y:'284' , coordinateUnits:'Point'
        },
        {
            content :  Browser.isDevice ? '' :'<div class="third-box-bottom" > Junção </div>',  x:'3.270', y:'98' , coordinateUnits:'Point'
        },
        {
            content : Browser.isDevice ? '' :'<div class="box-top" > Subida dos <br /> Boxes </div>', x:'3.800', y:'312' , coordinateUnits:'Point'
        },
        {
            content : Browser.isDevice ? '' :'<div style="font-family: sans-serif" > Max, accelertion <br /> 5.00 g at 5th gear </div>', x:'1.65', y:'300' , coordinateUnits:'Point'
        },
        {
            content : Browser.isDevice ? '' :'<div style="font-family: sans-serif" > Max, accelertion <br /> 4.58 g at 5th gear </div>', x:'2.60', y:'250' ,coordinateUnits:'Point'
        },
        

    ];
    public width: string = Browser.isDevice ? '100%' : '75%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: ChartTheme | string = loadChartTheme(args);
        if (selectedTheme.match('Dark')) {
            args.chart.series[0].fill = 'url(#dark-gradient-chart)'; 
        }
        else {
            args.chart.series[0].fill = 'url(#gradient-chart)';  
        }
    };
    // custom code end
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Speed (KM/H)', lineStyle: { width: 0 },
        minimum: 50, maximum: 400,   
        majorTickLines: { width: 0 }
    };
    public getValue(series: Series[], pointIndex: number, y: number): string {
        let totalValue: number = 0;
        for (let ser of series) {
            totalValue += ser.points[pointIndex].y as number;
        }
        return (Math.round((y / totalValue) * 100)) + '%';
    };
    public title: string = 'Speed Data Plot for Interlagos Circuit';
    public selectedDataIndexes: any[] = [{ series: 0, point: 0 }];
    public selectionMode: SelectionMode = 'Cluster';

    public loaded(args: ILoadedEventArgs): void {
    
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            
    }
    constructor() {
        // code
    };
}