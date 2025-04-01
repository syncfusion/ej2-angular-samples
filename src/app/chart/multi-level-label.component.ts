import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, IPointRenderEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { LabelIntersectAction, EdgeLabelPlacement, AxisPosition } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, pointRender } from './theme-color';


/**
 * Sample for smart axis labels Positions
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multi-level-label.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class MultiLevelLabelsChartComponent {

    public data: Object[] = [
        { x: 'Grapes', y: 28 }, { x: 'Apples', y: 87 },
        { x: 'Pears', y: 42 }, { x: 'Grapes', y: 13 },
        { x: 'Apples', y: 13 }, { x: 'Pears', y: 10 },
        { x: 'Tomato', y: 31 }, { x: 'Potato', y: 96 },
        { x: 'Cucumber', y: 41 }, { x: 'Onion', y: 59 }];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', labelRotation: 90,
        border: { width: 1, type: 'Rectangle' },
        isIndexed: true, interval: 1, majorGridLines: { width: 0 }, labelIntersectAction : Browser.isDevice ? 'Rotate90' : 'Trim',
        multiLevelLabels: (Browser.isDevice ? ([
            {
                border: { type: 'Rectangle' },
                categories: [
                    { start: -0.5, end: 2.5, text: 'In Season', },
                    { start: 2.5, end: 5.5, text: 'Out of Season', },
                    { start: 5.5, end: 7.5, text: 'In Season', },
                    { start: 7.5, end: 9.5, text: 'Out of Season', },
                ]
            }, {
                border: { type: 'Rectangle' },
                textStyle: { fontWeight: 'Bold' },
                categories: [
                    { start: -0.5, end: 5.5, text: 'Fruits', },
                    { start: 5.5, end: 9.5, text: 'Vegetables', },
                ]
            }]) : [
                {
                    border: { type: 'Rectangle' },
                    categories: [
                        { start: -0.5, end: 0.5, text: 'Seedless', },
                        { start: 0.5, end: 2.5, text: 'Seeded', },
                        { start: 2.5, end: 3.5, text: 'Seedless', },
                        { start: 3.5, end: 5.5, text: 'Seeded', },
                        { start: 5.5, end: 6.5, text: 'Seedless', },
                        { start: 6.5, end: 7.5, text: 'Seeded', },
                        { start: 7.5, end: 8.5, text: 'Seedless', },
                        { start: 8.5, end: 9.5, text: 'Seeded', }
                    ]
                }, {
                    border: { type: 'Rectangle' },
                    categories: [
                        { start: -0.5, end: 2.5, text: 'In Season', },
                        { start: 2.5, end: 5.5, text: 'Out of Season', },
                        { start: 5.5, end: 7.5, text: 'In Season', },
                        { start: 7.5, end: 9.5, text: 'Out of Season', },
                    ]
                }, {
                    border: { type: 'Rectangle' },
                    textStyle: { fontWeight: 'Bold' },
                    categories: [
                        { start: -0.5, end: 5.5, text: 'Fruits', },
                        { start: 5.5, end: 9.5, text: 'Vegetables', },
                    ]
                }])
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 120, interval: 30,
        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public legendSettings: Object = {
        visible: false
    };
    // custom code start
    public width: string = Browser.isDevice ? '100%' : '75%';
    public load(args: ILoadedEventArgs): void {       
        loadChartTheme(args);
    };
    // custom code end
    public pointRender(args: IPointRenderEventArgs): void {
        pointRender(args);
    };
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Outer',
        }
    };
    public tooltip: Object = {
        enable: false
    };
    public title: string = 'Fruits and Vegetables - Season';
    constructor() {
        // code
    };
}