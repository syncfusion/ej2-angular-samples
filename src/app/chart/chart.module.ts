/**
 * Chart Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

import { LineChartComponent } from './line.component';
import { WithoutRiserChartComponent } from './step-without-riser.component';
import { SplineAreaChartComponent } from './spline-area.component';
import { AreaChartComponent } from './area.component';
import { BarChartComponent } from './bar.component';
import { RangeAreaComponent } from './range-area.component';
import { SplineRangeAreaComponent } from './spline-range-area.component';
import { RangeColumnChartComponent } from './range-column.component';
import { ColumnChartComponent } from './column.component';
import { HistogramChartComponent } from './histogram.component';
import { MultiSeriesChartComponent } from './multi-series-chart.component';
import { DateTimeAxisChartComponent } from './date-time.component';
import { LogarithmicScaleChartComponent } from './logarithmic-scale.component';
import { MultipleAxisChartComponent } from './multiple-axis.component';
import { NumericAxisChartComponent } from './numeric.component';
import { RemoteDataChartComponent } from './remote-data.component';
import { SplineChartComponent } from './spline.component';
import { StackedAreaChartComponent } from './stacked-area.component';
import { StackedStepAreaChartComponent } from './stacked-step-area.component';
import { CategoryChartComponent } from './category.component';
import { StackedBarChartComponent } from './stacked-bar.component';
import { StackedColumnChartComponent } from './stacked-column.component';
import { StepLineChartComponent } from './step-line.component';
import { StepAreaChartComponent } from './step-area.component';
import { MarkerChartComponent } from './marker-chart.component';
import { ScatterPlotChartComponent } from './scatter-plot.component';
import { BubbleChartComponent } from './bubble.component';
import { TrackBallChartComponent } from './trackball.component';
import { CrosshairChartComponent } from './cross-hair.component';
import { LocalDataChartComponent } from './local-data.component';
import { SelectionChartComponent } from './selection.component';
import { PerformanceChartComponent } from './chart-performance.component';
import { ZoomingChartComponent } from './zooming.component';
import { LazyLoadingComponent } from './lazy-loading.component';
import { PercentStackedColumnChartComponent } from './stacked-column-percent.component';
import { PercentStackedBarChartComponent } from './stacked-bar-percent.component';
import { PercentStackedAreaChartComponent } from './stacked-area-percent.component';
import { DefaultPieComponent } from './default-pie.component';
import { PieRadiusComponent} from './pie-radius.component';
import { DefaultDonutComponent } from './pie-legend.component';
import { PyramidComponent } from './pyramid.component';
import { FunnelComponent } from './funnel.component';
import { WaterfallChartComponent } from './waterfall.component';
import { HorizontalWaterfallChartComponent } from './horizontal-waterfall.component';
import { SemiPieComponent } from './semi-pie.component';
import { SmartLabelsComponent } from './smart-labels.component';
import { DrilldownPieComponent } from './drill-down-pie.component';
import { GroupingPieComponent } from './grouping.component';
import { CornerRadiusComponent } from './rounded-corner.component';
import { PieWithPatternsComponent } from './pie-with-patterns.component';
import { UpdatePieDataSourceComponent } from './live-update.component';
import { InversedAxisChartComponent } from './inversed.component';

import { CandleStickChartComponent } from './candle-stick.component';
import { HiloChartComponent } from './hilo.component';
import { HiloOpenCloseChartComponent } from './hilo-open-close.component';
import { AccumulationDistributionComponent } from './accumulation-distribution-indicator.component';
import { AtrIndicatorComponent } from './average-true-range-indicator.component';
import { MomentumIndicatorComponent } from './momentum.component';
import { RsiIndicatorComponent } from './relative-strength-index-indicator.component';
import { StochasticIndicatorComponent } from './stochastic.component';
import { MacdIndicatorComponent } from './moving-average-convergence-divergence-indicator.component';
import { EmaIndicatorComponent } from './exponential-moving-average-indicator.component';
import { SmaIndicatorComponent } from './simple-moving-average-indicator.component';
import { TmaIndicatorComponent } from './triangular-moving-average-indicator.component';
import { BollingerIndicatorComponent } from './bollinger.component';
import { PolarAreaChartComponent } from './polar-area.component';
import { PolarLineChartComponent } from './polar-line.component';
import { PolarColumnChartComponent } from './polar-column.component';
import { PolarRangeColumnChartComponent } from './polar-range-column.component';
import { PolarScatterChartComponent } from './polar-scatter.component';
import { PolarSplineChartComponent } from './polar-spline.component';
import { PolarStackedAreaChartComponent } from './polar-stacking-area.component';
import { PolarStackedColumnChartComponent } from './polar-stacking-column.component';
import { IndexedAxisChartComponent } from './indexed-axis.component';
import { VerticalChartComponent } from './vertical.component';
import { AnnotationChartComponent } from './pie-annotation.component';
import { RTLChartComponent } from './rtl.component';
import { GroupedColumnChartComponent } from './grouped-column.component';
import { DataLabelComponent } from './data-label-template.component';
import { BoxandWhiskerChartComponent } from './box-and-whisker.component';
import { StripLineRecurrenceChartComponent } from './strip-line-recurrence.component';
import { StripLineChartComponent } from './strip-line.component';
import { PieEmptyPointChartComponent } from './pie-empty-point.component';
import { EmptyPointChartComponent } from './empty-point.component';
import { PrintChartComponent } from './print.component';
import { SmartAxisLabelsChartComponent } from './smart-axis-labels.component';
import { ErrorBarChartComponent } from './error-bar.component';
import { TrendLineChartComponent } from './trend-lines.component';
import { InversedSplineChartComponent } from './spline-inversed.component';
import { DashedLineChartComponent } from './dashed-line.component';
import { EmptyAreaChartComponent } from './area-empty.component';
import { RoundedColumnChartComponent } from './rounded-column.component';
import { PlacementColumnChartComponent } from './column-placement.component';
import { TornadoChartComponent } from './negative-stack.component';
import { RangeBarChartComponent } from './range-bar.component';
import { ParetoSeriesChartComponent } from './pare-to.component';
import { DonutComponent } from './donut.component';
import { RangeSelectionChartComponent } from './range-selection.component';
import { ExportChartComponent } from './export.component';
import { MultiLevelLabelsChartComponent } from './multi-level-label.component';
import { LineSegmentChartComponent } from './line-segments.component';
import { AxisCrossingChartComponent } from './axes-crossing.component';
import { MultiLineChartComponent } from './line-multi-color.component';
import { AreaSegmentChartComponent } from './area-segments.component';
import { DateTimeCategoryAxisChartComponent } from './date-time-category.component';
import { SortingChartComponent } from './sorting.component';
import { StackedLineChartComponent } from './stacked-line.component';
import { PercentStackedLineChartComponent } from './stacked-line-percent.component';
import { DataEditingComponent } from './data-editing.component';
import { TooltipTemplateComponent } from './tooltip-template.component';
import { RangeColorMappingComponent } from './range-color-mapping.component';
import { KeyboardComponent } from './keyboard.component';
import { OverViewChartComponent } from './overview-chart.component';
import { AreaNegativePointsComponent } from './area-negative-points.component';
import { RangeStepAreaComponent } from './range-step-area.component';
import { CylindricalColumnChartComponent } from './cylindrical-column.component';
import { SynchronizedChartsComponent } from './synchronized-chart.component';
import { UpdateSplineComponent } from './update-spline.component';
import { LiveStockDataComponent } from './live-stock-data.component';
import { UpdateDataSourceComponent } from './update-data-source.component';
import { ClickAddPointComponent } from './click-add-point.component';
import {  LiveDataSortingComponent } from './live-data-sorting.component';
import { CustomAnimationComponent } from './custom-animation.component';
import { ColumnDrilldownComponent } from './column-drilldown.component';
import { SeriesAnimationComponent } from './series-animation.component';
import { PaginationComponent } from './pagination.component';

export const chartAppRoutes: Object[] = [
    { path: ':theme/chart/overview-chart', component: OverViewChartComponent, name: 'Overview', description: "This demo for overview of Essential<sup>®</sup> JS2 Chart for data about the annual, monthly and product wise sales with different types of charts.",
 order: '01', category: 'Charts' },
 
    { path: ':theme/chart/line', component: LineChartComponent, type: 'update', name: 'Line', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the line series.",
 order: '02', category: 'Line Charts' },
    { path: ':theme/chart/spline', component: SplineChartComponent, type: 'update', name: 'Spline', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the spline series.", order: '02', category: 'Line Charts' },
    { path: ':theme/chart/step-line', component: StepLineChartComponent, name: 'Step Line', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the step line series.", order: '02', category: 'Line Charts' },
    { path: ':theme/chart/dashed-line', component: DashedLineChartComponent, name: 'Dashed Line', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the dashed line series.", order: '02', category: 'Line Charts' },
    { path: ':theme/chart/custom-animation', component: CustomAnimationComponent, name: 'Custom Animation', description: "This demo sample for Essential<sup>®</sup> JavaScript2 Chart control demonstrates how to render and configure the spline series with delay animation.", order: '02', category: 'Line Charts' },
    { path: ':theme/chart/spline-inversed', component: InversedSplineChartComponent, name: 'Inversed Spline', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the inversed line series.", order: '02', category: 'Line Charts' },
    { path: ':theme/chart/line-segments', component: LineSegmentChartComponent, name: 'Line Zone', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the points in a particular range using MultiColoredLine series.", order: '02', category: 'Line Charts' },
    { path: ':theme/chart/line-multi-color', component: MultiLineChartComponent, name: 'Multi Colored Line', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the multi colored line series.", order: '02', category: 'Line Charts' },
    { path: ':theme/chart/stacked-line', component: StackedLineChartComponent, name: 'Stacked Line', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the stacking line series.", order: '02', category: 'Line Charts' },
    { path: ':theme/chart/stacked-line-percent', component: PercentStackedLineChartComponent, name: '100% Stacked Line', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the 100 percent stacking line series.", order: '02', category: 'Line Charts' },

    { path: ':theme/chart/area', component: AreaChartComponent, name: 'Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the area series.", order: '03', category: 'Area Charts' },
    { path: ':theme/chart/spline-area', component: SplineAreaChartComponent, name: 'Spline Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the spline area series.", order: '03', category: 'Area Charts' },
    { path: ':theme/chart/step-area', component: StepAreaChartComponent, name: 'Step Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the step area series.", order: '03', category: 'Area Charts' },
    { path: ':theme/chart/step-without-riser', component: WithoutRiserChartComponent, name: 'Step Without Riser', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the step area chart without the vertical risers.", order: '03', category: 'Area Charts' },
    { path: ':theme/chart/range-step-area', component: RangeStepAreaComponent, name: 'Range Step Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the range step area series.", order: '03', category: 'Area Charts' },
    { path: ':theme/chart/range-area', component: RangeAreaComponent, name: 'Range Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the range area series.", order: '03', category: 'Area Charts' },
    { path: ':theme/chart/spline-range-area', component: SplineRangeAreaComponent, name: 'Spline Range Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the spline range area series.", order: '03', category: 'Area Charts' },
    { path: ':theme/chart/stacked-area', component: StackedAreaChartComponent, name: 'Stacked Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the stacking area series.", order: '03', category: 'Area Charts' },
    { path: ':theme/chart/stacked-step-area', component: StackedStepAreaChartComponent, name: 'Stacked Step Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the stacking step area series.", order: '03', category: 'Area Charts'},
    { path: ':theme/chart/stacked-area-percent', component: PercentStackedAreaChartComponent, name: '100% Stacked Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the 100 percent stacking area series.", order: '03', category: 'Area Charts' },
    { path: ':theme/chart/area-empty', component: EmptyAreaChartComponent, name: 'Area - Empty Points', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the area series with empty points.", order: '03', category: 'Area Charts' },
    { path: ':theme/chart/area-negative-points', component: AreaNegativePointsComponent, name: 'Area - Negative Points', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the area series with negative points.", order: '03', category: 'Area Charts'},
    { path: ':theme/chart/area-segments', component: AreaSegmentChartComponent, name: 'Area Zone', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the points in a particular range using MultiColoredArea series.", order: '03', category: 'Area Charts' },

    { path: ':theme/chart/column', component: ColumnChartComponent, name: 'Column', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the column series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/grouped-column', component: GroupedColumnChartComponent, name: 'Grouped Column', description: "This demo sample for Essential<sup>®</sup> JavaScript2 Chart control demonstrates how to render and configure the grouping in column series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/column-placement', component: PlacementColumnChartComponent, name: 'Back to Back Column', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the column charts.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/column-drilldown', component: ColumnDrilldownComponent, name: 'Column Drilldown', description: "This demo sample for Essential<sup>®</sup> JavaScript2 Chart control demonstrates how to render and configure the column series with drilldown.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/range-column', component: RangeColumnChartComponent, name: 'Range Column', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the range column series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/range-bar', component: RangeBarChartComponent, name: 'Inversed Range Column', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the inversed range column series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/cylindrical-column', component: CylindricalColumnChartComponent, name: 'Cylindrical Column', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the cylindrical column series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/bar', component: BarChartComponent, name: 'Bar', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render bar series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/rounded-column', component: RoundedColumnChartComponent, name: 'Rounded Bar',description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the rounded bar series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/stacked-column', component: StackedColumnChartComponent, type: 'update', name: 'Stacked Column', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the stacking column series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/stacked-column-percent', component: PercentStackedColumnChartComponent, name: '100% Stacked Column', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the 100 percent stacking column series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/stacked-bar', component: StackedBarChartComponent, name: 'Stacked Bar', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the stacking bar series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/stacked-bar-percent', component: PercentStackedBarChartComponent, name: '100% Stacked Bar', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the 100 percent stacking bar series.", order: '04', category: 'Bar Charts' },
    { path: ':theme/chart/negative-stack', component: TornadoChartComponent, name: 'Negative Stack', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the bar charts.", order: '04', category: 'Bar Charts' },


    { path: ':theme/chart/hilo', component: HiloChartComponent, name: 'Hilo', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the hilo series.", order: '05', category: 'Stock Charts' },
    { path: ':theme/chart/hilo-open-close', component: HiloOpenCloseChartComponent, description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the hilo open close series.", name: 'Hilo Open Close', order: '05', category: 'Stock Charts' },
    { path: ':theme/chart/candle-stick', component: CandleStickChartComponent, name: 'Candle Stick', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the candle series.", order: '05', category: 'Stock Charts' },


    { path: ':theme/chart/scatter-plot', component: ScatterPlotChartComponent, name: 'Scatter Plot', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the scatter series.", order: '06', category: 'Scatter and Bubble' },
    { path: ':theme/chart/bubble', component: BubbleChartComponent, name: 'Bubble', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the bubble series.", order: '06', category: 'Scatter and Bubble' },


    { path: ':theme/chart/default-pie', component: DefaultPieComponent, name: 'Pie', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the pie charts.", order: '07', category: 'Accumulation Charts' },
    { path: ':theme/chart/pie-radius', component: PieRadiusComponent, name: 'Pie with Various Radius', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the pie chart with different radius.", order: '07', category: 'Accumulation Charts' },
    { path: ':theme/chart/donut', component: DonutComponent, name: 'Donut', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the doughnut charts.", order: '07', category: 'Accumulation Charts' },
    { path: ':theme/chart/pyramid', component: PyramidComponent, name: 'Pyramid', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the pyramid charts.", order: '07', category: 'Accumulation Charts' },
    { path: ':theme/chart/funnel', component: FunnelComponent, type: 'update', name: 'Funnel', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the funnel charts.", order: '07', category: 'Accumulation Charts' },
    {
        path: ':theme/chart/pie-legend', component: DefaultDonutComponent, name: 'Pie with Legend', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the legends in pie charts.", order: '07', category: 'Accumulation Charts'
    },
    {
        path: ':theme/chart/semi-pie', component: SemiPieComponent, name: 'Semi Pie', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render semi-pie and doughnut charts.", order: '07', category: 'Accumulation Charts'
    },
    {
        path: ':theme/chart/smart-labels', component: SmartLabelsComponent, name: 'Smart Labels', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to arrange the labels smartly without overlapping with each other.", order: '07', category: 'Accumulation Charts'
    },
    {
        path: ':theme/chart/drill-down-pie', component: DrilldownPieComponent, name: 'Drilldown', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to achieve the drill-down concept using pie charts.", order: '07', category: 'Accumulation Charts'
    },
    {
        path: ':theme/chart/grouping', component: GroupingPieComponent, name: 'Grouping', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to group points in pie charts.", order: '07', category: 'Accumulation Charts'
    }, {
        path: ':theme/chart/pie-empty-point', component: PieEmptyPointChartComponent, name: 'Empty Points', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the empty points.", order: '07', category: 'Accumulation Charts'
    },{
        path: ':theme/chart/rounded-corner', component: CornerRadiusComponent, name: 'Rounded Corner', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the pie charts with conrer radius.", order: '07', category: 'Accumulation Charts'
    },{
        path: ':theme/chart/pie-with-patterns', component: PieWithPatternsComponent, name: 'Pie with Pattern', description: "This demo sample for Essential<sup>®</sup> JavaScript2 Chart control demonstrates how to render and configure the pie chart with patterns.", order: '07', category: 'Accumulation Charts'
    },
    {
        path: ':theme/chart/live-update', component: UpdatePieDataSourceComponent, name: 'Live Update', description: "This demo for Essential<sup>®</sup> JavaScript2 Chart control shows the real time charts.", order: '07', category: 'Accumulation Charts'
    },

    { path: ':theme/chart/waterfall', component: WaterfallChartComponent, name: 'Waterfall', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the waterfall series.", order: '08', category: 'Other Types' },
    { path: ':theme/chart/horizontal-waterfall', component: HorizontalWaterfallChartComponent, name: 'Horizontal Waterfall', description: "This demo sample for Essential<sup>®</sup> JavaScript2 Chart control demonstrates how to render and configure the horizontal waterfall series.", order: '08', category: 'Other Types' },
    { path: ':theme/chart/histogram', component: HistogramChartComponent, name: 'Histogram', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the histogram series.", order: '08', category: 'Other Types' },
    { path: ':theme/chart/box-and-whisker', component: BoxandWhiskerChartComponent, name: 'Box and Whisker', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the box and whisker series.", order: '08', category: 'Other Types' },
    { path: ':theme/chart/error-bar', component: ErrorBarChartComponent, name: 'Error Bar', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the error bars in charts.", order: '08', category: 'Other Types' },
    { path: ':theme/chart/trend-lines', component: TrendLineChartComponent, name: 'Trendlines', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the trend lines in charts.", order: '08', category: 'Other Types' },
    {
        path: ':theme/chart/multi-series-chart', component: MultiSeriesChartComponent, name: 'Multi Series Chart', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to combine different types of charts.",
        order: '08', category: 'Other Types'
    },
    {
        path: ':theme/chart/pare-to', component: ParetoSeriesChartComponent, name: 'Pareto Chart', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render pareto charts.",
        order: '08', category: 'Other Types'
    },


    { path: ':theme/chart/accumulation-distribution-indicator', component: AccumulationDistributionComponent, name: 'Accumulation Distribution', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the accumulation distribution indicator.", order: '09', category: 'Technical Indicators' },
    { path: ':theme/chart/average-true-range-indicator', component: AtrIndicatorComponent, name: 'ATR', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the average true range indicator.", order: '09', category: 'Technical Indicators' },
    { path: ':theme/chart/bollinger', component: BollingerIndicatorComponent, name: 'Bollinger', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the bollinger band type indicator.", order: '09', category: 'Technical Indicators' },
    { path: ':theme/chart/exponential-moving-average-indicator', component: EmaIndicatorComponent, name: 'EMA', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the exponential moving average indicator.", order: '09', category: 'Technical Indicators' },
    { path: ':theme/chart/moving-average-convergence-divergence-indicator', component: MacdIndicatorComponent, name: 'MACD', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the moving average convergence divergence indicator.", order: '09', category: 'Technical Indicators' },
    { path: ':theme/chart/momentum', component: MomentumIndicatorComponent, name: 'Momentum', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the momentum indicator.", order: '09', category: 'Technical Indicators' },
    { path: ':theme/chart/relative-strength-index-indicator', component: RsiIndicatorComponent, name: 'RSI', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the relative strength index indicator.", order: '09', category: 'Technical Indicators' },
    { path: ':theme/chart/simple-moving-average-indicator', component: SmaIndicatorComponent, name: 'SMA', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the simple moving average indicator.", order: '09', category: 'Technical Indicators' },
    { path: ':theme/chart/stochastic', component: StochasticIndicatorComponent, name: 'Stochastic', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the stochastic indicator.", order: '09', category: 'Technical Indicators' },
    { path: ':theme/chart/triangular-moving-average-indicator', component: TmaIndicatorComponent, name: 'TMA', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the triangular moving average indicator.", order: '09', category: 'Technical Indicators' },

    { path: ':theme/chart/chart-performance', component: PerformanceChartComponent, name: 'Chart Performance', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows the performance when plotting large volumes of data and handling high frequency real-time data.", order: '10', category: 'Benchmark' },

    { path: ':theme/chart/update-spline', component: UpdateSplineComponent, name: 'Spline updating each second', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows the real time charts", order: '17', category: 'Real-time Charts' },
    { path: ':theme/chart/live-stock-data', component: LiveStockDataComponent, name: 'Live stock data', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows the real time charts", order: '17', category: 'Real-time Charts' },
    { path: ':theme/chart/update-data-source', component: UpdateDataSourceComponent, name: 'Update data source', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows the real time charts", order: '17', category: 'Real-time Charts' },
    { path: ':theme/chart/click-add-point', component: ClickAddPointComponent, name: 'Click to add a point', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows the real time charts", order: '17', category: 'Real-time Charts' },
    { path: ':theme/chart/live-data-sorting', component: LiveDataSortingComponent, name: 'Live Data Sorting', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows the real time charts", order: '17', category: 'Real-time Charts' },

    { path: ':theme/chart/polar-line', component: PolarLineChartComponent, name: 'Line', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render line in polar and radar charts.", order: '11', category: 'Polar Radar' },
    { path: ':theme/chart/polar-spline', component: PolarSplineChartComponent, name: 'Spline', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render spline in polar and radar charts.", order: '11', category: 'Polar Radar' },
    { path: ':theme/chart/polar-area', component: PolarAreaChartComponent, name: 'Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render area in polar and radar charts.", order: '11', category: 'Polar Radar' },
    { path: ':theme/chart/polar-stacking-area', component: PolarStackedAreaChartComponent, name: 'Stacked Area', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render stacking area in polar and radar charts.", order: '11', category: 'Polar Radar' },
    { path: ':theme/chart/polar-scatter', component: PolarScatterChartComponent, name: 'Scatter', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render scatter in polar and radar charts.", order: '11', category: 'Polar Radar' },
    { path: ':theme/chart/polar-column', component: PolarColumnChartComponent, name: 'Column', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render column in polar and radar charts.", order: '11', category: 'Polar Radar' },
    { path: ':theme/chart/polar-stacking-column', component: PolarStackedColumnChartComponent, name: 'Wind Rose', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render wind rose using stacking column in polar and radar charts.", order: '11', category: 'Polar Radar' },
    { path: ':theme/chart/polar-range-column', component: PolarRangeColumnChartComponent, name: 'Range Column', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render range column in polar and radar charts.", order: '11', category: 'Polar Radar' },

    { path: ':theme/chart/local-data', component: LocalDataChartComponent, name: 'Local Data', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to bind JSON data to chart.", order: '12', category: 'Data Binding' },
    { path: ':theme/chart/remote-data', component: RemoteDataChartComponent, name: 'Remote Data', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to consume data from remote data service.", order: '12', category: 'Data Binding' },
    { path: ':theme/chart/lazy-loading', component: LazyLoadingComponent, name: 'Lazy Loading', description: "This demo for Essential<sup>®</sup> JS2 Chart control demonstrates the Lazy Loading behavior in chart.", order: '12', category: 'Data Binding' },

    { path: ':theme/chart/numeric', component: NumericAxisChartComponent, name: 'Numeric Axis', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to plot numeric data with the help of numeric axis in charts.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/date-time', component: DateTimeAxisChartComponent, name: 'DateTime Axis', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the date-time axis in charts.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/category', component: CategoryChartComponent, name: 'Category Axis', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the category axis in charts.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/date-time-category', component: DateTimeCategoryAxisChartComponent, name: 'DateTime Category Axis', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the date-time category axis in charts.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/indexed-axis', component: IndexedAxisChartComponent, name: 'Indexed Category Axis', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the indexed category axis in charts.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/logarithmic-scale', component: LogarithmicScaleChartComponent, name: 'Logarithmic Scale', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the logarithmic axis in charts.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/multiple-axis', component: MultipleAxisChartComponent, name: 'Multiple Axis', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the mulitple axis in charts.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/inversed', component: InversedAxisChartComponent, name: 'Inversed Axes', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to invert the axis in charts.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/strip-line', component: StripLineChartComponent, name: 'Stripline', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the strip lines in charts.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/strip-line-recurrence', component: StripLineRecurrenceChartComponent, name: 'Strip Line Recurrence', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the strip line recurrence in charts.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/smart-axis-labels', component: SmartAxisLabelsChartComponent, name: 'Smart Labels', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to arrange the labels smartly without overlapping with each other.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/multi-level-label', component: MultiLevelLabelsChartComponent, name: 'Multi Level Labels', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to group the axis labels.", order: '13', category: 'Chart Axes' },
    { path: ':theme/chart/axes-crossing', component: AxisCrossingChartComponent, name: 'Axes Crossing', description: "This demo for Essential<sup>®</sup> JS2 Chart control demonstrates the axis crossing behavior in chart.", order: '13', category: 'Chart Axes' },

    { path: ':theme/chart/sorting', component: SortingChartComponent, name: 'Sorting', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to sort the series data in chart.", order: '14', category: 'Chart Customization' },
    { path: ':theme/chart/marker-chart', component: MarkerChartComponent, name: 'Marker Chart', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the marker symbols for data points.", order: '14', category: 'Chart Customization' },
    { path: ':theme/chart/pie-annotation', component: AnnotationChartComponent, name: 'Annotation', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to add more information to the chart using annotation.", order: '14', category: 'Chart Customization' },
    { path: ':theme/chart/synchronized-chart', component: SynchronizedChartsComponent, name: 'Synchronized Charts', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render the Synchronized Charts.", order: '14', category: 'Chart Customization' },
    { path: ':theme/chart/rtl', component: RTLChartComponent, name: 'RTL', description: "This demo sample for Essential<sup>®</sup> JavaScript2 Chart control demonstrates how to render and configure the RTL feature in chart.", order: '14', category: 'Chart Customization' },
    { path: ':theme/chart/data-label-template', component: DataLabelComponent, name: 'Datalabel Template', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the data label template.", order: '14', category: 'Chart Customization' },
    { path: ':theme/chart/tooltip-template', component: TooltipTemplateComponent, name: 'Tooltip Template', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the tooltip template.", order: '14', category: 'Chart Customization' },
    { path: ':theme/chart/vertical', component: VerticalChartComponent, name: 'Vertical Chart', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the vertical type charts.", order: '14', category: 'Chart Customization' },
    { path: ':theme/chart/empty-point', component: EmptyPointChartComponent, name: 'Empty Points', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the empty points.", order: '14', category: 'Chart Customization'},
    { path: ':theme/chart/range-color-mapping', component: RangeColorMappingComponent, name: 'Range Color Mapping', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure the range color mapping.", order: '14', category: 'Chart Customization'},
    { path: ':theme/chart/series-animation', component: SeriesAnimationComponent, type: 'new', name: 'Animation', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to render and configure series animation.", order: '14', category: 'Chart Customization'},

    { path: ':theme/chart/print', component: PrintChartComponent, name: 'Print', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to print the charts.", order: '15', category: 'Print and Export' },
    { path: ':theme/chart/export', component: ExportChartComponent, name: 'Export', description: "This demo for Essential<sup>®</sup> JS2 Chart control shows how to export the charts to Excel, PDF, and image formats such as SVG, JPEG, and PNG at client-side.", order: '15', category: 'Print and Export' },

    { path: ':theme/chart/selection', component: SelectionChartComponent, name: 'Selection', description: "This demo for Essential<sup>®</sup> JS2 Chart control demonstrates the selection behavior in chart.", order: '16', category: 'User Interaction' },
    { path: ':theme/chart/range-selection', component: RangeSelectionChartComponent, name: 'Range Selection', description: "This demo for Essential<sup>®</sup> JS2 Chart control demonstrates the range selection in chart.", order: '16', category: 'User Interaction' },
    { path: ':theme/chart/keyboard', component: KeyboardComponent, name: 'Keyboard Navigation', description: "This demo for Essential<sup>®</sup> JS2 Chart control demonstrates the Keyboard Navigation in chart.", order: '16', category: 'User Interaction'},
    { path: ':theme/chart/cross-hair', component: CrosshairChartComponent, name: 'Crosshair', description: "This demo for Essential<sup>®</sup> JS2 Chart control demonstrates the crosshair behavior in chart.", order: '16', category: 'User Interaction' },
    { path: ':theme/chart/trackball', component: TrackBallChartComponent, name: 'TrackBall', description: "This demo for Essential<sup>®</sup> JS2 Chart control demonstrates the trackball behavior in chart.", order: '16', category: 'User Interaction' },
    { path: ':theme/chart/zooming', component: ZoomingChartComponent, type: 'update', name: 'Zooming and Panning', description: "This demo for Essential<sup>®</sup> JS2 Chart control demonstrates the zooming and panning behavior in chart.", order: '16', category: 'User Interaction' },
    { path: ':theme/chart/pagination', component: PaginationComponent, type: 'new', name: 'Pagination', description: "This demo for Essential<sup>®</sup> JS2 Chart control demonstrates the pagination behavior in chart.", order: '16', category: 'User Interaction' },
    { path: ':theme/chart/data-editing', component: DataEditingComponent, name: 'Data Editing', description: "This demo for Essential<sup>®</sup> JS2 Chart control demonstrates the data editing behavior in chart.", order: '16', category: 'User Interaction' },
];

export const ChartSampleModule: ModuleWithProviders<any> = RouterModule.forChild(chartAppRoutes);

