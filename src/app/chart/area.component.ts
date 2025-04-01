import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAnnotationSettingsModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { withLatestFrom } from 'rxjs/operators';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class AreaChartComponent {
    public annotations: ChartAnnotationSettingsModel[] = [
        {
            content: Browser.isDevice ? '<div style="color:white; font-size: 8px;">8-TRACK</div>' : '<div style="color:white; font-size: 11px; font-weight: bold">8-TRACK</div>',x: '8%', y: '95%' , region:'Series'
        }, {
            content: Browser.isDevice ? '<div style="color:white; font-size: 8px;">VINYL</div>' : '<div style="color:white; font-size: 11px; font-weight: bold">VINYL</div>',x: "12%", y: "80%" ,region:'Series'
        }, {
            content: Browser.isDevice ? '<div style="color:white; font-size: 8px;">CASSETTE</div>' : '<div style="color:white; font-size: 11px; font-weight: bold">CASSETTE</div>',x: "35%", y: "87%" ,region:'Series'
        }, {
            content: Browser.isDevice ? '<div style="color:white; font-size: 8px;">COMPACT DISC</div>' : '<div style="color:white; font-size: 11px; font-weight: bold">COMPACT DISC</div>',x: "63%", y: "70%" ,region:'Series'
        }, {
            content: Browser.isDevice ? '<div style="color:white; font-size: 8px;">OTHERS</div>' : '<div style="color:white; font-size: 11px; font-weight: bold">OTHERS</div>',x: "75%", y: '98%' ,region:'Series'
        }, {
            content: Browser.isDevice ? '<div style="color:white; font-size: 8px;">DOWNLOAD</div>' : '<div style="color:white; font-size: 11px; font-weight: bold">DOWNLOAD</div>',x: '85%', y: '93%' ,region:'Series'
        }, {
            content: Browser.isDevice ? '' : '<div style="color:white; font-size: 11px; font-weight: bold">STREAMING</div>',x: '93%', y: '96%' ,region:'Series'
        },

    ];
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public Other: Object[] = [
        { Period : new Date(1988, 1, 1), USD : -0.16 },
        { Period : new Date(1989, 1, 1), USD : -0.17 },
        { Period : new Date(1990, 1, 1), USD : -0.08 },
        { Period : new Date(1992, 1, 1), USD : 0.08 },
        { Period : new Date(1996, 1, 1), USD : 0.161 },
        { Period : new Date(1998, 1, 1), USD : 0.48 },
        { Period : new Date(1999, 1, 1), USD : 1.16 },
        { Period : new Date(2001, 1, 1), USD : 0.40 },
        { Period : new Date(2002, 1, 1), USD : 0.32 },
        { Period : new Date(2003, 1, 1), USD : 0.807 },
        { Period : new Date(2005, 1, 1), USD : 1.12 },
        { Period : new Date(2006, 1, 1), USD : 1.614 },
        { Period : new Date(2008, 1, 1), USD : 1.210 },
        { Period : new Date(2009, 1, 1), USD : 1.12 },
        { Period : new Date(2011, 1, 1), USD : 0.64 },
        { Period : new Date(2013, 1, 1), USD : 0.161 },
        { Period : new Date(2018, 1, 1), USD : 0.080 }
    ];
    public Track: Object[] = [
        { Period : new Date(1973, 1, 1), USD : 2.58 },
        { Period : new Date(1975, 1, 1), USD : 2.25 },
        { Period : new Date(1977, 1, 1), USD : 3.55 },
        { Period : new Date(1978, 1, 1), USD : 2.42 },
        { Period : new Date(1981, 1, 1), USD : -0.24 },
        { Period : new Date(1982, 1, 1), USD : -0 }
    ];
    public Streaming: Object[] = [
        { Period : new Date(2011, 1, 1), USD : 0.48 },
        { Period : new Date(2013, 1, 1), USD : 1.61 },
        { Period : new Date(2015, 1, 1), USD : 2.17 },
        { Period : new Date(2017, 1, 1), USD : 7.18 },
    ];
    public Download: Object[] = [
        { Period : new Date(2004, 1, 1), USD : 0.48 },
        { Period : new Date(2007, 1, 1), USD : 1.45 },
        { Period : new Date(2012, 1, 1), USD : 2.82 },
        { Period : new Date(2013, 1, 1), USD : 2.58 },
        { Period : new Date(2015, 1, 1), USD : 2.01 },
        { Period : new Date(2016, 1, 1), USD : 1.61 },
        { Period : new Date(2017, 1, 1), USD : 0.80 }
    ];
    public Compact: Object[] = [
        { Period : new Date(1990, 1, 1), USD : 0.69 },
        { Period : new Date(1992, 1, 1), USD : 2.86 },
        { Period : new Date(1995, 1, 1), USD : 10.2 },
        { Period : new Date(1996, 1, 1), USD : 13.0 },
        { Period : new Date(1997, 1, 1), USD : 14.35 },
        { Period : new Date(1998, 1, 1), USD : 15.17 },
        { Period : new Date(1999, 1, 1), USD : 14.89 },
        { Period : new Date(2000, 1, 1), USD : 18.96 },
        { Period : new Date(2001, 1, 1), USD : 18.78 },
        { Period : new Date(2004, 1, 1), USD : 14.25 },
        { Period : new Date(2005, 1, 1), USD : 14.24 },
        { Period : new Date(2006, 1, 1), USD : 12.34 },
        { Period : new Date(2007, 1, 1), USD : 9.34 },
        { Period : new Date(2008, 1, 1), USD : 4.45 },
        { Period : new Date(2010, 1, 1), USD : 1.46 },
        { Period : new Date(2011, 1, 1), USD : 0.64 }
    ];
    public Casette : Object[] = [
        { Period : new Date(1976, 1, 1), USD : 0.08 },
        { Period : new Date(1979, 1, 1), USD : 1.85 },
        { Period : new Date(1980, 1, 1), USD : 2.0 },
        { Period : new Date(1982, 1, 1), USD : 3.55 },
        { Period : new Date(1984, 1, 1), USD : 5.40 },
        { Period : new Date(1985, 1, 1), USD : 5.24 },
        { Period : new Date(1988, 1, 1), USD : 6.94 },
        { Period : new Date(1989, 1, 1), USD : 6.85 },
        { Period : new Date(1990, 1, 1), USD : 7.02 },
        { Period : new Date(1992, 1, 1), USD : 5.81 },
        { Period : new Date(1993, 1, 1), USD : 5.32 },
        { Period : new Date(1994, 1, 1), USD : 4.03 },
        { Period : new Date(1997, 1, 1), USD : 2.25 },
        { Period : new Date(1998, 1, 1), USD : 2.01 },
        { Period : new Date(1999, 1, 1), USD : 0.80 },
        { Period : new Date(2001, 1, 1), USD : 0.40 }
    ];
    public Vinyl: Object[] = [
        { Period : new Date(1973, 1, 1), USD : 7.74 },
        { Period : new Date(1974, 1, 1), USD : 7.58 },
        { Period : new Date(1976, 1, 1), USD : 8.23 },
        { Period : new Date(1977, 1, 1), USD : 9.68 },
        { Period : new Date(1978, 1, 1), USD : 10.16 },
        { Period : new Date(1979, 1, 1), USD : 8.15 },
        { Period : new Date(1981, 1, 1), USD : 6.77 },
        { Period : new Date(1982, 1, 1), USD : 5.64 },
        { Period : new Date(1984, 1, 1), USD : 4.35 },
        { Period : new Date(1985, 1, 1), USD : 2.50 },
        { Period : new Date(1989, 1, 1), USD : 0.64 },
        { Period : new Date(1990, 1, 1), USD : 0 },
    ];
   
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime', minimum: new Date(1973, 1, 1), maximum: new Date(2018, 1, 1), labelFormat: 'y', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'In Billions (USD)',
        maximum: 25,
        minimum: 0,
        interval: 5,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: false
    };
    public border: Object = {
        width: 1.5,
        color: 'white'
    };
       // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
       // custom code end
    //Initializing Chart Title
    public title: string = 'US Music Sales By Format';
    constructor() {
        // code
     };
}