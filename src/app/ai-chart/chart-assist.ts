import {
    AfterViewInit,
    ApplicationRef,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    createComponent,
    EnvironmentInjector,
    Inject,
    Input,
    OnDestroy,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AIAssistViewComponent,
    AIAssistViewModule,
    PromptRequestEventArgs,
    ToolbarItemClickedEventArgs,
    ToolbarSettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';
import {
    AccumulationAnnotationService,
    AccumulationChartComponent,
    AccumulationChartModule,
    AccumulationDataLabelService,
    AccumulationHighlightService,
    AccumulationLegendService,
    AccumulationSelectionService,
    AccumulationTooltipService,
    AccumulationDistributionIndicatorService,
    AreaSeriesService,
    AtrIndicatorService,
    BarSeriesService,
    BollingerBandsService,
    BoxAndWhiskerSeriesService,
    BubbleSeriesService,
    CandleSeriesService,
    CategoryService,
    ChartAnnotationService,
    ChartComponent,
    ChartModule,
    ColumnSeriesService,
    CrosshairService,
    DataLabelService,
    DateTimeCategoryService,
    DateTimeService,
    EmaIndicatorService,
    ErrorBarService,
    ExportService,
    FunnelSeriesService,
    HighlightService,
    HiloOpenCloseSeriesService,
    HiloSeriesService,
    HistogramSeriesService,
    LegendService,
    LineSeriesService,
    LogarithmicService,
    MacdIndicatorService,
    MomentumIndicatorService,
    MultiColoredAreaSeriesService,
    MultiColoredLineSeriesService,
    ParetoSeriesService,
    PieSeriesService,
    PolarSeriesService,
    PyramidSeriesService,
    RadarSeriesService,
    RangeAreaSeriesService,
    RangeColumnSeriesService,
    RsiIndicatorService,
    ScatterSeriesService,
    SelectionService,
    SmaIndicatorService,
    SplineAreaSeriesService,
    SplineRangeAreaSeriesService,
    SplineSeriesService,
    StackingAreaSeriesService,
    StackingBarSeriesService,
    StackingColumnSeriesService,
    StackingLineSeriesService,
    StackingStepAreaSeriesService,
    StepAreaSeriesService,
    StepLineSeriesService,
    StochasticIndicatorService,
    StripLineService,
    TmaIndicatorService,
    TooltipService,
    TrendlinesService,
    WaterfallSeriesService,
    ZoomService
} from '@syncfusion/ej2-angular-charts';
import { ChartConfig, ChartResponse, SeriesConfig, fetchChartConfig } from './chart-assist/model/ai-input';
import { chartSuggestions } from './chart-assist/model/prompt-data';

interface CodeToolView {
    id: 'changes' | 'complete';
    title: string;
    description: string;
    language: 'typescript';
    code: string;
}

interface CodeToolConfig {
    activeView?: 'changes' | 'complete';
    views?: CodeToolView[];
}

interface ChangeSummaryConfig {
    changes?: string[];
}

interface HistoryMessage {
    id: string;
    prompt: string;
    payload: ChartResponse;
    createdAt: Date;
}

interface HistorySession {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    messages: HistoryMessage[];
}

const CHART_PROVIDERS: any[] = [
    CategoryService, DateTimeService, DateTimeCategoryService, LogarithmicService, LineSeriesService, ColumnSeriesService,
    BarSeriesService, AreaSeriesService, SplineSeriesService, StepLineSeriesService, StepAreaSeriesService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, MultiColoredAreaSeriesService, RangeColumnSeriesService,
    RangeAreaSeriesService, SplineRangeAreaSeriesService, HiloSeriesService, HiloOpenCloseSeriesService,
    CandleSeriesService, BoxAndWhiskerSeriesService, BubbleSeriesService, ScatterSeriesService,
    StackingColumnSeriesService, StackingBarSeriesService, StackingAreaSeriesService, StackingLineSeriesService,
    StackingStepAreaSeriesService, ParetoSeriesService, PolarSeriesService, RadarSeriesService, WaterfallSeriesService,
    HistogramSeriesService, LegendService, TooltipService, DataLabelService, ChartAnnotationService, StripLineService,
    ZoomService, CrosshairService, SelectionService, HighlightService, ExportService, ErrorBarService,
    TrendlinesService, EmaIndicatorService, RsiIndicatorService, BollingerBandsService, TmaIndicatorService,
    MomentumIndicatorService, SmaIndicatorService, AtrIndicatorService, AccumulationDistributionIndicatorService,
    MacdIndicatorService, StochasticIndicatorService, PieSeriesService, FunnelSeriesService, PyramidSeriesService,
    AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,
    AccumulationAnnotationService, AccumulationSelectionService, AccumulationHighlightService
];

@Component({
    selector: 'app-generated-chart-preview',
    standalone: true,
    imports: [CommonModule, ChartModule, AccumulationChartModule],
    providers: CHART_PROVIDERS,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="generated-chart-container">
            <div class="generated-chart-header">
                <strong>Chart preview</strong>
                <div class="chart-preview-actions">
                    <select class="chart-export-select" aria-label="Export chart" #format
                        (change)="exportChart(format.value); format.value = ''">
                        <option value="" disabled hidden selected>Export</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="SVG">SVG</option>
                        <option value="PDF">PDF</option>
                    </select>
                    <button class="chart-print-button" type="button" (click)="printChart()">Print</button>
                </div>
            </div>
            <div class="chart-preview-status" role="status" aria-live="polite">{{ chartStatus }}</div>
            <div class="chart-tool-container" *ngIf="config as cfg; else awaitingConfig">
                <ejs-chart *ngIf="cfg.chartType !== 'circular'" #cartesianChart width="100%" height="396px"
                    [theme]="chartTheme" [title]="cfg.title || 'Chart'" [primaryXAxis]="cfg.primaryXAxis"
                    [primaryYAxis]="cfg.primaryYAxis" [chartArea]="cfg.chartAreaObj"
                    [tooltip]="cfg.tooltipSettings" [legendSettings]="cfg.legendSettingsObj"
                    [crosshair]="cfg.crosshair" [zoomSettings]="cfg.zoomSettings"
                    [selectionMode]="cfg.selectionMode || 'None'" [highlightMode]="cfg.highlightMode || 'None'"
                    [annotations]="cfg.annotations || []" [indicators]="cfg.indicators || []"
                    [palettes]="cfg.palettes || []" [enableSideBySidePlacement]="cfg.sideBySidePlacement !== false"
                    (loaded)="onChartLoaded()">
                    <e-series-collection>
                        <e-series *ngFor="let series of cfg.series; trackBy: trackSeries"
                            [type]="mapSeriesType(series.type)" [dataSource]="series.dataSource" [name]="series.name"
                            xName="xvalue" yName="yvalue" [high]="series.high || 'high'" [low]="series.low || 'low'"
                            [open]="series.open || 'open'" [close]="series.close || 'close'"
                            [volume]="series.volume || 'volume'" [size]="series.size || 'size'"
                            [min]="series.min || 'minimum'" [max]="series.max || 'maximum'" [fill]="series.fill"
                            [width]="series.width ?? 2" [opacity]="series.opacity ?? 1"
                            [dashArray]="series.dashArray || ''" [marker]="series.marker" [errorBar]="series.errorBar"
                            [trendlines]="series.trendlines || []" [animation]="series.animation">
                        </e-series>
                    </e-series-collection>
                </ejs-chart>
                <ejs-accumulationchart *ngIf="cfg.chartType === 'circular'" #circularChart width="100%" height="396px"
                    [theme]="chartTheme" [title]="cfg.title || 'Chart'" [tooltip]="cfg.tooltipSettings"
                    [legendSettings]="cfg.legendSettingsObj" [annotations]="cfg.annotations || []"
                    [palettes]="cfg.palettes || []" [selectionMode]="cfg.selectionMode || 'None'"
                    [highlightMode]="cfg.highlightMode || 'None'" (loaded)="onChartLoaded()">
                    <e-accumulation-series-collection>
                        <e-accumulation-series *ngFor="let series of cfg.series; trackBy: trackSeries"
                            [type]="mapAccumulationType(series.type)" [name]="series.name"
                            [dataSource]="series.dataSource" xName="xvalue" yName="yvalue"
                            [innerRadius]="series.innerRadius" [radius]="series.radius || '80%'"
                            [fill]="series.fill" [opacity]="series.opacity ?? 1" [dataLabel]="series.dataLabel">
                        </e-accumulation-series>
                    </e-accumulation-series-collection>
                </ejs-accumulationchart>
            </div>
            <ng-template #awaitingConfig>
                <div class="chart-preview-status" role="status" aria-live="polite">Preparing chart preview…</div>
            </ng-template>
        </div>
    `
})
export class GeneratedChartPreviewComponent implements AfterViewInit, OnDestroy {
    @Input() public config: any = null;
    @ViewChild('cartesianChart') public cartesianChart?: ChartComponent;
    @ViewChild('circularChart') public circularChart?: AccumulationChartComponent;

    public chartStatus: string = '';
    public chartTheme: string = this.getCurrentChartTheme();
    private isChartLoaded: boolean = false;
    private themeObserver?: MutationObserver;

    constructor(private cdr: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        this.observeTheme();
    }

    public ngOnDestroy(): void {
        this.isChartLoaded = false;
        this.themeObserver?.disconnect();
    }

    public onChartLoaded(): void {
        this.isChartLoaded = true;
    }

    public trackSeries(index: number, series: SeriesConfig): string {
        return `${series.name}-${series.type}-${index}`;
    }

    public exportChart(type: string): void {
        const chart: any = this.getActiveChart();
        if (!type || !chart || chart.isDestroyed || !chart.exportModule) {
            this.chartStatus = 'The chart is not ready for export.';
            return;
        }
        chart.exportModule.export(type, this.getFileName());
        this.chartStatus = `${type} export started.`;
    }

    public printChart(): void {
        const chart: any = this.getActiveChart();
        if (!chart || chart.isDestroyed || typeof chart.print !== 'function') {
            this.chartStatus = 'The chart is not ready for printing.';
            return;
        }
        chart.print();
        this.chartStatus = 'Print dialog opened.';
    }

    public mapSeriesType(type?: string): string {
        const values: Record<string, string> = {
            line: 'Line', column: 'Column', bar: 'Bar', area: 'Area', spline: 'Spline', stepline: 'StepLine',
            steparea: 'StepArea', splinearea: 'SplineArea', multicoloredline: 'MultiColoredLine',
            multicoloredarea: 'MultiColoredArea', rangecolumn: 'RangeColumn', rangearea: 'RangeArea',
            splinerangearea: 'SplineRangeArea', hilo: 'Hilo', hiloopenclose: 'HiloOpenClose', candle: 'Candle',
            boxandwhisker: 'BoxAndWhisker', bubble: 'Bubble', scatter: 'Scatter', stackingcolumn: 'StackingColumn',
            stackingcolumn100: 'StackingColumn100', stackingbar: 'StackingBar', stackingbar100: 'StackingBar100',
            stackingarea: 'StackingArea', stackingarea100: 'StackingArea100', stackingline: 'StackingLine',
            stackingline100: 'StackingLine100', stackingsteparea: 'StackingStepArea', pareto: 'Pareto', polar: 'Polar',
            radar: 'Radar', waterfall: 'Waterfall', histogram: 'Histogram'
        };
        return values[String(type || 'column').toLowerCase().replace(/[\s-]/g, '')] || 'Column';
    }

    public mapAccumulationType(type?: string): string {
        return type === 'funnel' ? 'Funnel' : type === 'pyramid' ? 'Pyramid' : 'Pie';
    }

    private getActiveChart(): any {
        return this.config?.chartType === 'circular' ? this.circularChart : this.cartesianChart;
    }

    private getFileName(): string {
        return String(this.config?.title || 'Generated Chart').replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') ||
            'Generated-Chart';
    }

    private getCurrentChartTheme(): string {
        const classes: string = `${document.documentElement.className} ${document.body.className}`.toLowerCase();
        if (classes.includes('highcontrast')) return 'HighContrast';
        if (classes.includes('fluent2-dark')) return 'Fluent2Dark';
        if (classes.includes('fluent-dark')) return 'FluentDark';
        if (classes.includes('material3-dark')) return 'Material3Dark';
        if (classes.includes('bootstrap5.3-dark') || classes.includes('bootstrap5-dark')) return 'Bootstrap5Dark';
        if (classes.includes('tailwind3-dark')) return 'Tailwind3Dark';
        if (classes.includes('tailwind-dark')) return 'TailwindDark';
        if (classes.includes('dark')) return 'Material3Dark';
        if (classes.includes('fluent2')) return 'Fluent2';
        if (classes.includes('fluent')) return 'Fluent';
        if (classes.includes('bootstrap5')) return 'Bootstrap5';
        if (classes.includes('tailwind3')) return 'Tailwind3';
        if (classes.includes('tailwind')) return 'Tailwind';
        return 'Material3';
    }

    private refreshChartAfterLayout(): void {
        if (!this.isChartLoaded) {
            return;
        }
        window.requestAnimationFrame((): void => {
            window.requestAnimationFrame((): void => {
                const chart: any = this.getActiveChart();
                if (chart && !chart.isDestroyed && chart.element && typeof chart.refresh === 'function') {
                    this.isChartLoaded = false;
                    chart.refresh();
                }
            });
        });
    }
    private observeTheme(): void {
        this.themeObserver = new MutationObserver((): void => {
            const theme: string = this.getCurrentChartTheme();
            if (theme !== this.chartTheme) {
                this.chartTheme = theme;
                this.cdr.detectChanges();
                this.refreshChartAfterLayout();
            }
        });
        this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        this.themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }
}

@Component({
    selector: 'app-generated-code-view',
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="generated-code-container" *ngIf="config.views?.length">
            <div class="generated-code-header">
                <div class="generated-code-heading">
                    <strong class="generated-code-title">Angular TypeScript code</strong>
                    <div class="generated-code-description">
                        Review the changed sections and the complete updated Angular component.
                    </div>
                </div>
            </div>
            <div class="generated-code-grid" [class.single-code-view]="(config.views?.length || 0) === 1">
                <section *ngFor="let view of config.views" class="generated-code-panel" [attr.aria-label]="view.title">
                    <div class="generated-code-panel-header">
                        <div class="generated-code-heading">
                            <strong class="generated-code-title">{{ view.title }}</strong>
                            <div class="generated-code-description">{{ view.description }}</div>
                        </div>
                        <button class="copy-code-button" type="button" (click)="copyCode(view)">Copy code</button>
                    </div>
                    <pre class="generated-code-wrapper" tabindex="0"><code class="generated-code">{{ view.code }}</code></pre>
                </section>
            </div>
        </div>
    `
})
export class GeneratedCodeViewComponent {
    @Input() public config: CodeToolConfig = {};
    public copyCode(view: CodeToolView): void {
        if (view.code && navigator.clipboard) {
            void navigator.clipboard.writeText(view.code);
        }
    }
}
@Component({
    selector: 'app-change-summary-view',
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="change-summary-container">
            <strong>Changes applied</strong>
            <ul *ngIf="changes.length" class="change-summary-list">
                <li *ngFor="let change of changes">{{ change }}</li>
            </ul>
        </div>
    `
})
export class ChangeSummaryViewComponent {
    @Input() public changes: string[] = [];
}

@Component({
    selector: 'app-ai-generate-chart',
    standalone: true,
    templateUrl: './chart-assist.html',
    styleUrls: ['./chart-assist.css'],
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, AIAssistViewModule]
})
export class GenerateChartComponent implements AfterViewInit, OnDestroy {
    @ViewChild('aiAssistViewComponent') public aiAssistViewComponent!: AIAssistViewComponent;
    @ViewChild('chartToolTemplate') public chartToolTemplate!: TemplateRef<unknown>;
    @ViewChild('codeToolTemplate') public codeToolTemplate!: TemplateRef<unknown>;
    @ViewChild('changeSummaryTemplate') public changeSummaryTemplate!: TemplateRef<unknown>;

    public histories: HistorySession[] = [];
    public currentHistoryId: string | null = null;
    public showHistory: boolean = false;
    public promptSuggestions: string[] = chartSuggestions.slice();
    public enableStreaming: boolean = false;
    public showHeader: boolean = true;
    public latestChartConfig: ChartConfig | null = null;
    public currentSession: HistorySession = this.createSession();
    public toolbarSettings: ToolbarSettingsModel = {
        items: [
            { iconCss: 'e-icons e-menu', align: 'Right', tooltip: 'History' },
            { iconCss: 'e-icons e-edit-notes', align: 'Right', tooltip: 'New session' }
        ],
        itemClicked: this.onToolbarItemClicked.bind(this)
    };
    public responseToolbarSettings: Object = {
        items: [
            { iconCss: 'e-icons e-assist-like', align: 'Right', tooltip: 'Like' },
            { iconCss: 'e-icons e-assist-dislike', align: 'Right', tooltip: 'Dislike' }
        ]
    };

    private componentRefs: ComponentRef<unknown>[] = [];
    private abortController?: AbortController;
    private requestSequence: number = 0;

    constructor(
        @Inject('sourceFiles') private sourceFiles: any,
        private appRef: ApplicationRef,
        private environmentInjector: EnvironmentInjector,
        private cdr: ChangeDetectorRef
    ) {
        sourceFiles.files = [
            'chart-assist.ts', 'chart-assist.css', 'chart-assist.html', 'chart-assist/model/ai-input.ts',
            'chart-assist/model/prompt-data.ts', 'chart-assist/model/sf-ai-schema.ts'
        ];
    }

    public ngAfterViewInit(): void {
        this.registerTools();
    }

    public ngOnDestroy(): void {
        this.requestSequence += 1;
        this.abortController?.abort();
        this.destroyToolComponents();
    }

    public onPromptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
        const prompt: string = String(args?.prompt || '').trim();
        if (!prompt) return;
        this.abortController?.abort();
        this.abortController = new AbortController();
        const requestId: number = ++this.requestSequence;
        try {
            const payload: ChartResponse = await fetchChartConfig(prompt, this.latestChartConfig, this.abortController.signal);
            if (requestId !== this.requestSequence) return;
            this.addPromptResponse(payload);
            if (payload.CHART && payload.ChartConfig) {
                this.latestChartConfig = this.clone(payload.ChartConfig);
                this.appendHistoryMessage(prompt, payload);
            }
        } catch (error) {
            if (this.abortController.signal.aborted || requestId !== this.requestSequence) return;
            console.error('Unable to process the chart prompt:', error);
            this.addTextResponse(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    public async onHistoryItemClick(session: HistorySession): Promise<void> {
        this.requestSequence += 1;
        this.abortController?.abort();
        this.destroyToolComponents();
        this.currentSession = this.clone(session);
        this.currentHistoryId = session.id;
        this.showHistory = false;
        const latest: HistoryMessage | undefined = [...session.messages].reverse().find((message: HistoryMessage) =>
            Boolean(message.payload.ChartConfig));
        this.latestChartConfig = latest?.payload.ChartConfig ? this.clone(latest.payload.ChartConfig) : null;
        this.resetAssistView();
        await this.waitForAssistView();

        // Restore all messages including user prompts and AI responses
        if (this.aiAssistViewComponent) {
            this.aiAssistViewComponent.prompts = session.messages.map((message: HistoryMessage) => ({
                prompt: message.prompt,
                blocks: this.buildResponseBlocks(message.payload)
            }));
        }
    }

    public async deleteHistoryEntry(session: HistorySession, event: MouseEvent): Promise<void> {
        event.preventDefault();
        event.stopPropagation();
        this.histories = this.histories.filter((item: HistorySession) => item.id !== session.id);
        if (this.currentHistoryId === session.id) await this.startNewSession();
    }

    public trackHistoryEntry(_index: number, session: HistorySession): string {
        return session.id;
    }

    public closeHistory(): void {
        this.showHistory = false;
    }

    public formatHistoryDate(value: Date): string {
        const date: Date = value instanceof Date ? value : new Date(value);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    }

    private getChartToolConfig(args: any): ChartConfig | null {
        const source: any =
            args?.config?.ChartConfig || args?.config?.chartConfig || args?.config?.props?.ChartConfig ||
            args?.config?.props?.chartConfig || args?.config?.props || args?.props?.ChartConfig ||
            args?.props?.chartConfig || args?.props?.props?.ChartConfig || args?.props?.props?.chartConfig ||
            args?.props || args?.ChartConfig || args?.chartConfig || args?.config || args;
        return this.sanitizeChartConfig(source);
    }
    private getCodeToolConfig(args: any): CodeToolConfig {
        return (args?.config?.props || args?.config || args?.props?.props || args?.props || args || {}) as CodeToolConfig;
    }
    private getChangeSummaryConfig(args: any): ChangeSummaryConfig {
        return (args?.config?.props || args?.config || args?.props?.props || args?.props || args || {}) as ChangeSummaryConfig;
    }
    private registerTools(): void {
        if (!this.aiAssistViewComponent) return;
        (this.aiAssistViewComponent as any).registerToolUI({
            toolName: 'code-tool',
            template: this.codeToolTemplate as any,
            handler: (container: HTMLElement, args: any): void => {
                const config: CodeToolConfig = this.getCodeToolConfig(args);
                this.mountComponent(container, GeneratedCodeViewComponent, { config }, '.code-tool-host');
            }
        });
        (this.aiAssistViewComponent as any).registerToolUI({
            toolName: 'chart-tool',
            template: this.chartToolTemplate as any,
            handler: (container: HTMLElement, args: any): void => {
                const config: ChartConfig | null = this.getChartToolConfig(args);
                if (!config) {
                    this.getToolHost(container, '.chart-tool-host').innerHTML =
                        '<div class="tool-error">Unable to render the chart configuration.</div>';
                    return;
                }
                this.mountComponent(container, GeneratedChartPreviewComponent, { config }, '.chart-tool-host');
            }
        });
        (this.aiAssistViewComponent as any).registerToolUI({
            toolName: 'change-summary-tool',
            template: this.changeSummaryTemplate as any,
            handler: (container: HTMLElement, args: any): void => {
                const config: ChangeSummaryConfig = this.getChangeSummaryConfig(args);
                this.mountComponent(container, ChangeSummaryViewComponent,
                    { changes: Array.isArray(config.changes) ? config.changes : [] }, '.change-summary-tool-host');
            }
        });
    }
    private getToolHost(container: HTMLElement, selector: string): HTMLElement {
        return container.matches(selector) ? container : container.querySelector(selector) as HTMLElement || container;
    }
    private mountComponent<T>(container: HTMLElement, component: any, inputs: Record<string, unknown>,
                               hostSelector: string): ComponentRef<T> {
        const toolHost: HTMLElement = this.getToolHost(container, hostSelector);
        toolHost.innerHTML = '';
        const host: HTMLElement = document.createElement('div');
        host.className = 'dynamic-tool-component-host';
        toolHost.appendChild(host);
        const ref: ComponentRef<T> = createComponent(component, {
            hostElement: host,
            environmentInjector: this.environmentInjector
        });
        Object.entries(inputs).forEach(([key, value]: [string, unknown]): void => ref.setInput(key, this.clone(value)));
        this.appRef.attachView(ref.hostView);
        ref.changeDetectorRef.detectChanges();
        this.componentRefs.push(ref as ComponentRef<unknown>);
        return ref;
    }
    private addPromptResponse(payload: ChartResponse): void {
        this.aiAssistViewComponent?.addPromptResponse({ blocks: this.buildResponseBlocks(payload) } as any);
    }

    private addTextResponse(text: string): void {
        this.aiAssistViewComponent?.addPromptResponse({ blocks: [{ blockType: 'text', content: text }] } as any);
    }

    private buildResponseBlocks(payload: ChartResponse): any[] {
        if (!payload.CHART || !payload.ChartConfig) {
            return [{ blockType: 'text', content: payload.Text || 'No valid chart configuration was returned.' }];
        }
        const blocks: any[] = [
            { blockType: 'text', content: payload.Text || 'The chart is ready.' }
        ];
        const views: CodeToolView[] = [];
        if (payload.ChangedCode) {
            views.push({ id: 'changes', title: 'Code changes', description: 'Updated Angular sections.',
                language: 'typescript', code: payload.ChangedCode });
        }
        if (payload.ShowCode && payload.Code) {
            views.push({ id: 'complete', title: payload.CodeTitle || 'Complete Angular TypeScript code',
                description: payload.CodeDescription || 'Complete standalone Angular chart.', language: 'typescript', code: payload.Code });
        }
        if (views.length) {
            blocks.push({ blockType: 'tool', toolName: 'code-tool',
                props: { activeView: payload.ChangedCode ? 'changes' : 'complete', views } });
        }
        blocks.push({ blockType: 'tool', toolName: 'chart-tool', props: { ChartConfig: payload.ChartConfig } });
        if (payload.ChangeSummary?.length) {
            blocks.push({ blockType: 'tool', toolName: 'change-summary-tool', props: { changes: payload.ChangeSummary } });
        }
        return blocks;
    }
    private sanitizeChartConfig(config: any): any {
        if (!config?.series?.length) return null;
        const cloned: any = this.clone(config);
        cloned.tooltipSettings = { ...(cloned.tooltip || {}), enable: cloned.tooltip?.enable !== false };
        cloned.legendSettingsObj = { ...(cloned.legendSettings || {}), visible: cloned.showLegend !== false };
        cloned.chartAreaObj = cloned.chartArea || { border: { width: 0.5 } };
        cloned.series = cloned.series.map((series: SeriesConfig, index: number) => ({
            ...series,
            fill: series.fill || this.getSeriesFill(index, cloned.palettes),
            marker: series.marker || { visible: true, width: 7, height: 7, shape: 'Circle' },
            innerRadius: series.innerRadius || (series.type === 'doughnut' ? '70%' : '0%')
        }));
        if (cloned.chartType !== 'circular') {
            cloned.primaryXAxis = this.createAxisObject(cloned.xAxis?.[0], 'Categories', 'Category');
            cloned.primaryYAxis = this.createAxisObject(cloned.yAxis?.[0], 'Values', 'Double');
        }
        return cloned;
    }

    private createAxisObject(axis: any, title: string, fallbackType: string): Object {
        return {
            ...(axis || {}), title: axis?.title || title, valueType: this.mapAxisType(axis?.type) || fallbackType,
            minimum: axis?.minimum ?? axis?.min, maximum: axis?.maximum ?? axis?.max,
            labelRotation: axis?.labelRotation || 0, stripLines: axis?.stripLines || []
        };
    }

    private mapAxisType(type?: string): string {
        return { numerical: 'Double', datetime: 'DateTime', datetimecategory: 'DateTimeCategory', logarithmic: 'Logarithmic',
            category: 'Category' }[String(type || 'category').toLowerCase().replace(/[\s-]/g, '')] || 'Category';
    }

    private getSeriesFill(index: number, palettes?: string[]): string {
        const palette: string[] = palettes?.length ? palettes : ['#1089E9', '#08CDAA', '#F58400', '#9656FF', '#F9C200', '#F954A3'];
        return palette[index % palette.length];
    }

    private appendHistoryMessage(prompt: string, payload: ChartResponse): void {
        const message: HistoryMessage = { id: this.createId('message'), prompt, payload: this.clone(payload), createdAt: new Date() };
        this.currentSession.messages.push(message);
        this.currentSession.title = this.currentSession.messages.length === 1 ? payload.ChartConfig?.title || prompt : this.currentSession.title;
        this.currentSession.updatedAt = new Date();
        this.histories = [this.clone(this.currentSession), ...this.histories.filter((item: HistorySession) => item.id !== this.currentSession.id)];
        this.currentHistoryId = this.currentSession.id;
    }

    private onToolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
        const icon: string = args.item?.iconCss || '';
        if (icon.includes('e-menu')) this.showHistory = !this.showHistory;
        if (icon.includes('e-edit-notes')) void this.startNewSession();
    }

    private async startNewSession(): Promise<void> {
        this.requestSequence += 1;
        this.abortController?.abort();
        this.destroyToolComponents();
        this.currentSession = this.createSession();
        this.currentHistoryId = null;
        this.latestChartConfig = null;
        this.showHistory = false;
        this.resetAssistView();
        await this.waitForAssistView();
    }

    private resetAssistView(): void {
        if (this.aiAssistViewComponent) {
            this.aiAssistViewComponent.prompts = [];
            this.aiAssistViewComponent.promptSuggestions = chartSuggestions.slice();
        }
        this.promptSuggestions = chartSuggestions.slice();
        this.cdr.detectChanges();
    }

    private async waitForAssistView(): Promise<void> {
        await new Promise<void>((resolve: () => void) => requestAnimationFrame((): void => resolve()));
        this.registerTools();
    }

    private destroyToolComponents(): void {
        this.componentRefs.forEach((ref: ComponentRef<unknown>) => {
            this.appRef.detachView(ref.hostView);
            ref.destroy();
        });
        this.componentRefs = [];
    }

    private createSession(): HistorySession {
        const now: Date = new Date();
        return { id: this.createId('session'), title: 'New Chart Session', createdAt: now, updatedAt: now, messages: [] };
    }

    private createId(prefix: string): string {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }

    private clone<T>(value: T): T {
        return JSON.parse(JSON.stringify(value)) as T;
    }
}
