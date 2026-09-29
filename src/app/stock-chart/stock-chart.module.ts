/**
 * Stock Chart Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StockChartAllModule, ChartAnnotationService, RangeNavigatorAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { AreaComponent } from './area.component';
import { DefaultComponent } from './default.component';
import { InversedAreaComponent } from './inversed-area.component';
import { MultipleSeriesComponent } from './multiple-series.component';
import { HiloOpenCloseComponent } from './ohlc.component';
import { PlotLineComponent } from './plot-line.component';
import { SplineAreaComponent } from './spline-area.component';
import { SplineComponent } from './spline.component';
import { StripLineComponent} from './strip-line.component';
import { PeriodCustomizationComponent} from './period-customization.component';
import { DisabledPeriodComponent } from './disabled-period.component';
import { DisabledNavigatorComponent } from './disabled-navigator.component';
import { MultiPaneComponent } from './multi-pane.component';
import {StockEventsComponent} from './stock-events.component';
import { DateTimeCategoryComponent } from './datetime-category.component';
import { LiveCandlestickComponent } from './live-candlestick.component';

export const stockChartAppRoutes: Object[] = [
    { path: ':theme/stock-chart/default', component: DefaultComponent, name: 'Default', order: '01', category: 'Stock Chart' },
    {
        path: ':theme/stock-chart/ohlc', component: HiloOpenCloseComponent,
        name: 'OHLC', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/multi-pane', component: MultiPaneComponent,
        name: 'Candlestick and Volume', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/multiple-series', component: MultipleSeriesComponent,
        name: 'Multiple Series', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/spline', component: SplineComponent,
        name: 'Spline', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/area', component: AreaComponent,
        name: 'Area', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/spline-area', component: SplineAreaComponent,
        name: 'Spline Area', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/inversed-area', component: InversedAreaComponent,
        name: 'Inversed Area', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/plot-line', component: PlotLineComponent,
        name: 'Plot Line', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/strip-line', component: StripLineComponent,
        name: 'Plot Band', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/period-customization', component: PeriodCustomizationComponent,
        name: 'Intraday', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/disabled-navigator', component: DisabledNavigatorComponent,
        name: 'Hide Range Selector', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/disabled-period', component: DisabledPeriodComponent,
        name: 'Hide Period Selector', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/datetime-category', component: DateTimeCategoryComponent,
        name: 'DateTime Category Axis', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/stock-events', component: StockEventsComponent,
        name: 'Stock Events', order: '01', category: 'Stock Chart'
    },
    {
        path: ':theme/stock-chart/live-candlestick', component: LiveCandlestickComponent,
        name: 'Live Candlestick Chart', description: "This demo for Essential<sup>®</sup> JS2 Stock Chart control shows dynamic updates using a local in-memory array as the data source. The current candle is updated with series.setData() and a new candle is appended with series.addPoint() on each simulated one-minute tick.", order: '01', category: 'Stock Chart', type: 'new'
    }
];

export const StockChartSampleModule: ModuleWithProviders<any> = RouterModule.forChild(stockChartAppRoutes);

