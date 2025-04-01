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
        { x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 },
        { x: 'Minivan', y: 23 }
    ];
    public suvs: Object = [{ x: 'Toyota', y: 8 }, { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }, { x: 'Renault', y: 6 }, { x: 'Fiat', y: 3 },
    { x: 'Hyundai', y: 16 }, { x: 'Honda', y: 8 }, { x: 'Maruthi', y: 10 }, { x: 'BMW', y: 20 }];

    public cars: Object = [{ x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }, { x: 'Nissan', y: 9 }, { x: 'Ford', y: 15 },
    { x: 'Tata', y: 10 },
    { x: 'Mahindra', y: 7 }, { x: 'Renault', y: 8 }, { x: 'Skoda', y: 5 }, { x: 'Volkswagen', y: 15 }, { x: 'Fiat', y: 3 }];

    public pickups: Object = [{ x: 'Nissan', y: 9 }, { x: 'Chrysler', y: 4 }, { x: 'Ford', y: 7 }, { x: 'Toyota', y: 20 },
    { x: 'Suzuki', y: 13 }, { x: 'Lada', y: 12 }, { x: 'Bentley', y: 6 }, { x: 'Volvo', y: 10 }, { x: 'Audi', y: 19 }];

    public minivans: Object = [{ x: 'Hummer', y: 11 }, { x: 'Ford', y: 5 }, { x: 'GM', y: 12 }, { x: 'Chrysler', y: 3 },
    { x: 'Jaguar', y: 9 },
    { x: 'Fiat', y: 8 }, { x: 'Honda', y: 15 }, { x: 'Hyundai', y: 4 }, { x: 'Scion', y: 11 }, { x: 'Toyota', y: 17 }];

    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
    };
    //Initializing Datalabel
    public dataLabel: Object = {
        visible: true, position: 'Inside', enableRotation : false, connectorStyle: { type: 'Curve', length: '10%' }, font: {color: 'white', fontWeight:'600' }
    };
    public explode: boolean = false;
    public content: string = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./assets/chart/images/white.png" id="back" alt="White Icon"/><div>';
    public startAngle: number = 0;
    public explodeIndex: number = 2;
    public endAngle: number = 360;
    public title: string = 'Automobile Sales by Category';
    public isparent: boolean = true;
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
                content: (this.pie.theme === 'HighContrast')|| (this.pie.theme.indexOf('Dark') > -1) ? darkThemeContent : lightThemeContent, region: 'Series', x: '50%', y: '50%'
            }];
            this.pie.series[0].innerRadius = '30%';
            switch (index.point) {
                case 0:
                    this.pie.series[0].dataSource = this.suvs;
                    this.pie.title = 'Automobile Sales in the SUV Segment';
                    document.getElementById('text').innerHTML = 'SUV';
                    break;
                case 1:
                    this.pie.series[0].dataSource = this.cars;
                    this.pie.title = 'Automobile Sales in the Car Segment';
                    document.getElementById('text').innerHTML = 'Car';
                    break;
                case 2:
                    this.pie.series[0].dataSource = this.pickups;
                    this.pie.title = 'Automobile Sales in the Pickup Segment';
                    document.getElementById('text').innerHTML = 'Pickup';
                    break;
                case 3:
                    this.pie.series[0].dataSource = this.minivans;
                    this.pie.title = 'Automobile Sales in the Minivan Segment';
                    document.getElementById('text').innerHTML = 'Minivan';
                    break;
            }
            this.pie.series[0].radius = Browser.isDevice ? '90%' : '80%';
            this.pie.series[0].dataLabel.connectorStyle.length = '20px'
            this.pie.series[0].dataLabel.position = Browser.isDevice ? 'Inside' : 'Outside';
            this.pie.series[0].dataLabel.enableRotation = true;
            this.pie.series[0].dataLabel.font.color = '';
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
            this.pie.visibleSeries[0].explodeIndex = this.explodeIndex;
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
        this.pie.visibleSeries[0].explodeIndex = this.explodeIndex;
        this.pie.enableSmartLabels = false;
        this.pie.annotations[0].content = '';
        this.pie.series[0].dataSource = this.data;
        this.pie.series[0].dataLabel = this.dataLabel;
        this.pie.title = this.title;
        this.pie.legendSettings.visible = false;
        this.pie.visibleSeries[0].explodeIndex = this.explodeIndex;
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
        if (selectedTheme === 'highcontrast') {
            args.accumulation.series[0].dataLabel.font.color = "white";
        }
        if (args.accumulation.theme.indexOf('Dark') > -1){
            args.accumulation.series[0].dataLabel.font.color = "white";
        }
    };
     // custom code end
    constructor() {
        //code
    };

}