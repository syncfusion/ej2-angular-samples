import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    AccumulationChart, AccumulationChartComponent, IAccAnimationCompleteEventArgs, AccPoints,
    IAccTextRenderEventArgs, IAccLoadedEventArgs, AccumulationTheme, Selection
} from '@syncfusion/ej2-angular-charts';

/**
 * Sample for Doughnut chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default-donut.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultDonutComponent {
    public data: Object[] = [
        { 'x': 'Net-tution and Fees', y: 21, text: '21%' },
        { 'x': 'Self-supporting Operations', y: 21, text: '21%' },
        { 'x': 'Private Gifts', y: 8, text: '8%' },
        { 'x': 'All Other', y: 8, text: '8%' },
        { 'x': 'Local Revenue', y: 4, text: '4%' },
        { 'x': 'State Revenue', y: 21, text: '21%' },
        { 'x': 'Federal Revenue', y: 16, text: '16%' }
    ];
    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    public execute = false;
    public count = 0;
    public onAnimationComplete(args: IAccAnimationCompleteEventArgs): void {
        let centerTitle: HTMLDivElement = document.getElementById('center_title') as HTMLDivElement;
        centerTitle.style.fontSize = this.getFontSize(args.accumulation.initialClipRect.width);
        let rect: ClientRect = centerTitle.getBoundingClientRect();
        centerTitle.style.top = (args.accumulation.origin.y + args.accumulation.element.offsetTop - (rect.height / 2)) + 'px';
        centerTitle.style.left = (args.accumulation.origin.x + args.accumulation.element.offsetLeft - (rect.width / 2)) + 'px';
        centerTitle.style.visibility = 'visible';
        let points: AccPoints[] = args.accumulation.visibleSeries[0].points;
        for (let point of points) {
            if (point.labelPosition === 'Outside' && point.labelVisible) {
                let label: Element = document.getElementById('donut-container_datalabel_Series_0_text_' + point.index);
                label.setAttribute('fill', 'black');
            }
        }
    };
    public getFontSize(width: number): string {
        if (width > 300) {
            return '13px';
        } else if (width > 250) {
            return '8px';
        } else {
            return '6px';
        }
    };
    public onTextRender(args: IAccTextRenderEventArgs): void {
        args.series.dataLabel.font.size = this.getFontSize(this.pie.initialClipRect.width);
        args.text = args.text + '%';
    }
    //Initializing Legend
    public legendSettings: Object = {
        visible: true,
        toggleVisibility: false,
        position: 'Right',
        height: '28%',
        width: '44%'
    };
    //Initializing Datalabel
    public dataLabel: Object = {
        visible: true, position: 'Inside',
        name: '${point.y}',
        font: {
            color: 'white',
            fontWeight: 'Bold',
            size: '14px'
        }
    };
          // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    }
          // custom code end
    public loaded(args: IAccLoadedEventArgs): void {
        if (this.execute) {
            return;
        }
        let pieinterval = setInterval(
            () => {
                if (document.getElementById('donut-container')) {
                    if (this.count === 0) {
                        this.pie.series[0].dataSource = [{ 'x': 'Net-tution and Fees', y: 10 },
                        { 'x': 'Self-supporting Operations', y: 10 },
                        { 'x': 'Private Gifts', y: 13 }, { 'x': 'All Other', y: 14 },
                        { 'x': 'Local Revenue', y: 9 }, { 'x': 'State Revenue', y: 13 },
                        { 'x': 'Federal Revenue', y: 8 }
                        ];
                        this.execute = true;
                        this.pie.animate();
                        this.count++;
                    } else if (this.count === 1) {
                        this.pie.series[0].dataSource = [
                            { 'x': 'Net-tution and Fees', y: 120 }, { 'x': 'Self-supporting Operations', y: 31 },
                            { 'x': 'Private Gifts', y: 6 }, { 'x': 'All Other', y: 12 },
                            { 'x': 'Local Revenue', y: 25 }, { 'x': 'State Revenue', y: 11 },
                            { 'x': 'Federal Revenue', y: 12 }
                        ];
                        this.execute = true;
                        this.pie.animate();
                        this.count++;
                    } else if (this.count === 2) {
                        this.pie.series[0].dataSource = [
                            { 'x': 'Net-tution and Fees', y: 6 }, { 'x': 'Self-supporting Operations', y: 22 },
                            { 'x': 'Private Gifts', y: 11 }, { 'x': 'All Other', y: 15 },
                            { 'x': 'Local Revenue', y: 13 }, { 'x': 'State Revenue', y: 10 },
                            { 'x': 'Federal Revenue', y: 8 }
                        ];
                        this.execute = true;
                        this.pie.animate();
                        this.count++;
                    } else if (this.count === 3) {
                        this.pie.series[0].dataSource = [
                            { 'x': 'Net-tution and Fees', y: 15 }, { 'x': 'Self-supporting Operations', y: 10 },
                            { 'x': 'Private Gifts', y: 18 }, { 'x': 'All Other', y: 20 },
                            { 'x': 'Local Revenue', y: 30 }, { 'x': 'State Revenue', y: 20 },
                            { 'x': 'Federal Revenue', y: 25 }
                        ];
                        this.execute = true;
                        this.pie.animate();
                        this.count++;
                    } else if (this.count === 4) {
                        this.pie.series[0].dataSource = [
                            { 'x': 'Net-tution and Fees', y: 21 }, { 'x': 'Self-supporting Operations', y: 10 },
                            { 'x': 'Private Gifts', y: 15 }, { 'x': 'All Other', y: 15 },
                            { 'x': 'Local Revenue', y: 11 }, { 'x': 'State Revenue', y: 20 },
                            { 'x': 'Federal Revenue', y: 60 }
                        ];
                        this.execute = true;
                        this.pie.animate();
                        this.count = 0;
                    }
                } else {
                    clearInterval(pieinterval);
                }
            },
            3000);
    }
    public startAngle: number = 0;
    public endAngle: number = 360;
    public tooltip: Object = {
        enable: false
    };
    public title: string = 'Education Institutional Revenue';
    constructor() {
        //code
    };

}


