import { Component, ViewEncapsulation } from '@angular/core';
import { AxisModel, ChartAreaModel, TooltipSettingsModel, pointByIndex, MarkerSettingsModel } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'tooltip-template.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class TooltipTemplateComponent {
    public width: string = Browser.isDevice ? '100%' : '75%';
    public title: string = 'USA Wheat Production';
    public xAxis: AxisModel = {
        labelStyle: { color: 'white' },
        valueType: 'Category',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { color: '#EFEFEF' },
    };

    public yAxis: AxisModel = {
        rangePadding: 'None',
        labelStyle: { color: 'white'},
        majorGridLines: { color: '#EFEFEF' },
        majorTickLines: { width: 0},
        title: 'Billion Bushels',
        titleStyle: { color: 'white'},
        lineStyle: { width: 0 },
    };

    public chartArea: ChartAreaModel = {
        border: { width: 0}
    };

    public tooltip: TooltipSettingsModel =  {
        enable: true,
        // tslint:disable-next-line:max-line-length
        template:
        '<div id="Tooltip"><table style="width:100%;  border: 1px solid black;" class="table-borderless">' +
        '<tr><th rowspan="2" style="background-color: #C1272D"><img src="assets/chart/images/grain.png" />' +
         // tslint:disable-next-line:max-line-length
         '</th><td style="height: 25px; width: 50px; background-color: #C1272D; font-size: 14px; color: #E7C554; font-weight: bold; padding-left: 5px">' +
         // tslint:disable-next-line:max-line-length
         '${y}</td></tr><tr ><td style="height: 25px; width: 50px; background-color: #C1272D; font-size: 18px; color: #FFFFFF; font-weight: bold; padding-left: 5px">${x}</td>' +
         '</tr></table></div>'
    };

    public marker: MarkerSettingsModel = {
        visible: true,
        width: 7,
        height: 7,
        fill: '#C1272D',
        border: {color: '#333333', width: 2}
    };
    

    public data: Object[] = [{ x: 2002, y: 1.61 }, { x: 2003, y: 2.34 }, { x: 2004, y: 2.16 }, { x: 2005, y: 2.10 },
        { x: 2006, y: 1.81 }, { x: 2007, y: 2.05 }, { x: 2008, y: 2.50 }, { x: 2009, y: 2.22 },
        { x: 2010, y: 2.21 }, { x: 2011, y: 2.00 }, { x: 2012, y: 1.7 }];


}