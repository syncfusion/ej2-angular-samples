import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ColumnChartComponent {

    public data: Object[] = [
        { Country : "GBR", GoldMedal : 27, SilverMedal : 23, BronzeMedal : 17, MappingName : "Great Britain" },
        { Country : "CHN", GoldMedal : 26, SilverMedal : 18, BronzeMedal : 26, MappingName : "China" },
        { Country : "AUS", GoldMedal : 8, SilverMedal : 11, BronzeMedal : 10, MappingName : "Australia" },
        { Country : "RUS", GoldMedal : 19, SilverMedal : 17, BronzeMedal : 20, MappingName : "Russia" },
        { Country : "GER", GoldMedal : 17, SilverMedal : 10, BronzeMedal : 15, MappingName : "Germany" },
        { Country : "UA", GoldMedal : 2, SilverMedal : 5, BronzeMedal : 24, MappingName : "Ukraine" },       
        { Country : "ES", GoldMedal : 7, SilverMedal : 4, BronzeMedal : 6, MappingName : "Spain" },
        { Country : "UZB", GoldMedal : 4, SilverMedal : 2, BronzeMedal : 7, MappingName : "Uzbekistan" },
        { Country : "JPN", GoldMedal : 12, SilverMedal : 8, BronzeMedal : 21, MappingName : "Japan" },
        { Country : "NL", GoldMedal : 8, SilverMedal : 7, BronzeMedal : 4, MappingName : "NetherLand" },
        { Country : "USA", GoldMedal : 46, SilverMedal : 37, BronzeMedal : 38, MappingName : "United States" },
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', labelRotation: Browser.isDevice ? -45 : 0 , edgeLabelPlacement: 'Shift',valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Medal Count',
        maximum: 50,
        interval: 10,
        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, 
    };
    public marker: Object = { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
    public title: string = 'Olympic Medal Counts - RIO';
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.tooltip}</b>',
        shared: true
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        if(selectedTheme === 'highcontrast'){
        args.chart.series[0].marker.dataLabel.font.color= '#000000';
        args.chart.series[1].marker.dataLabel.font.color= '#000000';
        args.chart.series[2].marker.dataLabel.font.color= '#000000';
        }
    };
      // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    constructor() {
        //code
    };

}