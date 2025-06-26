import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent,ChartAllModule, IAccLoadedEventArgs, AccumulationTheme, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';

/**
 * Sample for Pie with Various Radius
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pie-radius.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class PieRadiusComponent {
    public data: Object[] = [
        { Country: "Cuba", Population: 103800, Radius: "106", text: "CUB" },
        { Country: "Syria", Population: 185178, Radius: "133", text: "SYR" },
        { Country: "Benin", Population: 112760, Radius: "128", text: "BEN" },
        { Country: "Portugal", Population: 91606, Radius: "114", text: "POR" },
        { Country: "Austria", Population: 82520, Radius: "111", text: "AUS" },
        { Country: "Honduras", Population: 111890, Radius: "97", text: "HON" },
        { Country: "Azerbaijan", Population: 82650, Radius: "125", text: "AZE" }
    ];
    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    //Initializing Legend
    public legendSettings: Object = {
        visible: false
    };
    //Initializing Datalabel
    public dataLabel: Object = {
        visible: true, position: Browser.isDevice ? 'Inside' : 'Outside',
        name: Browser.isDevice ? 'text' : 'Country',
        connectorStyle: { length: Browser.isDevice ? '10px' : '20px', type:'Curve' },
        textWrap: Browser.isDevice ? 'Wrap' : 'Normal',
        font: {
            fontWeight: '600',
            size: Browser.isDevice ? '7px' : '12px', 
        },
        enableRotation: false,
    };
      // custom code start
    public load(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    };
      // custom code end
    public radius: string = 'Radius';
    public border: Object = { width: 1, color: '#ffffff' };
    public enableAnimation: boolean = true;
    public enableSmartLabels: boolean = true;
    public tooltip: Object = {
        enable: true,
        header: '',
        format: '<b>${point.x}</b><br>Area in square km: <b>${point.y}</b><br>Population density per square km: <b>${point.tooltip}',
        enableHighlight: true
    };
    public title: string = 'Global Distribution of Population and Land Area by Country - 2025';
    public subTitle: string = 'Source: wikipedia.org';
    constructor() {
        //code
    };

}


