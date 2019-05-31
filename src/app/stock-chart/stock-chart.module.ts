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
        path: ':theme/stock-chart/stock-events', component: StockEventsComponent,
        name: 'Stock Events', order: '01', category: 'Stock Chart', type: 'new'
    },
];

export const stockChartRouter: ModuleWithProviders = RouterModule.forChild(stockChartAppRoutes);

let declarations: Type<Object>[] = [AreaComponent, DefaultComponent, PlotLineComponent, InversedAreaComponent, HiloOpenCloseComponent,
     MultipleSeriesComponent, SplineAreaComponent, SplineComponent, StripLineComponent, PeriodCustomizationComponent,
     DisabledNavigatorComponent, DisabledPeriodComponent, MultiPaneComponent, StockEventsComponent ];
@NgModule({
    imports: [stockChartRouter, StockChartAllModule, RangeNavigatorAllModule, ChartAllModule],
    exports: [],
    declarations: declarations,
    providers: [ ChartAllModule, RangeNavigatorAllModule, StockChartAllModule ]
})
export class StockChartSampleModule {
}
