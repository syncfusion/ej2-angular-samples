import { Component, ViewEncapsulation } from '@angular/core';
import {
    ChartAllModule,
    ILoadedEventArgs,
    ITextRenderEventArgs,
    ITooltipRenderEventArgs
} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Stacked Column with Smart Labels
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-smart-labels.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class StackedSmartLabelsComponent {
    public chartData: Object[] = [
        {
            x: 'Q1 2025',
            samsung: 72.3,
            apple: 56.2,
            xiaomi: 42.7,
            oppo: 7.4,
            vivo: 5.2,
            others: 70.7
        },
        {
            x: 'Q2 2025',
            samsung: 75.9,
            apple: 57.1,
            xiaomi: 43.9,
            oppo: 6.2,
            vivo: 3.9,
            others: 4.9
        },
        {
            x: 'Q3 2025',
            samsung: 80.1,
            apple: 60.3,
            xiaomi: 46.0,
            oppo: 4.8,
            vivo: 3.9,
            others: 78.9
        },
        {
            x: 'Q4 2025',
            samsung: 85.5,
            apple: 62.7,
            xiaomi: 48.9,
            oppo: 6.4,
            vivo: 5.8,
            others: 81.5
        }
    ];

    public seriesColors: string[] = [
        '#6355C7',
        '#00AEE0',
        '#FFB400',
        '#4CAF50',
        '#E56590',
        '#9B59B6'
    ];

    public width: string = Browser.isDevice ? '100%' : '75%';

    public primaryXAxis: Object = {
        valueType: 'Category',
        visible: true,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }
    };

    public primaryYAxis: Object = {
        visible: true,
        title: 'Shipments (Millions of Units)',
        labelFormat: '{value}M',
        minimum: 0,
        maximum: 400,
        interval: 50,
        majorGridLines: { color: '#E2E8F0', width: 1 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 }
    };

    public chartArea: Object = {
        background: 'transparent',
        border: { width: 0 }
    };

    public title: string =
        'Global Smartphone Shipments by Vendor (2025)';

    public subTitle: string =
        'Smart labels automatically reposition small stacked-segment labels to avoid overlap.';

    public legendSettings: Object = {
        visible: true,
        position: 'Bottom',
        enableHighlight: true,
        toggleVisibility: true
    };

    public tooltip: Object = {
        enable: true,
        shared: true,
        enableHighlight: true,
        header: '<b>${point.x}</b>'
    };

    /*
     * Important:
     * These objects are created once. They are not generated from a method
     * called by the Angular template.
     */
    public samsungMarker: Object =
        this.createMarker(this.seriesColors[0]);

    public appleMarker: Object =
        this.createMarker(this.seriesColors[1]);

    public xiaomiMarker: Object =
        this.createMarker(this.seriesColors[2]);

    public oppoMarker: Object =
        this.createMarker(this.seriesColors[3]);

    public vivoMarker: Object =
        this.createMarker(this.seriesColors[4]);

    public othersMarker: Object =
        this.createMarker(this.seriesColors[5]);

    private createMarker(seriesColor: string): Object {
        return {
            dataLabel: {
                visible: true,
                position: 'Top',
                format: '{value}M',
                labelIntersectAction: 'RelocateHorizontally',
                font: {
                    color: '#FFFFFF',
                    fontWeight: '700',
                    size: '12px',
                    fontFamily: 'Segoe UI'
                },
                margin: {
                    left: 24,
                    right: 24,
                    top: 12,
                    bottom: 12
                },
                smartLabelSettings: {
                    background: seriesColor,
                    border: {
                        color: seriesColor,
                        width: 1.5
                    },
                    connectorLineStyle: {
                        color: seriesColor,
                        width: 2
                    },
                    pointerShape: 'Arrow'
                },
                rx: 7,
                ry: 7
            }
        };
    }

    public textRender(args: ITextRenderEventArgs): void {
        if (
            args.point &&
            typeof args.point.y === 'number' &&
            args.point.y < 3
        ) {
            args.cancel = true;
        }
    }

    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (!args.point || !args.series) {
            return;
        }

        const value: number = Number(args.point.y);

        args.text =
            `${args.series.name}: ` +
            `<b>${value.toLocaleString('en-US', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
            })}M</b>`;
    }

    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    }
}