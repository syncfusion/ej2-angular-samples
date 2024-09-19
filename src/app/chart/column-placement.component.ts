import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Sample for Column Series with Side by side Placement
 */
@Component({
    selector: 'control-content',
    templateUrl: 'column-placement.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class PlacementColumnChartComponent {

    public data: Object[] = [
        { ConsumerName : "Jamesh", TotalCount : 10, AppleCount : 5, OrangeCount : 4, GrapesCount : 1, DataLabelMappingName : "Total 10" },
        { ConsumerName : "Michael", TotalCount : 9, AppleCount : 4, OrangeCount : 3, GrapesCount : 2, DataLabelMappingName : "Total 9" },
        { ConsumerName : "John", TotalCount : 11, AppleCount : 5, OrangeCount : 4, GrapesCount : 2, DataLabelMappingName : "Total 11" },
        { ConsumerName : "Jack", TotalCount : 8, AppleCount : 5, OrangeCount : 2, GrapesCount : 1, DataLabelMappingName : "Total 8" },
        { ConsumerName : "Lucas", TotalCount : 10, AppleCount : 6, OrangeCount : 3, GrapesCount : 1, DataLabelMappingName : "Total 10" }
    ];
    
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: {width : 0},
                        minorTickLines: {width: 0},
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Fruits Count',
        majorTickLines: { width: 0 }, lineStyle: { width: 0 },
    };
    public marker: Object = { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } };
    public dataLebelMarker: Object = { dataLabel: { visible: true, name: 'DataLabelMappingName', enableRotation: Browser.isDevice ? true : false, angle: -90, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
    public title: string = 'Fruit Consumption';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public placement: boolean = false;
    public width: string = Browser.isDevice ? '100%' : '75%';
  // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
  // custom code end
    constructor() {
        //code
    };

}