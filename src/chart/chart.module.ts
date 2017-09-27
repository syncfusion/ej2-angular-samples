/**
 * Chart Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-ng-buttons';
import { ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-ng-charts';

import { LineChartComponent } from './line.component';
import { AreaChartComponent } from './area.component';
import { BarChartComponent } from './bar.component';
import { RangeColumnChartComponent } from './range-column.component';
import { ColumnChartComponent } from './column.component';
import { CombinationSeriesChartComponent } from './combination-series.component';
import { DateTimeAxisChartComponent } from './datetime.component';
import { LogarithmicAxisChartComponent } from './logarithmic.component';
import { MultipleAxesChartComponent } from './multiple-axes.component';
import { NumericAxisChartComponent } from './numeric-axis.component';
import { RemoteDataChartComponent } from './remote-data.component';
import { SplineChartComponent } from './spline.component';
import { StackedAreaChartComponent } from './stacked-area.component';
import { CategoryChartComponent } from './category.component';
import { StackedBarChartComponent } from './stacked-bar.component';
import { StackedColumnChartComponent } from './stacked-column.component';
import { StepLineChartComponent } from './step-line.component';
import { StepAreaChartComponent } from './step-area.component';
import { SymbolsChartComponent } from './symbols.component';
import { ScatterChartComponent } from './scatter.component';
import { BubbleChartComponent } from './bubble.component';
import { TrackBallChartComponent } from './trackball.component';
import { CrosshairChartComponent } from './crosshair.component';
import { LocalDataChartComponent } from './local-data.component';
import { SelectionChartComponent } from './selection.component';
import { PerformanceChartComponent } from './performance.component';
import { ZoomingChartComponent } from './zooming.component';
import { PercentStackedColumnChartComponent } from './stacked-column100.component';
import { PercentStackedBarChartComponent } from './stacked-bar100.component';
import { PercentStackedAreaChartComponent } from './stacked-area100.component';
import { DefaultPieComponent } from './default-pie.component';
import { DefaultDoughnutComponent } from './default-doughnut.component';
import { SemiPieComponent } from './semi-pie.component';
import { SmartLabelsComponent } from './smart-labels.component';
import { DrilldownPieComponent } from './drilldown-pie.component';
import { GroupingPieComponent } from './grouping.component';
import { InversedAxisChartComponent } from './inversed.component';
import { SharedModule } from '../common/shared.module';
import { AnnotationChartComponent } from './annotation.component';
import { DataLabelComponent } from './datalabel-template.component';
export const chartAppRoutes: Object[] = [
    { path: ':theme/chart/line', component: LineChartComponent, name: 'Line', order:'01' ,category: 'Series' },
    { path: ':theme/chart/column', component: ColumnChartComponent, name: 'Column',order:'01', category: 'Series' },
    { path: ':theme/chart/bar', component: BarChartComponent, name: 'Bar', order:'01',category: 'Series' },
    { path: ':theme/chart/area', component: AreaChartComponent, name: 'Area', order:'01',category: 'Series' },
    { path: ':theme/chart/spline', component: SplineChartComponent, name: 'Spline', order:'01',category: 'Series' },
    { path: ':theme/chart/stacked-column', component: StackedColumnChartComponent, name: 'Stacked Column',order:'01', category: 'Series' },
    { path: ':theme/chart/stacked-column100', component: PercentStackedColumnChartComponent, name: '100% Stacked Column',
      order: '01', category: 'Series' },
    { path: ':theme/chart/stacked-bar', component: StackedBarChartComponent, name: 'Stacked Bar',order:'01', category: 'Series' },
    { path: ':theme/chart/stacked-bar100', component: PercentStackedBarChartComponent, name: '100% Stacked Bar', order: '01', category: 'Series' },
    { path: ':theme/chart/stacked-area', component: StackedAreaChartComponent, name: 'Stacked Area', order:'01',category: 'Series' },
    { path: ':theme/chart/stacked-area100', component: PercentStackedAreaChartComponent, name: '100% Stacked Area',order:'01',category: 'Series' },
    { path: ':theme/chart/range-column', component: RangeColumnChartComponent, name: 'Range Column',order:'01',category: 'Series' },
    { path: ':theme/chart/step-line', component: StepLineChartComponent, name: 'StepLine', order:'01',category: 'Series' },
    { path: ':theme/chart/step-area', component: StepAreaChartComponent, name: 'StepArea', order:'01',category: 'Series',type:'new' },
    { path: ':theme/chart/scatter', component: ScatterChartComponent, name: 'Scatter', order:'01',category: 'Series' },
    { path: ':theme/chart/bubble', component: BubbleChartComponent, name: 'Bubble', order:'01', category: 'Series'},
    { path: ':theme/chart/combination-series', component: CombinationSeriesChartComponent, name: 'Combination Series', 
       order:'01', category: 'Series' },
    { path: ':theme/chart/performance', component: PerformanceChartComponent, name: 'Performance',order:'01', category: 'Series' },
    { path: ':theme/chart/default-pie', component: DefaultPieComponent, name: 'Pie', order: '02', category: 'Accumulation Series', type: 'new'},
    {
        path: ':theme/chart/default-doughnut', component: DefaultDoughnutComponent, name: 'Pie With Legend', order: '02',
        category: 'Accumulation Series', type: 'new'
    },
    {
        path: ':theme/chart/semi-pie', component: SemiPieComponent, name: 'Semi Accumulation Series', order: '02',
        category: 'Accumulation Series', type: 'new'
    },
    {
        path: ':theme/chart/smart-labels', component: SmartLabelsComponent, name: 'Smart Labels', order: '02',
        category: 'Accumulation Series', type: 'new'
    },
    {
        path: ':theme/chart/drilldown-pie', component: DrilldownPieComponent, name: 'Drilldown', order: '02',
        category: 'Accumulation Series', type: 'new'
    },
    {
        path: ':theme/chart/grouping', component: GroupingPieComponent, name: 'Grouping', order: '02',
        category: 'Accumulation Series', type: 'new'
    },
    { path: ':theme/chart/local-data', component: LocalDataChartComponent, name: 'Local Data', order:'03',category: 'Data Binding' },
    { path: ':theme/chart/remote-data', component: RemoteDataChartComponent, name: 'Remote Data',order:'03', category: 'Data Binding' },
    { path: ':theme/chart/numeric-axis', component: NumericAxisChartComponent, name: 'Numeric Axis', order:'04', category: 'Chart Axes' },
    { path: ':theme/chart/datetime', component: DateTimeAxisChartComponent, name: 'DateTime Axis', order:'04', category: 'Chart Axes' },
    { path: ':theme/chart/category', component: CategoryChartComponent, name: 'Category Axis', order:'04', category: 'Chart Axes' },
    { path: ':theme/chart/logarithmic', component: LogarithmicAxisChartComponent, name: 'Logarithmic Axis', order:'04', category: 'Chart Axes' },
    { path: ':theme/chart/multiple-axes', component: MultipleAxesChartComponent, name: 'Multiple Axes',order:'04', category: 'Chart Axes' },
    { path: ':theme/chart/inversed', component: InversedAxisChartComponent, name: 'Inversed Axes', order:'04', category: 'Chart Axes', type: 'new'},
    { path: ':theme/chart/symbols', component: SymbolsChartComponent, name: 'Symbols',order:'05', category: 'Chart Customization' },
    { path: ':theme/chart/annotation', component: AnnotationChartComponent, name: 'Annotation', order: '05', category: 'Chart Customization', type: 'new'},
    { path: ':theme/chart/datalabel-template', component: DataLabelComponent, name: 'Datalabel Template', order: '05', category: 'Chart Customization', type: 'new' },
    { path: ':theme/chart/selection', component: SelectionChartComponent, name: 'Selection',order:'06', category: 'User Interaction' },
    { path: ':theme/chart/crosshair', component: CrosshairChartComponent, name: 'Crosshair',order:'06', category: 'User Interaction' },
    { path: ':theme/chart/trackball', component: TrackBallChartComponent, name: 'TrackBall', order:'06',category: 'User Interaction' },
    { path: ':theme/chart/zooming', component: ZoomingChartComponent, name: 'Zooming and Panning',order:'06', category: 'User Interaction' },
];

export const chartRouter: ModuleWithProviders = RouterModule.forChild(chartAppRoutes);
let declarations: Type<Object>[] = [LineChartComponent, ColumnChartComponent, BarChartComponent, AreaChartComponent,
    SplineChartComponent, StackedColumnChartComponent, StackedBarChartComponent, StackedAreaChartComponent, StepLineChartComponent,StepAreaChartComponent,
    ScatterChartComponent, BubbleChartComponent, CombinationSeriesChartComponent, PerformanceChartComponent, NumericAxisChartComponent,
    CategoryChartComponent, LogarithmicAxisChartComponent, MultipleAxesChartComponent, SymbolsChartComponent, SelectionChartComponent,
    CrosshairChartComponent, TrackBallChartComponent, ZoomingChartComponent, LocalDataChartComponent, RemoteDataChartComponent,
    PercentStackedAreaChartComponent, PercentStackedBarChartComponent, PercentStackedColumnChartComponent, DefaultPieComponent,
    DateTimeAxisChartComponent, RangeColumnChartComponent, DefaultDoughnutComponent, SemiPieComponent, SmartLabelsComponent,
    DrilldownPieComponent, GroupingPieComponent, InversedAxisChartComponent, AnnotationChartComponent, DataLabelComponent];
@NgModule({
    imports: [chartRouter, ChartAllModule, SharedModule, ButtonModule, AccumulationChartAllModule],
    exports: [],
    declarations: declarations,
    providers: [ ChartAllModule, AccumulationChartAllModule]
})
export class ChartSampleModule {
}
