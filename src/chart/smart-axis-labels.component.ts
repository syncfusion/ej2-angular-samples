import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, IPointRenderEventArgs, ChartTheme } from '@syncfusion/ej2-ng-charts';
import { LabelIntersectAction, EdgeLabelPlacement } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';


/**
 * Sample for smart axis labels Positions
 */
@Component({
    selector: 'control-content',
    templateUrl: 'smart-axis-labels.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SmartAxisLabelsChartComponent {

    public data: Object[] = [
        { x: 'South Korea', y: 39 }, { x: 'India', y: 61 },
        { x: 'Pakistan', y: 20 }, { x: 'Germany', y: 65 },
        { x: 'Australia', y: 16 }, { x: 'Italy', y: 29 },
        { x: 'France', y: 45 }, { x: 'Saudi Arabia', y: 10 },
        { x: 'Russia', y: 41 }, { x: 'Mexico', y: 31 },
        { x: 'Brazil', y: 76 }, { x: 'China', y: 51 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1,
        majorGridLines: { width: 0 },
        labelIntersectAction: 'Hide'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelStyle: { color: 'white' },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 0 },
        lineStyle: { width: 0 },
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public pointRender(args: IPointRenderEventArgs): void {
        let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
            '#ea7a57', '#404041', '#00bdae'];
        let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
            '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
        let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
            '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
        let selectedTheme: string = location.hash.split('/')[1];
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    };
    public marker: Object = { dataLabel: {
        visible: true,
        position: Browser.isDevice ? 'Outer' : 'Top',
        font: { fontWeight: '600', color: Browser.isDevice ? '#404041' : '#ffffff' }
    } };
    public tooltip: Object = {
        enable: true
    };
    public title: string = 'Internet Users in Millions';
    @ViewChild('chart')
    public chart: ChartComponent;
    public labelIntersect: DropDownList;
    public edgePlacement: DropDownList;
    ngOnInit(): void {
        this.labelIntersect = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let type: string = this.labelIntersect.value.toString();
                this.chart.primaryXAxis.labelIntersectAction = <LabelIntersectAction>type;
                this.chart.refresh();
            }
        });
        this.labelIntersect.appendTo('#intersecttype');
        this.edgePlacement = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let type: string = this.edgePlacement.value.toString();
                this.chart.primaryXAxis.edgeLabelPlacement = <EdgeLabelPlacement>type;
                this.chart.refresh();
            }
        });
        this.edgePlacement.appendTo('#labelplacement');
    }
    constructor() {
        // code
    };
}