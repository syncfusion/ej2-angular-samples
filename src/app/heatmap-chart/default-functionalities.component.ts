import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-angular-heatmap';
import { getDatasource } from './default-data';
HeatMap.Inject(Tooltip, Legend);

@Component({
    selector: 'control-content',
    templateUrl: 'default-functionalities.html',
    encapsulation: ViewEncapsulation.None
})
export class HeatmapDefaultComponent {
    titleSettings: Object = {
        text: 'Sales Revenue per Employee (in 1000 US$)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    dataSource: Object[] = getDatasource().dataSource;
    xAxis: Object = {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert',
            'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    yAxis: Object = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    legendSettings: Object = {
        textStyle: {
             fontFamily: 'inherit'
         }
     };
    tooltipSettings: Object = {
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    cellSettings: Object = {
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        // custom code end
    };
    constructor() {
        //code
    };
}