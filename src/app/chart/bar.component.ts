import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Sample for Bar Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bar.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class BarChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    //Initializing Chart Width
    public width: string = Browser.isDevice ? '100%' : '75%';
    public data: Object[] = [
        { Country : "Japan",  GDP : 1.71, WorldShare : 6.02 },
        { Country : "France",  GDP : 1.82, WorldShare : 3.19 },
        { Country : "India", GDP : 6.68 , WorldShare : 3.28  },
        { Country : "Germany",  GDP : 2.22, WorldShare : 4.56 },
        { Country : "Italy", GDP : 1.50 , WorldShare : 2.40 },
        { Country : "Canada",  GDP : 3.05 , WorldShare : 2.04 }        
    ];
    //Initializing Marker
    public marker: Object = {
        dataLabel: {
            visible: false,
            position: 'Top',
            font: {
                fontWeight: '600', color: '#ffffff'
            }
        }
    }
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}%',
        title: 'GDP (In Percentage)',
        edgeLabelPlacement: 'Shift',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
    };
    public tooltip: Object = {
        enable: true
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
      // custom code end
    public title: string = 'GDP by Country in 2017';
    constructor() {
        //code
     };

}