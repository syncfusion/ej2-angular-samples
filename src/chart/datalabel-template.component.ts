import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ITextRenderEventArgs, ChartTheme, AxisModel, MarkerSettingsModel } from '@syncfusion/ej2-ng-charts';

/**
 * Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'datalabel-template.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataLabelComponent {
    public theme: ChartTheme;
    public materialMan: string = '<div style="background-color:#00bdae;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y}M </span></div></div>';
    public materialWomen: string = '<div style="background-color:#404041;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y}M </span></div></div>';
    public fabricMan: string = '<div style="background-color:#4472c4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y}M </span></div></div>';
    public fabricWomen: string = '<div style="background-color:#ed7d31;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" />' +
    '<div style="color:white; font-family:Roboto; font-style: medium; fontp-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y}M </span></div></div>';
    public data: Object[] = [
        { x: 2010, y: 1014 }, { x: 2011, y: 1040 },
        { x: 2012, y: 1065 }, { x: 2013, y: 1110 },
        { x: 2014, y: 1130 }, { x: 2015, y: 1153 },
        { x: 2016, y: 1175 }
    ];
    public data1: Object[] = [
        { x: 2010, y: 990 }, { x: 2011, y: 1010 },
        { x: 2012, y: 1030 }, { x: 2013, y: 1070 },
        { x: 2014, y: 1105 }, { x: 2015, y: 1138 },
        { x: 2016, y: 1155 }
    ];
    public primaryXAxis: AxisModel = {
        minimum: 2010, maximum: 2016, interval: 1,
        edgeLabelPlacement: 'Shift',
        labelStyle: { color: '#606060', fontFamily: 'Roboto', fontStyle: 'medium', size: '14px' },
        majorGridLines: { width: 0 },
        lineStyle: { color: '#eaeaea', width: 1 }
    };
    public primaryYAxis: AxisModel = {
        minimum: 900, maximum: 1220,
        labelFormat: '{value}M',
        labelStyle: { color: '#606060', fontFamily: 'Roboto', fontStyle: 'medium', size: '14px' },
        interval: 80,
        majorGridLines: { color: '#eaeaea', width: 1 },
        lineStyle: { color: '#eaeaea', width: 1 }
    };
    public marker1: MarkerSettingsModel = {
        visible: true,
        shape: 'Circle',
        dataLabel: {
            visible: true,
            position: 'Top',
            margin: { right: 15 },
            template: this.materialMan
        }
    };
    public marker2: Object = {
        visible: true,
        shape: 'Rectangle',
        dataLabel: {
            visible: true,
            position: 'Bottom',
            margin: { right: 15 },
            template: this.materialWomen
        }
    };
    public textRender(args: ITextRenderEventArgs): void {
        if (this.theme === 'Material') {
            args.template = args.series.name === 'Male' ? this.materialMan : this.materialWomen;
        } else {
            args.template = args.series.name === 'Male' ? this.fabricMan : this.fabricWomen;
        }
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        this.theme = args.chart.theme;
    };
    public title: string = 'Inflation - Consumer Price';
    constructor() {
        //code
    };

}