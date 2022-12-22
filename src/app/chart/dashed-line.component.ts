import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme,} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Line Series with dashed line
 */
@Component({
    selector: 'control-content',
    templateUrl: 'dashed-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashedLineChartComponent {
    public data: Object[] = [
        { Period : "Jan", Banana_ProductionRate : 100 },
        { Period : "Feb", Banana_ProductionRate : 110 },
        { Period : "Mar", Banana_ProductionRate : 125 },
        { Period : "Apr", Banana_ProductionRate : 150 },
        { Period : "May", Banana_ProductionRate : 140 },
        { Period : "Jun", Banana_ProductionRate : 160 }
    ];
    public data1: Object[] = [
        { Period : "Jun", Banana_ProductionRate : 160 },
        { Period : "Jul", Banana_ProductionRate : 170 },
        { Period : "Aug", Banana_ProductionRate : 180 },
        { Period : "Sep", Banana_ProductionRate : 190 },
        { Period : "Oct", Banana_ProductionRate : 200 },
        { Period : "Nov", Banana_ProductionRate : 230 },
        { Period : "Dec", Banana_ProductionRate : 270 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        interval: 1,
        labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
        labelRotation: Browser.isDevice ? -45 : 0,
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}K',
        rangePadding: 'None',
        lineStyle: { width: 0 },
        minimum: 0,
        maximum: 300,
        interval: 50,
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    //Initializing Marker
    public marker: Object = {
        visible: false,
        width: 7,
        height: 7
    };
    public crosshair: Object = {
        enable: false,
        line: {
            color: 'rgba(204,214,235,0.25)',
            width: Browser.isDevice ? 50 : 20,
        },
        lineType: 'Vertical'
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = {
        header: '<b>Fruits Production</b>',
        enable: true,
        shared: true,
        format: '${point.x} : <b>${point.y}'
    };
      // custom code start
    public AnnotationColor: string = "light";
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        args.chart.annotations[0].content = '<div style="color:black; font-family: bold ">Actual</div>';
        args.chart.annotations[1].content = '<div style="color:black; font-family: bold ">Forecast</div>';
        if (selectedTheme==='material-dark')
        {
            this.AnnotationColor = 'dark';
        }
        else if(selectedTheme==='material')
        {
            this.AnnotationColor = "light";  
        }
        else if (selectedTheme==='fabric-dark')
        {
            this.AnnotationColor = 'dark';
        }
        else if(selectedTheme==='fabric')
        {
            this.AnnotationColor = "light";  
        }
        else if (selectedTheme==='bootstrap5-dark')
        {
            this.AnnotationColor = 'dark';
        }
        else if (selectedTheme==='bootstrap5')
        {
            this.AnnotationColor = "light";  
        }
        else if (selectedTheme==='fluent-dark')
        {
            this.AnnotationColor = "dark";    
        }
        else if (selectedTheme==='fluent')
        {
            this.AnnotationColor = "light";  
        }
        else if (selectedTheme==='bootstrap4')
        {
            this.AnnotationColor = "light";          
        }
        else if (selectedTheme==='bootstrap-dark')
        {
            this.AnnotationColor = "dark";         
        }
        else if (selectedTheme==='bootstrap')
        {
            this.AnnotationColor = "light";          
        }
        else if (selectedTheme==='tailwind-dark')
        {
            this.AnnotationColor = "dark";    
        }
        else if (selectedTheme==='tailwind')
        {                    
            this.AnnotationColor = "light";  
        }
        else if (selectedTheme==='highcontrast')
        {
            this.AnnotationColor = "dark";            
        }
        else
        {
            this.AnnotationColor = "light";  
        }
        
        if(this.AnnotationColor=="light")
        {
            args.chart.annotations[0].content = '<div style="color:black; font-weight: bold ">Actual</div>';
            args.chart.annotations[1].content = '<div style="color:black; font-weight: bold ">Forecast</div>';
        }
        else
        {
            args.chart.annotations[0].content = '<div style="color:whitesmoke; font-weight: bold ">Actual</div>';
            args.chart.annotations[1].content = '<div style="color:whitesmoke; font-weight: bold ">Forecast</div>';
        }
    };
      // custom code end
    public title: string = 'Fruits Production Statistics';
    constructor() {
        //code
    };

}