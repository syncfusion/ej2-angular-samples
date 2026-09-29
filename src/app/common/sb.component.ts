import { Component, ElementRef, HostListener, Inject, Input, ViewChild, NgZone } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute, RouterOutlet } from '@angular/router';
import {
    select, selectAll, isVisible, createElement, Ajax, getComponent,
    L10n, loadCldr, setCulture, setCurrencyCode, closest, classList, registerLicense
} from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList, AutoComplete } from '@syncfusion/ej2-dropdowns';
import { HttpClient } from '@angular/common/http';
import { Browser, addClass, enableRipple, detach, Animation, AnimationOptions } from '@syncfusion/ej2-base';
import { Popup, Tooltip } from '@syncfusion/ej2-popups';
import { Tab, Accordion } from '@syncfusion/ej2-navigations';
import { Message } from '@syncfusion/ej2-notifications';
import { Locale } from './locale-string';
import { samplesList } from './samplelist';
import { LPController, MyWindow } from './lp.component';
import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-angular-lists';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import numberSystem from './cldr-data/supplemental/numberingSystems.json';
import currencyData from './cldr-data/supplemental/currencyData.json';
import de from './cldr-data/main/de/all.json';
import ar from './cldr-data/main/ar/all.json';
import frch from './cldr-data/main/fr-CH/all.json';
import en from './cldr-data/main/en/all.json';
import zh from './cldr-data/main/zh/all.json';
import { runAxeReport } from './accessibility/axe-integration';

loadCldr(
    numberSystem,
    currencyData,
    de, ar, frch, en, zh
);

registerLicense((window as any).syncfusion_license);

interface DestroyMethod extends HTMLElement {
    destroy: Function;
    ej2_instances: Object[];
    enableRtl: Boolean;
}

declare let window: MyWindow;
const sbObj: { [index: string]: string } = { 'react': 'react', 'nextjs': 'nextjs', 'javascript': 'javascript', 'vue': 'vue', 'blazor': 'blazor' }
const sbArray: string[] = ['react', 'nextjs' , 'ts', 'javascript', 'asp_core', 'asp_mvc', 'vue', 'blazor'];
const urlRegex: RegExp = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development|production)*/;
const sampleRegex: RegExp = /#\/(([^\/]+\/)+[^\/\.]+)/;
const cBlock: string[] = ['ts-src-tab', 'html-src-tab'];
const matchedCurrency: { [key: string]: string } = {
    'en': 'USD',
    'de': 'EUR',
    'ar': 'AED',
    'zh': 'CNY',
    'fr-CH': 'CHF'
};
setCulture('en');
L10n.load(Locale);
const typeMapper: { [key: string]: string } = {
    ts: 'typescript',
    html: 'xml',
    css: 'css',
    json: 'json'
};
const idRegex: RegExp = /\{0\}/g;
const sourceHeader: String = '<li class="nav-item {2}" role="presentation"><a class="nav-link" target-content="{0}" role="tab" {1}>{0}</a></li>';
const sourcecontent: String = '<div class="tab-pane {2}" id="{0}" role="tabpanel" {4}><pre><code class="{3}">{1}</code></pre></div>';
const plnk: string = '<li class="plnk" style="float:right"><a id="plnkr">Open in Plunker</a></li>\n' +
    '<li class="open"><a id="openNew" target="_blank" aria-label="Open new sample"><div class="openIcon e-icons"></div></a></li>';
const themes: string[] = ['material3', 'bootstrap5', 'fluent2', 'tailwind3', 'tailwind', 'fluent2-highcontrast', 'highcontrast', 'fluent', 'material3-dark', 'bootstrap5-dark',  'fluent2-dark', 'tailwind3-dark', 'tailwind-dark', 'fluent-dark'];
const darkIgnore = ['highcontrast', 'fluent2-highcontrast'];
const sdkControlMap: { [key: string]: string[] } = {
    all: [],

    // Grid SDK: Data Grid, Pivot Table, Tree Grid + AI variants
    grid: [
        'grid', 'pivot-table', 'treegrid',
        'ai-grid', 'ai-pivot-table', 'ai-tree-grid',
    ],

    // Chart SDK: all visualization components + AI Maps
    chart: [
        'chart', 'three-dimension-chart', 'three-dimension-circular-chart', 'stock-chart',
        'arc-gauge', 'circular-gauge', 'heatmap-chart', 'linear-gauge', 'maps',
        'range-navigator', 'smith-chart', 'barcode', 'sparkline', 'treemap',
        'bullet-chart', 'sankey', 'dashboard-layout', 'dashboards',
        'ai-maps',
    ],

    // Scheduler SDK: calendar & date/time pickers + AI Scheduler
    schedule: [
        'schedule', 'calendar', 'datepicker', 'daterangepicker', 'datetimepicker', 'timepicker',
        'ai-schedule',
    ],

    // Gantt SDK: Gantt + Kanban + AI variants
    gantt: [
        'gantt', 'kanban',
        'ai-gantt', 'ai-kanban',
    ],

    // Rich Text Editor SDK
    'rich-text-editor': [
        'rich-text-editor', 'rich-text-editor-ui', 'block-editor', 'markdown-editor',
    ],

    // File Manager SDK
    'file-manager': [
        'file-manager',
    ],

    // Diagram SDK
    diagram: [
        'diagram',
        'ai-diagram',
    ],

};

/**
 * Default sample URL for each SDK — used to redirect when the user picks an SDK.
 */
const sdkDefaultPaths: { [key: string]: string } = {
    'all': 'grid/over-view',
    'grid': 'grid/over-view',
    'chart': 'chart/overview-chart',
    'schedule': 'schedule/overview',
    'gantt': 'gantt/overview',
    'rich-text-editor': 'rich-text-editor/tools',
    'file-manager': 'file-manager/overview',
    'diagram': 'diagram/default-functionalities',
};

/**
 * Returns the first sample path of the SDK's ai- control.
 * Used when the user clicks the 'AI-Powered Samples' (ai-grid) tree node while
 * an AI-aware SDK filter is active.
 */
const aiSdkFirstSample: { [key: string]: string } = {
    schedule: ':theme/ai-schedule/smart-scheduler',
    gantt: ':theme/ai-gantt/prioritize-task',
    grid: ':theme/ai-grid/assistive-grid',
    diagram: ':theme/ai-diagram/smart-flowchart',
    chart:':theme/ai-maps/weather-prediction'
};

let selectedTheme: string;
let themeFlag: boolean = true;
let slideFlag: boolean = false;
let loadFlag: boolean = false;


declare let hljs: any;
/**
 * App Controller
 */
@Component({
    selector: 'ng-app',
    templateUrl: 'page.html',
    providers: [],
    standalone: true,
    imports: [LPController, RouterOutlet]
})

export class SBController {
    public pathRoutes: string[] = [];
    public sampleName: string = '';
    public currentControl: string = '';
    public prevControl: string = '';
    public tab: Tab;
    public sourceTab: Tab;
    public sourceTabItems: object[] = [];
    public themePopup: Popup;
    public settingsPopup: Popup;
    public switcherPopup: Popup;
    public sdkPopup: Popup;
    public sdkDropDown: DropDownList;
    public currentSdk: string = '';
    public themeDarkButton: HTMLElement = document.getElementById('sb-dark-theme');
    public darkButton: HTMLElement = document.getElementById('sb-dark-span');
    public themeModeDropDown: DropDownList;
    public themeDropDown: DropDownList;
    public currencyDropDown: DropDownList;
    public cultureDropDown: DropDownList;
    public isTablet: boolean;
    public isMobile: boolean;
    public isDesktop: boolean;
    public isDarkTheme: boolean = location.hash?.split('/')[1]?.includes('-dark');
    public isInitialRender: boolean = true;
    public footer: Element;
    public aniObject: Animation = new Animation({ duration: 400 });
    public mobileOverlay: Element;
    public searchBox: AutoComplete;
    public loader: Element;
    public axeMessage: Message;
    public axeCheckButton: Button;
    public resizeManualTrigger: boolean = false;
    public currentViewMode: string = '';
    public previousViewMode: string = '';
    public viewModeChanged: boolean = false;
    public resizeTimer: number = 0;
    public prevSampleName: string = '';
    public prevControlName: string = '';
    public copyRight: number = new Date().getFullYear();
    private isContentLoaded: boolean = false;
    private isRtl: boolean = false;

    // Canonical URLs Management
    private canonicalUrlsMap: { [key: string]: string } = {};
    private canonicalDataLoaded: Promise<void>;

    // Regex to match AI component names excluding ai-assistview
    private readonly aiControlRegex: RegExp = /^ai-(?!assistview$)/i;
    private loadCanonicalUrls(): Promise<void> {
        if (!this.http) {
            return Promise.resolve();
        }
        return new Promise<void>((resolve) => {
            this.http.get('canonical-urls.json').subscribe(
                (data: any) => {
                    this.canonicalUrlsMap = (data as { [key: string]: string }) || {};
                    resolve();
                },
                (err: any) => {
                    console.error('[Canonical] Error loading canonical-urls.json', err);
                    resolve();
                }
            );
        });
    }

    //Bread Crumb Object
    public breadCrumbObject:
        {
            component?: HTMLElement, categorySeparator?: HTMLElement,
            subCategory?: HTMLElement, sample?: HTMLElement
        } = {};


    @ViewChild('leftPane')
    public leftControl: LPController;

    constructor(
        private ngEle: ElementRef,
        @Inject('sourceFiles') private sourceFiles: any,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private ngZone: NgZone ) {
        // Initialize canonical URLs loading AFTER http is injected
        this.canonicalDataLoaded = this.loadCanonicalUrls();
        for (let routes of this.router.config) {
            if ((!Browser.isDevice || !(<any>routes).hideOnDevice) && routes.path.indexOf('/') !== -1) {
                this.pathRoutes.push(routes.path);
            }
        }
        let preventTabSwipe: any = (e: any) => {
            if (e.isSwiped) {
                e.cancel = true;
            }
        };
        this.tab = new Tab({
            selecting: preventTabSwipe,
            selected: (e: any) => {
                enableRipple(false);
                if (e.selectedIndex === 1) {
                    this.sourceTab.items = this.sourceTabItems;
                    this.sourceTab.refresh();
                    this.renderCopyCode();
                    this.dynamicTabCreation(this.sourceTab);
                }
                if (e.selectedItem && e.selectedItem.innerText === 'DEMO') {
                    let demoSection = document.getElementsByClassName('sb-demo-section')[0];
                    if (demoSection) {
                        let elementList = demoSection.getElementsByClassName('e-control e-lib');
                        for (let i = 0; i < elementList.length; i++) {
                            let instance = (elementList[i] as any).ej2_instances;
                            if (instance && instance[0] && typeof instance[0].refresh === 'function' && !['Rich Text Editor', 'Chat UI', 'AI AssistView'].includes(this.currentControl)) {
                                if (instance[0].getModuleName() !== 'split-btn' && instance[0].getModuleName() !== 'checkbox' && instance[0].getModuleName() !== 'radio' && instance[0].getModuleName() !== 'switch') {
                                    instance[0].refresh();
                                }
                            }
                            if (instance && instance[0] && instance[0].getModuleName() !== 'DashboardLayout')
                                break;
                        }
                    }
                }
            }
        });

        let proxy: any = this
        this.sourceTab = new Tab({
            items: [],
            headerPlacement: 'Bottom', cssClass: 'sb-source-code-section', created: this.dynamicTabCreation, selected: function (e: any) {
                if (e.selectedIndex === 0) {
                    proxy.renderCopyCode();
                }
                if (e.selectedIndex === 1) {
                    proxy.renderCopyCode();
                }
                if (e.isSwiped) {
                    e.cancel = true;
                }
                let blockEle: Element = this.element.querySelector('#e-content' + this.tabId + '_' + e.selectedIndex).children[0];
                blockEle.innerHTML = this.items[e.selectedIndex].data;
                blockEle.classList.add('sb-src-code');
                hljs.highlightBlock(blockEle);
            }
        });

        let theme: string = location.hash ? location.hash.split('/')[1] : 'tailwind3';
        this.isDarkTheme = location.hash?.split('/')[1]?.includes('-dark');
        this.themeDropDown = new DropDownList({
            index: themes.indexOf(theme.split('-')[0]),
            change: (e: any) => { this.switchTheme(e.value); }
        });
        this.themeModeDropDown = new DropDownList({
            index: (location.hash.split('/')[1] && location.hash.split('/')[1].includes('-dark')) ? 1 : 0,
            change: (e: any) => { this.darkSwitch(); }
        });

        this.cultureDropDown = new DropDownList({
            index: 0,
            zIndex: 1005,
            change: (e: any) => {
                let value: string = e.value;
                this.currencyDropDown.value = matchedCurrency[value];
                this.isRtl = value === 'ar';
                setCulture(e.value);
                this.applyRtlAfterRender();
                if (this.isMobile) {
                    this.removeOverlay();
                }
            }

        });
this.sdkDropDown = new DropDownList({
  index: 0,
  zIndex: 1005,
  change: (e: any) => {
    if (e.isInteracted) {
        this.handleSdkSelectionMobile(e);
    }

    if (this.isMobile) {
      this.removeOverlay();
    }
  }
});
        this.currencyDropDown = new DropDownList({
            zIndex: 1005,
            index: 0,
            change: (e: any) => {
                this.settingsPopup.hide();
                setCurrencyCode(e.value);
                if (this.isMobile) {
                    this.removeOverlay();
                }

            }
        });
        this.searchBox = new AutoComplete({
            minLength: 3,
            zIndex: 10000022,
            itemTemplate: '${name}',
            groupTemplate: '${cName}',
            placeholder: 'Search here...',
            noRecordsTemplate: '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>',
            fields: { groupBy: 'cName', value: 'searchValue' },
            popupHeight: '360px',
            suggestionCount: 10,
            highlight: true,
            select: (e: any) => {
                document.querySelector('.e-search-overlay').classList.add('sb-hide');
                (this.searchBox as any).clear();
              const selectedControl: string = e.itemData.path.split('/')[1] || '';
                const activeSdk: string =document.querySelector('#sdklist li.active')
                        ?.getAttribute('data-sdk') || 'all';
                const currentSdkControls: string[] = sdkControlMap[activeSdk] || [];
                if (
                    activeSdk !== 'all' &&
                    currentSdkControls.indexOf(selectedControl) === -1
                ) {
                    let matchedSdk: string = 'all';
                    for (const sdkKey in sdkControlMap) {
                        if (
                            sdkKey !== 'all' &&
                            sdkControlMap[sdkKey] &&
                            sdkControlMap[sdkKey].indexOf(selectedControl) !== -1
                        ) {
                            matchedSdk = sdkKey;
                            break;
                        }
                    }
                    localStorage.setItem('selectedSdk', matchedSdk);
                    const sdkList = document.getElementById('sdklist');
                    let targetLi: Element | null = null;
                    if (sdkList) {
                        sdkList.querySelectorAll('li')
                            .forEach(li => li.classList.remove('active'));
                        targetLi =sdkList.querySelector(`[data-sdk="${matchedSdk}"]`) ||
                            sdkList.querySelector('[data-sdk="all"]');
                        targetLi?.classList.add('active');
                        const sdkTextSpan = document.querySelector(
                            '#sb-sdk-text .sb-header-text-left'
                        ) as HTMLElement;
                        if (sdkTextSpan && targetLi) {
                            const switchText = targetLi.querySelector('.switch-text');
                            const selectedText = switchText
                                ? switchText.textContent
                                : 'ALL DEMOS';
                            sdkTextSpan.textContent = matchedSdk === 'all'
                                    ? 'ALL DEMOS'
                                    : selectedText?.toUpperCase() || 'ALL DEMOS';
                        }
                    }
                    if (this.sdkDropDown) {
                        this.sdkDropDown.value = matchedSdk;
                    }
                    this.leftControl.applySdkFilter(matchedSdk);
                }
                if (location.hash.split('/').slice(2).join('/') !== e.itemData.path.split('/').slice(2).join('/')) {
                    this.leftControl.navigateSample(e.itemData.path.replace(':theme', this.leftControl.getCurrentTheme()));
                }
            }
        });
    }

    // To disable first and last sample navigation button
    toggleButtonState(id: string, state: boolean): void {
        let ele: HTMLButtonElement = <HTMLButtonElement>document.getElementById(id);
        let mobileEle: HTMLButtonElement = <HTMLButtonElement>document.getElementById('mobile-' + id);
        ele.disabled = state;
        mobileEle.disabled = state;
        if (state) {
            mobileEle.classList.add('e-disabled');
            ele.classList.add('e-disabled');
        } else {
            mobileEle.classList.remove('e-disabled');
            ele.classList.remove('e-disabled');
        }
    }

    breadCrumbUpdate(controlName: string, category: string, sampleName: string) {
        let ele: Element = this.ngEle.nativeElement.querySelector('#sample-bread-crumb');
        this.breadCrumbObject.component.innerHTML = controlName;
        if (category && controlName.toLowerCase() !== category.toLowerCase()) {
            this.breadCrumbObject.subCategory.innerHTML = category;
            this.breadCrumbObject.subCategory.style.display = '';
            this.breadCrumbObject.categorySeparator.style.display = '';
        } else {
            this.breadCrumbObject.subCategory.style.display = 'none';
            this.breadCrumbObject.categorySeparator.style.display = 'none';
        }
        this.breadCrumbObject.sample.innerHTML = sampleName;
        let title: HTMLElement = document.querySelector('title');
        title.innerHTML = controlName + ' · ' + sampleName + ' · Essential JS 2 for Angular · Syncfusion ';
    }

    dynamicTabCreation(obj: any): void {
        let tabObj: any;
        if (obj) {
            tabObj = obj;
        } else { tabObj = this; }
        let contentEle: Element = tabObj.element.querySelector('#e-content' + tabObj.tabId + '_' + tabObj.selectedItem);
        if (!contentEle) {
            return;
        }
        let blockEle: Element = tabObj.element.querySelector('#e-content' + tabObj.tabId + '_' + tabObj.selectedItem).children[0];
        blockEle.innerHTML = tabObj.items[tabObj.selectedItem].data;
        blockEle.classList.add('sb-src-code');
        if (blockEle) {
            hljs.highlightBlock(blockEle);
        }
    }

    renderTabToolBar() {
        let hsplitter: string = '<div class="sb-toolbar-splitter sb-custom-item"></div>';
        // tslint:disable-next-line:no-multiline-string
        let openNewTemplate: string = `<div class="sb-custom-item sb-open-new-wrapper"><a id="openNew" role='tab' target="_blank" aria-label="Open new sample">
        <div class="sb-icons sb-icon-Popout"></div></a></div>`;
        // tslint:disable-next-line:no-multiline-string
        let sampleNavigation: string = `<div class="sb-custom-item sample-navigation"><button id='prev-sample' role='tab' class="sb-navigation-prev" aria-label='Navigate to previous sample'>
        <span class='sb-icons sb-icon-Previous'></span>
        </button>
        <button role='tab' id='next-sample' aria-label='Navigate to next sample' class="sb-navigation-next">
        <span class='sb-icons sb-icon-Next'></span>
        </button>
        </div>`;
        let wcagTemplate: string = '<span class="sb-wcag-text">WCAG 2.2</span>';
        let plnrTemplate: string = '<span class="sb-icons sb-icons-plnkr"></span><span class="sb-plnkr-text" role="presentation">Edit in StackBlitz</span>';
        // tslint:disable-next-line:no-multiple-var-decl
        let contentToolbarTemplate: string = '<div class="sb-desktop-setting"><button id="sf-wcag-btn" role="tab" aria-label="WCAG 2.2 Accessibility Report" tabindex="0" class="sb-custom-item sb-plnr-section sb-wcag-btn">' +
            wcagTemplate + '</button>' + hsplitter + '<button id="open-plnkr" role="tab" aria-label="Open Edit in StackBlitz" tabindex="0" class="sb-custom-item sb-plnr-section">' +
            plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter +
            '</div>' + sampleNavigation + '<div class="sb-icons sb-mobile-setting"></div>';
        let tabContentToolbar: Element = createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
        let tabHeader: Element = document.getElementById('sb-content-header');
        tabHeader.appendChild(tabContentToolbar);
        let axeTooltip: Tooltip = new Tooltip({
            content: 'Supports WCAG and Section 508 standards. View the accessibility report for this demo\'s compliance details.',
            position: 'BottomCenter',
            width: 280,
            cssClass: 'sb-axe-tooltip'
        });
        axeTooltip.appendTo('#sf-wcag-btn');
        var wcagReportBtn = select("#sf-wcag-btn") as HTMLElement;
        if (wcagReportBtn) {
            wcagReportBtn.addEventListener('click', () => {
                runAxeReport();
            });
        }

    }

    renderCopyCode() {
        // Copy To Clipboard Element
        let ele: HTMLElement = createElement('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
        document.getElementById('sb-source-tab').appendChild(ele);
        ele.addEventListener('click', this.copyCode.bind(this));
        let copiedTooltip: Tooltip = new Tooltip(
            {
                content: 'Copied', position: 'BottomCenter', opensOn: 'Click', closeDelay: 500
            }, '.copy-tooltip');

    }

    renderSBPopup() {
        this.themePopup = new Popup(document.getElementById('theme-switcher-popup'), {
            offsetY: 2,
            relateTo: <HTMLElement>document.querySelector('.theme-wrapper'), position: { X: 'left', Y: 'bottom' },
            collision: { X: 'flip', Y: 'flip' }
        });
        this.themePopup.hide();

        this.sdkPopup = new Popup(document.getElementById('sdk-popup'), {
            offsetY: 2,
            zIndex: 10012,
            relateTo: <HTMLElement>document.querySelector('.sdk-wrapper'), position: { X: 'left', Y: 'bottom' },
            collision: { X: 'flip', Y: 'flip' }
        });
        this.sdkPopup.hide();

        this.settingsPopup = new Popup(document.getElementById('settings-popup'), {
            offsetY: 5,
            relateTo: <any>select('.sb-setting-btn'),
            position: { X: 'right', Y: 'bottom' },
            collision: { X: 'flip', Y: 'flip' },
            zIndex: 1001,
        });

        this.settingsPopup.hide();

        this.switcherPopup = new Popup(document.getElementById('sb-switcher-popup'), {
            relateTo: <HTMLElement>document.querySelector('.sb-header-text-right'), position: { X: 'left' },
            collision: { X: 'flip', Y: 'flip' },
            offsetX: 0,
            offsetY: -15,
        });
        this.switcherPopup.hide();
    }

    renderTab() {
        this.tab.appendTo(this.ngEle.nativeElement.querySelector('#sb-content'));
        this.sourceTab.appendTo(this.ngEle.nativeElement.querySelector('#sb-source-tab'));
    }

    initCap(str: string): string {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

    ngOnInit(): void {
        window.addEventListener('hashchange', () => {
            this.hashHandler(); // on manual edits to hash
            this.canonicalDataLoaded.then(() => this.updateCanonicalTag());
        });
        if (this.isInitialRender) {
            let mT: string = localStorage.getItem('pointer') || 'mouse';
            if (Browser.isDevice) {
                mT = 'touch';
            }
            if (mT) {
                this.setMouseOrTouch(select('#' + mT).innerHTML.toLowerCase(), false);
                localStorage.removeItem('pointer');
            }
        }
        this.router.events.pipe(
            filter((event): event is NavigationStart => event instanceof NavigationStart)
        )
        .subscribe((event: any) => {
            this.hideShowSBLoader();
            this.tab.selectedItem = 0;
            this.tab.dataBind();
            let hashTheme: string = location.hash.split('/')[1];
            let theme: string = localStorage.getItem('ej2-theme');
            if (!hashTheme || theme || (selectedTheme && selectedTheme !== hashTheme) || themeFlag) {
                let activeTheme: Element = select('.active-theme');
                if (activeTheme) {
                    activeTheme.classList.remove('active-theme');
                }
                localStorage.removeItem('ej2-theme');
                if (themes.indexOf(theme) === -1) {
                    theme = location.hash.split('/')[1];
                    theme = themes.indexOf(theme) !== -1 ? theme : selectedTheme;
                }
                theme = themes.indexOf(theme) !== -1 ? theme : 'tailwind3';
                if(this.isDarkTheme) {
                    document.getElementById(theme.split('-dark')[0]).classList.add('active-theme');
                }
                else{
                    document.getElementById(theme).classList.add('active-theme');
                }
                loadTheme(theme);
            }
            if (event.navigationTrigger === 'popstate') {
                if (!loadFlag) {
                location.reload();
                    loadFlag = false;
                    }
            }
        });

        this.router.events
            .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
            .pipe(map(() => this.activatedRoute))
            .pipe(map((route: any) => {
                while (route.firstChild) { route = route.firstChild; };
                return route;
            }))
            .pipe(filter((route: any) => route.outlet === 'primary'))
            .pipe(mergeMap((route: any) => {
                this.currentControl = this.getComponentData(route.routeConfig.path.split('/')[1]).name;
                this.prevControl = !this.prevControl ? this.currentControl : this.prevControl;
                let catRegex: RegExp = new RegExp(route.routeConfig.category, 'i');
                this.sampleName = route.routeConfig.name;
                this.breadCrumbUpdate(this.currentControl, route.routeConfig.category, this.sampleName);
                select('#component-name > .sb-sample-text').innerHTML = route.routeConfig.componentNames || this.initCap(this.currentControl)
                let cName: Element = this.ngEle.nativeElement.querySelector('#component-name>.sb-sample-text');
                return route.data;
            }))
            .subscribe((event: any) => {
                this.updateSourceCode(location.hash);
                this.createOpenNewButton();
                this.updateViewMode();
                this.setPropertyBorder();
                if (this.isInitialRender) {
                    this.updateStaticView();
                }
                this.updatePropertyPanel();
                if (this.currentControl !== this.prevControl) {
                    this.updateListViewDS();
                }
                this.setListItemSelect();
                this.setScrollTop();
                if (this.prevSampleName !== this.sampleName || this.currentControl !== this.prevControlName) {
                    this.updateDescription();
                }
            });

        this.router.events
            .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                let hash: string[] = location.hash.split('/');
                if (!document.querySelector('.active-theme')) {
                    document.getElementById(hash[1] || 'tailwind3').classList.add('active-theme');
                }
                if(this.isDarkTheme){
                    hash[1] = document.querySelector('.active-theme').id + '-dark';
                }
                else{
                    hash[1] = document.querySelector('.active-theme').id;
                }
                enableRipple(hash[1].indexOf('material') !== -1);
                let href: string = location.href.split('#')[0];
                history.replaceState({}, 'theme', href + hash.join('/'));
                this.setThemeItemActive(location.hash.split('/')[1]);
                this.setSbLink();
                if (this.isRtl) {
                  this.applyRtlAfterRender();
                }
                // Update canonical tag after navigation
                this.canonicalDataLoaded.then(() => this.updateCanonicalTag());
                // this.hideShowSBLoader(true);
                this.isInitialRender = false;
                this.prevSampleName = this.sampleName;
                this.prevControlName = this.currentControl;
            });
    }

    private copyCode(): void {
        let copyElem: HTMLElement = select('#sb-source-tab .e-item.e-active') as HTMLElement;
        let textArea: HTMLTextAreaElement = createElement('textArea') as HTMLTextAreaElement;
        textArea.textContent = copyElem.textContent.trim();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        detach(textArea);
        (select('.copy-tooltip') as any).ej2_instances[0].close();
    }

    private updateDescription() {
        this.ngEle.nativeElement.querySelector('.description-section').innerHTML = '';
        if (this.ngEle.nativeElement.querySelector('#description')) {
            this.ngEle.nativeElement.querySelector('.description-section')
                .appendChild(this.ngEle.nativeElement.querySelector('#description'));
        }
        this.ngEle.nativeElement.querySelector('.sb-action-description').innerHTML = '';
        if (this.ngEle.nativeElement.querySelector('#action-description') !== null) {
            this.ngEle.nativeElement.querySelector('.sb-action-description')
                .appendChild(this.ngEle.nativeElement.querySelector('#action-description'));
        }
    }

    private setSbLink(): void {
        let href: string = location.href;
        let link: string[] = href.match(urlRegex);
        let sample: string[] = href.match(sampleRegex);
        let selectedThemes = selectedTheme === "bootstrap5.3" ? "bootstrap5" : selectedTheme === "bootstrap5.3-dark" ? "bootstrap5-dark" : selectedTheme;
        for (let sb of sbArray) {
            let ele: HTMLFormElement = (select('#' + sb) as HTMLFormElement);
            if (sb === 'asp_core' || sb === 'asp_mvc') {
                ele['href'] = sb === 'asp_core' ? 'https://ej2.syncfusion.com/aspnetcore/' : 'https://ej2.syncfusion.com/aspnetmvc/';
            }
            else if (sb === 'nextjs') {
                const defaultSamplePath = sample[1].includes('grid/over-view') ? sample[1].split('/')[0] + '/grid/overview' : sample[1];
                ele.href = 'https://ej2.syncfusion.com/nextjs/demos/' + defaultSamplePath;
            }
            else if (sb === 'blazor') {
                ele['href'] = 'https://blazor.syncfusion.com/demos/';
            }
            else if (sb === 'vue' && location.href.includes('grid/over-view')) {
                ele['href'] = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) : ('https://ej2.syncfusion.com/')) + 'vue/demos/#/' + selectedThemes + '/grid/grid-overview.html';
            }
              else if (sb === 'react' && location.href.includes('grid/over-view')) {
                ele['href'] = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) : ('https://ej2.syncfusion.com/')) + 'react/demos/#/' + selectedThemes + '/grid/overview';
            }
            else {
                ele['href'] = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) :
                    ('https://ej2.syncfusion.com/')) +
                    (sbObj[sb] ? (sb + '/') : '') + 'demos/#/' + (sample ? (sample[1] + (sb !== 'typescript' ? '' : '.html')) : '');
            }
        }
    }

    private updateCanonicalTag(): void {
        try {
            const hashParts: string[] = (location.hash || '').replace(/^#\/?/, '').split('/').filter(p => p.length > 0);
            const componentName: string = (hashParts.length >= 2) ? hashParts[1] : '';
            const sampleName: string = (hashParts.length >= 3) ? hashParts[2] : 'default';

            // For AI components (except ai-assistview), remove the canonical tag entirely
            if (this.aiControlRegex.test(componentName)) {
                const existingLink: HTMLLinkElement | null =
                    document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
                if (existingLink && existingLink.parentNode) {
                    existingLink.parentNode.removeChild(existingLink);
                }
                return;
            }

            const isOverview: boolean = /^(default|over-view|overview|.*-overview|overview-.*|.*-default|default-.*)$/.test(sampleName);
            const canonicalUrl: string = isOverview && this.canonicalUrlsMap[componentName]
                ? this.canonicalUrlsMap[componentName]
                : `https://ej2.syncfusion.com/angular/demos/${componentName}/${sampleName}/`;

            // Get or create the canonical link element
            let canonicalLink: HTMLLinkElement | null =
                document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

            if (!canonicalLink) {
                canonicalLink = document.createElement('link');
                canonicalLink.rel = 'canonical';
                document.head.appendChild(canonicalLink);
            }

            // Update the href
            canonicalLink.setAttribute('href', canonicalUrl);
        } catch (e) {
            console.error('[Canonical] updateCanonicalTag error:', e);
        }
    }

    ngAfterViewInit(): void {
        this.leftControl.app = this;
        this.breadCrumbObject.component = this.ngEle.nativeElement.querySelector('.sb-bread-crumb-text>.category-text');
        this.breadCrumbObject.categorySeparator = this.ngEle.nativeElement.querySelector('.category-seperator');
        this.breadCrumbObject.subCategory = this.ngEle.nativeElement.querySelector('.sb-bread-crumb-text>.component');
        this.breadCrumbObject.sample = this.ngEle.nativeElement.querySelector('.sb-bread-crumb-text>.crumb-sample');
        this.footer = select('.sb-footer');
        this.mobileOverlay = select('.sb-mobile-overlay ');
        this.loader = select('.sb-body-overlay');
        this.themeDropDown.appendTo('#sb-setting-theme');
        this.themeModeDropDown.appendTo('#sb-theme-mode');
        this.sdkDropDown.appendTo('#sb-setting-sdk');
        this.cultureDropDown.appendTo('#sb-setting-culture');
        this.currencyDropDown.appendTo('#sb-setting-currency');
        this.searchBox.dataSource = this.leftControl.listData;
        this.searchBox.dataBind();
        this.searchBox.appendTo('#search-input');
        this.axeMessage = new Message({
            severity: 'Info',
            cssClass: 'sf-axe-msg'
        });
        this.axeMessage.appendTo('#sf-axe-message');
        this.axeCheckButton = new Button({ cssClass: 'e-link' });
        this.axeCheckButton.appendTo('#sf-axe-btn');
        this.renderTab();
        this.renderSBPopup();
        this.renderTabToolBar();
        this.wireEvents();
        this.setResponsive();


        //for tooltip
        let openNew: Tooltip = new Tooltip({
            content: 'Open in New Window'
        });
        openNew.appendTo('.sb-open-new-wrapper');
        let previous: Tooltip = new Tooltip({
            content: 'Previous Sample'
        });
        previous.appendTo('#prev-sample');

        let next: Tooltip = new Tooltip({
            content: 'Next Sample'
        });
        next.appendTo('#next-sample');
    }

    ngAfterContentInit(): void {
        setTimeout(() => {
            this.isContentLoaded = true;
            this.hideShowSBLoader(true);
        }, 1000);
    }

    ngAfterContentChecked(): void {
        // Don't perform any more operations in this method.
        if (this.isContentLoaded) { this.hideShowSBLoader(true); }
    }

    hideShowSBLoader(hide?: boolean): void {
        if (!this.loader) {
            return;
        }
        if (hide) {
            addClass([this.loader], 'sb-hide');
        } else {
            this.loader.classList.remove('sb-hide');
        }
    }

    private applyRtlAfterRender(): void {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            setTimeout(() => {
                this.changeRtl(this.isRtl);
            }, 0);
        });
    }

    changeRtl(enable: boolean): void {
        const container = document.getElementById('control-content');
        if (!container) {
            return;
        }
        const elementList: Element[] = selectAll('.e-control', container) as Element[];
        for (const control of elementList) {
            const instances = (control as any).ej2_instances;
            if (!instances) continue;
            for (const instance of instances) {
                if (!instance) continue;
                instance.enableRtl = enable;
                if (typeof instance.dataBind === 'function') {
                    instance.dataBind();
                }
            }
        }
    }
    removeOverlay() {
        this.mobileOverlay.classList.add('sb-hide');
        this.settingsPopup.hide({ name: 'SlideRightOut', duration: 400 });
    }


    switchTheme(str: string): void {
        let hash: string[] = location.hash.split('/');
        if (hash[1] !== str) {
            if (this.isDarkTheme && darkIgnore.indexOf(str) === -1) {
                str = str + '-dark';
            }
            if(darkIgnore.indexOf(str) !== -1){
                this.isDarkTheme = false;
            }
            hash[1] = str;
            location.hash = hash.join('/');
            if (document.querySelector('.sb-responsive-items.active').innerHTML.toLowerCase() === 'touch') {
                localStorage.setItem('pointer', document.querySelector('.sb-responsive-items.active').innerHTML.toLowerCase());
            }
            location.reload();
        }
    }

    darkSwitch(): void {
        const hash = location.hash.replace(/^#/, '').split('/');
        const currentTheme = hash[1] || 'tailwind3';
        const isCurrentlyDark = currentTheme.includes('-dark');
        const baseTheme = currentTheme.replace('-dark', '');
        const newTheme = isCurrentlyDark ? baseTheme : baseTheme + '-dark';

        // Update hash
        hash[1] = newTheme;
        const updatedHash = '#' + hash.join('/');
        if (location.hash !== updatedHash) {
            history.replaceState(null, '', updatedHash);
        }

        this.updateThemeClass(newTheme);
        this.updateStylesheet(newTheme);
        this.updateIconAndLabel(this.isDarkTheme);

        localStorage.setItem('theme', newTheme);
        themeFlag = false;

        this.refreshControls();
    }

    public doControls: string[] = [
        "Chart", "3D Chart", "3D Circular Chart", "Stock Chart", "Arc Gauge", "Circular Gauge",
        "Diagram", "HeatMap Chart", "Linear Gauge", "Maps", "Range Selector", "Smith Chart",
        "Barcode", "Sparkline Charts", "TreeMap", "Bullet Chart", "Sankey"
    ];


    hashHandler(): void {
        const hash = location.hash.replace(/^#/, '').split('/');
        const themeSegment = hash[1] || 'tailwind3';
        this.applyTheme(themeSegment);
    }
private readonly themeCollection: string[] = [
  'material3', 'bootstrap5', 'fluent2', 'tailwind3',
  'fluent2-highcontrast', 'highcontrast', 'tailwind', 'fluent'
];

private updateThemeClass(theme: string): void {
  const isDark = theme.endsWith('-dark');
  let baseTheme = theme.replace('-dark', '');

  // Normalize bootstrap5 to bootstrap5.3
  if (baseTheme.includes('bootstrap5')) {
    baseTheme = baseTheme.replace('bootstrap5', 'bootstrap5.3');
  }

  const themeClass = isDark ? `${baseTheme}-dark` : baseTheme;

  // Get current body class list
  const currentClasses = document.body.className.trim().split(/\s+/);

  // Replace any existing theme class
  const updatedClasses = currentClasses.map(c => {
    const normalized = c.replace('-dark', '');
    if (this.themeCollection.includes(normalized) || normalized === 'bootstrap5.3') {
      return themeClass;
    }
    return c;
  });

  // If no theme class was found, add it
  const hasTheme = updatedClasses.some(c => {
    const normalized = c.replace('-dark', '');
    return this.themeCollection.includes(normalized) || normalized === 'bootstrap5.3';
  });

  if (!hasTheme) {
    updatedClasses.push(themeClass);
  }

  // Apply updated class list
  document.body.className = updatedClasses.join(' ').trim();

  // Store dark mode state
  this.isDarkTheme = isDark;
}
private updateStylesheet(theme: string): void {
    const linkEl = document.getElementById('themelink');
    if (linkEl) {
        const isDark = theme.endsWith('-dark');
        const baseTheme = theme.replace('-dark', '');

        let themeFile = baseTheme;

        if (baseTheme === 'bootstrap5') {
            themeFile = 'bootstrap5.3';
        }

        if (isDark) {
            themeFile += '-dark';
        }
        linkEl.setAttribute('href', `./styles/${themeFile}.css`);
    }
}

    applyTheme(theme: string): void {
        this.updateThemeClass(theme);
        this.updateStylesheet(theme);
        this.updateIconAndLabel(this.isDarkTheme);

        localStorage.setItem('theme', theme);
        themeFlag = false;
        loadFlag = true;

        this.refreshControls();
    }
    private updateIconAndLabel(isDark: boolean): void {
        const darkIcon = document.getElementById('dark-icon');
        const lightIcon = document.getElementById('light-icon');
        const labelSpan = document.getElementById('sb-dark-span');

        if (isDark) {
            darkIcon?.style.setProperty('display', 'none');
            lightIcon?.style.setProperty('display', 'inline-block');
            if (labelSpan) labelSpan.textContent = 'LIGHT';
        } else {
            darkIcon?.style.setProperty('display', 'inline-block');
            lightIcon?.style.setProperty('display', 'none');
            if (labelSpan) labelSpan.textContent = 'DARK';
        }
    }

    private refreshControls(): void {
        const isScheduleChartIntegration = this.currentControl === 'Scheduler' && this.sampleName === 'Integration with Chart';
	    const isAiChart: boolean = (location.hash || '').includes('/ai-chart/');
        if (this.doControls?.includes(this.currentControl) || isScheduleChartIntegration || isAiChart) {
            setTimeout(() => {
                const demo = document.querySelector('.sb-demo-section');
                if (demo) {
                    const controls = demo.getElementsByClassName('e-control e-lib');
                    for (let i = 0; i < controls.length; i++) {
                        const instance = (controls[i] as any).ej2_instances;
                        if (instance?.[0]?.refresh instanceof Function) {
                            instance[0].refresh();
                        }
                    }
                }
            }, 100);
        }
    }

    updateStaticView() {
        Animation.stop(this.leftControl.ngEle.nativeElement);
        let rightPane: HTMLElement = <HTMLElement>select('.sb-right-pane');
        rightPane.style.left = "";
        this.leftControl.ngEle.nativeElement.style.display = '';
        if (this.isMobile) {
            this.leftControl.ngEle.nativeElement.style.display = 'none';
            this.leftControl.setMobileView();
        } else {
            addClass([this.leftControl.ngEle.nativeElement.querySelector('.sb-control-navigation')], 'e-view')
        }
        this.hideAllPopups();
        this.updatePropertyPanel();

        addClass([this.mobileOverlay], 'sb-hide');
    }

    hideAllPopups() {
        this.themePopup.hide();
        this.sdkPopup.hide();
        this.settingsPopup.hide();
        this.switcherPopup.hide();
    }

    updateViewMode() {
        this.isMobile = window.matchMedia('(max-width:550px)').matches;
        this.isTablet = window.matchMedia('(min-width:550px) and (max-width: 850px)').matches;
        this.isDesktop = window.matchMedia('(min-width:850px)').matches;
        this.currentViewMode = this.isMobile ? 'mobile' : this.isTablet ? 'tablet' : 'desktop';
        this.previousViewMode = this.previousViewMode === '' ? this.currentViewMode : this.previousViewMode;
        this.viewModeChanged = this.currentViewMode !== this.previousViewMode;
        this.previousViewMode = this.currentViewMode;
    }


    onSBResize(event: any) {
        this.updateViewMode();
        clearTimeout(this.resizeTimer);
        if (!this.resizeManualTrigger && this.viewModeChanged) {
            this.setResponsive();
        }
    }

    onDocClick(e: Event) {
        if (closest(<Element>e.target, '.theme-wrapper') === null && this.themePopup.element.classList.contains('e-popup-open')) {
            this.themePopup.hide();
        }
        if (closest(<Element>e.target, '.sdk-wrapper') === null && this.sdkPopup.element.classList.contains('e-popup-open')) {
            this.sdkPopup.hide();
        }
        if (closest(<Element>e.target, '.sb-setting-btn') === null &&
            this.settingsPopup.element.classList.contains('e-popup-open')) {
            if (this.isMobile) {
                if (closest(<Element>e.target, '.e-popup') === null) {
                    this.settingsPopup.hide({ name: 'SlideRightOut', duration: 400 });
                }
            } else {
                if (e.target) {
                    if ((e.target as any).classList && ((e.target as any).classList.contains('e-ddl') || closest(<Element>e.target, '.sb-setting-popup'))) {
                        this.settingsPopup.show();
                    }
                    else {
                        this.settingsPopup.hide();
                    }
                }
            }
        }
        if (closest(<Element>e.target, '.sb-lang-toggler-wrapper') === null && this.switcherPopup.element.classList.contains('e-popup-open')) {
            this.switcherPopup.hide();
        }
    }

    wireEvents() {
        select('#header-theme-switcher').addEventListener('click', this.onThemeButtonClick.bind(this));
        select('#header-sdk-switcher').addEventListener('click', this.onSdkButtonClick.bind(this));
        select('.setting-responsive').addEventListener('click', this.onMouseTouchButtonClick.bind(this));
        select('#sb-switcher').addEventListener('click', this.onSwitcherClick.bind(this));
        select('.sb-header-text-right').addEventListener('click', this.onSwitcherClick.bind(this));
        select('.sb-setting-btn').addEventListener('click', this.onOpenPreferenceButtonClick.bind(this));
        select('.sb-header-settings').addEventListener('click', this.onOpenPreferenceButtonClick.bind(this));
        select('#prev-sample').addEventListener('click', this.onPrevButtonClick.bind(this));
        select('#next-sample').addEventListener('click', this.onNextButtonClick.bind(this));
        select('#sb-toggle-left').addEventListener('click', this.onNavButtonClick.bind(this));
        select('.sb-mobile-setting').addEventListener('click', this.toggleMobilePropertyPanel.bind(this));
        select('.sb-settings').addEventListener('click', this.onSearchButtonClick.bind(this));
        select('.e-search-overlay').addEventListener('click', this.onSearchOverlayClick.bind(this));
        select('.close-button').addEventListener('click', this.onCloseButtonClick.bind(this));
        this.mobileOverlay.addEventListener('click', this.onMobileOverlayClick.bind(this));
        this.themeDarkButton.addEventListener('click', this.darkSwitch.bind(this));
        window.addEventListener('resize', this.onSBResize.bind(this));
        document.addEventListener('click', this.onDocClick.bind(this));
        document.getElementById('themelist').addEventListener('click', this.onChangeTheme.bind(this));
        document.getElementById('sdklist').addEventListener('click', this.handleSdkSelection.bind(this));
        document.addEventListener('keydown',(e:KeyboardEvent)=> {
            if(e.keyCode==27){
               document.querySelector('.e-search-overlay').classList.add('sb-hide');
            }
        });
    }

    onCloseButtonClick(): void {
        let banner = document.querySelector('.sb-header1');
        if (banner) {
            banner.classList.add('sb-hide');
        }
    }

    onPrevButtonClick(): void {
        this.prevControl = this.currentControl;
        // Use filtered route order based on the active SDK filter
        const filteredRoutes: string[] = this.getActiveSdkSampleOrder(this.pathRoutes);
        let currentIndex: number = filteredRoutes.indexOf(this.getHash());
        if ((currentIndex) <= 1) {
        }
        let prevList: string = filteredRoutes[currentIndex - 1];
        if (currentIndex !== 0 && currentIndex !== -1 && prevList) {
            window.isInteractedList = false;
            this.router.navigateByUrl(prevList);
        }
        setTimeout(function(){
            select('li.e-list-item.e-level-1.e-active').scrollIntoView({block:"nearest"});
            },100);

    }

    onNextButtonClick(): void {
        this.prevControl = this.currentControl;
        // Use filtered route order based on the active SDK filter
        const filteredRoutes: string[] = this.getActiveSdkSampleOrder(this.pathRoutes);
        let currentIndex: number = filteredRoutes.indexOf(this.getHash());
        let nextList: string = filteredRoutes[currentIndex + 1];
        if (currentIndex !== (filteredRoutes.length - 1) && currentIndex !== -1 && nextList) {
            window.isInteractedList = false;
            this.router.navigateByUrl(nextList);
        }
        setTimeout(function(){
            select('li.e-list-item.e-level-1.e-active').scrollIntoView({block:"nearest"});
            },100);

    }


    onNavButtonClick(e: any) {
        document.querySelector('.e-search-overlay').classList.add('sb-hide');
        if (this.isMobile) {
            this.toggleLeftPane(e);
        } else {
            if (isVisible(this.leftControl.ngEle.nativeElement)) {
                this.toggleLeftPaneOnDesktop(true);
            } else {
                this.toggleLeftPaneOnDesktop(e);
            }
        }

    }

    onMobileOverlayClick() {
        this.toggleLeftPane(true);
        this.toggleMobilePropertyPanel(true);
        this.settingsPopup.hide({ name: 'SlideRightOut', duration: 400 });
    }

    onSearchButtonClick(): void {
        (this.searchBox as any).clear();
        document.querySelector('.e-search-overlay').classList.remove('sb-hide');
    }

    onSearchOverlayClick(e: any): void {
        if (!e.target.classList.contains('e-autocomplete')) {
            document.querySelector('.e-search-overlay').classList.add('sb-hide');

        }
    }

    onMouseTouchButtonClick(e: Event) {
        this.setMouseOrTouch((e.target as Element).innerHTML.toLowerCase());
    }

    onOpenPreferenceButtonClick(e: Event) {
        document.querySelector('.e-search-overlay').classList.add('sb-hide');
        if (this.isMobile) {
            this.settingsPopup.position = { X: document.body.offsetWidth - 280, Y: 0 };
            this.settingsPopup.show({
                name: 'SlideRightIn',
                duration: 400

            });
        } else {
            if (this.settingsPopup.element.classList.contains('e-popup-open')) {
                this.settingsPopup.hide();
            } else {
                this.settingsPopup.show();
            }
        }
        this.mobileOverlay.classList.remove('sb-hide');
    }

    onSwitcherClick(e: Event) {
        document.querySelector('.e-search-overlay').classList.add('sb-hide');
        this.switcherPopup.show();
    }

    onThemeButtonClick(e: Event) {
        document.querySelector('.e-search-overlay').classList.add('sb-hide');
        this.themePopup.show();
    }

    onSdkButtonClick(e: Event) {
        document.querySelector('.e-search-overlay').classList.add('sb-hide');
        this.sdkPopup.show();
    }

    onChangeTheme(e: Event) {
        let target: Element = <HTMLElement>e.target;
        target = closest(target, '.e-list');
        let themeName: string = target.id;
        this.switchTheme(themeName);
        this.themePopup.hide();
    }

    public getAiSdkFirstSample(): string {
        const activeItem: Element | null = document.querySelector('#sdklist li.active');
        if (!activeItem) {
            return '';
        }
        const sdkKey: string = activeItem.getAttribute('data-sdk') || 'all';
        return aiSdkFirstSample[sdkKey] || '';
    }

    public getActiveSdkSampleOrder(fullOrder: string[]): string[] {
        const activeItem: Element | null = document.querySelector('#sdklist li.active');
        if (!activeItem) {
            return fullOrder;
        }
        const sdkKey: string = activeItem.getAttribute('data-sdk') || 'all';
        if (sdkKey === 'all') {
            return fullOrder;
        }
        const allowedControls: string[] = sdkControlMap[sdkKey] || [];
        if (!allowedControls.length) {
            return fullOrder;
        }

        return fullOrder.filter((routePath: string) => {
            const parts: string[] = routePath.split('/');
            // Skip ':theme' segment so control is at index 1
            const controlName: string = (parts[0] === ':theme' ? parts[1] : parts[0]) || '';
            return allowedControls.indexOf(controlName) !== -1;
        });
    }

    public getAllowedControlsForSdk(sdkKey: string): string[] {
    if (!sdkKey || sdkKey === 'all') { return []; }
    return sdkControlMap[sdkKey] || [];
}

    public openProductSdkInNewTab(key: string): void {
    let url: string = '';
    if (key === 'pdf') {
        url = `https://document.syncfusion.com/demos/pdf-viewer/angular/#/tailwind3/pdfviewer/default.html`;
    } else if (key === 'spreadsheet') {
        url = `https://document.syncfusion.com/demos/spreadsheet-editor/angular/#/tailwind3/spreadsheet/default.html`;
    } else if (key === 'docx') {
        url = `https://document.syncfusion.com/demos/docx-editor/angular/#/tailwind3/document-editor/default.html`;
    }
    if (url) {
        window.open(url, '_blank');
    }
}

    public handleSdkSelection(e: MouseEvent): void {
        let target: Element = e.target as HTMLElement;
        target = closest(target, 'li');
        if (!target) {
            return;
        }

        const sdkKey: string = target.getAttribute('data-sdk') || 'all';

        const productSdkKeys: string[] = ['pdf', 'spreadsheet', 'docx'];
        if (productSdkKeys.indexOf(sdkKey) !== -1) {
        this.sdkPopup.hide();
        this.openProductSdkInNewTab(sdkKey);
        return;
    }

        // Update active highlight
        const sdkList: HTMLElement | null = document.getElementById('sdklist');
        if (sdkList) {
            sdkList.querySelectorAll('li').forEach((li: Element) => li.classList.remove('active'));
            target.classList.add('active');
        }

        // Update button label
        const sdkTextSpan: HTMLElement | null = document.querySelector('#sb-sdk-text .sb-header-text-left');
        if (sdkTextSpan) {
            const selectedText: string = (<HTMLElement>select('.switch-text', <HTMLElement>target))?.textContent || 'ALL DEMOS';
            sdkTextSpan.textContent = sdkKey === 'all' ? 'ALL DEMOS' : selectedText.toUpperCase();
        }

        // Apply filter / navigate
        this.processSdkSelection(sdkKey);

        // Close the popup
        this.sdkPopup.hide();
    }

    /**
     * Mobile SDK Selection Handler — invoked by the mobile Drawer
     * DropDownList. Keeps the desktop header popup list in sync, then
     * delegates to processSdkSelection().
     */
    public handleSdkSelectionMobile(e: any): void {
        const sdkKey: string = (e.itemData && (e.itemData.value || e.itemData.id)) || e.value || 'all';
        const productSdkKeys: string[] = ['pdf', 'spreadsheet', 'docx'];

        if (productSdkKeys.indexOf(sdkKey) !== -1) {
            this.openProductSdkInNewTab(sdkKey);
            return;
        }
        // Update active highlight in the header popup list
        const sdkList: HTMLElement | null = document.getElementById('sdklist');
        if (sdkList) {
            sdkList.querySelectorAll('li').forEach((li: Element) => li.classList.remove('active'));
            const activeItem: Element | null = sdkList.querySelector(`[data-sdk="${sdkKey}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        }

        // Update button label
        const sdkTextSpan: HTMLElement | null = document.querySelector('#sb-sdk-text .sb-header-text-left');
        if (sdkTextSpan) {
            const activeItem: Element | null = sdkList ? sdkList.querySelector(`[data-sdk="${sdkKey}"]`) : null;
            const selectedText: string = activeItem
                ? (<HTMLElement>select('.switch-text', <HTMLElement>activeItem))?.textContent || 'ALL DEMOS'
                : 'ALL DEMOS';
            sdkTextSpan.textContent = sdkKey === 'all' ? 'ALL DEMOS' : selectedText.toUpperCase();
        }

        this.processSdkSelection(sdkKey);
    }

    public processSdkSelection(sdkKey: string): void {
    // current path without '#/<theme>/' prefix, used to compare against the SDK's default sample path
    const currentHash: string = location.hash || '';
    const themeFromHash: string = currentHash.split('/')[1] || '';
    const themeToUse: string = (selectedTheme && selectedTheme !== 'tailwind3') || !themeFromHash
        ? (selectedTheme || 'tailwind3')
        : themeFromHash;

    // Compute SDK default route (no leading '#')
    const defaultPath: string = (sdkDefaultPaths as any)[sdkKey];
    const samplePathOnly: string = location.hash
        .replace(/^#\/[^\/]+\//, '')
        .replace(/\.html$/i, '');
    const shouldRedirect: boolean = !!defaultPath && samplePathOnly !== defaultPath;

    // Persist SDK state
    localStorage.setItem('selectedSdk', sdkKey);
    this.currentSdk = sdkKey;
    this.leftControl.applySdkFilter(sdkKey);
    const controlTree: HTMLElement =this.leftControl.ngEle.nativeElement.querySelector('#controlTree');
    const controlSamples: HTMLElement =this.leftControl.ngEle.nativeElement.querySelector('#controlSamples');
    if (controlTree && !controlTree.classList.contains('sb-hide')) {
            this.leftControl.viewSwitch(controlTree, controlSamples);
        }
    if (!shouldRedirect) {
        return;
    }
    const newRoutePath: string = `${themeToUse}/${defaultPath}`;
    if (location.hash.replace(/^#/, '') !== newRoutePath) {
        this.router.navigateByUrl(newRoutePath);
    }
    this.leftControl.applySdkFilter(sdkKey);
}



    getComponentData(path: string): any {
        if ( path && path.startsWith('ai-') && !['ai-assistview', 'ai-smart-paste', 'ai-smart-textarea'].includes(path)) {
            path = 'ai-grid';
        }
        let sList: any[] = samplesList;
        return sList.filter((data): boolean => {
            if (data.path == path) {
                return true;
            } else {
                return false;
            }
        })[0];
    }

    updateListViewDS(): void {
        this.leftControl.updateListViewDataSource();
    }

    setListItemSelect(): void {
        const listItems: any = document.querySelectorAll('#controlList .e-list-item.e-level-1');
        for (const listItem of listItems) {
            listItem.tabIndex = 0;
        }
        let path: string[] = location.hash.split('/');
        path.splice(0, 2);
        let ele: Element = document.querySelector('[data-path="/:theme/' + path.join('/') + '"]')
        this.leftControl.listComponent.selectItem(ele);
    }

    setPropertyBorder() {
        if (this.isDesktop) {
            let propertypane: HTMLElement = <any>select('.property-section');
            let ele: HTMLElement = <any>document.querySelector('.control-section > .col-lg-8');
            if (ele && propertypane) {
                ele.insertAdjacentHTML('afterend', '<div id="#sb-sample-splitter"></div>');
            }
        }
    }

    setThemeItemActive(theme: string) {
        if (!document.body.classList.contains(theme.includes('bootstrap5') ? theme.replace('bootstrap5', 'bootstrap5.3') : theme)) {
            this.isContentLoaded = false;
            this.hideShowSBLoader();
        }
        let actElement: Element = select('#themelist .active');
        let darkChange:string;
        if (actElement) {
            actElement.classList.remove('active')
        }
        if(!theme.includes('-dark')){
            select('#' + theme).classList.add('active');
          }
          else{
            select('#'+theme.replace('-dark','')).classList.add('active');
         }
        this.themeDropDown.value = theme;
        document.body.classList.add(theme.includes('bootstrap5') ? theme.replace('bootstrap5', 'bootstrap5.3') : theme);
    }

    setMouseOrTouch(str: string, reload?: boolean): void {
        let activeEle: Element = document.querySelector('.setting-responsive .active');
        if (activeEle) {
            activeEle.classList.remove('active');
        }
        this.addPointerClass(str);
        if (localStorage.getItem('pointer') !== str && reload !== false) {
            location.reload();
        }
        localStorage.setItem('pointer', str)
    }

    addPointerClass(str: string): void {
        if (str === 'mouse') {
            document.body.classList.remove('e-bigger');
        } else {
            document.body.classList.add('e-bigger');
        }
        document.querySelector('.setting-responsive #' + str).classList.add('active');
    }

    setResponsive(): void {
        this.updateStaticView();
        addClass([this.mobileOverlay], 'sb-hide');
    }

    updatePropertyPanel(): void {
        let propPanel: Element = document.querySelector('.property-section');
        let propIcon: Element = document.querySelector('.sb-mobile-setting');
        addClass([propIcon], 'sb-hide');
        if (propPanel) {
            if (this.isMobile) {
                addClass([propPanel], 'sb-hide');
                propIcon.classList.remove('sb-hide');
            }
            else {
                propPanel.classList.remove('sb-hide');
            }
        }
    }


    toggleMobilePropertyPanel(close?: boolean): void {
        if (this.isMobile !== true) {
            return;
        }
        let propPanel: HTMLElement = <HTMLElement>document.querySelector('.property-section');
        if (propPanel) {
            let pClose: boolean = !propPanel.classList.contains('sb-hide');
            if (close === true || pClose) {
                this.aniObject.animate(propPanel, {
                    name: 'SlideRightOut',
                    duration: 400,
                    end: () => {
                        addClass([propPanel], 'sb-hide');
                        addClass([this.mobileOverlay], 'sb-hide');
                    }
                });
            } else {
                propPanel.classList.remove('sb-hide');
                this.aniObject.animate(propPanel, {
                    name: 'SlideRightIn',
                    duration: 400,
                    end: () => {
                        this.mobileOverlay.classList.remove('sb-hide');
                        propPanel.classList.remove('sb-hide');
                    }
                });
            }
        }

    }

    toggleLeftPane(close?: boolean) {
        if (this.isMobile !== true) {
            return;
        }
        if (close === true || isVisible(this.leftControl.ngEle.nativeElement)) {
            this.closeLeftPane();
        } else {
            this.leftControl.ngEle.nativeElement.style.display = '';
            this.aniObject.animate(this.leftControl.ngEle.nativeElement, {
                name: 'SlideLeftIn'
            });
            if (this.mobileOverlay.classList.contains('sb-hide')) {
                this.mobileOverlay.classList.remove('sb-hide');
            }
        }
    }

    toggleLeftPaneOnDesktop(close?: boolean) {
        let reverse: any = getComputedStyle(select('#left-sidebar')).display;
        if (reverse === 'none') {
            select('#sb-toggle-left').classList.add('toggle-active');
            select('#sb-toggle-left').setAttribute('aria-expanded', 'true');
        } else {
            select('#sb-toggle-left').classList.remove('toggle-active');
            select('#sb-toggle-left').setAttribute('aria-expanded', 'false');
        }

        let rightPane: HTMLElement = <HTMLElement>select('.sb-right-pane');
        if (this.isTablet === true || this.isDesktop === true) {
            if (close === true) {
                addClass([rightPane], 'sb-animate-left');
                rightPane.style.left = '0px';
                this.aniObject.animate(this.leftControl.ngEle.nativeElement, {
                    name: 'SlideLeftOut', end: (): void => {
                        this.leftControl.ngEle.nativeElement.style.display = 'none';
                        rightPane.classList.remove('sb-animate-left');
                        this.resizeManualTrigger = true;
                        window.dispatchEvent(new Event('resize'));
                        if (Browser.isDevice) {
                            window.dispatchEvent(new Event('orientationchange'));
                        }
                        this.resizeManualTrigger = false;
                    }
                });
            } else {
                this.leftControl.ngEle.nativeElement.style.display = '';
                rightPane.style.left = '';
                addClass([rightPane], 'sb-animate-left');
                this.aniObject.animate(this.leftControl.ngEle.nativeElement, {
                    name: 'SlideLeftIn', end: (): void => {
                        rightPane.classList.remove('sb-animate-left');
                        this.resizeManualTrigger = true;
                        window.dispatchEvent(new Event('resize'));
                        if (Browser.isDevice) {
                            window.dispatchEvent(new Event('orientationchange'));
                        }
                        this.resizeManualTrigger = false;
                    }
                });
            }
        }

    }

    closeLeftPane(): void {
        if (this.isMobile !== true) {
            return;
        }

        this.aniObject.animate(this.leftControl.ngEle.nativeElement, {
            name: 'SlideLeftOut',
            end: (e: AnimationOptions) => {
                e.element.style.display = 'none';
            }
        });

        if (!this.mobileOverlay.classList.contains('sb-hide')) {
            this.mobileOverlay.classList.add('sb-hide');
        }
    }

    setScrollTop() {
        const rightPane: HTMLElement = <HTMLElement>select('.sb-right-pane');
        if (this.isMobile) {
            rightPane.scrollTop = 74;
        } else {
            rightPane.scrollTop = 0;
        }
    }

    updateSourceCode(path: string): void {
        let pathArray: string[] = path.split('/');
        pathArray = pathArray.slice(2);
                const isAISamples: boolean = /ai-(?!assistview\b)[a-z-]+/.test(pathArray[0]) ||  /^ai-.*/.test(pathArray[1]);
        const desktopSettings: HTMLElement = select('.sb-desktop-setting') as HTMLElement;
        if (!Browser.isDevice && desktopSettings) {
            desktopSettings.style.display = isAISamples ? 'none' : '';
        }
        const localPath: string = './source/' + pathArray.join('/');
        const items: object[] = [];
        const observableCollection = isAISamples ? [localPath + '.component.ts'] : [localPath + '.html', localPath + '.component.ts', localPath + '-stackb.json'];
        if (this.sourceFiles.files.length) {
            let splitPath: string[] = localPath.split('/');
            splitPath.splice(splitPath.length - 1)[0];
            const resPath: string = splitPath.join('/');
            for (const name of this.sourceFiles.files) {
                observableCollection.push(resPath + '/' + name);
            }
            this.sourceFiles.files = [];
        }
        for (let res of observableCollection) {
            this.http.get(res, { responseType: 'text' }).subscribe(
                (result: any) => {
                    const splitUrl: string[] = res.split('/');
                    const fileName: string = splitUrl[splitUrl.length - 1];
                    const fileSplit: string[] = fileName.split('.');
                    const type: string = typeMapper[fileSplit[fileSplit.length - 1]];
                    let content: string = result;
                    if (/html/g.test(fileName)) {
                        content = this.getStringWithOutDescription(content, /(\'|\")description/g);
                        content = this.getStringWithOutDescription(content, /(\'|\")action-description/g)
                    }
                    if (!/-stackb\.json/g.test(fileName)) {
                        content = content.replace(/&/g, '&amp;')
                            .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                        items.push({
                            header: { text: fileName },
                            data: content,
                            content: fileName
                        });
                    } else {
                        this.plunker(result);
                    }
                });
        }
        this.sourceTabItems = items;
        let sampleIndex = this.pathRoutes.indexOf(this.getHash());
        let samLength: number = this.leftControl.listData.length - 1;
        if (sampleIndex === samLength) {
            this.toggleButtonState('next-sample', true);
        } else {
            this.toggleButtonState('next-sample', false);
        }
        if (sampleIndex === 0) {
            this.toggleButtonState('prev-sample', true);
        } else {
            this.toggleButtonState('prev-sample', false);
        }
    }

    hideWaitingPopup(): void {
        // document.body.classList.remove('sb-overlay');
        // document.querySelector('.sb-loading').classList.add('hidden');
    }

    getStringWithOutDescription(code: string, descRegex: RegExp): string {
        const lines: string[] = code.split('\n');
        let desStartLine: number = null;
        let desEndLine: number = null;
        let desInsideDivCnt: number = 0;
        for (let i: number = 0; i < lines.length; i++) {
            const curLine: string = lines[i];
            if (desStartLine) {
                if (/<div/g.test(curLine)) {
                    desInsideDivCnt = desInsideDivCnt + 1;
                }
                if (desInsideDivCnt && /<\/div>/g.test(curLine)) {
                    desInsideDivCnt = desInsideDivCnt - 1;
                } else if (!desEndLine && /<\/div>/g.test(curLine)) {
                    desEndLine = i + 1;
                }
            }
            if (descRegex.test(curLine)) {
                desStartLine = i;
            }
        }
        if (desEndLine && desStartLine) {
            lines.splice(desStartLine, desEndLine - desStartLine);
        }
        return lines.join('\n');
    }

    createOpenNewButton(): void {
        let samplePath = this.router.url.split('/').splice(2);
        if (samplePath.length === 3) {
            samplePath.splice(1, 1);
        }
        (select('#openNew') as HTMLFormElement)['href'] =
            location.href.split('#')[0] + samplePath.join('/');
    }

    plunker(results: string): void {
        const plnkr: { [key: string]: Object } = JSON.parse(results);
        const prevForm: Element = select('#plnkr-form');
        if (prevForm) {
            detach(prevForm);
        }
        const form: HTMLFormElement = <HTMLFormElement>createElement('form');
        const res: string = ((location.href as any).includes('ej2.syncfusion.com') ? 'https:' : 'http:') + '//plnkr.co/edit/?p=preview';
        form.setAttribute('action', 'https://stackblitz.com/run');
        form.setAttribute('method', 'post');
        form.setAttribute('target', '_blank');
        form.id = 'plnkr-form';
        form.style.display = 'none';
        document.body.appendChild(form);
        const plunks: string[] = Object.keys(plnkr);
        for (let x: number = 0; x < plunks.length; x++) {
            if (plunks[x] !== 'dependencies.json' && plunks[x] !== 'index.html' && plunks[x] !== 'main.ts') {
                const ip: HTMLElement = createElement('input');
                ip.setAttribute('type', 'hidden');
                ip.setAttribute('value', <string>plnkr[plunks[x]]);
                ip.setAttribute('name', 'project[files][' + plunks[x] + ']');
                form.appendChild(ip);
            } else if (plunks[x] === 'index.html') {
                const theme = <string>location.hash.split('/')[1];
                const indexContent = <string>plnkr[plunks[x]].toString().replace('{{:theme:}}', theme);
                const ip: HTMLElement = createElement('input');
                ip.setAttribute('type', 'hidden');
                ip.setAttribute('value', indexContent);
                ip.setAttribute('name', 'project[files][' + plunks[x] + ']');
                form.appendChild(ip);
            } else if (plunks[x] === 'main.ts') {
                const theme = <string>location.hash.split('/')[1];
                let mainContent = theme === 'material' ? <string>plnkr[plunks[x]].toString().replace('enableRipple((window as any).ripple);', 'enableRipple(true);') :
                    <string>plnkr[plunks[x]].toString().replace('enableRipple((window as any).ripple);', '');
                const ip: HTMLElement = createElement('input');
                ip.setAttribute('type', 'hidden');
                ip.setAttribute('value', mainContent);
                ip.setAttribute('name', 'project[files][' + plunks[x] + ']');
                form.appendChild(ip);
            } else {
                const ip: HTMLElement = createElement('input');
                ip.setAttribute('type', 'hidden');
                ip.setAttribute('value', <string>plnkr[plunks[x]]);
                ip.setAttribute('name', 'project[dependencies]');
                form.appendChild(ip);
            }
        }
        const template: HTMLElement = document.createElement('input');
        template.setAttribute('type', 'hidden');
        template.setAttribute('name', 'project[template]');
        template.setAttribute('value', 'angular-cli');
        form.appendChild(template);

        document.getElementById('open-plnkr').addEventListener('click', () => { form.submit(); });
    }

    getHash(): string {
        let hash: string[] = location.hash.split('/');
        hash = hash.slice(2);
        return ':theme/' + hash.join('/');
    }
}

function loadTheme(theme: string): void {
    theme = theme.includes('bootstrap5') ? theme.replace('bootstrap5', 'bootstrap5.3') : theme;
    selectedTheme = theme;
    let isMobile: boolean = window.matchMedia('(max-width:550px)').matches;
    if (darkIgnore.indexOf(theme) !== -1) {
        if(document.getElementById('sb-dark-theme')){
        document.getElementById('sb-dark-theme').style.display = "none";
    }
        document.getElementById("mobiledarkswitch")!.style.display = "none";
    }
    if(!isMobile){
        if (!theme.includes('-dark')) {
            document.getElementById('sb-dark-span').innerHTML = "DARK";
            document.getElementById("dark-icon")!.style.display = "inline-block";
        }
        else {
            document.getElementById('sb-dark-span').innerHTML = "LIGHT";
            document.getElementById("light-icon")!.style.display = "inline-block";
        }
    }
    const ajax: Ajax = new Ajax('./styles/' + theme + '.css', 'GET', true);
    ajax.send().then((result: any) => {
        const doc: HTMLFormElement = <HTMLFormElement>select('#themelink');
        doc['href'] = './styles/' + theme + '.css';
        // select('#themeswitcher-icon').setAttribute('src', 'styles/images/SB_icon/SB_Switcher_icon_' + theme + '.png');
        themeFlag = false;
    });

}

function hideLoader(): void {
    // document.querySelector('.sb-loading').classList.add('hidden');
    // let overlay: Element = select('#overlay');
    // if (overlay) {
    //     detach(overlay);
    // }
}

function closeSbList(): void {
    const sbList: any = select('#sb-list');
    sbList.ej2_instances[0].hide();
    select('#change-sb').classList.remove('active');
}

window.onload = () => {
    hideLoader();
};
