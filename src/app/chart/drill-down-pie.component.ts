import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChartComponent,ChartAllModule, IMouseEventArgs, Index, IAccTextRenderEventArgs, AccumulationChart, IAccLoadedEventArgs, AccumulationTheme, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { getElement, indexFinder } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';

/**
 * Sample for Drilldown in Pie chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'drill-down-pie.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class DrilldownPieComponent {
    public data: Object[] = [
        { x: 'Asia-Pacific', y: 45 }, { x: 'Europe', y: 25 }, { x: 'North America', y: 20 }, {x: 'Latin America', y: 7},
        { x: 'Middle East & Africa', y: 3 }
    ];
    public AsiaPacific: Object = [
        { x: 'China', y: 66.7 }, { x: 'Japan', y: 17.8 }, { x: 'India', y: 11.1 }, { x: 'South Korea', y: 3.3 }, { x: 'Others', y: 1.1 }
    ];
    public Europe: Object = [
        { x: 'Germany', y: 32 }, { x: 'UK', y: 20 }, { x: 'France', y: 16 }, { x: 'Italy', y: 12 }, { x: 'Spain', y: 8 }, { x: 'Others', y: 12 }
    ];

    public NorthAmerica: Object = [
        { x: 'USA', y: 75 }, { x: 'Canada', y: 15 }, { x: 'Mexico', y: 10 }
    ];

    public LatinAmerica: Object = [
        { x: 'Brazil', y: 57.1 }, { x: 'Argentina', y: 21.4 }, { x: 'Chile', y: 14.3 }, { x: 'Others', y: 7.1 }
    ];

    public MiddleEastAfrica: Object = [
        { x: 'South Africa', y: 33.3 }, { x: 'Egypt', y: 26.7 }, { x: 'UAE', y: 23.3 }, { x: 'Others', y: 16.7 }
    ];

    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
    };
    //Initializing Datalabel
    public dataLabel: Object = {
        visible: true, position: 'Outside', enableRotation: false, connectorStyle: { type: 'Curve', length: Browser.isDevice ? '5%' : '10%' }, font: { fontWeight: '600', color: 'black', size: Browser.isDevice ? '6px' : '12px' }
    };
    public content: string = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./assets/chart/images/white.png" id="back" alt="White Icon"/><div>';
    public startAngle: number = -30;
    public endAngle: number = 330;
    public title: string = 'Automobile Sales by Region - 2023';
    public subTitle: string = 'Source: wikipedia.org';
    public isparent: boolean = true;
    public border: Object = { width: 1, color: '#ffffff' };
    public onTextRender(args: IAccTextRenderEventArgs): void {
        args.text = args.point.x + ' ' + args.point.y + '%';
    }
    public onChartMouseClick(args: IMouseEventArgs): void {
        let index: Index = indexFinder(args.target);
        let lightThemeContent = '<div id="back" style="cursor:pointer;padding:3px;width:30px; height:30px;">' +
        '<img src="./assets/chart/images/back.png" id="back" alt="Back Icon"/>';
        let darkThemeContent = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;">'+
        '<img src="./assets/chart/images/white.png" id="back" alt="White Icon"/><div>';
        if (this.isparent && document.getElementById('container_Series_' + index.series + '_Point_' + index.point)) {
            this.isparent = false;
            this.pie.annotations = [{
                content: (this.pie.theme === 'HighContrast' || this.pie.theme === 'Fluent2HighContrast' ||  this.pie.theme.indexOf('Dark') > -1) ? darkThemeContent : lightThemeContent, region: 'Series', x: '50%', y: '50%'
            }];
            this.pie.series[0].innerRadius = '30%';
            switch (index.point) {
                case 0:
                    this.pie.series[0].dataSource = this.AsiaPacific;
                    this.pie.title = 'Automobile Sales in the Asia-Pacific region';
                    document.getElementById('text').innerHTML = 'Asia-Pacific';
                    break;
                case 1:
                    this.pie.series[0].dataSource = this.Europe;
                    this.pie.title = 'Automobile Sales in the Europe region';
                    document.getElementById('text')!.innerHTML = 'Europe';
                    break;
                case 2:
                    this.pie.series[0].dataSource = this.NorthAmerica;
                    this.pie.title = 'Automobile Sales in the North America region';
                    document.getElementById('text').innerHTML = 'North America';
                    break;
                case 3:
                    this.pie.series[0].dataSource = this.LatinAmerica;
                    this.pie.title = 'Automobile Sales in the Latin America region';
                    document.getElementById('text')!.innerHTML = 'Latin America';
                    break;
                case 4:
                    this.pie.series[0].dataSource = this.MiddleEastAfrica;
                    this.pie.title = 'Automobile Sales in the Middle East & Africa region';
                    document.getElementById('text')!.innerHTML = 'Middle East & Africa';
                    break;
            }
            this.pie.series[0].innerRadius = '40%';
            this.pie.series[0].radius = '80%';
            this.pie.series[0].dataLabel!.connectorStyle!.length = Browser.isDevice ? '5%' : '10%';
            this.pie.series[0].dataLabel!.position = Browser.isDevice ? 'Inside' : 'Outside';
            this.pie.series[0].dataLabel!.enableRotation = Browser.isDevice ? true : false;
            this.pie.series[0].dataLabel!.font!.color = '';
            this.pie.legendSettings.visible = false;
            this.pie.visibleSeries[0].explodeIndex = null;
            this.pie.enableSmartLabels = true;
            this.pie.series[0].animation.enable = false;
            this.pie.refresh();
            document.getElementById('category').style.visibility = 'visible';
            document.getElementById('symbol').style.visibility = 'visible';
            document.getElementById('text').style.visibility = 'visible';
        }
        if (args.target.indexOf('back') > -1) {
            this.pie.annotations[0].content = '';
            this.pie.series[0].dataSource = this.data;
            this.pie.series[0].dataLabel = this.dataLabel;
            this.isparent = true;
            this.pie.title = this.title;
            this.pie.legendSettings.visible = false;
            this.pie.enableSmartLabels = false;
            this.pie.series[0].innerRadius = '0%';
            this.pie.series[0].animation.enable = false;
            this.pie.series[0].radius = '70%';
            (getElement('category') as HTMLElement).style.visibility = 'hidden';
            document.getElementById('symbol').style.visibility = 'hidden';
            document.getElementById('text').style.visibility = 'hidden';
            this.pie.refresh();
        }
    }
    public onClick(e: MouseEvent): void {
        this.pie.series[0].dataSource = this.data;
        this.pie.series[0].dataLabel = this.dataLabel;
        this.isparent = true;
        this.pie.title = this.title;
        this.pie.legendSettings.visible = false;
        this.pie.enableSmartLabels = false;
        this.pie.annotations[0].content = '';
        this.pie.series[0].dataSource = this.data;
        this.pie.series[0].dataLabel = this.dataLabel;
        this.pie.title = this.title;
        this.pie.legendSettings.visible = false;
        this.pie.enableSmartLabels = false;
        this.pie.series[0].innerRadius = '0%';
        this.pie.series[0].animation.enable = false;
        this.pie.series[0].radius = '70%';
        this.pie.refresh();
        (getElement('category') as HTMLElement).style.visibility = 'hidden';
        (e.target as HTMLButtonElement).style.visibility = 'hidden';
        document.getElementById('symbol').style.visibility = 'hidden';
        document.getElementById('text').style.visibility = 'hidden';
    }
 // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = loadAccumulationChartTheme(args);
        if (selectedTheme.indexOf('highcontrast') > -1 || args.accumulation.theme.indexOf('Dark') > -1) {
            args.accumulation.series[0].dataLabel.font.color = "white";
        }
    };
     // custom code end
    constructor() {
        //code
    };

}