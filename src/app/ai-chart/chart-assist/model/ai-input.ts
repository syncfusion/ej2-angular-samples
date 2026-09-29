import { serverAIRequest } from '../backend/ai-service';
import { chartSystemPrompt } from './prompt-data';
import { generateChartSchema } from './sf-ai-schema';

export type AxisType = 'category' | 'numerical' | 'datetime' | 'datetimecategory' | 'logarithmic';
export type ChartRequestType = 'create' | 'modify' | 'code' | 'analysis';
export type SeriesType =
    'line' | 'column' | 'bar' | 'area' | 'spline' | 'stepline' | 'steparea' | 'splinearea' |
    'multicoloredline' | 'multicoloredarea' | 'rangecolumn' | 'rangearea' | 'splinerangearea' |
    'hilo' | 'hiloopenclose' | 'candle' | 'boxandwhisker' | 'bubble' | 'scatter' |
    'stackingcolumn' | 'stackingcolumn100' | 'stackingbar' | 'stackingbar100' |
    'stackingarea' | 'stackingarea100' | 'stackingline' | 'stackingline100' |
    'stackingsteparea' | 'pareto' | 'polar' | 'radar' | 'waterfall' | 'histogram' |
    'pie' | 'doughnut' | 'funnel' | 'pyramid';

export interface ChartDataPoint extends Record<string, unknown> {
    xvalue: string | number | Date;
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

export interface AxisConfig extends Record<string, unknown> {
    type: AxisType;
    title?: string;
    labelRotation?: number;
    min?: number | string;
    max?: number | string;
    interval?: number;
    labelFormat?: string;
    stripLines?: Record<string, unknown>[];
}

export interface SeriesConfig extends Record<string, unknown> {
    type: SeriesType;
    name: string;
    dataSource: ChartDataPoint[];
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
    marker?: Record<string, unknown>;
    dataLabel?: Record<string, unknown>;
    errorBar?: Record<string, unknown>;
    trendlines?: Record<string, unknown>[];
    animation?: Record<string, unknown>;
}

export interface ChartConfig extends Record<string, unknown> {
    chartType: 'cartesian' | 'circular';
    title?: string;
    showLegend?: boolean;
    sideBySidePlacement?: boolean;
    xAxis?: AxisConfig[];
    yAxis?: AxisConfig[];
    series: SeriesConfig[];
    tooltip?: Record<string, unknown>;
    crosshair?: Record<string, unknown>;
    zoomSettings?: Record<string, unknown>;
    selectionMode?: string;
    highlightMode?: string;
    annotations?: Record<string, unknown>[];
    indicators?: Record<string, unknown>[];
    legendSettings?: Record<string, unknown>;
    chartArea?: Record<string, unknown>;
    palettes?: string[];
}

export interface ChartChange {
    property: string;
    previousValue: string;
    updatedValue: string;
}

export interface ChartResponse {
    CHART?: boolean;
    Text?: string;
    Code?: string;
    ChangedCode?: string;
    CodeTitle?: string;
    CodeDescription?: string;
    ShowCode?: boolean;
    ChangeSummary?: string[];
    ChartConfig?: ChartConfig;
}

const CIRCULAR_TYPES: SeriesType[] = ['pie', 'doughnut', 'funnel', 'pyramid'];
const RANGE_TYPES: SeriesType[] = ['rangecolumn', 'rangearea', 'splinerangearea', 'hilo'];
const FINANCIAL_TYPES: SeriesType[] = ['hiloopenclose', 'candle'];
const SUPPORTED_TYPES: SeriesType[] = [
    'line', 'column', 'bar', 'area', 'spline', 'stepline', 'steparea', 'splinearea',
    'multicoloredline', 'multicoloredarea', 'rangecolumn', 'rangearea', 'splinerangearea',
    'hilo', 'hiloopenclose', 'candle', 'boxandwhisker', 'bubble', 'scatter',
    'stackingcolumn', 'stackingcolumn100', 'stackingbar', 'stackingbar100',
    'stackingarea', 'stackingarea100', 'stackingline', 'stackingline100',
    'stackingsteparea', 'pareto', 'polar', 'radar', 'waterfall', 'histogram',
    'pie', 'doughnut', 'funnel', 'pyramid'
];
const INDICATOR_TYPES: Record<string, string> = {
    ema: 'Ema', rsi: 'Rsi', bollingerbands: 'BollingerBands', tma: 'Tma', momentum: 'Momentum',
    sma: 'Sma', atr: 'Atr', accumulationdistribution: 'AccumulationDistribution', macd: 'Macd', stochastic: 'Stochastic'
};

export async function fetchChartConfig(
    prompt: string,
    existingConfig?: ChartConfig | null,
    signal?: AbortSignal
): Promise<ChartResponse> {
    const normalizedPrompt: string = normalizePrompt(prompt);
    if (!normalizedPrompt) {
        return { CHART: false, Text: 'Enter a chart request or modification.' };
    }
    if (isIncompleteCreateRequest(normalizedPrompt)) {
        return {
            CHART: false,
            Text: 'Please specify the chart you want to create. For example: "Create a pie chart showing product category distribution."'
        };
    }
    const clarification: string | null = getDataAdditionClarification(normalizedPrompt);
    if (clarification) {
        return { CHART: false, Text: clarification };
    }
    const requestType: ChartRequestType = getRequestType(normalizedPrompt, existingConfig);
    if (requestType === 'code' && existingConfig) {
        return buildCodeResponse(existingConfig);
    }
    if (requestType === 'modify' && existingConfig) {
        // First try to apply local modifications
        const locallyUpdated: ChartConfig | null = applyLocalModification(normalizedPrompt, existingConfig);
        if (locallyUpdated) {
            return buildModificationResponse(normalizedPrompt, existingConfig, locallyUpdated);
        }

        // If local modifications didn't work, try to apply public methods
        const methodMatch: RegExpMatchArray | null = normalizedPrompt.match(/(?:call|invoke|execute|run|apply)\s+(.+?)\s+method/i);
        if (methodMatch) {
            const methodName: string = methodMatch[1].trim();
            // Extract method parameters from the prompt (simplified approach)
            const methodParams: any = {};
            const paramsMatch: RegExpMatchArray | null = normalizedPrompt.match(/with\s+parameters?\s+(.+)/i);
            if (paramsMatch) {
                try {
                    // Try to parse parameters as JSON
                    methodParams.params = JSON.parse(paramsMatch[1].trim());
                } catch (e) {
                    // If parsing fails, use the raw string
                    methodParams.params = paramsMatch[1].trim();
                }
            }
            const methodUpdated: ChartConfig | null = applyPublicMethod(existingConfig, methodName, methodParams);
            if (methodUpdated) {
                return buildModificationResponse(normalizedPrompt, existingConfig, methodUpdated);
            }
        }
    }
    if (requestType === 'create' && !isChartRequest(normalizedPrompt)) {
        return { CHART: false, Text: 'Describe the chart or visualization you want to create.' };
    }
    const requestedType: SeriesType | null = getRequestedSeriesType(normalizedPrompt);
    const circularRequest: boolean = requestType === 'modify'
        ? existingConfig?.chartType === 'circular' && !requestedType
        : Boolean(requestedType && CIRCULAR_TYPES.includes(requestedType));
    const aiPrompt: string = requestType === 'modify' && existingConfig
        ? buildModificationPrompt(prompt, existingConfig)
        : prompt;
    let responseText: string = '';
    try {
        const raw: unknown = await serverAIRequest({
            messages: [
                { role: 'system', content: chartSystemPrompt },
                { role: 'user', content: aiPrompt }
            ],
            schema: generateChartSchema(circularRequest ? 'accumulationchart' : 'chart'),
            signal
        });
        responseText = getAIResponseText(raw);
    } catch (error) {
        if (signal?.aborted) {
            throw error;
        }
        console.error('Unable to retrieve the AI chart response:', error);
    }
    const normalizedResponse: ChartResponse | undefined = normalizeResponse(extractJson(responseText));
    if (!normalizedResponse?.ChartConfig) {
        const analysisText: string | undefined = getTextOnlyResponse(extractJson(responseText));
        if (analysisText) {
            return { CHART: false, Text: analysisText };
        }
        if (requestType === 'modify' && existingConfig) {
            return {
                CHART: false,
                Text: 'The requested modification could not be applied because the AI response was invalid. The existing chart was preserved.'
            };
        }
        return {
            CHART: false,
            Text: 'The AI response did not contain usable chart data. Please try again with valid data or a supported chart request.'
        };
    }
    let currentConfig: ChartConfig = normalizedResponse.ChartConfig;
    if (requestType === 'modify' && existingConfig) {
        currentConfig = preserveUnrequestedProperties(existingConfig, currentConfig, normalizedPrompt);
        return buildModificationResponse(normalizedPrompt, existingConfig, currentConfig, normalizedResponse.Text);
    }
    return {
        CHART: true,
        Text: normalizedResponse.Text || getCreationMessage(currentConfig),
        Code: generateCompleteAngularCode(currentConfig),
        CodeTitle: 'Complete Angular TypeScript code',
        CodeDescription: 'Includes the standalone Angular component, inline template, required services, data, and initialization.',
        ShowCode: true,
        ChartConfig: currentConfig
    };
}

function cloneChartConfig(config: ChartConfig): ChartConfig {
    return cloneValue(config);
}

function cloneValue<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
}

function normalizePrompt(prompt: string): string {
    return String(prompt || '').toLowerCase().replace(/\bstipline\b/g, 'stripline').replace(/\bstrip\s+line\b/g, 'stripline')
        .replace(/\bpriod\b|\bperod\b/g, 'period').replace(/\bx[\s_-]*axis\b/g, 'x-axis').replace(/\by[\s_-]*axis\b/g, 'y-axis')
        .replace(/\s+/g, ' ').trim();
}

function getRequestType(prompt: string, existingConfig?: ChartConfig | null): ChartRequestType {
    if (isCodeRequest(prompt)) {
        return 'code';
    }
    if (existingConfig && isModificationRequest(prompt)) {
        return 'modify';
    }
    return 'create';
}

function isCodeRequest(prompt: string): boolean {
    return ['show code', 'full code', 'angular code', 'typescript code', 'runnable code', 'show configuration', 'show config']
        .some((keyword: string) => prompt.includes(keyword));
}

function isModificationRequest(prompt: string): boolean {
    return /\b(add|append|insert|include|show|enable|apply|remove|hide|disable|delete|clear|change|update|modify|replace|rename|set|convert|make|increase|decrease|rotate)\b/i.test(prompt);
}

function isChartRequest(prompt: string): boolean {
    const keywords: string[] = [
        'chart', 'graph', 'plot', 'visualize', 'visualization', 'data', 'statistics', 'trend', 'comparison', 'track',
        'compare', 'display', 'line', 'column', 'bar', 'area', 'spline', 'step', 'range', 'hilo', 'candle',
        'box', 'bubble', 'scatter', 'stack', 'pareto', 'polar', 'radar', 'waterfall', 'histogram', 'pie',
        'doughnut', 'donut', 'funnel', 'pyramid'
    ];
    return keywords.some((keyword: string) => prompt.includes(keyword));
}

function isIncompleteCreateRequest(prompt: string): boolean {
    return /^(create|generate|build|draw|make)$/i.test(prompt);
}

function getDataAdditionClarification(prompt: string): string | null {
    const countMatch: RegExpMatchArray | null = prompt.match(/\badd\s+(\d+)\s+(?:data|datas|points?|datapoints?|data points?)\b/);
    if (countMatch) {
        return `Please provide the categories and values for the ${countMatch[1]} new data points.`;
    }
    if (/\b(add|append|insert|include)\b/.test(prompt) && /\b(data|points?|datapoints?|data points?)\b/.test(prompt) &&
        !/-?\d+(?:\.\d+)?/.test(prompt)) {
        return 'Please specify the category and value for the new data point.';
    }
    return null;
}

function getAIResponseText(value: unknown): string {
    if (typeof value === 'string') {
        return value.trim();
    }
    if (!value || typeof value !== 'object') {
        return '';
    }
    const source: Record<string, any> = value as Record<string, any>;
    for (const key of ['response', 'data', 'result']) {
        if (source[key] !== undefined) {
            const nested: string = getAIResponseText(source[key]);
            if (nested) {
                return nested;
            }
        }
    }
    if (typeof source.content === 'string') {
        return source.content.trim();
    }
    if (typeof source.text === 'string') {
        return source.text.trim();
    }
    if (Array.isArray(source.content)) {
        return source.content.map((item: any) => typeof item === 'string' ? item : item?.text || '').filter(Boolean).join('\n');
    }
    if (Array.isArray(source.choices) && typeof source.choices[0]?.message?.content === 'string') {
        return source.choices[0].message.content.trim();
    }
    return source.blocks || source.ChartConfig || source.chartConfig || source.series ? JSON.stringify(source) : '';
}

function extractJson(raw: string): unknown | undefined {
    if (!raw.trim()) {
        return undefined;
    }
    const normalized: string = raw.replace(/^\uFEFF/, '').trim();
    const fenced: string | undefined = normalized.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim();
    const candidate: string | undefined = fenced || extractObjectText(normalized);
    try {
        return candidate ? JSON.parse(candidate) : undefined;
    } catch (error) {
        console.error('Unable to parse the generated chart JSON:', error);
        return undefined;
    }
}

function extractObjectText(value: string): string | undefined {
    const start: number = value.indexOf('{');
    const end: number = value.lastIndexOf('}');
    return start !== -1 && end > start ? value.slice(start, end + 1).trim() : undefined;
}

function getTextOnlyResponse(value: unknown): string | undefined {
    const source: any = value && typeof value === 'object' ? value : null;
    if (!source || !Array.isArray(source.blocks) || source.blocks.length !== 1) {
        return undefined;
    }
    const block: any = source.blocks[0];
    return block?.blockType === 'text' && String(block.content || '').trim() ? String(block.content).trim() : undefined;
}

function normalizeResponse(value: unknown): ChartResponse | undefined {
    const source: any = value && typeof value === 'object' ? value : null;
    if (!source) {
        return undefined;
    }
    let text: string | undefined;
    let configSource: unknown = getChartConfigSource(source);
    if (Array.isArray(source.blocks)) {
        const textBlock: any = source.blocks[0];
        const chartBlock: any = source.blocks[1];
        if (textBlock?.blockType !== 'text' || chartBlock?.blockType !== 'tool' || chartBlock?.toolName !== 'chart-tool') {
            return undefined;
        }
        text = String(textBlock.content || '').trim();
        configSource = chartBlock.props;
    }
    const config: ChartConfig | null = normalizeChartConfig(configSource);
    return config ? { CHART: true, Text: text || getCreationMessage(config), ChartConfig: config } : undefined;
}

function getChartConfigSource(value: any): unknown {
    if (!value || typeof value !== 'object') {
        return null;
    }
    return value.ChartConfig || value.chartConfig || value.props || (Array.isArray(value.series) ? value : null);
}

function normalizeChartConfig(value: unknown): ChartConfig | null {
    const props: any = value && typeof value === 'object' ? value : null;
    if (!props) {
        return null;
    }
    const series: SeriesConfig[] = normalizeSeries(props.series);
    if (!series.length) {
        return null;
    }
    const hasCircular: boolean = series.some((item: SeriesConfig) => CIRCULAR_TYPES.includes(item.type));
    const chartType: 'cartesian' | 'circular' = props.chartType === 'circular' || hasCircular ? 'circular' : 'cartesian';
    if (series.some((item: SeriesConfig) => CIRCULAR_TYPES.includes(item.type) !== (chartType === 'circular'))) {
        return null;
    }
    const config: ChartConfig = {
        ...props,
        chartType,
        title: String(props.title || 'Generated Chart').trim() || 'Generated Chart',
        showLegend: props.showLegend !== false,
        sideBySidePlacement: props.sideBySidePlacement !== false,
        tooltip: sanitizeTooltip(props.tooltip),
        annotations: normalizeAnnotations(props.annotations),
        indicators: chartType === 'cartesian' ? normalizeIndicators(props.indicators, series) : [],
        series
    };
    if (chartType === 'cartesian') {
        config.xAxis = normalizeAxes(props.xAxis, 'category', 'Categories');
        config.yAxis = normalizeAxes(props.yAxis, 'numerical', 'Values');
    } else {
        delete config.xAxis;
        delete config.yAxis;
        delete config.crosshair;
        delete config.zoomSettings;
        delete config.indicators;
    }
    return config;
}

function sanitizeTooltip(value: unknown): Record<string, unknown> {
    const source: any = value && typeof value === 'object' ? value : {};
    const { template: _template, ...tooltip } = source;
    return { ...tooltip, enable: source.enable !== false };
}

function normalizeAnnotations(value: unknown): Record<string, unknown>[] {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.reduce((result: Record<string, unknown>[], item: any) => {
        const content: string = String(item?.content || '').replace(/<[^>]*>/g, '').replace(/^#/, '').trim().slice(0, 200);
        if (!content || item?.x === undefined || item?.y === undefined) {
            return result;
        }
        result.push({
            content,
            coordinateUnits: item.coordinateUnits === 'Pixel' ? 'Pixel' : 'Point',
            region: item.region === 'Series' ? 'Series' : 'Chart',
            x: item.x,
            y: item.y
        });
        return result;
    }, []);
}

function normalizeIndicators(value: unknown, series: SeriesConfig[]): Record<string, unknown>[] {
    if (!Array.isArray(value)) {
        return [];
    }
    const names: string[] = series.map((item: SeriesConfig) => item.name);
    return value.reduce((result: Record<string, unknown>[], item: any) => {
        const key: string = String(item?.type || '').toLowerCase().replace(/[\s-]/g, '');
        const type: string | undefined = INDICATOR_TYPES[key];
        const seriesName: string = names.includes(item?.seriesName) ? item.seriesName : names[0];
        if (!type || !seriesName) {
            return result;
        }
        result.push({
            ...item,
            type,
            seriesName,
            xName: 'xvalue',
            close: item.close || 'yvalue',
            high: item.high || 'high',
            low: item.low || 'low',
            open: item.open || 'open',
            volume: item.volume || 'volume',
            period: Math.max(Number(item.period) || 14, 1),
            width: Number(item.width) >= 0 ? Number(item.width) : 2
        });
        return result;
    }, []);
}

function normalizeAxes(value: unknown, fallbackType: AxisType, fallbackTitle: string): AxisConfig[] {
    const axes: any[] = Array.isArray(value) && value.length ? value : [{ type: fallbackType, title: fallbackTitle }];
    return axes.map((axis: any) => {
        const candidate: string = String(axis?.type || '').toLowerCase().replace(/[\s-]/g, '');
        const type: AxisType = isAxisType(candidate) ? candidate : fallbackType;
        const normalized: AxisConfig = {
            ...axis,
            type,
            title: String(axis?.title || fallbackTitle).trim() || fallbackTitle,
            stripLines: normalizeStripLines(axis?.stripLines)
        };
        const minimum: number | string | undefined = normalizeAxisBound(axis?.min ?? axis?.minimum);
        const maximum: number | string | undefined = normalizeAxisBound(axis?.max ?? axis?.maximum);
        if (minimum !== undefined) {
            normalized.min = minimum;
        }
        if (maximum !== undefined) {
            normalized.max = maximum;
        }
        if (typeof minimum === 'number' && typeof maximum === 'number' && minimum >= maximum) {
            delete normalized.min;
            delete normalized.max;
        }
        return normalized;
    });
}

function normalizeStripLines(value: unknown): Record<string, unknown>[] {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.reduce((result: Record<string, unknown>[], item: any) => {
        const size: number = Number(item?.size);
        if (item?.start === undefined || !Number.isFinite(size) || size <= 0) {
            return result;
        }
        result.push({
            ...item,
            size,
            opacity: Math.min(Math.max(Number(item.opacity ?? 1), 0), 1),
            visible: item.visible !== false,
            zIndex: item.zIndex === 'Over' ? 'Over' : 'Behind'
        });
        return result;
    }, []);
}

function isAxisType(value: unknown): value is AxisType {
    return ['category', 'numerical', 'datetime', 'datetimecategory', 'logarithmic'].includes(String(value || ''));
}

function normalizeAxisBound(value: unknown): number | string | undefined {
    return typeof value === 'number' && Number.isFinite(value) ? value : typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function normalizeSeries(value: unknown): SeriesConfig[] {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.reduce((result: SeriesConfig[], item: any, index: number) => {
        const type: SeriesType = normalizeSeriesType(item?.type);
        const dataSource: ChartDataPoint[] = normalizeDataSource(item?.dataSource ?? item?.data ?? item?.points, type);
        if (!dataSource.length) {
            return result;
        }
        result.push({
            ...item,
            type,
            name: String(item?.name || `Series ${index + 1}`).trim() || `Series ${index + 1}`,
            dataSource,
            high: item?.high || 'high',
            low: item?.low || 'low',
            open: item?.open || 'open',
            close: item?.close || 'close',
            volume: item?.volume || 'volume',
            size: item?.size || 'size',
            min: item?.min || 'minimum',
            max: item?.max || 'maximum'
        });
        return result;
    }, []);
}

function normalizeSeriesType(value: unknown): SeriesType {
    const type: string = String(value || 'column').toLowerCase().replace(/[\s-]/g, '');
    return SUPPORTED_TYPES.includes(type as SeriesType) ? type as SeriesType : 'column';
}

function normalizeDataSource(value: unknown, type: SeriesType): ChartDataPoint[] {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.reduce((result: ChartDataPoint[], point: any, index: number) => {
        const xvalue: unknown = point?.xvalue ?? point?.xValue ?? point?.x ?? point?.category ?? point?.label ?? index;
        if (xvalue === undefined || xvalue === null) {
            return result;
        }
        const normalized: ChartDataPoint = { xvalue: xvalue as string | number | Date };
        ['high', 'low', 'open', 'close', 'volume', 'size', 'minimum', 'maximum'].forEach((property: string) => {
            const numberValue: number = Number(point?.[property]);
            if (Number.isFinite(numberValue)) {
                normalized[property] = numberValue;
            }
        });
        const rawY: unknown = point?.yvalue ?? point?.yValue ?? point?.y ?? point?.value;
        if (type === 'boxandwhisker' && Array.isArray(rawY)) {
            const values: number[] = rawY.map(Number).filter(Number.isFinite);
            if (values.length) {
                normalized.yvalue = values;
            }
        } else {
            const yvalue: number = Number(rawY);
            if (Number.isFinite(yvalue)) {
                normalized.yvalue = yvalue;
            }
        }
        const valid: boolean = RANGE_TYPES.includes(type)
            ? Number.isFinite(normalized.high) && Number.isFinite(normalized.low)
            : FINANCIAL_TYPES.includes(type)
                ? Number.isFinite(normalized.high) && Number.isFinite(normalized.low) && Number.isFinite(normalized.open) &&
                    Number.isFinite(normalized.close)
                : type === 'bubble'
                    ? typeof normalized.yvalue === 'number' && Number.isFinite(normalized.size)
                    : type === 'boxandwhisker'
                        ? Array.isArray(normalized.yvalue) && normalized.yvalue.length > 0
                        : typeof normalized.yvalue === 'number';
        if (valid) {
            result.push({ ...point, ...normalized });
        }
        return result;
    }, []);
}

function buildModificationPrompt(prompt: string, config: ChartConfig): string {
    return [
        'Modify the existing Syncfusion Angular chart configuration.',
        'CURRENT CONFIGURATION:',
        JSON.stringify(config, null, 4),
        'USER REQUEST:',
        prompt,
        'Preserve every property, series, axis, data point, feature, and style not explicitly changed.',
        'Return the complete two-block JSON response required by the system prompt.'
    ].join('\n');
}

function applyLocalModification(prompt: string, config: ChartConfig): ChartConfig | null {
    const updated: ChartConfig = cloneChartConfig(config);
    const enabling: boolean = /\b(add|show|enable|apply|insert|include)\b/.test(prompt);
    const disabling: boolean = /\b(remove|hide|disable|delete|clear)\b/.test(prompt);
    const toggleMap: Array<{ word: string; property: 'selectionMode' | 'highlightMode'; enabled: string }> = [
         { word: 'selection', property: 'selectionMode', enabled: 'Point' },
        { word: 'highlight', property: 'highlightMode', enabled: 'Point' }
    ];
    if (prompt.includes('legend') && (enabling || disabling)) {
        updated.showLegend = enabling;
        return updated;
    }
    if (prompt.includes('tooltip') && (enabling || disabling)) {
        updated.tooltip = { ...(updated.tooltip || {}), enable: enabling };
        return updated;
    }
    if (prompt.includes('crosshair') && (enabling || disabling) && updated.chartType === 'cartesian') {
        updated.crosshair = { ...(updated.crosshair || {}), enable: enabling, lineType: updated.crosshair?.lineType || 'Both' };
        return updated;
    }
    if (prompt.includes('zoom') && (enabling || disabling) && updated.chartType === 'cartesian') {
        updated.zoomSettings = {
            ...(updated.zoomSettings || {}), enableSelectionZooming: enabling, enableMouseWheelZooming: enabling,
            enablePinchZooming: enabling, enablePan: enabling
        };
        return updated;
    }
    const toggle = toggleMap.find((item) => prompt.includes(item.word));
    if (toggle && (enabling || disabling)) {
        updated[toggle.property] = enabling ? toggle.enabled : 'None';
        return updated;
    }
    if (prompt.includes('data label') && (enabling || disabling)) {
        updated.series = updated.series.map((series: SeriesConfig) => ({
            ...series,
            marker: { ...(series.marker || {}), dataLabel: { ...((series.marker as any)?.dataLabel || {}), visible: enabling } },
            dataLabel: { ...(series.dataLabel || {}), visible: enabling }
        }));
        return updated;
    }
    if (prompt.includes('error bar') && (enabling || disabling)) {
        updated.series = updated.series.map((series: SeriesConfig) => ({ ...series, errorBar: { ...(series.errorBar || {}), visible: enabling } }));
        return updated;
    }
    if (prompt.includes('trendline') && disabling) {
        updated.series = updated.series.map((series: SeriesConfig) => ({ ...series, trendlines: [] }));
        return updated;
    }
    if (prompt.includes('annotation') && disabling) {
        updated.annotations = [];
        return updated;
    }
    if (prompt.includes('stripline') && disabling) {
        updated.xAxis = updated.xAxis?.map((axis: AxisConfig) => ({ ...axis, stripLines: [] }));
        updated.yAxis = updated.yAxis?.map((axis: AxisConfig) => ({ ...axis, stripLines: [] }));
        return updated;
    }
    if (prompt.includes('indicator') && disabling) {
        updated.indicators = [];
        return updated;
    }
    const periodMatch: RegExpMatchArray | null = prompt.match(/(?:indicator\s+)?period\s+(?:to\s+)?(\d+)/);
    if (periodMatch && updated.indicators?.length) {
        updated.indicators = updated.indicators.map((indicator) => ({ ...indicator, period: Math.max(Number(periodMatch[1]), 1) }));
        return updated;
    }
    const titleMatch: RegExpMatchArray | null = prompt.match(/(?:rename|change|set|update)\s+(?:the\s+)?title\s+(?:to|as)\s+["']?(.+?)["']?$/);
    if (titleMatch) {
        updated.title = titleMatch[1].trim();
        return updated;
    }
    const requestedType: SeriesType | null = getRequestedSeriesType(prompt);
    if (requestedType && /\b(change|convert|make|set|update)\b/.test(prompt)) {
        return convertSeriesType(updated, requestedType);
    }
    const addedPoint: ChartConfig | null = addDataPoint(updated, prompt);
    if (addedPoint) {
        return addedPoint;
    }
    const dataMatch: RegExpMatchArray | null = prompt.match(/(?:change|update|set|replace)\s+(.+?)\s+(?:to|as)\s+(-?\d+(?:\.\d+)?)/i);
    if (dataMatch) {
        let changed: boolean = false;
        updated.series.forEach((series: SeriesConfig) => series.dataSource.forEach((point: ChartDataPoint) => {
            if (normalizeCategory(point.xvalue) === normalizeCategory(dataMatch[1])) {
                point.yvalue = Number(dataMatch[2]);
                changed = true;
            }
        }));
        return changed ? updated : null;
    }
    return null;
}

function getRequestedSeriesType(prompt: string): SeriesType | null {
    const rules: Array<{ keywords: string[]; type: SeriesType }> = [
        { keywords: ['100% stacked column', 'stacking column 100'], type: 'stackingcolumn100' },
        { keywords: ['100% stacked bar', 'stacking bar 100'], type: 'stackingbar100' },
        { keywords: ['100% stacked area', 'stacking area 100'], type: 'stackingarea100' },
        { keywords: ['100% stacked line', 'stacking line 100'], type: 'stackingline100' },
        { keywords: ['stacking step area', 'stacked step area'], type: 'stackingsteparea' },
        { keywords: ['stacked column', 'stacking column'], type: 'stackingcolumn' },
        { keywords: ['stacked bar', 'stacking bar'], type: 'stackingbar' },
        { keywords: ['stacked area', 'stacking area'], type: 'stackingarea' },
        { keywords: ['stacked line', 'stacking line'], type: 'stackingline' },
        { keywords: ['multi colored line', 'multicolored line'], type: 'multicoloredline' },
        { keywords: ['multi colored area', 'multicolored area'], type: 'multicoloredarea' },
        { keywords: ['spline range area'], type: 'splinerangearea' },
        { keywords: ['range column'], type: 'rangecolumn' }, { keywords: ['range area'], type: 'rangearea' },
        { keywords: ['hilo open close'], type: 'hiloopenclose' }, { keywords: ['hilo'], type: 'hilo' },
        { keywords: ['candlestick', 'candle'], type: 'candle' }, { keywords: ['box and whisker'], type: 'boxandwhisker' },
        { keywords: ['step line'], type: 'stepline' }, { keywords: ['step area'], type: 'steparea' },
        { keywords: ['spline area'], type: 'splinearea' }, { keywords: ['bubble'], type: 'bubble' },
        { keywords: ['scatter'], type: 'scatter' }, { keywords: ['pareto'], type: 'pareto' },
        { keywords: ['polar'], type: 'polar' }, { keywords: ['radar'], type: 'radar' },
        { keywords: ['waterfall'], type: 'waterfall' }, { keywords: ['histogram'], type: 'histogram' },
        { keywords: ['doughnut', 'donut'], type: 'doughnut' }, { keywords: ['funnel'], type: 'funnel' },
        { keywords: ['pyramid'], type: 'pyramid' }, { keywords: ['pie'], type: 'pie' },
        { keywords: ['spline'], type: 'spline' }, { keywords: ['column'], type: 'column' },
        { keywords: ['bar'], type: 'bar' }, { keywords: ['area'], type: 'area' }, { keywords: ['line'], type: 'line' }
    ];
    return rules.find((rule) => rule.keywords.some((keyword: string) => prompt.includes(keyword)))?.type || null;
}

function convertSeriesType(config: ChartConfig, requestedType: SeriesType): ChartConfig {
    const circular: boolean = CIRCULAR_TYPES.includes(requestedType);
    config.chartType = circular ? 'circular' : 'cartesian';
    config.series = config.series.map((series: SeriesConfig) => ({ ...series, type: requestedType }));
    if (circular) {
        delete config.xAxis;
        delete config.yAxis;
        delete config.indicators;
        delete config.crosshair;
        delete config.zoomSettings;
    } else {
        config.xAxis = config.xAxis?.length ? config.xAxis : [{ type: 'category', title: 'Categories' }];
        config.yAxis = config.yAxis?.length ? config.yAxis : [{ type: 'numerical', title: 'Values' }];
    }
    return config;
}

function addDataPoint(config: ChartConfig, prompt: string): ChartConfig | null {
    const patterns: RegExp[] = [
        /\b(?:add|insert|append|include)\s+["']?(.+?)["']?\s+(?:with\s+)?(?:a\s+)?value\s+(?:of\s+)?(-?\d+(?:\.\d+)?)\b/i,
        /\b(?:add|insert|append|include)\s+["']?(.+?)["']?\s*(?:=|:)\s*(-?\d+(?:\.\d+)?)\b/i,
        /\b(?:add|insert|append|include)\s+["']?([a-z][a-z0-9 ._-]*?)["']?\s+(-?\d+(?:\.\d+)?)\b/i
    ];
    const match: RegExpMatchArray | null = patterns.map((pattern: RegExp) => prompt.match(pattern)).find(Boolean) || null;
    if (!match || !config.series.length || RANGE_TYPES.includes(config.series[0].type) || FINANCIAL_TYPES.includes(config.series[0].type)) {
        return null;
    }
    const category: string = match[1].trim();
    const value: number = Number(match[2]);
    if (!category || !Number.isFinite(value)) {
        return null;
    }
    const series: SeriesConfig = config.series[0];
    const existing: ChartDataPoint | undefined = series.dataSource.find((point: ChartDataPoint) =>
        normalizeCategory(point.xvalue) === normalizeCategory(category));
    if (existing) {
        existing.yvalue = value;
    } else {
        series.dataSource = [...series.dataSource, { xvalue: category, yvalue: value }];
    }
    return config;
}

function normalizeCategory(value: unknown): string {
    return String(value ?? '').trim().toLowerCase().replace(/[._-]+/g, ' ').replace(/\s+/g, ' ');
}

function preserveUnrequestedProperties(previous: ChartConfig, generated: ChartConfig, prompt: string): ChartConfig {
    const result: ChartConfig = cloneChartConfig(generated);
    if (!prompt.includes('title')) {
        result.title = previous.title;
    }
    if (!prompt.includes('legend')) {
        result.showLegend = previous.showLegend;
        result.legendSettings = previous.legendSettings;
    }
    const changesType: boolean = /(chart type|series type|convert|change to|make it)/.test(prompt);
    const changesData: boolean = /(add|append|insert|remove|delete|change|update|replace)\s+.*(data|value|point|series)/.test(prompt);
    if (!changesType) {
        result.chartType = previous.chartType;
    }
    const generatedByName: Map<string, SeriesConfig> = new Map(result.series.map((series: SeriesConfig) => [series.name, series]));
    result.series = previous.series.map((oldSeries: SeriesConfig, index: number) => {
        const newSeries: SeriesConfig | undefined = generatedByName.get(oldSeries.name) || result.series[index];
        if (!newSeries) {
            return cloneValue(oldSeries);
        }
        return {
            ...oldSeries,
            ...newSeries,
            type: changesType ? newSeries.type : oldSeries.type,
            dataSource: changesData ? newSeries.dataSource : oldSeries.dataSource
        };
    });
    if (!/(x-axis|horizontal axis|rotate label|stripline)/.test(prompt)) {
        result.xAxis = previous.xAxis;
    }
    if (!/(y-axis|vertical axis|minimum|maximum|stripline)/.test(prompt)) {
        result.yAxis = previous.yAxis;
    }
    ['tooltip', 'crosshair', 'zoomSettings', 'selectionMode', 'highlightMode', 'annotations', 'indicators', 'chartArea', 'palettes']
        .forEach((property: string) => {
            const promptName: string = property.replace(/Settings|Mode/g, '').toLowerCase();
            if (!prompt.includes(promptName) && previous[property] !== undefined) {
                result[property] = cloneValue(previous[property]);
            }
        });
    return result;
}

function compareChartConfigs(previous: ChartConfig, updated: ChartConfig): ChartChange[] {
    const changes: ChartChange[] = [];
    ['title', 'chartType', 'showLegend', 'tooltip', 'crosshair', 'zoomSettings', 'selectionMode', 'highlightMode',
        'annotations', 'indicators', 'xAxis', 'yAxis', 'chartArea', 'palettes'].forEach((key: string) => {
        if (JSON.stringify(previous[key]) !== JSON.stringify(updated[key])) {
            changes.push({ property: key, previousValue: formatValue(previous[key]), updatedValue: formatValue(updated[key]) });
        }
    });
    updated.series.forEach((series: SeriesConfig, index: number) => {
        const oldSeries: SeriesConfig | undefined = previous.series.find((item: SeriesConfig) => item.name === series.name) || previous.series[index];
        if (!oldSeries) {
            changes.push({ property: `Series ${index + 1}`, previousValue: 'not configured', updatedValue: series.name });
            return;
        }
        if (oldSeries.name !== series.name || oldSeries.type !== series.type) {
            changes.push({ property: `Series ${index + 1}`, previousValue: `${oldSeries.name} (${oldSeries.type})`, updatedValue: `${series.name} (${series.type})` });
        }
        if (JSON.stringify(oldSeries.dataSource) !== JSON.stringify(series.dataSource)) {
            changes.push({ property: `${series.name} data`, previousValue: formatValue(oldSeries.dataSource), updatedValue: formatValue(series.dataSource) });
        }
        ['fill', 'width', 'opacity', 'dashArray', 'marker', 'dataLabel', 'errorBar', 'trendlines', 'animation'].forEach((key: string) => {
            if (JSON.stringify(oldSeries[key]) !== JSON.stringify(series[key])) {
                changes.push({ property: `${series.name} ${key}`, previousValue: formatValue(oldSeries[key]), updatedValue: formatValue(series[key]) });
            }
        });
    });
    previous.series.filter((old: SeriesConfig) => !updated.series.some((series: SeriesConfig) => series.name === old.name)).forEach((old: SeriesConfig) =>
        changes.push({ property: old.name, previousValue: 'configured', updatedValue: 'removed' }));
    return changes;
}

function formatValue(value: unknown): string {
    return value === undefined ? 'not configured' : value === null ? 'none' : typeof value === 'string' ? value : JSON.stringify(value);
}

function buildCodeResponse(config: ChartConfig): ChartResponse {
    return {
        CHART: true,
        Text: `Here is the complete Angular TypeScript code for "${config.title || 'the current chart'}".`,
        Code: generateCompleteAngularCode(config),
        CodeTitle: 'Complete Angular TypeScript code',
        CodeDescription: 'Includes the standalone Angular component, inline template, required services, data, and initialization.',
        ShowCode: true,
        ChartConfig: cloneChartConfig(config)
    };
}

function buildModificationResponse(prompt: string, previous: ChartConfig, updated: ChartConfig, responseText?: string): ChartResponse {
    const changes: ChartChange[] = compareChartConfigs(previous, updated);
    return {
        CHART: true,
        Text: responseText || getModificationMessage(updated, changes),
        ChangedCode: generateAngularModificationCode(prompt, previous, updated),
        Code: generateCompleteAngularCode(updated),
        CodeTitle: 'Complete updated Angular TypeScript code',
        CodeDescription: 'Includes the complete standalone Angular chart after applying the requested changes.',
        ShowCode: true,
        ChangeSummary: changes.map((change: ChartChange) => `${change.property}: ${change.previousValue} to ${change.updatedValue}`),
        ChartConfig: updated
    };
}

function getCreationMessage(config: ChartConfig): string {
    const points: number = config.series.reduce((count: number, series: SeriesConfig) => count + series.dataSource.length, 0);
    return `Created "${config.title || 'Generated Chart'}" with ${config.series.length} series and ${points} data points.`;
}

function getModificationMessage(config: ChartConfig, changes: ChartChange[]): string {
    return changes.length === 1
        ? `Updated "${config.title || 'the chart'}": ${changes[0].property} changed from ${changes[0].previousValue} to ${changes[0].updatedValue}.`
        : `Updated "${config.title || 'the chart'}" with ${changes.length} changes.`;
}

function generateCompleteAngularCode(config: ChartConfig): string {
    const circular: boolean = config.chartType === 'circular';
    const moduleName: string = circular ? 'AccumulationChartModule' : 'ChartModule';
    const services: string[] = getRequiredAngularServices(config);
    const template: string = circular ? generateAccumulationTemplate(config) : generateCartesianTemplate(config);
    return [
        "import { Component, OnInit } from '@angular/core';",
        'import {',
        [moduleName, ...services].sort().map((item: string) => `    ${item}`).join(',\n'),
        "} from '@syncfusion/ej2-angular-charts';",
        '',
        '@Component({',
        `    imports: [${moduleName}],`,
        '    providers: [',
        services.map((item: string) => `        ${item}`).join(',\n'),
        '    ],',
        '    standalone: true,',
        "    selector: 'app-container',",
        '    template: `',
        indentText(template, 8),
        '    `',
        '})',
        'export class AppComponent implements OnInit {',
        generateAngularProperties(config).map((item: string) => `    ${item}`).join('\n'),
        '',
        '    public ngOnInit(): void {',
        generateAngularInitializations(config).map((item: string) => indentText(item, 8)).join('\n'),
        '    }',
        '}'
    ].join('\n');
}

function generateAngularModificationCode(prompt: string, previous: ChartConfig, updated: ChartConfig): string {
    const changes: ChartChange[] = compareChartConfigs(previous, updated);
    const previousServices: string[] = getRequiredAngularServices(previous);
    const updatedServices: string[] = getRequiredAngularServices(updated);
    const addedServices: string[] = updatedServices.filter((service: string) => !previousServices.includes(service));
    const removedServices: string[] = previousServices.filter((service: string) => !updatedServices.includes(service));
    const moduleName: string = updated.chartType === 'circular' ? 'AccumulationChartModule' : 'ChartModule';
    const previousModuleName: string = previous.chartType === 'circular' ? 'AccumulationChartModule' : 'ChartModule';
    const moduleChanged: boolean = previousModuleName !== moduleName;
    const header: string[] = [`// Applied request: ${prompt}`];
    if (moduleChanged) {
        header.push(`// Module import changed: ${previousModuleName} -> ${moduleName}.`);
    }
    if (addedServices.length) {
        header.push(`// Added imports/providers: ${addedServices.join(', ')}.`);
    }
    if (removedServices.length) {
        header.push(`// Removed imports/providers: ${removedServices.join(', ')}.`);
    }
    changes.forEach((change: ChartChange) => header.push(`// ${change.property}: ${change.previousValue} -> ${change.updatedValue}`));
    const importLine: string = `import { ${moduleName}${addedServices.length ? ', ' + addedServices.join(', ') : ''} } from '@syncfusion/ej2-angular-charts';`;
    const seriesLines: string[] = updated.chartType === 'circular'
        ? generateAccumulationModificationSeries(updated)
        : generateCartesianModificationSeries(updated);
    return [
        ...header,
        '',
        importLine,
        '',
        '<ejs-chart>',
        '  <e-series-collection>',
        ...seriesLines,
        '  </e-series-collection>',
        '</ejs-chart>'
    ].join('\n');
}

function generateCartesianModificationSeries(config: ChartConfig): string[] {
    return config.series.map((item: SeriesConfig) =>
        `    <e-series type='${mapAngularSeriesType(item.type)}'>\n    </e-series>`
    );
}

function generateAccumulationModificationSeries(config: ChartConfig): string[] {
    return config.series.map((item: SeriesConfig) =>
        `    <e-accumulation-series type='${item.type === 'funnel' ? 'Funnel' : item.type === 'pyramid' ? 'Pyramid' : 'Pie'}'>\n    </e-accumulation-series>`
    );
}

function getRequiredAngularServices(config: ChartConfig): string[] {
    const services: string[] = [];
    if (config.chartType === 'circular') {
        config.series.forEach((series: SeriesConfig) => services.push(getSeriesService(series.type)));
        if (config.showLegend !== false) services.push('AccumulationLegendService');
        if (config.tooltip?.enable !== false) services.push('AccumulationTooltipService');
        if (config.annotations?.length) services.push('AccumulationAnnotationService');
        if (config.series.some((series: SeriesConfig) => Boolean(series.dataLabel))) services.push('AccumulationDataLabelService');
        if (config.selectionMode && config.selectionMode !== 'None') services.push('AccumulationSelectionService');
        if (config.highlightMode && config.highlightMode !== 'None') services.push('AccumulationHighlightService');
        services.push('ExportService');
        return Array.from(new Set(services));
    }
    config.series.forEach((series: SeriesConfig) => services.push(getSeriesService(series.type)));
    [...(config.xAxis || []), ...(config.yAxis || [])].forEach((axis: AxisConfig) => {
        const axisService: string | undefined = {
            category: 'CategoryService', datetime: 'DateTimeService', datetimecategory: 'DateTimeCategoryService',
            logarithmic: 'LogarithmicService'
        }[axis.type];
        if (axisService) services.push(axisService);
        if (axis.stripLines?.length) services.push('StripLineService');
    });
    if (config.showLegend !== false) services.push('LegendService');
    if (config.tooltip?.enable !== false) services.push('TooltipService');
    if (config.crosshair?.enable) services.push('CrosshairService');
    if (config.zoomSettings && Object.values(config.zoomSettings).some(Boolean)) services.push('ZoomService');
    if (config.selectionMode && config.selectionMode !== 'None') services.push('SelectionService');
    if (config.highlightMode && config.highlightMode !== 'None') services.push('HighlightService');
    if (config.annotations?.length) services.push('ChartAnnotationService');
    if (config.series.some((series: SeriesConfig) => Boolean(series.marker?.dataLabel) || Boolean(series.dataLabel))) services.push('DataLabelService');
    if (config.series.some((series: SeriesConfig) => Boolean(series.errorBar))) services.push('ErrorBarService');
    if (config.series.some((series: SeriesConfig) => Boolean(series.trendlines?.length))) services.push('TrendlinesService');
    const indicatorServices: Record<string, string> = {
        Ema: 'EmaIndicatorService', Rsi: 'RsiIndicatorService', BollingerBands: 'BollingerBandsService',
        Tma: 'TmaIndicatorService', Momentum: 'MomentumIndicatorService', Sma: 'SmaIndicatorService',
        Atr: 'AtrIndicatorService', AccumulationDistribution: 'AccumulationDistributionIndicatorService',
        Macd: 'MacdIndicatorService', Stochastic: 'StochasticIndicatorService'
    };
    (config.indicators || []).forEach((indicator: any) => {
        if (indicatorServices[indicator.type]) {
            services.push(indicatorServices[indicator.type]);
        }
    });
    services.push('ExportService');
    return Array.from(new Set(services));
}

function getSeriesService(type: SeriesType): string {
    const values: Record<SeriesType, string> = {
        line: 'LineSeriesService', column: 'ColumnSeriesService', bar: 'BarSeriesService', area: 'AreaSeriesService',
        spline: 'SplineSeriesService', stepline: 'StepLineSeriesService', steparea: 'StepAreaSeriesService',
        splinearea: 'SplineAreaSeriesService', multicoloredline: 'MultiColoredLineSeriesService',
        multicoloredarea: 'MultiColoredAreaSeriesService', rangecolumn: 'RangeColumnSeriesService',
        rangearea: 'RangeAreaSeriesService', splinerangearea: 'SplineRangeAreaSeriesService', hilo: 'HiloSeriesService',
        hiloopenclose: 'HiloOpenCloseSeriesService', candle: 'CandleSeriesService', boxandwhisker: 'BoxAndWhiskerSeriesService',
        bubble: 'BubbleSeriesService', scatter: 'ScatterSeriesService', stackingcolumn: 'StackingColumnSeriesService',
        stackingcolumn100: 'StackingColumnSeriesService', stackingbar: 'StackingBarSeriesService',
        stackingbar100: 'StackingBarSeriesService', stackingarea: 'StackingAreaSeriesService',
        stackingarea100: 'StackingAreaSeriesService', stackingline: 'StackingLineSeriesService',
        stackingline100: 'StackingLineSeriesService', stackingsteparea: 'StackingStepAreaSeriesService',
        pareto: 'ParetoSeriesService', polar: 'PolarSeriesService', radar: 'RadarSeriesService',
        waterfall: 'WaterfallSeriesService', histogram: 'HistogramSeriesService', pie: 'PieSeriesService',
        doughnut: 'PieSeriesService', funnel: 'FunnelSeriesService', pyramid: 'PyramidSeriesService'
    };
    return values[type];
}

function generateCartesianTemplate(config: ChartConfig): string {
    const bindings: string[] = [
        '    [primaryXAxis]="primaryXAxis"', '    [primaryYAxis]="primaryYAxis"', '    [title]="title"',
        '    [tooltip]="tooltip"', '    [legendSettings]="legendSettings"', '    [chartArea]="chartArea"',
        '    [palettes]="palettes"', '    [crosshair]="crosshair"', '    [zoomSettings]="zoomSettings"',
        '    [selectionMode]="selectionMode"', '    [highlightMode]="highlightMode"', '    [annotations]="annotations"',
        '    [indicators]="indicators"', '    [enableSideBySidePlacement]="sideBySidePlacement"'
    ];
    const series: string = config.series.map((item: SeriesConfig, index: number) => [
        '        <e-series', `            [dataSource]="chartData${index + 1}"`,
        `            type="${mapAngularSeriesType(item.type)}"`, '            xName="xvalue"', '            yName="yvalue"',
        `            name="${escapeTemplateValue(item.name)}"`, `            high="${item.high || 'high'}"`,
        `            low="${item.low || 'low'}"`, `            open="${item.open || 'open'}"`,
        `            close="${item.close || 'close'}"`, `            volume="${item.volume || 'volume'}"`,
        `            size="${item.size || 'size'}"`, `            min="${item.min || 'minimum'}"`,
        `            max="${item.max || 'maximum'}"`, `            [marker]="seriesSettings${index + 1}.marker"`,
        `            [errorBar]="seriesSettings${index + 1}.errorBar"`,
        `            [trendlines]="seriesSettings${index + 1}.trendlines">`, '        </e-series>'
    ].join('\n')).join('\n');
    return ['<ejs-chart', ...bindings, '>', '    <e-series-collection>', series, '    </e-series-collection>', '</ejs-chart>'].join('\n');
}

function generateAccumulationTemplate(config: ChartConfig): string {
    const series: string = config.series.map((item: SeriesConfig, index: number) => [
        '        <e-accumulation-series', `            [dataSource]="chartData${index + 1}"`,
        `            type="${item.type === 'funnel' ? 'Funnel' : item.type === 'pyramid' ? 'Pyramid' : 'Pie'}"`,
        '            xName="xvalue"', '            yName="yvalue"', `            name="${escapeTemplateValue(item.name)}"`,
        `            innerRadius="${item.innerRadius || (item.type === 'doughnut' ? '70%' : '0%')}"`,
        `            radius="${item.radius || '80%'}"`, `            [dataLabel]="seriesSettings${index + 1}.dataLabel">`,
        '        </e-accumulation-series>'
    ].join('\n')).join('\n');
    return [
        '<ejs-accumulationchart', '    [title]="title"', '    [tooltip]="tooltip"',
        '    [legendSettings]="legendSettings"', '    [palettes]="palettes"', '    [annotations]="annotations"',
        '    [selectionMode]="selectionMode"', '    [highlightMode]="highlightMode">',
        '    <e-accumulation-series-collection>', series, '    </e-accumulation-series-collection>', '</ejs-accumulationchart>'
    ].join('\n');
}

function mapAngularSeriesType(type: SeriesType): string {
    const values: Record<SeriesType, string> = {
        line: 'Line', column: 'Column', bar: 'Bar', area: 'Area', spline: 'Spline', stepline: 'StepLine',
        steparea: 'StepArea', splinearea: 'SplineArea', multicoloredline: 'MultiColoredLine',
        multicoloredarea: 'MultiColoredArea', rangecolumn: 'RangeColumn', rangearea: 'RangeArea',
        splinerangearea: 'SplineRangeArea', hilo: 'Hilo', hiloopenclose: 'HiloOpenClose', candle: 'Candle',
        boxandwhisker: 'BoxAndWhisker', bubble: 'Bubble', scatter: 'Scatter', stackingcolumn: 'StackingColumn',
        stackingcolumn100: 'StackingColumn100', stackingbar: 'StackingBar', stackingbar100: 'StackingBar100',
        stackingarea: 'StackingArea', stackingarea100: 'StackingArea100', stackingline: 'StackingLine',
        stackingline100: 'StackingLine100', stackingsteparea: 'StackingStepArea', pareto: 'Pareto', polar: 'Polar',
        radar: 'Radar', waterfall: 'Waterfall', histogram: 'Histogram', pie: 'Pie', doughnut: 'Pie', funnel: 'Funnel', pyramid: 'Pyramid'
    };
    return values[type];
}

function generateAngularProperties(config: ChartConfig): string[] {
    const properties: string[] = config.series.flatMap((_series: SeriesConfig, index: number) => [
        `public chartData${index + 1}: Object[] = [];`, `public seriesSettings${index + 1}: Record<string, unknown> = {};`
    ]);
    properties.push('public title: string = \'\';', 'public tooltip: Object = {};', 'public legendSettings: Object = {};',
        'public chartArea: Object = {};', 'public palettes: string[] = [];', 'public selectionMode: string = \'None\';',
        'public highlightMode: string = \'None\';', 'public annotations: Object[] = [];');
    if (config.chartType === 'cartesian') {
        properties.push('public primaryXAxis: Object = {};', 'public primaryYAxis: Object = {};', 'public crosshair: Object = {};',
            'public zoomSettings: Object = {};', 'public indicators: Object[] = [];', 'public sideBySidePlacement: boolean = true;');
    }
    return properties;
}

function generateAngularInitializations(config: ChartConfig): string[] {
    const values: string[] = [];
    config.series.forEach((series: SeriesConfig, index: number) => {
        values.push(`this.chartData${index + 1} = ${toTypeScriptLiteral(series.dataSource)};`);
        values.push(`this.seriesSettings${index + 1} = ${toTypeScriptLiteral(series)};`);
    });
    values.push(`this.title = ${JSON.stringify(config.title || 'Generated Chart')};`);
    values.push(`this.tooltip = ${toTypeScriptLiteral(config.tooltip || { enable: true })};`);
    values.push(`this.legendSettings = ${toTypeScriptLiteral({ ...(config.legendSettings || {}), visible: config.showLegend !== false })};`);
    values.push(`this.chartArea = ${toTypeScriptLiteral(config.chartArea || { border: { width: 0 } })};`);
    values.push(`this.palettes = ${toTypeScriptLiteral(config.palettes || [])};`);
    values.push(`this.selectionMode = ${JSON.stringify(config.selectionMode || 'None')};`);
    values.push(`this.highlightMode = ${JSON.stringify(config.highlightMode || 'None')};`);
    values.push(`this.annotations = ${toTypeScriptLiteral(config.annotations || [])};`);
    if (config.chartType === 'cartesian') {
        values.push(`this.primaryXAxis = ${toTypeScriptLiteral(toAngularAxis(config.xAxis?.[0], 'Category'))};`);
        values.push(`this.primaryYAxis = ${toTypeScriptLiteral(toAngularAxis(config.yAxis?.[0], 'Double'))};`);
        values.push(`this.crosshair = ${toTypeScriptLiteral(config.crosshair || {})};`);
        values.push(`this.zoomSettings = ${toTypeScriptLiteral(config.zoomSettings || {})};`);
        values.push(`this.indicators = ${toTypeScriptLiteral(config.indicators || [])};`);
        values.push(`this.sideBySidePlacement = ${config.sideBySidePlacement !== false};`);
    }
    return values;
}

function toAngularAxis(axis: AxisConfig | undefined, fallbackValueType: string): Record<string, unknown> {
    return { ...(axis || {}), valueType: mapAngularAxisType(axis?.type) || fallbackValueType, minimum: axis?.min, maximum: axis?.max };
}

function mapAngularAxisType(type?: AxisType): string {
    return { numerical: 'Double', datetime: 'DateTime', datetimecategory: 'DateTimeCategory', logarithmic: 'Logarithmic',
        category: 'Category' }[type || 'category'];
}

function toTypeScriptLiteral(value: unknown): string {
    return JSON.stringify(value, null, 4).replace(/"([^"\\]+)":/g, '$1:').replace(/"([^"\\]+)"/g, (_match: string, text: string) =>
        `'${text.replace(/'/g, "\\'")}'`);
}

function indentText(value: string, indentation: number): string {
    const padding: string = ' '.repeat(indentation);
    return value.split('\n').map((line: string) => `${padding}${line}`).join('\n');
}

function escapeTemplateValue(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Apply public methods to the chart configuration
function applyPublicMethod(config: ChartConfig, methodName: string, methodParams: any): ChartConfig | null {
    const updatedConfig: ChartConfig = cloneChartConfig(config);

    // Handle different public methods
    switch (methodName.toLowerCase()) {
        case 'addseries':
            if (methodParams && methodParams.series) {
                updatedConfig.series = [...updatedConfig.series, methodParams.series];
                return updatedConfig;
            }
            break;

        case 'removeseries':
            if (methodParams && typeof methodParams.index === 'number') {
                if (methodParams.index >= 0 && methodParams.index < updatedConfig.series.length) {
                    updatedConfig.series.splice(methodParams.index, 1);
                    return updatedConfig;
                }
            }
            break;

        case 'addpoint':
            if (methodParams && typeof methodParams.seriesIndex === 'number' && methodParams.point) {
                if (methodParams.seriesIndex >= 0 && methodParams.seriesIndex < updatedConfig.series.length) {
                    updatedConfig.series[methodParams.seriesIndex].dataSource = [
                        ...updatedConfig.series[methodParams.seriesIndex].dataSource,
                        methodParams.point
                    ];
                    return updatedConfig;
                }
            }
            break;

        case 'removepoint':
            if (methodParams && typeof methodParams.seriesIndex === 'number' && typeof methodParams.pointIndex === 'number') {
                if (methodParams.seriesIndex >= 0 && methodParams.seriesIndex < updatedConfig.series.length) {
                    if (methodParams.pointIndex >= 0 && methodParams.pointIndex < updatedConfig.series[methodParams.seriesIndex].dataSource.length) {
                        updatedConfig.series[methodParams.seriesIndex].dataSource.splice(methodParams.pointIndex, 1);
                        return updatedConfig;
                    }
                }
            }
            break;

        case 'updatepoint':
            if (methodParams && typeof methodParams.seriesIndex === 'number' && typeof methodParams.pointIndex === 'number' && methodParams.point) {
                if (methodParams.seriesIndex >= 0 && methodParams.seriesIndex < updatedConfig.series.length) {
                    if (methodParams.pointIndex >= 0 && methodParams.pointIndex < updatedConfig.series[methodParams.seriesIndex].dataSource.length) {
                        updatedConfig.series[methodParams.seriesIndex].dataSource[methodParams.pointIndex] = methodParams.point;
                        return updatedConfig;
                    }
                }
            }
            break;

        case 'addaxis':
            if (methodParams && methodParams.axis) {
                if (updatedConfig.chartType === 'cartesian') {
                    if (!updatedConfig.xAxis) updatedConfig.xAxis = [];
                    if (!updatedConfig.yAxis) updatedConfig.yAxis = [];
                    updatedConfig.xAxis.push(methodParams.axis);
                    return updatedConfig;
                }
            }
            break;

        case 'removeaxis':
            if (methodParams && methodParams.name) {
                if (updatedConfig.chartType === 'cartesian' && updatedConfig.xAxis && updatedConfig.yAxis) {
                    updatedConfig.xAxis = updatedConfig.xAxis.filter((axis: AxisConfig) => axis.name !== methodParams.name);
                    updatedConfig.yAxis = updatedConfig.yAxis.filter((axis: AxisConfig) => axis.name !== methodParams.name);
                    return updatedConfig;
                }
            }
            break;

        case 'updateaxis':
            if (methodParams && methodParams.name && methodParams.axis) {
                if (updatedConfig.chartType === 'cartesian' && updatedConfig.xAxis && updatedConfig.yAxis) {
                    updatedConfig.xAxis = updatedConfig.xAxis.map((axis: AxisConfig) =>
                        axis.name === methodParams.name ? {...axis, ...methodParams.axis} : axis);
                    updatedConfig.yAxis = updatedConfig.yAxis.map((axis: AxisConfig) =>
                        axis.name === methodParams.name ? {...axis, ...methodParams.axis} : axis);
                    return updatedConfig;
                }
            }
            break;

        case 'addannotation':
            if (methodParams && methodParams.annotation) {
                if (!updatedConfig.annotations) updatedConfig.annotations = [];
                updatedConfig.annotations.push(methodParams.annotation);
                return updatedConfig;
            }
            break;

        case 'removeannotation':
            if (methodParams && methodParams.id) {
                if (updatedConfig.annotations) {
                    updatedConfig.annotations = updatedConfig.annotations.filter((annotation: any) => annotation.id !== methodParams.id);
                    return updatedConfig;
                }
            }
            break;

        case 'select':
            // This is a runtime method that doesn't affect the configuration
            return updatedConfig;

        case 'clearselection':
            // This is a runtime method that doesn't affect the configuration
            return updatedConfig;

        case 'zoomin':
        case 'zoomout':
        case 'resetzoom':
            // These are runtime methods that don't affect the configuration
            return updatedConfig;

        case 'showtooltip':
        case 'hidetooltip':
            // These are runtime methods that don't affect the configuration
            return updatedConfig;

        case 'toggleseriesvisibility':
            // This affects the series visibility property
            if (methodParams && typeof methodParams.seriesIndex === 'number') {
                if (methodParams.seriesIndex >= 0 && methodParams.seriesIndex < updatedConfig.series.length) {
                    updatedConfig.series[methodParams.seriesIndex].visible =
                        !(updatedConfig.series[methodParams.seriesIndex].visible !== false);
                    return updatedConfig;
                }
            }
            break;

        case 'animate':
            // This is a runtime method that doesn't affect the configuration
            return updatedConfig;

        case 'resize':
            // This is a runtime method that doesn't affect the configuration
            return updatedConfig;

        case 'setdatasource':
            if (methodParams && methodParams.dataSource) {
                updatedConfig.series = updatedConfig.series.map((series: SeriesConfig) => ({
                    ...series,
                    dataSource: methodParams.dataSource
                }));
                return updatedConfig;
            }
            break;

        case 'setseriesdata':
            if (methodParams && typeof methodParams.seriesIndex === 'number' && methodParams.dataSource) {
                if (methodParams.seriesIndex >= 0 && methodParams.seriesIndex < updatedConfig.series.length) {
                    updatedConfig.series[methodParams.seriesIndex].dataSource = methodParams.dataSource;
                    return updatedConfig;
                }
            }
            break;
    }

    // Return null if the method wasn't handled or parameters were invalid
    return null;
}
