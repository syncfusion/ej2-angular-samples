import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ExportType, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, pointRender } from './theme-color';
/**
 * Sample for chart export
 */
@Component({
    selector: 'control-content',
    templateUrl: 'export.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, ButtonModule, SBDescriptionComponent]
})
export class ExportChartComponent {

    public data: Object[] = [
        { x: 'India', y: 35.5, DataLabelMappingName:  Browser.isDevice ? "35.5" : "35.5GW" }, { x: 'China', y: 18.3, DataLabelMappingName:  Browser.isDevice ?"18.3" :  "18.3GW"  }, { x: 'Italy', y: 17.6, DataLabelMappingName:  Browser.isDevice ? "17.6" :  "17.6GW"  }, { x: 'Japan', y: 13.6, DataLabelMappingName: Browser.isDevice ? "13.6" : "13.6GW"  },
        { x: 'United state', y: 12, DataLabelMappingName: Browser.isDevice ? "12" : "12GW"  }, { x: 'Spain', y: 5.6, DataLabelMappingName: Browser.isDevice ? "5.6" : "5.6GW"  }, { x: 'France', y: 4.6, DataLabelMappingName: Browser.isDevice ? "4.6" : "4.6GW"  }, { x: 'Australia', y: 3.3, DataLabelMappingName: Browser.isDevice ? "3.3" :"3.3GW"  },
        { x: 'Belgium', y: 3, DataLabelMappingName:  Browser.isDevice ? "3" : "3GW"  }, { x: 'United Kingdom', y: 2.9, DataLabelMappingName: Browser.isDevice ? "2.9" : "2.9GW"  }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: {width: 0},
        labelIntersectAction: "None",
        labelRotation: -45,
        interval: 1
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}GW',
        minimum: 0,
        maximum: 40,
        interval: 10,
        lineStyle: {width : 0},
        minorTickLines: {width: 0},
        majorTickLines: {width : 0},
        majorGridLines: { width: 2 },
    };
    legendSettings: Object = { visible: false }
    //Initializing Marker
    public marker: Object = { dataLabel: { visible: true, position: 'Top', enableRotation: Browser.isDevice ? true : false, angle : -90, name: 'DataLabelMappingName', font: {fontWeight: 600, color: '#ffffff', size: '9px'} } }
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public tooltip: Object = {
        enable: true
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
   
    public pointRender(args: IPointRenderEventArgs): void {
        pointRender(args);
    };
    public title: string = 'Top 10 Countries Using Solar Power';
    @ViewChild('chart')
    public chart: ChartComponent;
    public onClick(e: Event): void {
        let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
        this.chart.exportModule.export(<ExportType>this.exportType.value, fileName);
    }
    public exportType: DropDownList;
    ngOnInit(): void {
        this.exportType = new DropDownList({
            index: 0,
            width: 90,
        });
        this.exportType.appendTo('#exporttype');
    }
    constructor() {
        // code
     };
}