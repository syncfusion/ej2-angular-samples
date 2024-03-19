import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, IPointRenderEventArgs, ITooltipRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Sample for Column Series with rounded corner
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rounded-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class RoundedColumnChartComponent {
    @ViewChild('roundcol')
    public chart: ChartComponent;
    public pointRender(args: IPointRenderEventArgs): void {
       this.SetTheme(args);
    };
    public SetTheme(args: IPointRenderEventArgs): void {
        if (location.hash.indexOf("material") > -1)
        {
            if (location.hash.indexOf("dark") > -1)
            {
                if (args.series.yName == "Rate")
                    args.fill = "#f9fafb";                
            }
            else
            {
                if (args.series.yName == "Rate")
                    args.fill = "grey";               
            }
        }
        else if (location.hash.indexOf("fabric") > -1)
        {
            if (location.hash.indexOf("dark") > -1)
            {
                if (args.series.yName == "Rate")
                    args.fill = "#f9fafb";
            }
            else
            {
                if (args.series.yName == "Rate")
                    args.fill = "grey";
            }
        }
        else if (location.hash.indexOf("bootstrap5") > -1)
        {
            if (location.hash.indexOf("dark") > -1)
            {
                if (args.series.yName == "Rate")
                    args.fill = "#f9fafb";
            }
            else
            {
                if (args.series.yName == "Rate")
                    args.fill = "grey";
            }
        }
        else if (location.hash.indexOf("fluent") > -1)
        {
            if (location.hash.indexOf("dark") > -1)
            {
                if (args.series.yName == "Rate")
                    args.fill = "#f9fafb";
            }
            else
            {
                if (args.series.yName == "Rate")
                    args.fill = "grey";
            }
        }
        else if (location.hash.indexOf("bootstrap4") > -1)
        {
            if (args.series.yName == "Rate")
                args.fill = "grey";
        }
        else if (location.hash.indexOf("bootstrap") > -1)
        {
            if (location.hash.indexOf("dark") > -1)
            {
                if (args.series.yName == "Rate")
                    args.fill = "#f9fafb";
            }
            else
            {
                if (args.series.yName == "Rate")
                    args.fill = "grey";
            }
        }
        else if (location.hash.indexOf("tailwind") > -1)
        {
            if (location.hash.indexOf("dark") > -1)
            {
                if (args.series.yName == "Rate")
                    args.fill = "#f9fafb";
            }
            else
            {
                if (args.series.yName == "Rate")
                    args.fill = "grey";
            }
        }
        else if (location.hash.indexOf("highcontrast") > -1)
        {
            if (args.series.yName == "Rate")
                args.fill = "#f9fafb";
        }
        else
        {
            if (args.series.yName == "Rate")
                args.fill = "grey";
        }
     };
    public data: Object[] = [
        { Country : "Niger", Rate : 100, Literacy_Rate : 19.1, Text : "19.1%" },
        { Country : "Sierra Leone", Rate : 100, Literacy_Rate : 48.1, Text : "48.1%" },
        { Country : "South Sudan", Rate : 100, Literacy_Rate : 26.8, Text : "26.8%" },
        { Country : "Nepal", Rate : 100, Literacy_Rate : 64.7, Text : "64.7%" },
        { Country : "Gambia", Rate : 100, Literacy_Rate : 55.5, Text : "55.5%" },
        { Country : "Gyana", Rate : 100, Literacy_Rate : 88.5, Text : "88.5%" },
        { Country : "Kenya", Rate : 100, Literacy_Rate : 78.0, Text : "78.0%" },
        { Country : "Singapore", Rate : 100, Literacy_Rate : 96.8, Text : "96.8%" }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        majorTickLines: {width : 0}, minorTickLines: {width: 0},valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, labelRotation: Browser.isDevice ? -45 : 0, labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}%',
        title: 'Literacy Rate In Percentage',
        minimum: 0, maximum: 100, interval: 25, majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }, lineStyle: { width: 0 }
    };
    public radius: Object = { bottomLeft: Browser.isDevice ? 12 : 35, bottomRight: Browser.isDevice ? 12 : 35, topLeft: Browser.isDevice ? 12 : 35, topRight: Browser.isDevice ? 12 : 35 }
    public marker: Object = { dataLabel: { visible: true, position: 'Top', name:'Text', enableRotation: Browser.isDevice ? true : false, angle: -90, font: { fontWeight: '600', color: '#ffffff' } } }
    public title: string = 'Literacy rate by Country in 2015';
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.x}</b>',
        format : 'Rate : <b>${point.tooltip}</b>'
    };
    public legend: Object = {
        visible: false
    }
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public highlightColor: string = 'transparent';
    public placement: boolean = false;
    public width: string = Browser.isDevice ? '100%' : '75%';
   // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    constructor() {
        //code
    };
}
