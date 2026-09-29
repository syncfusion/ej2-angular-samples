/**
 * Chart configuration passed as the `props` of a `chart-tool` block
 * in the AI AssistView response.
 */
export interface ChartPropsSchema {
  chartType: 'cartesian' | 'circular';
  title: string;
  showLegend?: boolean;
  sideBySidePlacement?: boolean;
  xAxis?: AxisPropsSchema[];
  yAxis?: AxisPropsSchema[];
  series: SeriesPropsSchema[];
  tooltip?: TooltipPropsSchema;
  crosshair?: CrosshairPropsSchema;
  zoomSettings?: ZoomSettingsPropsSchema;
  selectionMode?: SelectionModeSchema;
  highlightMode?: HighlightModeSchema;
  annotations?: AnnotationPropsSchema[];
  indicators?: IndicatorPropsSchema[];
  legendSettings?: LegendSettingsPropsSchema;
  chartArea?: ChartAreaPropsSchema;
  palettes?: string[];
}

export interface AxisPropsSchema {
  type: AxisTypeSchema;
  title?: string;
  labelRotation?: number;
  min?: number | string;
  max?: number | string;
  interval?: number;
  labelFormat?: string;
  opposedPosition?: boolean;
  isInversed?: boolean;
  edgeLabelPlacement?: EdgeLabelPlacementSchema;
  labelIntersectAction?: LabelIntersectActionSchema;
  majorGridLines?: LinePropsSchema;
  minorGridLines?: LinePropsSchema;
  majorTickLines?: TickLinePropsSchema;
  minorTickLines?: TickLinePropsSchema;
  lineStyle?: LinePropsSchema;
  crosshairTooltip?: CrosshairTooltipPropsSchema;
  stripLines?: StripLinePropsSchema[];
}

export interface ChartDataPointSchema {
  xvalue: string | number;
  yvalue?: number | number[];
  high?: number;
  low?: number;
  open?: number;
  close?: number;
  volume?: number;
  size?: number;
  minimum?: number;
  maximum?: number;
}

export interface SeriesPropsSchema {
  type: SeriesTypeSchema;
  name: string;
  dataSource: ChartDataPointSchema[];
  high?: string;
  low?: string;
  open?: string;
  close?: string;
  volume?: string;
  size?: string;
  min?: string;
  max?: string;
  tooltip?: boolean;
  fill?: string;
  width?: number;
  opacity?: number;
  dashArray?: string;
  innerRadius?: string;
  radius?: string;
  pointColorMapping?: string;
  marker?: MarkerPropsSchema;
  dataLabel?: DataLabelPropsSchema;
  errorBar?: ErrorBarPropsSchema;
  trendlines?: TrendlinePropsSchema[];
  animation?: AnimationPropsSchema;
}

export interface TooltipPropsSchema {
  enable?: boolean;
  shared?: boolean;
  enableMarker?: boolean;
  format?: string;
  header?: string;
  opacity?: number;
}

export interface CrosshairPropsSchema {
  enable?: boolean;
  lineType?: 'Both' | 'Vertical' | 'Horizontal';
  line?: LinePropsSchema;
}

export interface ZoomSettingsPropsSchema {
  enableSelectionZooming?: boolean;
  enableMouseWheelZooming?: boolean;
  enablePinchZooming?: boolean;
  enablePan?: boolean;
  enableScrollbar?: boolean;
  mode?: 'X' | 'Y' | 'XY';
}

export interface AnnotationPropsSchema {
  content: string;
  coordinateUnits?: 'Point' | 'Pixel';
  region?: 'Chart' | 'Series';
  x: string | number;
  y: string | number;
}

export interface IndicatorPropsSchema {
  type: IndicatorTypeSchema;
  seriesName: string;
  xName?: 'xvalue';
  close?: string;
  high?: string;
  low?: string;
  open?: string;
  volume?: string;
  period?: number;
  fill?: string;
  width?: number;
}

export interface StripLinePropsSchema {
  start: string | number;
  size: number;
  color?: string;
  opacity?: number;
  visible?: boolean;
  zIndex?: 'Behind' | 'Over';
  text?: string;
  horizontalAlignment?: 'Start' | 'Middle' | 'End';
  verticalAlignment?: 'Start' | 'Middle' | 'End';
  textStyle?: FontPropsSchema;
}

export interface MarkerPropsSchema {
  visible?: boolean;
  width?: number;
  height?: number;
  shape?: string;
  isFilled?: boolean;
  fill?: string;
  border?: BorderPropsSchema;
  dataLabel?: DataLabelPropsSchema;
}

export interface DataLabelPropsSchema {
  visible?: boolean;
  name?: string;
  position?: string;
  format?: string;
  fill?: string;
  opacity?: number;
  border?: BorderPropsSchema;
  font?: FontPropsSchema;
}

export interface ErrorBarPropsSchema {
  visible?: boolean;
  type?: string;
  direction?: string;
  mode?: string;
  verticalError?: number;
  horizontalError?: number;
  verticalPositiveError?: number;
  verticalNegativeError?: number;
  horizontalPositiveError?: number;
  horizontalNegativeError?: number;
  color?: string;
  width?: number;
}

export interface TrendlinePropsSchema {
  type?: string;
  name?: string;
  period?: number;
  polynomialOrder?: number;
  forwardForecast?: number;
  backwardForecast?: number;
  intercept?: number;
  fill?: string;
  width?: number;
  dashArray?: string;
}

export interface AnimationPropsSchema {
  enable?: boolean;
  duration?: number;
  delay?: number;
}

export interface LegendSettingsPropsSchema {
  visible?: boolean;
  position?: 'Auto' | 'Top' | 'Left' | 'Bottom' | 'Right' | 'Custom';
  alignment?: 'Near' | 'Center' | 'Far';
  background?: string;
  opacity?: number;
  toggleVisibility?: boolean;
  enableHighlight?: boolean;
  textStyle?: FontPropsSchema;
  border?: BorderPropsSchema;
}

export interface ChartAreaPropsSchema {
  background?: string;
  opacity?: number;
  border?: BorderPropsSchema;
}

export interface CrosshairTooltipPropsSchema {
  enable?: boolean;
  fill?: string;
  textStyle?: FontPropsSchema;
}

export interface LinePropsSchema {
  color?: string;
  width?: number;
  dashArray?: string;
}

export interface TickLinePropsSchema extends LinePropsSchema {
  height?: number;
}

export interface BorderPropsSchema {
  color?: string;
  width?: number;
}

export interface FontPropsSchema {
  color?: string;
  size?: string;
  fontFamily?: string;
  fontStyle?: string;
  fontWeight?: string;
  opacity?: number;
  textAlignment?: string;
  textOverflow?: string;
}

export type AxisTypeSchema = 'category' | 'numerical' | 'datetime' | 'datetimecategory' | 'logarithmic';
export type SelectionModeSchema = 'None' | 'Point' | 'Series' | 'Cluster' | 'DragXY' | 'DragX' | 'DragY';
export type HighlightModeSchema = 'None' | 'Point' | 'Series' | 'Cluster';
export type EdgeLabelPlacementSchema = 'None' | 'Hide' | 'Shift';
export type LabelIntersectActionSchema = 'None' | 'Hide' | 'Trim' | 'Wrap' | 'MultipleRows' | 'Rotate45' | 'Rotate90';
export type IndicatorTypeSchema =
  'Ema' | 'Rsi' | 'BollingerBands' | 'Tma' | 'Momentum' | 'Sma' | 'Atr' |
  'AccumulationDistribution' | 'Macd' | 'Stochastic';
export type CartesianSeriesTypeSchema =
  'line' | 'column' | 'bar' | 'area' | 'spline' | 'stepline' | 'steparea' | 'splinearea' |
  'multicoloredline' | 'multicoloredarea' | 'rangecolumn' | 'rangearea' | 'splinerangearea' |
  'hilo' | 'hiloopenclose' | 'candle' | 'boxandwhisker' | 'bubble' | 'scatter' |
  'stackingcolumn' | 'stackingcolumn100' | 'stackingbar' | 'stackingbar100' |
  'stackingarea' | 'stackingarea100' | 'stackingline' | 'stackingline100' |
  'stackingsteparea' | 'pareto' | 'polar' | 'radar' | 'waterfall' | 'histogram';
export type CircularSeriesTypeSchema = 'pie' | 'doughnut' | 'funnel' | 'pyramid';
export type SeriesTypeSchema = CartesianSeriesTypeSchema | CircularSeriesTypeSchema;

const axisTypeValues: AxisTypeSchema[] = ['category', 'numerical', 'datetime', 'datetimecategory', 'logarithmic'];
const cartesianSeriesTypeValues: CartesianSeriesTypeSchema[] = [
  'line', 'column', 'bar', 'area', 'spline', 'stepline', 'steparea', 'splinearea',
  'multicoloredline', 'multicoloredarea', 'rangecolumn', 'rangearea', 'splinerangearea',
  'hilo', 'hiloopenclose', 'candle', 'boxandwhisker', 'bubble', 'scatter',
  'stackingcolumn', 'stackingcolumn100', 'stackingbar', 'stackingbar100',
  'stackingarea', 'stackingarea100', 'stackingline', 'stackingline100',
  'stackingsteparea', 'pareto', 'polar', 'radar', 'waterfall', 'histogram'
];
const circularSeriesTypeValues: CircularSeriesTypeSchema[] = ['pie', 'doughnut', 'funnel', 'pyramid'];
const indicatorTypeValues: IndicatorTypeSchema[] = [
  'Ema', 'Rsi', 'BollingerBands', 'Tma', 'Momentum', 'Sma', 'Atr',
  'AccumulationDistribution', 'Macd', 'Stochastic'
];

const numericPropertySchema: Record<string, unknown> = { type: 'number' };
const nonNegativeNumberSchema: Record<string, unknown> = { type: 'number', minimum: 0 };
const opacitySchema: Record<string, unknown> = { type: 'number', minimum: 0, maximum: 1 };
const borderSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    color: { type: 'string' },
    width: nonNegativeNumberSchema
  },
  additionalProperties: false
};
const fontSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    color: { type: 'string' },
    size: { type: 'string' },
    fontFamily: { type: 'string' },
    fontStyle: { type: 'string' },
    fontWeight: { type: 'string' },
    opacity: opacitySchema,
    textAlignment: { type: 'string' },
    textOverflow: { type: 'string' }
  },
  additionalProperties: false
};
const lineSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    color: { type: 'string' },
    width: nonNegativeNumberSchema,
    dashArray: { type: 'string' }
  },
  additionalProperties: false
};
const tickLineSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    color: { type: 'string' },
    width: nonNegativeNumberSchema,
    height: nonNegativeNumberSchema
  },
  additionalProperties: false
};
const dataLabelSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    visible: { type: 'boolean' },
    name: { type: 'string' },
    position: { type: 'string' },
    format: { type: 'string' },
    fill: { type: 'string' },
    opacity: opacitySchema,
    border: borderSchema,
    font: fontSchema
  },
  additionalProperties: false
};
const dataPointSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    xvalue: { anyOf: [{ type: 'string' }, { type: 'number' }] },
    yvalue: {
      anyOf: [
        { type: 'number' },
        { type: 'array', minItems: 1, items: { type: 'number' } }
      ]
    },
    high: numericPropertySchema,
    low: numericPropertySchema,
    open: numericPropertySchema,
    close: numericPropertySchema,
    volume: numericPropertySchema,
    size: numericPropertySchema,
    minimum: numericPropertySchema,
    maximum: numericPropertySchema
  },
  required: ['xvalue'],
  additionalProperties: false
};
const stripLineSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    start: { anyOf: [{ type: 'string' }, { type: 'number' }] },
    size: { type: 'number', exclusiveMinimum: 0 },
    color: { type: 'string' },
    opacity: opacitySchema,
    visible: { type: 'boolean' },
    zIndex: { type: 'string', enum: ['Behind', 'Over'] },
    text: { type: 'string', minLength: 1, maxLength: 200 },
    horizontalAlignment: { type: 'string', enum: ['Start', 'Middle', 'End'] },
    verticalAlignment: { type: 'string', enum: ['Start', 'Middle', 'End'] },
    textStyle: fontSchema
  },
  required: ['start', 'size'],
  additionalProperties: false
};
const axisSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: axisTypeValues },
    title: { type: 'string', minLength: 1 },
    labelRotation: { type: 'number' },
    min: { anyOf: [{ type: 'number' }, { type: 'string' }] },
    max: { anyOf: [{ type: 'number' }, { type: 'string' }] },
    interval: { type: 'number', exclusiveMinimum: 0 },
    labelFormat: { type: 'string' },
    opposedPosition: { type: 'boolean' },
    isInversed: { type: 'boolean' },
    edgeLabelPlacement: { type: 'string', enum: ['None', 'Hide', 'Shift'] },
    labelIntersectAction: {
      type: 'string',
      enum: ['None', 'Hide', 'Trim', 'Wrap', 'MultipleRows', 'Rotate45', 'Rotate90']
    },
    majorGridLines: lineSchema,
    minorGridLines: lineSchema,
    majorTickLines: tickLineSchema,
    minorTickLines: tickLineSchema,
    lineStyle: lineSchema,
    crosshairTooltip: {
      type: 'object',
      properties: {
        enable: { type: 'boolean' },
        fill: { type: 'string' },
        textStyle: fontSchema
      },
      additionalProperties: false
    },
    stripLines: { type: 'array', items: stripLineSchema }
  },
  required: ['type', 'title'],
  additionalProperties: false
};
const markerSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    visible: { type: 'boolean' },
    width: nonNegativeNumberSchema,
    height: nonNegativeNumberSchema,
    shape: { type: 'string' },
    isFilled: { type: 'boolean' },
    fill: { type: 'string' },
    border: borderSchema,
    dataLabel: dataLabelSchema
  },
  additionalProperties: false
};
const errorBarSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    visible: { type: 'boolean' },
    type: { type: 'string' },
    direction: { type: 'string' },
    mode: { type: 'string' },
    verticalError: nonNegativeNumberSchema,
    horizontalError: nonNegativeNumberSchema,
    verticalPositiveError: nonNegativeNumberSchema,
    verticalNegativeError: nonNegativeNumberSchema,
    horizontalPositiveError: nonNegativeNumberSchema,
    horizontalNegativeError: nonNegativeNumberSchema,
    color: { type: 'string' },
    width: nonNegativeNumberSchema
  },
  additionalProperties: false
};
const trendlineSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    type: { type: 'string' },
    name: { type: 'string' },
    period: { type: 'number', minimum: 1 },
    polynomialOrder: { type: 'number', minimum: 2 },
    forwardForecast: nonNegativeNumberSchema,
    backwardForecast: nonNegativeNumberSchema,
    intercept: numericPropertySchema,
    fill: { type: 'string' },
    width: nonNegativeNumberSchema,
    dashArray: { type: 'string' }
  },
  additionalProperties: false
};
const animationSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    enable: { type: 'boolean' },
    duration: nonNegativeNumberSchema,
    delay: nonNegativeNumberSchema
  },
  additionalProperties: false
};
const seriesSchema = (seriesTypes: readonly SeriesTypeSchema[]): Record<string, unknown> => ({
  type: 'object',
  properties: {
    type: { type: 'string', enum: seriesTypes },
    name: { type: 'string', minLength: 1 },
    dataSource: { type: 'array', minItems: 1, items: dataPointSchema },
    high: { type: 'string' },
    low: { type: 'string' },
    open: { type: 'string' },
    close: { type: 'string' },
    volume: { type: 'string' },
    size: { type: 'string' },
    min: { type: 'string' },
    max: { type: 'string' },
    tooltip: { type: 'boolean' },
    fill: { type: 'string' },
    width: nonNegativeNumberSchema,
    opacity: opacitySchema,
    dashArray: { type: 'string' },
    innerRadius: { type: 'string' },
    radius: { type: 'string' },
    pointColorMapping: { type: 'string' },
    marker: markerSchema,
    dataLabel: dataLabelSchema,
    errorBar: errorBarSchema,
    trendlines: { type: 'array', items: trendlineSchema },
    animation: animationSchema
  },
  required: ['type', 'name', 'dataSource'],
  additionalProperties: false
});
const tooltipSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    enable: { type: 'boolean' },
    shared: { type: 'boolean' },
    enableMarker: { type: 'boolean' },
    format: { type: 'string' },
    header: { type: 'string' },
    opacity: opacitySchema
  },
  additionalProperties: false
};
const crosshairSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    enable: { type: 'boolean' },
    lineType: { type: 'string', enum: ['Both', 'Vertical', 'Horizontal'] },
    line: lineSchema
  },
  additionalProperties: false
};
const zoomSettingsSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    enableSelectionZooming: { type: 'boolean' },
    enableMouseWheelZooming: { type: 'boolean' },
    enablePinchZooming: { type: 'boolean' },
    enablePan: { type: 'boolean' },
    enableScrollbar: { type: 'boolean' },
    mode: { type: 'string', enum: ['X', 'Y', 'XY'] }
  },
  additionalProperties: false
};
const annotationSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    content: { type: 'string', minLength: 1, maxLength: 200 },
    coordinateUnits: { type: 'string', enum: ['Point', 'Pixel'] },
    region: { type: 'string', enum: ['Chart', 'Series'] },
    x: { anyOf: [{ type: 'string' }, { type: 'number' }] },
    y: { anyOf: [{ type: 'string' }, { type: 'number' }] }
  },
  required: ['content', 'x', 'y'],
  additionalProperties: false
};
const indicatorSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: indicatorTypeValues },
    seriesName: { type: 'string', minLength: 1 },
    xName: { type: 'string', const: 'xvalue' },
    close: { type: 'string' },
    high: { type: 'string' },
    low: { type: 'string' },
    open: { type: 'string' },
    volume: { type: 'string' },
    period: { type: 'number', minimum: 1 },
    fill: { type: 'string' },
    width: nonNegativeNumberSchema
  },
  required: ['type', 'seriesName'],
  additionalProperties: false
};
const legendSettingsSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    visible: { type: 'boolean' },
    position: { type: 'string', enum: ['Auto', 'Top', 'Left', 'Bottom', 'Right', 'Custom'] },
    alignment: { type: 'string', enum: ['Near', 'Center', 'Far'] },
    background: { type: 'string' },
    opacity: opacitySchema,
    toggleVisibility: { type: 'boolean' },
    enableHighlight: { type: 'boolean' },
    textStyle: fontSchema,
    border: borderSchema
  },
  additionalProperties: false
};
const chartAreaSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    background: { type: 'string' },
    opacity: opacitySchema,
    border: borderSchema
  },
  additionalProperties: false
};
const commonChartProperties: Record<string, unknown> = {
  title: { type: 'string', minLength: 1 },
  showLegend: { type: 'boolean' },
  series: { type: 'array', minItems: 1 },
  tooltip: tooltipSchema,
  selectionMode: {
    type: 'string',
    enum: ['None', 'Point', 'Series', 'Cluster', 'DragXY', 'DragX', 'DragY']
  },
  highlightMode: { type: 'string', enum: ['None', 'Point', 'Series', 'Cluster'] },
  annotations: { type: 'array', items: annotationSchema },
  legendSettings: legendSettingsSchema,
  chartArea: chartAreaSchema,
  palettes: { type: 'array', minItems: 1, items: { type: 'string' } }
};
const cartesianChartPropsSchema: Record<string, unknown> = {
  type: 'object',
  description: 'Complete Cartesian chart configuration required by the Angular chart preview.',
  properties: {
    ...commonChartProperties,
    chartType: { type: 'string', const: 'cartesian' },
    sideBySidePlacement: { type: 'boolean' },
    xAxis: { type: 'array', minItems: 1, items: axisSchema },
    yAxis: { type: 'array', minItems: 1, items: axisSchema },
    series: { type: 'array', minItems: 1, items: seriesSchema(cartesianSeriesTypeValues) },
    crosshair: crosshairSchema,
    zoomSettings: zoomSettingsSchema,
    indicators: { type: 'array', items: indicatorSchema }
  },
  required: ['chartType', 'title', 'xAxis', 'yAxis', 'series'],
  additionalProperties: false
};
const circularChartPropsSchema: Record<string, unknown> = {
  type: 'object',
  description: 'Complete circular chart configuration required by the Angular accumulation chart preview.',
  properties: {
    ...commonChartProperties,
    chartType: { type: 'string', const: 'circular' },
    series: { type: 'array', minItems: 1, items: seriesSchema(circularSeriesTypeValues) }
  },
  required: ['chartType', 'title', 'series'],
  additionalProperties: false
};
const textBlockSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    blockType: { type: 'string', const: 'text' },
    content: { type: 'string', minLength: 1 }
  },
  required: ['blockType', 'content'],
  additionalProperties: false
};
const chartToolBlockSchema = (componentType: 'chart' | 'accumulationchart'): Record<string, unknown> => ({
  type: 'object',
  properties: {
    blockType: { type: 'string', const: 'tool' },
    toolName: { type: 'string', const: 'chart-tool' },
    props: componentType === 'accumulationchart' ? circularChartPropsSchema : cartesianChartPropsSchema
  },
  required: ['blockType', 'toolName', 'props'],
  additionalProperties: false
});

/**
 * JSON schema describing the AI AssistView block envelope used by the
 * generative Angular chart sample. Chart-producing responses contain exactly
 * one nonempty text block followed by one `chart-tool` block.
 *
 * This schema uses the JSON Schema 2020-12 `prefixItems` keyword to enforce
 * block order. If the configured AI provider accepts only an older schema
 * dialect, adapt this tuple to that provider's supported positional syntax.
 */
export const generateChartSchema = (componentType: 'chart' | 'accumulationchart'): Record<string, unknown> => ({
  title: componentType === 'accumulationchart'
    ? 'Syncfusion AI AssistView Circular Chart Tool Response'
    : 'Syncfusion AI AssistView Cartesian Chart Tool Response',
  type: 'object',
  properties: {
    blocks: {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      prefixItems: [
        textBlockSchema,
        chartToolBlockSchema(componentType)
      ],
      items: false
    }
  },
  required: ['blocks'],
  additionalProperties: false
});
