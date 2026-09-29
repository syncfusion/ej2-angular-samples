import {
    Component,
    ViewEncapsulation
} from '@angular/core';

import {
    ChartAllModule,
    ILoadedEventArgs,
    ILegendRenderEventArgs,
    LineSeriesService,
    SplineSeriesService,
    AreaSeriesService,
    DateTimeCategoryService,
    LegendService,
    TooltipService,
    CrosshairService,
    ChartAnnotationService,
    HighlightService
} from '@syncfusion/ej2-angular-charts';

import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

interface ClimateDataPoint {
    Month: Date;
    TemperatureAnomaly: number;
    AtmosphericCO2: number;
    SeaIceExtent: number;
}

/**
 * Sample for a multi-axis combination chart.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multi-axis-combination.html',
    styleUrls: ['multi-axis-combination.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        SBActionDescriptionComponent,
        ChartAllModule,
        SBDescriptionComponent
    ],
    providers: [
        LineSeriesService,
        SplineSeriesService,
        AreaSeriesService,
        DateTimeCategoryService,
        LegendService,
        TooltipService,
        CrosshairService,
        ChartAnnotationService,
        HighlightService
    ]
})
export class MultiAxisCombinationComponent {
    public width: string = Browser.isDevice ? '100%' : '90%';

    public title: string = 'Global Climate Pulse';

    public subTitle: string =
        'Monthly global climate signals during 2025 • ' +
        'Copernicus C3S • NOAA GML • NSIDC';

    public january2025: Date = new Date(2025, 0, 1);
    public may2025: Date = new Date(2025, 4, 1);
    public september2025: Date = new Date(2025, 8, 1);

    public climateData: ClimateDataPoint[] = [
        {
            Month: new Date(2025, 0, 1),
            TemperatureAnomaly: 1.75,
            AtmosphericCO2: 426.65,
            SeaIceExtent: 13.11
        },
        {
            Month: new Date(2025, 1, 1),
            TemperatureAnomaly: 1.59,
            AtmosphericCO2: 427.09,
            SeaIceExtent: 14.26
        },
        {
            Month: new Date(2025, 2, 1),
            TemperatureAnomaly: 1.60,
            AtmosphericCO2: 428.15,
            SeaIceExtent: 14.33
        },
        {
            Month: new Date(2025, 3, 1),
            TemperatureAnomaly: 1.51,
            AtmosphericCO2: 429.35,
            SeaIceExtent: 13.73
        },
        {
            Month: new Date(2025, 4, 1),
            TemperatureAnomaly: 1.40,
            AtmosphericCO2: 430.51,
            SeaIceExtent: 12.68
        },
        {
            Month: new Date(2025, 5, 1),
            TemperatureAnomaly: 1.42,
            AtmosphericCO2: 429.95,
            SeaIceExtent: 10.82
        },
        {
            Month: new Date(2025, 6, 1),
            TemperatureAnomaly: 1.37,
            AtmosphericCO2: 427.87,
            SeaIceExtent: 8.02
        },
        {
            Month: new Date(2025, 7, 1),
            TemperatureAnomaly: 1.39,
            AtmosphericCO2: 425.71,
            SeaIceExtent: 5.92
        },
        {
            Month: new Date(2025, 8, 1),
            TemperatureAnomaly: 1.44,
            AtmosphericCO2: 424.82,
            SeaIceExtent: 4.68
        },
        {
            Month: new Date(2025, 9, 1),
            TemperatureAnomaly: 1.48,
            AtmosphericCO2: 425.46,
            SeaIceExtent: 6.08
        },
        {
            Month: new Date(2025, 10, 1),
            TemperatureAnomaly: 1.53,
            AtmosphericCO2: 426.98,
            SeaIceExtent: 9.04
        },
        {
            Month: new Date(2025, 11, 1),
            TemperatureAnomaly: 1.55,
            AtmosphericCO2: 428.12,
            SeaIceExtent: 11.83
        }
    ];

    public titleStyle: Object = {
        textAlignment: 'Near',
        fontFamily: 'Segoe UI',
        fontWeight: '700',
        size: '24px',
        textOverflow: 'Wrap'
    };

    public subTitleStyle: Object = {
        textAlignment: 'Near',
        fontFamily: 'Segoe UI',
        fontWeight: '500',
        size: '13px',
        textOverflow: 'Wrap'
    };

    public primaryXAxis: Object = {
        valueType: 'DateTimeCategory',
        intervalType: 'Months',
        interval: 1,
        labelFormat: 'MMM',
        edgeLabelPlacement: 'Shift',
        plotOffsetLeft: 10,
        plotOffsetRight: 10,
        majorGridLines: {
            width: 0
        },
        minorGridLines: {
            width: 0
        },
        majorTickLines: {
            width: 0
        },
        lineStyle: {
            width: 0
        },
        labelStyle: {
            fontFamily: 'Segoe UI',
            fontWeight: '600',
            size: '12px'
        }
    };

    public primaryYAxis: Object = {
        title: 'Temperature Anomaly (°C)',
        minimum: 1.2,
        maximum: 1.8,
        interval: 0.1,
        labelFormat: '{value}°C',
        edgeLabelPlacement: 'Shift',
        majorGridLines: {
            width: 1,
            dashArray: '3,4'
        },
        minorGridLines: {
            width: 0
        },
        majorTickLines: {
            width: 0
        },
        lineStyle: {
            width: 1.5,
            color: '#F97316'
        },
        labelStyle: {
            fontFamily: 'Segoe UI',
            fontWeight: '600',
            size: '12px',
            color: '#EA580C'
        },
        titleStyle: {
            fontFamily: 'Segoe UI',
            fontWeight: '700',
            size: '13px',
            color: '#EA580C',
            textAlignment: 'Center'
        }
    };

    public axes: Object[] = [
        {
            name: 'CO2Axis',
            title: 'Atmospheric CO₂ (ppm)',
            opposedPosition: true,
            minimum: 422,
            maximum: 432,
            interval: 2,
            labelFormat: '{value} ppm',
            edgeLabelPlacement: 'Shift',
            majorGridLines: {
                width: 0
            },
            minorGridLines: {
                width: 0
            },
            majorTickLines: {
                width: 0
            },
            lineStyle: {
                width: 1.5,
                color: '#2563EB'
            },
            labelStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px',
                color: '#2563EB'
            },
            titleStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '700',
                size: '13px',
                color: '#2563EB',
                textAlignment: 'Center'
            }
        },
        {
            name: 'SeaIceAxis',
            title: 'Arctic Sea Ice (million km²)',
            opposedPosition: true,
            minimum: 4,
            maximum: 16,
            interval: 2,
            labelFormat: '{value}M',
            edgeLabelPlacement: 'Shift',
            majorGridLines: {
                width: 0
            },
            minorGridLines: {
                width: 0
            },
            majorTickLines: {
                width: 0
            },
            lineStyle: {
                width: 1.5,
                color: '#059669'
            },
            labelStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px',
                color: '#059669'
            },
            titleStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '700',
                size: '13px',
                color: '#059669',
                textAlignment: 'Center'
            }
        }
    ];

    public tooltip: Object = {
        enable: true,
        shared: true,
        enableMarker: true,
        opacity: 0.97,
        header: '<b>${point.x}</b>',
        format: '${series.name} : <b>${point.y}</b>'
    };

    public crosshair: Object = {
        enable: true,
        lineType: 'Vertical',
        dashArray: '4,4',
        line: {
            width: 1
        }
    };

    public legend: Object = {
        visible: true,
        position: 'Bottom',
        alignment: 'Center',
        shapeWidth: 10,
        shapeHeight: 10,
        shapePadding: 8,
        padding: 24,
        enableHighlight: true,
        toggleVisibility: false,
        textStyle: {
            fontFamily: 'Segoe UI',
            fontWeight: '600',
            size: '12px'
        }
    };

    public chartArea: Object = {
        border: {
            width: 0
        }
    };

    public seaIceBorder: Object = {
        width: 2.5,
        color: '#059669'
    };

    public seaIceGradient: Object = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        gradientColorStop: [
            {
                offset: 0,
                color: '#10B981',
                opacity: 0.30
            },
            {
                offset: 45,
                color: '#34D399',
                opacity: 0.15
            },
            {
                offset: 100,
                color: '#ECFDF5',
                opacity: 0.02
            }
        ]
    };

    public temperatureGradient: Object = {
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 0,
        gradientColorStop: [
            {
                offset: 0,
                color: '#FB923C',
                opacity: 1
            },
            {
                offset: 55,
                color: '#F97316',
                opacity: 1
            },
            {
                offset: 100,
                color: '#C2410C',
                opacity: 1
            }
        ]
    };

    public co2Gradient: Object = {
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 0,
        gradientColorStop: [
            {
                offset: 0,
                color: '#60A5FA',
                opacity: 1
            },
            {
                offset: 50,
                color: '#2563EB',
                opacity: 1
            },
            {
                offset: 100,
                color: '#1E40AF',
                opacity: 1
            }
        ]
    };

    public seaIceMarker: Object = {
        visible: true,
        shape: 'Rectangle',
        width: 8,
        height: 8,
        isFilled: true,
        fill: '#10B981'
    };

    public temperatureMarker: Object = {
        visible: true,
        shape: 'Circle',
        width: 8,
        height: 8,
        isFilled: true,
        fill: '#F97316'
    };

    public co2Marker: Object = {
        visible: true,
        shape: 'Diamond',
        width: 8,
        height: 8,
        isFilled: true,
        fill: '#2563EB'
    };

    public seaIceAnimation: Object = {
        enable: true,
        duration: 1200,
        delay: 0
    };

    public temperatureAnimation: Object = {
        enable: true,
        duration: 1400,
        delay: 450
    };

    public co2Animation: Object = {
        enable: true,
        duration: 1400,
        delay: 950
    };

    public co2Annotation: string = `
        <div class="climate-insight climate-insight-blue climate-insight-anchor-down">
            <div class="climate-insight-marker climate-insight-marker-diamond"></div>
            <div class="climate-insight-leader"></div>
            <div class="climate-insight-pill">
                <span class="climate-insight-pin climate-insight-pin-diamond"></span>
                <span class="climate-insight-label">CO₂ seasonal peak</span>
                <span class="climate-insight-value">430.5 ppm</span>
            </div>
        </div>
    `;

    public seaIceAnnotation: string = `
        <div class="climate-insight climate-insight-green climate-insight-anchor-up">
            <div class="climate-insight-marker climate-insight-marker-rectangle"></div>
            <div class="climate-insight-leader"></div>
            <div class="climate-insight-pill">
                <span class="climate-insight-pin climate-insight-pin-rectangle"></span>
                <span class="climate-insight-label">Sea ice annual low</span>
                <span class="climate-insight-value">4.68 M km²</span>
            </div>
        </div>
    `;

    public temperatureAnnotation: string = `
        <div class="climate-insight climate-insight-orange climate-insight-anchor-right">
            <div class="climate-insight-marker climate-insight-marker-circle"></div>
            <div class="climate-insight-leader"></div>
            <div class="climate-insight-pill">
                <span class="climate-insight-pin climate-insight-pin-circle"></span>
                <span class="climate-insight-label">Hottest anomaly</span>
                <span class="climate-insight-value">+1.75°C</span>
            </div>
        </div>
    `;

    public legendRender(args: ILegendRenderEventArgs): void {
        if (args.text === 'Temperature Anomaly (°C)') {
            args.shape = 'Circle';
            args.fill = '#F97316';
        } else if (args.text === 'Atmospheric CO₂ (ppm)') {
            args.shape = 'Diamond';
            args.fill = '#2563EB';
        } else if (
            args.text === 'Arctic Sea Ice (million km²)'
        ) {
            args.shape = 'Rectangle';
            args.fill = '#10B981';
        }
    }

    public loaded(args: ILoadedEventArgs): void {
        const chartElement: HTMLElement | null =
            document.getElementById('container');

        if (chartElement) {
            chartElement.setAttribute('title', '');
        }
    }

    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        const chartElement: HTMLElement = args.chart.element as HTMLElement;
        if (args.chart.enableRtl) {
            chartElement.classList.add('climate-chart-rtl');
        } else {
            chartElement.classList.remove('climate-chart-rtl');
        }
    }
    // custom code end
}