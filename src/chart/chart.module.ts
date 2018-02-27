/**
 * Chart Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-ng-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-ng-inputs';
import { ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-ng-charts';

import { LineChartComponent } from './line.component';
import { SplineAreaChartComponent } from './spline-area.component';
import { AreaChartComponent } from './area.component';
import { BarChartComponent } from './bar.component';
import { RangeAreaComponent } from './rangearea.component';
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
import { PyramidComponent } from './pyramid.component';
import { FunnelComponent } from './funnel.component';
import { WaterfallChartComponent } from './waterfall.component';
import { SemiPieComponent } from './semi-pie.component';
import { SmartLabelsComponent } from './smart-labels.component';
import { DrilldownPieComponent } from './drilldown-pie.component';
import { GroupingPieComponent } from './grouping.component';
import { InversedAxisChartComponent } from './inversed.component';
import { SharedModule } from '../common/shared.module';
import { CandleChartComponent } from './candle.component';
import { HiloChartComponent } from './hilo.component';
import { HiloOpenCloseChartComponent } from './hiloopenclose.component';
import { AccumulationDistributionComponent } from './adindicator.component';
import { AtrIndicatorComponent } from './atrindicator.component';
import { MomentumIndicatorComponent } from './momentum.component';
import { RsiIndicatorComponent } from './rsi.component';
import { StochasticIndicatorComponent } from './stochastic.component';
import { MacdIndicatorComponent } from './macd.component';
import { EmaIndicatorComponent } from './ema.component';
import { SmaIndicatorComponent } from './sma.component';
import { TmaIndicatorComponent } from './tma.component';
import { BollingerIndicatorComponent } from './bollinger.component';
import { PolarAreaChartComponent } from './polar-area.component';
import { PolarLineChartComponent } from './polar-line.component';
import { PolarColumnChartComponent } from './polar-column.component';
import { PolarRangeColumnChartComponent } from './polar-rangecolumn.component';
import { PolarScatterChartComponent } from './polar-scatter.component';
import { PolarSplineChartComponent } from './polar-spline.component';
import { PolarStackedAreaChartComponent } from './polar-stackedarea.component';
import { PolarStackedColumnChartComponent } from './polar-stackedcolumn.component';
import { IndexedAxisChartComponent } from './indexed-axis.component';
import { VerticalChartComponent } from './vertical-chart.component';
import { AnnotationChartComponent } from './annotation.component';
import { DataLabelComponent } from './datalabel-template.component';
import { BoxandWhiskerChartComponent } from './box-whisker.component';
import { StripLineChartComponent } from './stripline.component';
import { PieEmptyPointChartComponent } from './pie-empty-point.component';
import { EmptyPointChartComponent } from './empty-point.component';
import { PrintChartComponent } from './print.component';
import { SmartAxisLabelsChartComponent } from './smart-axis-labels.component';
import { ErrorBarChartComponent } from './error-bar.component';
import { TrendLineChartComponent } from './trend-lines.component';
import { InversedSplineChartComponent } from './inversed-spline.component';
import { DashedLineChartComponent } from './dashed-line.component';
import { EmptyAreaChartComponent } from './area-empty.component';
import { RoundedColumnChartComponent } from './rounded-column.component';
import { PlacementColumnChartComponent } from './column-placement.component';
import { TornadoChartComponent } from './tornado.component';
import { RangeBarChartComponent } from './range-bar.component';
import { ParetoSeriesChartComponent } from './pareto-series.component';
import { DoughnutComponent } from './doughnut.component';
import { RangeSelectionChartComponent } from './range-selection.component';
import { ExportChartComponent } from './export.component';
import { MultiLevelLabelsChartComponent } from './multi-level-label.component';
import { LineSegmentChartComponent } from './line-segments.component';
import { AxisCrossingChartComponent } from './axis-crossing.component';
import { MultiLineChartComponent } from './line-multi-line.component';
import { AreaSegmentChartComponent } from './area-segments.componet';
import { DateTimeCategoryAxisChartComponent } from './datetime-category.component';
import { SortingChartComponent } from './sorting.component';
export const chartAppRoutes: Object[] = [
    { path: ':theme/chart/line', component: LineChartComponent, name: 'Line', order: '01', category: 'Line Charts' },
    { path: ':theme/chart/spline', component: SplineChartComponent, name: 'Spline', order: '01', category: 'Line Charts' },
    { path: ':theme/chart/step-line', component: StepLineChartComponent, name: 'Step Line', order: '01', category: 'Line Charts' },
    { path: ':theme/chart/dashed-line', component: DashedLineChartComponent, name: 'Dashed Line', order: '01', category: 'Line Charts' },
    { path: ':theme/chart/inversed-spline', component: InversedSplineChartComponent, name: 'Inversed Spline', order: '01', category: 'Line Charts' },
    { path: ':theme/chart/line-segments', component: LineSegmentChartComponent, name: 'Line Zone', order: '01', category: 'Line Charts', type: 'new' },
    { path: ':theme/chart/line-multi-line', component: MultiLineChartComponent, name: 'Multi Colored Line', order: '01', category: 'Line Charts', type: 'new' },

    { path: ':theme/chart/area', component: AreaChartComponent, name: 'Area', order: '02', category: 'Area Charts' },
    { path: ':theme/chart/spline-area', component: SplineAreaChartComponent, name: 'Spline Area', order: '02', category: 'Area Charts', type: 'new' },
    { path: ':theme/chart/step-area', component: StepAreaChartComponent, name: 'Step Area', order: '02', category: 'Area Charts' },
    { path: ':theme/chart/rangearea', component: RangeAreaComponent, name: 'Range Area', order: '02', category: 'Area Charts' },
    { path: ':theme/chart/stacked-area', component: StackedAreaChartComponent, name: 'Stacked Area', order: '02', category: 'Area Charts' },
    { path: ':theme/chart/stacked-area100', component: PercentStackedAreaChartComponent, name: '100% Stacked Area', order: '02', category: 'Area Charts' },
    { path: ':theme/chart/area-empty', component: EmptyAreaChartComponent, name: 'Area - Empty Points', order: '02', category: 'Area Charts' },
    { path: ':theme/chart/area-segments', component: AreaSegmentChartComponent, name: 'Area Zone', order: '02', category: 'Area Charts', type: 'new' },

    { path: ':theme/chart/column', component: ColumnChartComponent, name: 'Column', order: '03', category: 'Bar Charts' },
    { path: ':theme/chart/rounded-column', component: RoundedColumnChartComponent, name: 'Rounded Column', order: '03', category: 'Bar Charts', type: 'update' },
    { path: ':theme/chart/column-placement', component: PlacementColumnChartComponent, name: 'Back to Back Column', order: '03', category: 'Bar Charts' },
    { path: ':theme/chart/range-column', component: RangeColumnChartComponent, name: 'Range Column', order: '03', category: 'Bar Charts' },
    { path: ':theme/chart/range-bar', component: RangeBarChartComponent, name: 'Inversed Range Column', order: '03', category: 'Bar Charts' },
    { path: ':theme/chart/bar', component: BarChartComponent, name: 'Bar', order: '03', category: 'Bar Charts' },
    { path: ':theme/chart/stacked-column', component: StackedColumnChartComponent, name: 'Stacked Column', order: '03', category: 'Bar Charts' },
    { path: ':theme/chart/stacked-column100', component: PercentStackedColumnChartComponent, name: '100% Stacked Column', order: '03', category: 'Bar Charts' },
    { path: ':theme/chart/stacked-bar', component: StackedBarChartComponent, name: 'Stacked Bar', order: '03', category: 'Bar Charts' },
    { path: ':theme/chart/stacked-bar100', component: PercentStackedBarChartComponent, name: '100% Stacked Bar', order: '03', category: 'Bar Charts' },
    { path: ':theme/chart/tornado', component: TornadoChartComponent, name: 'Negative Stack', order: '03', category: 'Bar Charts' },


    { path: ':theme/chart/hilo', component: HiloChartComponent, name: 'Hilo', order: '04', category: 'Financial Charts' },
    { path: ':theme/chart/hiloopenclose', component: HiloOpenCloseChartComponent, name: 'Hilo Open Close', order: '04', category: 'Financial Charts' },
    { path: ':theme/chart/candle', component: CandleChartComponent, name: 'Candle', order: '04', category: 'Financial Charts' },


    { path: ':theme/chart/scatter', component: ScatterChartComponent, name: 'Scatter', order: '05', category: 'Scatter and Bubble' },
    { path: ':theme/chart/bubble', component: BubbleChartComponent, name: 'Bubble', order: '05', category: 'Scatter and Bubble' },

    { path: ':theme/chart/waterfall', component: WaterfallChartComponent, name: 'Waterfall', order: '06', category: 'Other Types' },
    { path: ':theme/chart/box-whisker', component: BoxandWhiskerChartComponent, name: 'Box and Whisker', order: '06', category: 'Other Types' },
    { path: ':theme/chart/error-bar', component: ErrorBarChartComponent, name: 'Error Bar', order: '06', category: 'Other Types' },
    { path: ':theme/chart/trend-lines', component: TrendLineChartComponent, name: 'Trendlines', order: '06', category: 'Other Types' },
    {
        path: ':theme/chart/combination-series', component: CombinationSeriesChartComponent, name: 'Combination Series',
        order: '06', category: 'Other Types'
    },
    {
        path: ':theme/chart/pareto-series', component: ParetoSeriesChartComponent, name: 'Pareto Chart',
        order: '06', category: 'Other Types'
    },


    { path: ':theme/chart/adindicator', component: AccumulationDistributionComponent, name: 'Accumulation Distribution', order: '07', category: 'Technical Indicators' },
    { path: ':theme/chart/atrindicator', component: AtrIndicatorComponent, name: 'ATR', order: '07', category: 'Technical Indicators' },
    { path: ':theme/chart/bollinger', component: BollingerIndicatorComponent, name: 'Bollinger', order: '07', category: 'Technical Indicators' },
    { path: ':theme/chart/ema', component: EmaIndicatorComponent, name: 'EMA', order: '07', category: 'Technical Indicators' },
    { path: ':theme/chart/macd', component: MacdIndicatorComponent, name: 'MACD', order: '07', category: 'Technical Indicators' },
    { path: ':theme/chart/momentum', component: MomentumIndicatorComponent, name: 'Momentum', order: '07', category: 'Technical Indicators' },
    { path: ':theme/chart/rsi', component: RsiIndicatorComponent, name: 'RSI', order: '07', category: 'Technical Indicators' },
    { path: ':theme/chart/sma', component: SmaIndicatorComponent, name: 'SMA', order: '07', category: 'Technical Indicators' },
    { path: ':theme/chart/stochastic', component: StochasticIndicatorComponent, name: 'Stochastic', order: '07', category: 'Technical Indicators' },
    { path: ':theme/chart/tma', component: TmaIndicatorComponent, name: 'TMA', order: '07', category: 'Technical Indicators' },

    { path: ':theme/chart/performance', component: PerformanceChartComponent, name: 'Benchmark', order: '08', category: 'Performance' },


    { path: ':theme/chart/default-pie', component: DefaultPieComponent, name: 'Pie', order: '09', category: 'Accumulation Charts' },
    { path: ':theme/chart/doughnut', component: DoughnutComponent, name: 'Doughnut', order: '09', category: 'Accumulation Charts' },
    { path: ':theme/chart/pyramid', component: PyramidComponent, name: 'Pyramid', order: '09', category: 'Accumulation Charts' },
    { path: ':theme/chart/funnel', component: FunnelComponent, name: 'Funnel', order: '09', category: 'Accumulation Charts' },
    {
        path: ':theme/chart/default-doughnut', component: DefaultDoughnutComponent, name: 'Pie With Legend', order: '09', category: 'Accumulation Charts'
    },
    {
        path: ':theme/chart/semi-pie', component: SemiPieComponent, name: 'Semi Pie', order: '09', category: 'Accumulation Charts'
    },
    {
        path: ':theme/chart/smart-labels', component: SmartLabelsComponent, name: 'Smart Labels', order: '09', category: 'Accumulation Charts'
    },
    {
        path: ':theme/chart/drilldown-pie', component: DrilldownPieComponent, name: 'Drilldown', order: '09', category: 'Accumulation Charts'
    },
    {
        path: ':theme/chart/grouping', component: GroupingPieComponent, name: 'Grouping', order: '09', category: 'Accumulation Charts'
    }, {
        path: ':theme/chart/pie-empty-point', component: PieEmptyPointChartComponent, name: 'Empty Points', order: '09', category: 'Accumulation Charts'
    },


    { path: ':theme/chart/polar-line', component: PolarLineChartComponent, name: 'Line', order: '10', category: 'Polar Radar' },
    { path: ':theme/chart/polar-spline', component: PolarSplineChartComponent, name: 'Spline', order: '10', category: 'Polar Radar' },
    { path: ':theme/chart/polar-area', component: PolarAreaChartComponent, name: 'Area', order: '10', category: 'Polar Radar' },
    { path: ':theme/chart/polar-stackedarea', component: PolarStackedAreaChartComponent, name: 'Stacked Area', order: '10', category: 'Polar Radar' },
    { path: ':theme/chart/polar-scatter', component: PolarScatterChartComponent, name: 'Scatter', order: '10', category: 'Polar Radar' },
    { path: ':theme/chart/polar-column', component: PolarColumnChartComponent, name: 'Column', order: '10', category: 'Polar Radar' },
    { path: ':theme/chart/polar-stackedcolumn', component: PolarStackedColumnChartComponent, name: 'Wind Rose', order: '10', category: 'Polar Radar' },
    { path: ':theme/chart/polar-rangecolumn', component: PolarRangeColumnChartComponent, name: 'Range Column', order: '10', category: 'Polar Radar' },

    { path: ':theme/chart/local-data', component: LocalDataChartComponent, name: 'Local Data', order: '11', category: 'Data Binding' },
    { path: ':theme/chart/remote-data', component: RemoteDataChartComponent, name: 'Remote Data', order: '11', category: 'Data Binding' },

    { path: ':theme/chart/numeric-axis', component: NumericAxisChartComponent, name: 'Numeric Axis', order: '12', category: 'Chart Axes' },
    { path: ':theme/chart/datetime', component: DateTimeAxisChartComponent, name: 'DateTime Axis', order: '12', category: 'Chart Axes' },
    { path: ':theme/chart/category', component: CategoryChartComponent, name: 'Category Axis', order: '12', category: 'Chart Axes' },
    { path: ':theme/chart/datetime-category', component: DateTimeCategoryAxisChartComponent, name: 'DateTime Category Axis', order: '12', category: 'Chart Axes', type: 'new' },
    { path: ':theme/chart/indexed-axis', component: IndexedAxisChartComponent, name: 'Indexed Category Axis', order: '12', category: 'Chart Axes' },
    { path: ':theme/chart/logarithmic', component: LogarithmicAxisChartComponent, name: 'Log Axis', order: '12', category: 'Chart Axes' },
    { path: ':theme/chart/multiple-axes', component: MultipleAxesChartComponent, name: 'Multiple Axes', order: '12', category: 'Chart Axes' },
    { path: ':theme/chart/inversed', component: InversedAxisChartComponent, name: 'Inversed Axes', order: '12', category: 'Chart Axes' },
    { path: ':theme/chart/stripline', component: StripLineChartComponent, name: 'Strip Line', order: '12', category: 'Chart Axes' },
    { path: ':theme/chart/smart-axis-labels', component: SmartAxisLabelsChartComponent, name: 'Smart Labels', order: '12', category: 'Chart Axes',type: 'update' },
    { path: ':theme/chart/multi-level-label', component: MultiLevelLabelsChartComponent, name: 'Multi Level Labels', order: '12', category: 'Chart Axes', type: 'new' },
    { path: ':theme/chart/axis-crossing', component: AxisCrossingChartComponent, name: 'Axes Crossing', order: '12', category: 'Chart Axes', type: 'new' },

    { path: ':theme/chart/sorting', component: SortingChartComponent, name: 'Sorting', order: '13', category: 'Chart Customization', type: 'new' },
    { path: ':theme/chart/symbols', component: SymbolsChartComponent, name: 'Symbols', order: '13', category: 'Chart Customization' },
    { path: ':theme/chart/annotation', component: AnnotationChartComponent, name: 'Annotation', order: '13', category: 'Chart Customization' },
    { path: ':theme/chart/datalabel-template', component: DataLabelComponent, name: 'Datalabel Template', order: '13', category: 'Chart Customization' },
    { path: ':theme/chart/vertical-chart', component: VerticalChartComponent, name: 'Vertical Chart', order: '13', category: 'Chart Customization' },
    { path: ':theme/chart/empty-point', component: EmptyPointChartComponent, name: 'Empty Points', order: '13', category: 'Chart Customization' },

    { path: ':theme/chart/print', component: PrintChartComponent, name: 'Print', order: '14', category: 'Print and Export' },
    { path: ':theme/chart/export', component: ExportChartComponent, name: 'Export', order: '14', category: 'Print and Export' },

    { path: ':theme/chart/selection', component: SelectionChartComponent, name: 'Selection', order: '15', category: 'User Interaction' },
    { path: ':theme/chart/range-selection', component: RangeSelectionChartComponent, name: 'Range Selection', order: '15', category: 'User Interaction' },
    { path: ':theme/chart/crosshair', component: CrosshairChartComponent, name: 'Crosshair', order: '15', category: 'User Interaction' },
    { path: ':theme/chart/trackball', component: TrackBallChartComponent, name: 'TrackBall', order: '15', category: 'User Interaction' },
    { path: ':theme/chart/zooming', component: ZoomingChartComponent, name: 'Zooming and Panning', order: '15', category: 'User Interaction' },
];

export const chartRouter: ModuleWithProviders = RouterModule.forChild(chartAppRoutes);
let declarations: Type<Object>[] = [LineChartComponent, ColumnChartComponent, BarChartComponent, AreaChartComponent,
    SplineChartComponent, StackedColumnChartComponent, StackedBarChartComponent, StackedAreaChartComponent, StepLineChartComponent, StepAreaChartComponent,
    ScatterChartComponent, BubbleChartComponent, CombinationSeriesChartComponent, PerformanceChartComponent, NumericAxisChartComponent,
    CategoryChartComponent, LogarithmicAxisChartComponent, MultipleAxesChartComponent, SymbolsChartComponent, SelectionChartComponent,
    CrosshairChartComponent, TrackBallChartComponent, ZoomingChartComponent, LocalDataChartComponent, RemoteDataChartComponent,
    PercentStackedAreaChartComponent, PercentStackedBarChartComponent, PercentStackedColumnChartComponent, DefaultPieComponent,
    DateTimeAxisChartComponent, RangeColumnChartComponent, DefaultDoughnutComponent, SemiPieComponent, SmartLabelsComponent,
    DrilldownPieComponent, GroupingPieComponent, InversedAxisChartComponent, CandleChartComponent, HiloChartComponent,
    HiloOpenCloseChartComponent, PyramidComponent, FunnelComponent, WaterfallChartComponent, AccumulationDistributionComponent,
    AtrIndicatorComponent, MomentumIndicatorComponent, RsiIndicatorComponent, StochasticIndicatorComponent, MacdIndicatorComponent,
    TmaIndicatorComponent, SmaIndicatorComponent, EmaIndicatorComponent, BollingerIndicatorComponent, PolarAreaChartComponent, PolarColumnChartComponent, PolarLineChartComponent,
    PolarRangeColumnChartComponent, PolarScatterChartComponent, PolarSplineChartComponent, PolarStackedAreaChartComponent,
    PolarStackedColumnChartComponent, IndexedAxisChartComponent, VerticalChartComponent, AnnotationChartComponent, DataLabelComponent,
    StripLineChartComponent, EmptyPointChartComponent, PieEmptyPointChartComponent, PrintChartComponent, BoxandWhiskerChartComponent, RangeAreaComponent,
    SmartAxisLabelsChartComponent, ErrorBarChartComponent, TrendLineChartComponent, InversedSplineChartComponent, DashedLineChartComponent, EmptyAreaChartComponent,
    RoundedColumnChartComponent, TornadoChartComponent, PlacementColumnChartComponent, RangeBarChartComponent, ParetoSeriesChartComponent, DoughnutComponent,
    RangeSelectionChartComponent, ExportChartComponent, SplineAreaChartComponent, MultiLevelLabelsChartComponent, LineSegmentChartComponent,
    AxisCrossingChartComponent, AreaSegmentChartComponent, MultiLineChartComponent, DateTimeCategoryAxisChartComponent, SortingChartComponent];
@NgModule({
    imports: [chartRouter, ChartAllModule, SharedModule, ButtonModule, AccumulationChartAllModule, NumericTextBoxModule],
    exports: [],
    declarations: declarations,
    providers: [ChartAllModule, AccumulationChartAllModule]
})
export class ChartSampleModule {
}
