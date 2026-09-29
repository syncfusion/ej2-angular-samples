/**
 * Comprehensive API mapping for Syncfusion EJ2 Chart components
 * This file contains all public properties, methods, and events for chart components
 */

// Chart Properties
export interface ChartProperties {
  // Primary properties
  title: string;
  width: string | number;
  height: string | number;
  theme: string;
  enableCanvas: boolean;
  enableExport: boolean;
  enablePersistence: boolean;
  enableRtl: boolean;
  enableSideBySidePlacement: boolean;
  isTransposed: boolean;
  locale: string;
  useGrouping: boolean;
  
  // Axis properties
  primaryXAxis: AxisProperties;
  primaryYAxis: AxisProperties;
  axes: AxisProperties[];
  
  // Series properties
  series: SeriesProperties[];
  
  // Legend properties
  legendSettings: LegendProperties;
  showLegend: boolean;
  
  // Tooltip properties
  tooltip: TooltipProperties;
  
  // Crosshair properties
  crosshair: CrosshairProperties;
  
  // Zoom properties
  zoomSettings: ZoomProperties;
  
  // Selection properties
  selectionMode: string;
  highlightMode: string;
  
  // Annotations
  annotations: AnnotationProperties[];
  
  // Indicators
  indicators: IndicatorProperties[];
  
  // Chart area
  chartArea: ChartAreaProperties;
  
  // Palettes
  palettes: string[];
}

// Axis Properties
export interface AxisProperties {
  // Basic properties
  name: string;
  title: string;
  valueType: string;
  labelFormat: string;
  labelStyle: LabelStyleProperties;
  labelRotation: number;
  labelIntersectAction: string;
  labelPlacement: string;
  opposedPosition: boolean;
  isInversed: boolean;
  edgeLabelPlacement: string;
  labelPosition: string;
  tickPosition: string;
  tickLinesPosition: string;
  disableScrollbar: boolean;
  
  // Range properties
  minimum: number | Date | string;
  maximum: number | Date | string;
  interval: number;
  intervalType: string;
  rangePadding: string;
  startFromZero: boolean;
  
  // Style properties
  majorGridLines: GridLineProperties;
  minorGridLines: GridLineProperties;
  majorTickLines: TickLineProperties;
  minorTickLines: TickLineProperties;
  lineStyle: LineStyleProperties;
  
  // Strip lines
  stripLines: StripLineProperties[];
  
  // Multi level labels
  multiLevelLabels: MultiLevelLabelProperties[];
  
  // Scrollbar
  scrollbarSettings: ScrollbarSettingsProperties;
  
  // Zoom factor and position
  zoomFactor: number;
  zoomPosition: number;
  
  // Visible range
  visibleRange: VisibleRangeProperties;
  
  // Border
  border: BorderProperties;
  
  // Font
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  textAlignment: string;
}

// Label Style Properties
export interface LabelStyleProperties {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  textAlignment: string;
  textOverflow: string;
  visible: boolean;
}

// Grid Line Properties
export interface GridLineProperties {
  width: number;
  color: string;
  dashArray: string;
  opacity: number;
}

// Tick Line Properties
export interface TickLineProperties {
  width: number;
  color: string;
  dashArray: string;
  opacity: number;
  size: number;
}

// Line Style Properties
export interface LineStyleProperties {
  width: number;
  color: string;
  dashArray: string;
  opacity: number;
}

// Strip Line Properties
export interface StripLineProperties {
  start: number | Date;
  end: number | Date;
  size: number;
  color: string;
  opacity: number;
  visible: boolean;
  zIndex: string;
  text: string;
  textAlign: string;
  font: FontProperties;
  border: BorderProperties;
  rotation: number;
  offset: number | Date;
  repeatEvery: number;
  repeatUntil: number | Date;
  isSegmented: boolean;
  segmentStart: number | Date;
  segmentEnd: number | Date;
  borderCap: string;
}

// Multi Level Label Properties
export interface MultiLevelLabelProperties {
  level: number;
  textStyle: TextStyleProperties;
  border: BorderProperties;
  categories: MultiLevelCategories[];
}

// Multi Level Categories
export interface MultiLevelCategories {
  start: number | Date | string;
  end: number | Date | string;
  text: string;
  maximumTextWidth: number;
}

// Scrollbar Settings Properties
export interface ScrollbarSettingsProperties {
  enableZoom: boolean;
  enableScroll: boolean;
  height: number;
  width: number;
  color: string;
  borderColor: string;
  borderWidth: number;
  thumbColor: string;
  thumbBorderColor: string;
  thumbBorderWidth: number;
  thumbRadius: number;
  trackColor: string;
  trackBorderColor: string;
  trackBorderWidth: number;
  trackRadius: number;
  buttonColor: string;
  buttonBorderColor: string;
  buttonBorderWidth: number;
  buttonRadius: number;
  position: string;
  visible: boolean;
}

// Visible Range Properties
export interface VisibleRangeProperties {
  minimum: number | Date | string;
  maximum: number | Date | string;
  interval: number;
}

// Border Properties
export interface BorderProperties {
  color: string;
  width: number;
}

// Font Properties
export interface FontProperties {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  opacity: number;
}

// Text Style Properties
export interface TextStyleProperties {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  textAlignment: string;
  textOverflow: string;
}

// Series Properties
export interface SeriesProperties {
  // Basic properties
  name: string;
  type: string;
  dataSource: any[];
  xName: string;
  yName: string;
  
  // Value mapping properties
  high: string;
  low: string;
  open: string;
  close: string;
  volume: string;
  size: string;
  min: string;
  max: string;
  
  // Appearance properties
  fill: string;
  width: number;
  opacity: number;
  dashArray: string;
  border: BorderProperties;
  
  // Marker properties
  marker: MarkerProperties;
  
  // Data label properties
  dataLabel: DataLabelProperties;
  
  // Error bar properties
  errorBar: ErrorBarProperties;
  
  // Trendlines properties
  trendlines: TrendlineProperties[];
  
  // Animation properties
  animation: AnimationProperties;
  
  // Tooltip properties
  tooltip: TooltipProperties;
  
  // Visibility properties
  visible: boolean;
  
  // Radius properties
  innerRadius: string;
  radius: string;
  
  // Point color mapping
  pointColorMapping: string;
  
  // Group name
  groupName: string;
  
  // Empty point settings
  emptyPointSettings: EmptyPointSettingsProperties;
  
  // Corner radius
  borderRadius: BorderRadiusProperties;
  
  // Segment axis
  segmentAxisName: string;
  
  // Cardinality
  cardinality: string;
}

// Marker Properties
export interface MarkerProperties {
  visible: boolean;
  shape: string;
  width: number;
  height: number;
  imageUrl: string;
  fill: string;
  opacity: number;
  border: BorderProperties;
  isFilled: boolean;
  dataLabel: DataLabelProperties;
}

// Data Label Properties
export interface DataLabelProperties {
  visible: boolean;
  name: string;
  font: FontProperties;
  position: string;
  alignment: string;
  margin: MarginProperties;
  opacity: number;
  textMapping: string;
  fill: string;
  border: BorderProperties;
  rx: number;
  ry: number;
  template: string;
  textAlign: string;
  angle: number;
  enableRotation: boolean;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
}

// Error Bar Properties
export interface ErrorBarProperties {
  visible: boolean;
  type: string;
  mode: string;
  direction: string;
  verticalError: number;
  horizontalError: number;
  verticalPositiveError: number;
  verticalNegativeError: number;
  horizontalPositiveError: number;
  horizontalNegativeError: number;
  fill: string;
  width: number;
  opacity: number;
  border: BorderProperties;
  cap: CapProperties;
}

// Cap Properties
export interface CapProperties {
  length: number;
  width: number;
}

// Trendline Properties
export interface TrendlineProperties {
  type: string;
  name: string;
  fill: string;
  width: number;
  opacity: number;
  dashArray: string;
  period: number;
  animation: AnimationProperties;
  legendShape: string;
  marker: MarkerProperties;
  intercept: number;
  forwardForecast: number;
  backwardForecast: number;
  polynomialOrder: number;
  visible: boolean;
}

// Animation Properties
export interface AnimationProperties {
  enable: boolean;
  delay: number;
  duration: number;
}

// Tooltip Properties
export interface TooltipProperties {
  enable: boolean;
  shared: boolean;
  fill: string;
  header: string;
  format: string;
  template: string;
  opacity: number;
  textStyle: TextStyleProperties;
  border: BorderProperties;
  rx: number;
  ry: number;
  enableMarker: boolean;
  marker: MarkerProperties;
}

// Empty Point Settings Properties
export interface EmptyPointSettingsProperties {
  fill: string;
  mode: string;
  border: BorderProperties;
}

// Border Radius Properties
export interface BorderRadiusProperties {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
}

// Margin Properties
export interface MarginProperties {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// Legend Properties
export interface LegendProperties {
  visible: boolean;
  position: string;
  alignment: string;
  height: string;
  width: string;
  orientation: string;
  rowCount: number;
  columnCount: number;
  textWrap: boolean;
  maxWidth: number;
  maxHeight: number;
  padding: number;
  margin: MarginProperties;
  opacity: number;
  shape: string;
  shapeHeight: number;
  shapePadding: number;
  shapeWidth: number;
  location: LocationProperties;
  showMarker: boolean;
  textStyle: TextStyleProperties;
  title: string;
  titlePosition: string;
  titleTextStyle: TextStyleProperties;
  border: BorderProperties;
  background: string;
  opacity: number;
  toggleVisibility: boolean;
  paging: boolean;
  pageAlignment: string;
  heightAdjustment: string;
}

// Location Properties
export interface LocationProperties {
  x: string | number;
  y: string | number;
}

// Crosshair Properties
export interface CrosshairProperties {
  enable: boolean;
  lineType: string;
  line: LineProperties;
  fill: string;
  opacity: number;
  shared: boolean;
  border: BorderProperties;
}

// Line Properties
export interface LineProperties {
  color: string;
  width: number;
  dashArray: string;
  opacity: number;
}

// Zoom Properties
export interface ZoomProperties {
  enableSelectionZooming: boolean;
  enableMouseWheelZooming: boolean;
  enablePinchZooming: boolean;
  enablePan: boolean;
  enableScrollbar: boolean;
  mode: string;
  toolbarItems: string[];
}

// Annotation Properties
export interface AnnotationProperties {
  content: string;
  x: string | number | Date;
  y: string | number;
  coordinateUnits: string;
  region: string;
  clipBounds: boolean;
  verticalAlignment: string;
  horizontalAlignment: string;
  margin: MarginProperties;
  zIndex: string;
}

// Indicator Properties
export interface IndicatorProperties {
  type: string;
  seriesName: string;
  xName: string;
  close: string;
  high: string;
  low: string;
  open: string;
  volume: string;
  period: number;
  fill: string;
  width: number;
  dashArray: string;
  opacity: number;
  animation: AnimationProperties;
  upperLine: LineProperties;
  lowerLine: LineProperties;
  periodLine: LineProperties;
  macdLine: LineProperties;
  signalLine: LineProperties;
  histogram: HistogramProperties;
  showZones: boolean;
  overBought: number;
  overSold: number;
  bandMultiplier: number;
  standardDeviations: number;
  momentumPeriod: number;
  pointColor: string;
  xAxisName: string;
  yAxisName: string;
}

// Histogram Properties
export interface HistogramProperties {
  fill: string;
  width: number;
  opacity: number;
  border: BorderProperties;
}

// Chart Area Properties
export interface ChartAreaProperties {
  border: BorderProperties;
  background: string;
  opacity: number;
  margin: MarginProperties;
}

// Chart Methods
export interface ChartMethods {
  // Data methods
  addSeries: (series: SeriesProperties) => void;
  removeSeries: (index: number) => void;
  addPoint: (seriesIndex: number, point: any) => void;
  removePoint: (seriesIndex: number, pointIndex: number) => void;
  updatePoint: (seriesIndex: number, pointIndex: number, point: any) => void;
  
  // Axis methods
  addAxis: (axis: AxisProperties) => void;
  removeAxis: (name: string) => void;
  updateAxis: (name: string, axis: AxisProperties) => void;
  
  // Annotation methods
  addAnnotation: (annotation: AnnotationProperties) => void;
  removeAnnotation: (id: string) => void;
  
  // Export methods
  export: (type: string, fileName: string) => void;
  print: () => void;
  
  // Refresh methods
  refresh: () => void;
  refreshChart: () => void;
  
  // Selection methods
  select: (seriesIndex: number, pointIndex: number) => void;
  clearSelection: () => void;
  
  // Zoom methods
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  
  // Tooltip methods
  showTooltip: (seriesIndex: number, pointIndex: number) => void;
  hideTooltip: () => void;
  
  // Legend methods
  toggleSeriesVisibility: (seriesIndex: number) => void;
  
  // Animation methods
  animate: () => void;
  
  // Size methods
  resize: () => void;
  
  // Data methods
  setDataSource: (dataSource: any[]) => void;
  setSeriesData: (seriesIndex: number, dataSource: any[]) => void;
}

// Chart Events
export interface ChartEvents {
  // Load events
  loaded: (args: any) => void;
  load: (args: any) => void;
  
  // Render events
  rendered: (args: any) => void;
  pointRender: (args: any) => void;
  seriesRender: (args: any) => void;
  axisLabelRender: (args: any) => void;
  axisRangeCalculated: (args: any) => void;
  axisMultiLevelLabelRender: (args: any) => void;
  
  // Interaction events
  pointClick: (args: any) => void;
  pointMove: (args: any) => void;
  chartMouseMove: (args: any) => void;
  chartMouseUp: (args: any) => void;
  chartMouseDown: (args: any) => void;
  chartDoubleClick: (args: any) => void;
  
  // Selection events
  pointSelected: (args: any) => void;
  selectionComplete: (args: any) => void;
  
  // Zoom events
  zoomComplete: (args: any) => void;
  
  // Tooltip events
  tooltipRender: (args: any) => void;
  
  // Legend events
  legendRender: (args: any) => void;
  legendClick: (args: any) => void;
  
  // Animation events
  animationComplete: (args: any) => void;
  
  // Print events
  beforePrint: (args: any) => void;
  
  // Resize events
  resized: (args: any) => void;
  
  // Scroll events
  scrollChanged: (args: any) => void;
  scrollStart: (args: any) => void;
  scrollEnd: (args: any) => void;
  
  // Drag events
  dragStart: (args: any) => void;
  drag: (args: any) => void;
  dragEnd: (args: any) => void;
  
  // Data events
  dataLabelRender: (args: any) => void;
  textRender: (args: any) => void;
  
  // Export events
  beforeExport: (args: any) => void;
  afterExport: (args: any) => void;
  
  // Annotation events
  annotationRender: (args: any) => void;
  
  // Axis events
  axisLabelClick: (args: any) => void;
  
  // Error bar events
  errorBarRender: (args: any) => void;
  
  // Trendline events
  trendlineRender: (args: any) => void;
}

// Accumulation Chart Properties
export interface AccumulationChartProperties {
  // Basic properties
  title: string;
  width: string | number;
  height: string | number;
  theme: string;
  enableCanvas: boolean;
  enableExport: boolean;
  enablePersistence: boolean;
  enableRtl: boolean;
  locale: string;
  
  // Series properties
  series: AccumulationSeriesProperties[];
  
  // Legend properties
  legendSettings: LegendProperties;
  showLegend: boolean;
  
  // Tooltip properties
  tooltip: TooltipProperties;
  
  // Annotations
  annotations: AnnotationProperties[];
  
  // Center position
  center: CenterPositionProperties;
  
  // Palettes
  palettes: string[];
}

// Accumulation Series Properties
export interface AccumulationSeriesProperties {
  // Basic properties
  name: string;
  type: string;
  dataSource: any[];
  xName: string;
  yName: string;
  
  // Appearance properties
  fill: string;
  opacity: number;
  border: BorderProperties;
  
  // Data label properties
  dataLabel: DataLabelProperties;
  
  // Animation properties
  animation: AnimationProperties;
  
  // Tooltip properties
  tooltip: TooltipProperties;
  
  // Visibility properties
  visible: boolean;
  
  // Radius properties
  innerRadius: string;
  radius: string;
  
  // Point color mapping
  pointColorMapping: string;
  
  // Group name
  groupName: string;
  
  // Empty point settings
  emptyPointSettings: EmptyPointSettingsProperties;
  
  // Explode settings
  explode: boolean;
  explodeOffset: string;
  explodeIndex: number;
  explodeAll: boolean;
  
  // Start angle and end angle
  startAngle: number;
  endAngle: number;
  
  // Group to
  groupTo: number;
  
  // Connector line
  connectorLine: ConnectorLineProperties;
  
  // Enable rotation
  enableRotation: boolean;
  
  // Selection settings
  selectionStyle: string;
}

// Center Position Properties
export interface CenterPositionProperties {
  x: string | number;
  y: string | number;
}

// Connector Line Properties
export interface ConnectorLineProperties {
  type: string;
  color: string;
  width: number;
  dashArray: string;
  length: string;
  border: BorderProperties;
}

// Accumulation Chart Methods
export interface AccumulationChartMethods {
  // Data methods
  addPoints: (points: any[]) => void;
  removePoints: (pointIndexes: number[]) => void;
  updatePoint: (pointIndex: number, point: any) => void;
  
  // Annotation methods
  addAnnotation: (annotation: AnnotationProperties) => void;
  removeAnnotation: (id: string) => void;
  
  // Export methods
  export: (type: string, fileName: string) => void;
  print: () => void;
  
  // Refresh methods
  refresh: () => void;
  refreshChart: () => void;
  
  // Selection methods
  select: (pointIndex: number) => void;
  clearSelection: () => void;
  
  // Animation methods
  animate: () => void;
  
  // Size methods
  resize: () => void;
  
  // Explode methods
  explodePoint: (pointIndex: number) => void;
  unexplodeAll: () => void;
  
  // Data methods
  setDataSource: (dataSource: any[]) => void;
}

// Accumulation Chart Events
export interface AccumulationChartEvents {
  // Load events
  loaded: (args: any) => void;
  load: (args: any) => void;
  
  // Render events
  rendered: (args: any) => void;
  pointRender: (args: any) => void;
  seriesRender: (args: any) => void;
  
  // Interaction events
  pointClick: (args: any) => void;
  pointMove: (args: any) => void;
  chartMouseMove: (args: any) => void;
  chartMouseUp: (args: any) => void;
  chartMouseDown: (args: any) => void;
  chartDoubleClick: (args: any) => void;
  
  // Selection events
  pointSelected: (args: any) => void;
  selectionComplete: (args: any) => void;
  
  // Tooltip events
  tooltipRender: (args: any) => void;
  
  // Legend events
  legendRender: (args: any) => void;
  legendClick: (args: any) => void;
  
  // Animation events
  animationComplete: (args: any) => void;
  
  // Print events
  beforePrint: (args: any) => void;
  
  // Resize events
  resized: (args: any) => void;
  
  // Data events
  dataLabelRender: (args: any) => void;
  textRender: (args: any) => void;
  
  // Export events
  beforeExport: (args: any) => void;
  afterExport: (args: any) => void;
  
  // Annotation events
  annotationRender: (args: any) => void;
  
  // Drill events
  drillDown: (args: any) => void;
  drillUp: (args: any) => void;
}