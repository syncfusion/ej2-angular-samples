import { Component, ElementRef, HostListener, Inject, Input, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import {
    select, selectAll, isVisible, createElement, Ajax,
    L10n, loadCldr, setCulture, setCurrencyCode, closest, classList
} from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList, AutoComplete } from '@syncfusion/ej2-dropdowns';
import { Http, Response } from '@angular/http';
import { Browser, addClass, enableRipple, detach, Animation, AnimationOptions } from '@syncfusion/ej2-base';
import { Popup, Tooltip } from '@syncfusion/ej2-popups';
import { Tab, Accordion } from '@syncfusion/ej2-navigations';
import { Locale } from './locale-string';
import { samplesList } from './samplelist';
import { LPController, MyWindow } from './lp.component';
import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-angular-lists';
import { Observable, forkJoin } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import numberSystem from './cldr-data/supplemental/numberingSystems.json';
import currencyData from './cldr-data/supplemental/currencyData.json';
import de from './cldr-data/main/de/all.json';
import ar from './cldr-data/main/ar/all.json';
import frch from './cldr-data/main/fr-CH/all.json';
import zh from './cldr-data/main/zh/all.json';

loadCldr(
    numberSystem,
    currencyData,
    de, ar, frch, zh
);

interface DestroyMethod extends HTMLElement {
    destroy: Function;
    ej2_instances: Object[];
    enableRtl: Boolean;
}

declare let window: MyWindow;
const sbObj: { [index: string]: string } = { 'react': 'react', 'javascript': 'javascript', 'vue': 'vue', 'blazor': 'blazor' }
const sbArray: string[] = ['react', 'ts', 'javascript', 'asp_core', 'asp_mvc', 'vue', 'blazor'];
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
    '<li class="open"><a id="openNew" target="_blank"><div class="openIcon e-icons"></div></a></li>';
const themes: string[] = ['material', 'fabric', 'bootstrap', 'highcontrast', 'bootstrap4'];
let selectedTheme: string;
let themeFlag: boolean = true;
let slideFlag: boolean = false;


declare let hljs: any;
/**
 * App Controller
 */
@Component({
    selector: 'ng-app',
    templateUrl: 'page.html',
    providers: []
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
    public themeDropDown: DropDownList;
    public currencyDropDown: DropDownList;
    public cultureDropDown: DropDownList;
    public isTablet: boolean;
    public isMobile: boolean;
    public isDesktop: boolean;
    public isInitialRender: boolean = true;
    public footer: Element;
    public aniObject: Animation = new Animation({ duration: 400 });
    public mobileOverlay: Element;
    public searchBox: AutoComplete;
    public loader: Element;
    public resizeManualTrigger: boolean = false;
    public currentViewMode: string = '';
    public previousViewMode: string = '';
    public viewModeChanged: boolean = false;
    public resizeTimer: number = 0;
    public prevSampleName: string = '';
    public prevControlName: string = '';

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
        private activatedRoute: ActivatedRoute, private http: Http) {
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

        this.themeDropDown = new DropDownList({
            index: 0,
            change: (e: any) => { this.switchTheme(e.value); }
        });
        this.cultureDropDown = new DropDownList({
            index: 0,
            zIndex: 1005,
            change: (e: any) => {
                let value: string = e.value;
                this.currencyDropDown.value = matchedCurrency[value];

                setCulture(e.value);
                if (value == "ar") {
                    this.changeRtl(true);
                } else {
                    this.changeRtl(false);
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
        let openNewTemplate: string = `<div class="sb-custom-item sb-open-new-wrapper"><a id="openNew" target="_blank">
        <div class="sb-icons sb-icon-Popout"></div></a></div>`;
        // tslint:disable-next-line:no-multiline-string
        let sampleNavigation: string = `<div class="sb-custom-item sample-navigation"><button id='prev-sample' class="sb-navigation-prev">
        <span class='sb-icons sb-icon-Previous'></span>
        </button>
        <button  id='next-sample' class="sb-navigation-next">
        <span class='sb-icons sb-icon-Next'></span>
        </button>
        </div>`;
        let plnrTemplate: string = '<span class="sb-icons sb-icons-plnkr"></span><span class="sb-plnkr-text">Edit in StackBlitz</span>';
        // tslint:disable-next-line:no-multiple-var-decl
        let contentToolbarTemplate: string = '<div class="sb-desktop-setting"><button id="open-plnkr" class="sb-custom-item sb-plnr-section">' +
            plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter +
            '</div>' + sampleNavigation + '<div class="sb-icons sb-mobile-setting"></div>';

        let tabContentToolbar: Element = createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
        let tabHeader: Element = document.getElementById('sb-content-header');
        tabHeader.appendChild(tabContentToolbar);

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

        this.settingsPopup = new Popup(document.getElementById('settings-popup'), {
            offsetY: 5,
            relateTo: <any>select('.sb-setting-btn'),
            position: { X: 'right', Y: 'bottom' }
            , collision: { X: 'flip', Y: 'flip' },
            zIndex: 1002,
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
        this.router.events.pipe(
            filter((event: NavigationStart) => event instanceof NavigationStart)
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
                    theme = themes.indexOf(theme) !== -1 ? theme : 'material';
                    document.getElementById(theme).classList.add('active-theme');
                    loadTheme(theme);
                }
            });

        this.router.events
            .pipe(filter((event: NavigationEnd) => event instanceof NavigationEnd))
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
                this.setListItemSelect();
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
                this.setScrollTop();
                if (this.prevSampleName !== this.sampleName || this.currentControl !== this.prevControlName) {
                    this.updateDescription();
                }
            });

        this.router.events
            .pipe(filter((event: NavigationEnd) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                let hash: string[] = location.hash.split('/');
                if (!document.querySelector('.active-theme')) {
                    document.getElementById(hash[1] || 'material').classList.add('active-theme');
                }
                hash[1] = document.querySelector('.active-theme').id;
                enableRipple(hash[1] === 'material');
                let href: string = location.href.split('#')[0];
                history.replaceState({}, 'theme', href + hash.join('/'));
                this.setThemeItemActive(location.hash.split('/')[1]);
                this.setSbLink();
                this.hideShowSBLoader(true);
                let mT: string = localStorage.getItem('pointer') || 'mouse';
                if (Browser.isDevice) {
                    mT = 'touch';
                }
                if (mT) {
                    this.setMouseOrTouch(select('#' + mT).innerHTML.toLowerCase(), false);
                    localStorage.removeItem('pointer');
                }
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
        for (let sb of sbArray) {
            let ele: HTMLFormElement = (select('#' + sb) as HTMLFormElement);
            if (sb === 'aspnetcore' || sb === 'aspnetmvc') {
                ele.href = sb === 'aspnetcore' ? 'https://ej2.syncfusion.com/aspnetcore/' : 'https://ej2.syncfusion.com/aspnetmvc/';
            }
            else if (sb === 'blazor') {
                ele.href = 'https://blazor.syncfusion.com/demos/';
            }
            else {
                ele.href = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) :
                    ('https://ej2.syncfusion.com/')) +
                    (sbObj[sb] ? (sb + '/') : '') + 'demos/#/' + (sample ? (sample[1] + (sb !== 'typescript' ? '' : '.html')) : '');
            }
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
        this.cultureDropDown.appendTo('#sb-setting-culture');
        this.currencyDropDown.appendTo('#sb-setting-currency');
        this.searchBox.dataSource = this.leftControl.listData;
        this.searchBox.dataBind();
        this.searchBox.appendTo('#search-input');
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
        debugger
        let previous: Tooltip = new Tooltip({
            content: 'Previous Sample'
        });
        previous.appendTo('#prev-sample');

        let next: Tooltip = new Tooltip({
            content: 'Next Sample'
        });
        next.appendTo('#next-sample');
    }

    ngAfterContentChecked(): void {
        // Don't perform any more operations in this method.
        if (this.cultureDropDown.value == "ar") {
            this.changeRtl(true);
        }
        this.hideShowSBLoader(true);
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

    changeRtl(hide?: boolean): void {
        let elementlist: any = selectAll('.e-control', document.getElementById('control-content'));
        for (let control of elementlist) {
            let eleinstance: Object[] = (<DestroyMethod>control).ej2_instances;
            if (eleinstance) {
                for (let instance of eleinstance) {
                    (<DestroyMethod>instance).enableRtl = hide;
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
            hash[1] = str;
            location.hash = hash.join('/');
            if (document.querySelector('.sb-responsive-items.active').innerHTML.toLowerCase() === 'touch') {
                localStorage.setItem('pointer', document.querySelector('.sb-responsive-items.active').innerHTML.toLowerCase());
            }
            location.reload();
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
        if (closest(<Element>e.target, '.sb-setting-btn') === null &&
            this.settingsPopup.element.classList.contains('e-popup-open')) {
            if (this.isMobile) {
                if (closest(<Element>e.target, '.e-popup') === null) {
                    this.settingsPopup.hide({ name: 'SlideRightOut', duration: 400 });
                }
            } else {
                if (e.target) {
                    if ((e.target as any).classList && (e.target as any).classList.contains('e-ddl')) {
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
        this.mobileOverlay.addEventListener('click', this.onMobileOverlayClick.bind(this));
        window.addEventListener('resize', this.onSBResize.bind(this));
        document.addEventListener('click', this.onDocClick.bind(this));
        document.getElementById('themelist').addEventListener('click', this.onChangeTheme.bind(this));
    }

    onPrevButtonClick(): void {
        this.prevControl = this.currentControl;
        let currentIndex: number = this.pathRoutes.indexOf(this.getHash());
        if ((currentIndex) <= 1) {
        }
        let prevList: string = this.pathRoutes[currentIndex - 1];
        if (currentIndex !== 0 && currentIndex !== -1) {
            window.isInteractedList = false;
            this.router.navigateByUrl(prevList);
        }
    }

    onNextButtonClick(): void {
        this.prevControl = this.currentControl;
        let currentIndex: number = this.pathRoutes.indexOf(this.getHash());
        let nextList: string = this.pathRoutes[currentIndex + 1];
        if ((this.pathRoutes.length < currentIndex + 2)) {
        }
        if (currentIndex !== (this.pathRoutes.length - 1) && currentIndex !== -1) {
            window.isInteractedList = false;
            this.router.navigateByUrl(nextList);
        }
    }

    onNavButtonClick(e: any) {
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
        if (this.isMobile) {
            this.settingsPopup.show({
                name: 'SlideRightIn',
                duration: 400

            });
        } else {
            this.settingsPopup.show();
        }
        this.mobileOverlay.classList.remove('sb-hide');
    }

    onSwitcherClick(e: Event) {
        this.switcherPopup.show();
    }

    onThemeButtonClick(e: Event) {
        this.themePopup.show();
    }

    onChangeTheme(e: Event) {
        let target: Element = <HTMLElement>e.target;
        target = closest(target, '.e-list');
        let themeName: string = target.id;
        this.switchTheme(themeName);
        this.themePopup.hide();
    }

    getComponentData(path: string): any {
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
        let actElement: Element = select('#themelist .active');
        if (actElement) {
            actElement.classList.remove('active')
        }
        select('#' + theme).classList.add('active');
        this.themeDropDown.value = theme;
        document.body.classList.add(theme);
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
        } else {
            select('#sb-toggle-left').classList.remove('toggle-active');
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
        const localPath: string = './source/' + pathArray.join('/');
        const tsRequest: Observable<Response> = this.http.get(localPath + '.component.ts');
        const htmlRequst: Observable<Response> = this.http.get(localPath + '.html');

        const plunk: Observable<Response> = this.http.get(localPath + '-stackb.json');

        const observableCollection: Observable<Response>[] = [htmlRequst, tsRequest];
        if (this.sourceFiles.files.length) {
            let splitPath: string[] = localPath.split('/');
            splitPath.splice(splitPath.length - 1)[0];
            const resPath: string = splitPath.join('/');
            for (const name of this.sourceFiles.files) {
                observableCollection.push(this.http.get(resPath + '/' + name));
            }
            this.sourceFiles.files = [];
        }
        observableCollection.push(plunk);
        forkJoin(observableCollection).subscribe(
            (resultCollection: any) => {
                let count: number = 0;
                const items: object[] = [];
                for (const res of resultCollection) {
                    const splitUrl: string[] = res.url.split('/');
                    const fileName: string = splitUrl[splitUrl.length - 1];
                    const fileSplit: string[] = fileName.split('.');
                    const type: string = typeMapper[fileSplit[fileSplit.length - 1]];
                    let content: string = res._body;
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
                        this.plunker(res._body);
                    }

                    count++;
                }
                this.sourceTabItems = items;
                this.hideWaitingPopup();
                if (!select('#overlay')) {
                    hideLoader();
                }
            },
            (res: any) => {
                this.hideWaitingPopup();
            }
        );
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
        (select('#openNew') as HTMLFormElement).href =
            location.href.split('#')[0] + this.router.url.split('/').splice(2).join('/');
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
    selectedTheme = theme;
    const ajax: Ajax = new Ajax('./styles/' + theme + '.css', 'GET', true);
    ajax.send().then((result: any) => {
        const doc: HTMLFormElement = <HTMLFormElement>select('#themelink');
        doc.href = './styles/' + theme + '.css';
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
