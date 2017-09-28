import { Component, ElementRef, HostListener, Inject, Input, ViewChild } from '@angular/core';
import { Router,NavigationStart , NavigationEnd, ActivatedRoute } from '@angular/router';
import { select, isVisible, createElement, Ajax } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { Http, Response } from '@angular/http';
import { Browser, enableRipple, detach } from '@syncfusion/ej2-base';
import { samplesList } from './samplelist';
import { LPController, MyWindow } from './lp.component';
import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-ng-lists';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
declare let window: MyWindow;
const typeMapper: { [key: string]: string } = {
    ts: 'typescript',
    html: 'xml',
    css: 'css',
    json: 'json'
};
const idRegex: RegExp = /\{0\}/g;
const sourceHeader: string = '<li class="nav-item {2}" role="presentation"><a class="nav-link" target-content="{0}" role="tab" {1}>{0}</a></li>';
const sourcecontent: string = '<div class="tab-pane {2}" id="{0}" role="tabpanel" {4}><pre><code class="{3}">{1}</code></pre></div>';
const plnk: string = '<li class="plnk" style="float:right"><a id="plnkr">Open in Plunker</a></li>';
const themes: string[] = ['material', 'fabric', 'bootstrap'];
let selectedTheme: string;
let themeFlag: boolean = true;
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
    public controlList: { [key: string]: Object }[] = samplesList;
    private leftPan: HTMLElement;
    private contentPan: HTMLElement;
    public pathRoutes: string[] = [];
    public sampleName: string = '';
    public currentControl: string = '';
    public prevControl: string = '';
    public grpNavButton: HTMLElement;
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
        if (document.referrer && document.referrer.indexOf('syncfusion') === -1) {
            document.cookie = 'SampleSiteReferrer' + '=' + document.referrer + ';path=/;domain=syncfusion.com';
        }
    }

    onPrevClick(): void {
        this.prevControl = this.currentControl;
        this.enableNavClick();
        let currentIndex: number = this.pathRoutes.indexOf(this.getHash());
        if ((currentIndex) <= 1) {
            this.grpNavButton.children[0].classList.add('disabled');
        }
        let prevList: string = this.pathRoutes[currentIndex - 1];
        if (currentIndex !== 0 && currentIndex !== -1) {
            this.enableLoader();
            window.isInteractedList = false;
            this.router.navigateByUrl(prevList);
        }
    }

    enableLoader(): void {
        document.body.classList.add('sb-overlay');
        document.querySelector('.sb-loading').classList.remove('hidden');
    }

    setSelectListItemSelect(id: string): void {
        this.enableNavClick();
        let paths: string[] = this.pathRoutes;
        let path: string = ':theme/' + id;
        if (paths.length - 1 <= paths.indexOf(path)) {
            this.grpNavButton.children[1].classList.add('disabled');
        } else if (paths.indexOf(path) <= 0) {
            this.grpNavButton.children[0].classList.add('disabled');
        }
        if (!window.isInteractedList) {
            let listObj: any = this.leftControl.listObj;
            if (this.prevControl !== this.currentControl && listObj) {
                listObj.animation.duration = 0;
                listObj.back();
                listObj.selectItem({ 'id': this.currentControl });
            } else if (select('.e-content').children.length === 1) {
                listObj.selectItem({ 'id': this.currentControl });
            }
            id = ':theme/' + id;
            listObj.selectItem({ 'id': id });
            listObj.animation.duration = 400;
        }
    }

    onNextClick(): void {
        this.prevControl = this.currentControl;
        this.enableNavClick();
        let currentIndex: number = this.pathRoutes.indexOf(this.getHash());
        let nextList: string = this.pathRoutes[currentIndex + 1];
        this.grpNavButton.classList.add('disabled');
        if ((this.pathRoutes.length < currentIndex + 2)) {
            this.grpNavButton.children[1].classList.add('disabled');
        }
        this.scrollToElement(nextList);
        if (currentIndex !== (this.pathRoutes.length - 1) && currentIndex !== -1) {
            this.enableLoader();
            window.isInteractedList = false;
            this.router.navigateByUrl(nextList);
        }
    }
    enableNavClick(): void {
        this.grpNavButton.children[0].classList.remove('disabled');
        this.grpNavButton.children[1].classList.remove('disabled');
    }

    scrollToElement(attr: string): void {
        let scrollElement: HTMLElement = this.leftControl.ngEle.nativeElement.querySelector('#control-list');
        let curEle: HTMLElement = this.leftControl.ngEle.nativeElement.querySelector('[uid=\'' + attr + '\']');
        if (curEle && scrollElement.scrollHeight !== scrollElement.offsetHeight) {
            if (scrollElement.scrollHeight > scrollElement.offsetTop) {
                scrollElement.scrollTop = (curEle.offsetTop - scrollElement.offsetHeight) + 35;
            } else {
                scrollElement.scrollTop = (curEle.offsetTop - scrollElement.scrollTop) + 35;
            }
        }
    }

    initCap(str: string): string {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

    ngOnInit(): void {
        this.router.events
            .filter((event: NavigationStart) => event instanceof NavigationStart)
            .subscribe((event: any) => {
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
                    this.closeThemeSelection();
                }
            });
        this.router.events
            .filter((event: NavigationEnd) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route: any) => {
                while (route.firstChild) { route = route.firstChild; };
                return route;
            })
            .filter((route: any) => route.outlet === 'primary')
            .mergeMap((route: any) => {
                this.currentControl = route.routeConfig.path.split('/')[1];
                this.prevControl = !this.prevControl ? this.currentControl : this.prevControl;
                let catRegex: RegExp = new RegExp(route.routeConfig.category, 'i');
                this.sampleName = (this.initCap(this.currentControl) + ((!catRegex.test(this.currentControl)) ?
                    (' / ' + route.routeConfig.category) : '') + ' / ' + route.routeConfig.name);
                return route.data;
            })
            .subscribe((event: any) => {
                this.leftControl.showBackButton();
                this.grpNavButton.classList.remove('disabled');
                if (Browser.isDevice) {
                    this.hideWaitingPopup();
                } else {
                    this.updateSourceTab(location.hash);
                }
                // Need to remove once created event has been supported
                setTimeout(() => {
                    let hash: string[] = location.hash.split('/');
                    hash = hash.slice(2);
                    this.setSelectListItemSelect(hash.join('/'));
                });
            });
        this.router.events
            .filter((event: NavigationEnd) => event instanceof NavigationEnd)
                .subscribe((event: any) => {
                    let hash: string[] = location.hash.split('/');
                    if (!document.querySelector('.active-theme')){
                        document.getElementById(hash[1] || 'material').classList.add('active-theme');
                    }
                    hash[1] = document.querySelector('.active-theme').id;
                    enableRipple(hash[1] === 'material');
                    let href: string = location.href.split('#')[0];
                    history.replaceState({}, 'theme', href + hash.join('/'));
                });
        if (Browser.isDevice) {
            this.toggleSourceVisibilty(true);
        }
        let mouseButton: Button = new Button({ cssClass: 'e-flat', iconCss: 'sb-icons sb-mouse' }, '#mouse');
        let touchButton: Button = new Button({ cssClass: 'e-flat', iconCss: 'sb-icons sb-touch' }, '#touch');
        mouseButton.element.onclick = this.switchSelection;
        touchButton.element.onclick = this.switchSelection;
        if (window.screen.width <= 768 || window.screen.width > 1366) {
            document.body.classList.add('e-bigger');
            mouseButton.element.classList.remove('active');
            touchButton.element.classList.add('active');
        }
        let mouseOrTouch: string = localStorage.getItem('ej2-ng-switch');
        if (mouseOrTouch) {
            if (mouseOrTouch === 'mouse') {
                document.body.classList.remove('e-bigger');
            } else {
                document.body.classList.add('e-bigger');
            }
            let target: HTMLElement = <HTMLElement>select('#' + mouseOrTouch);
            let current: string = mouseOrTouch === 'mouse' ? 'touch' : 'mouse';
            let curSelected: HTMLElement = <HTMLElement>select('#' + current);
            curSelected.classList.remove('active');
            target.classList.add('active');
        }
        localStorage.removeItem('ej2-ng-switch');
        select('#themeswitcher').addEventListener('click', this.toggleTheme);
        select('#themelist').addEventListener('click', this.changeTheme);
    }

    ngAfterViewInit(): void {
        this.contentPan = this.ngEle.nativeElement.querySelector('.control-panel');
        this.leftPan = this.ngEle.nativeElement.querySelector('.left-panel');
        this.grpNavButton = this.ngEle.nativeElement.querySelector('.sb-cnt-header-cnt.right');
        this.setResponsive();
    }

    onSlideMenuClick(arg: any): void {
        if (!this.leftPan.classList.contains('toggled')) {
            this.leftPan.classList.add('toggled');
            this.contentPan.classList.add('control-animate');
        } else {
            this.slideOut();
        }
        arg.stopPropagation();
    }

    onControlPanClick(): void {
        if (this.contentPan.classList.contains('control-animate')) {
            this.slideOut();
        }
        this.closeThemeSelection();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.setResponsive();
    }

    onContentScroll(evt: any) {
        this.closeThemeSelection();
        if (!Browser.isDevice) { return; }
        let content: HTMLElement = <HTMLElement>select('#control-container');
        let sbHeader: HTMLElement = <HTMLElement>select('.sb-header');
        let app: HTMLElement = <HTMLElement>select('ng-app');
        if (content.scrollTop > 62 && app.classList.contains('audjust-sb-header')) {
            sbHeader.style.display = 'none';
            app.classList.remove('audjust-sb-header');
        } else if (content.scrollTop < 5 && !app.classList.contains('audjust-sb-header')) {
            sbHeader.style.display = '';
            app.classList.add('audjust-sb-header');
        }
    }

    setResponsive(): void {
        if (isVisible(this.leftPan) && window.innerWidth <= 768) {
            this.slideOut();
        }
    }

    slideOut(): void {
        this.leftPan.classList.remove('toggled');
        this.contentPan.classList.remove('control-animate');
    }

    switchSelection(e: Event): void {
        let targetId: string = (<Element>e.target).id;
        let curSelected: HTMLElement = <HTMLElement>select('.switcher .active');
        if (curSelected.id === targetId) {
            return;
        } else {
            localStorage.setItem('ej2-ng-switch', targetId);
            localStorage.setItem('ej2-theme', location.hash.split('/')[1]);
            location.reload();
        }
    }
    onSourceTabClick(e: Event): void {
        let curEle: HTMLElement = e.target as HTMLElement;
        if (curEle.classList.contains('nav-link')) {
            let activeTab: HTMLElement = <HTMLElement>select('#source-nav-tab .nav-item.active');
            activeTab.classList.remove('active');
            select('a.nav-link', activeTab).removeAttribute('aria-selected');
            curEle.parentElement.classList.add('active');
            curEle.setAttribute('aria-selected', 'true');
            let activeContent: HTMLElement = <HTMLElement>select('.tab-content .tab-pane.active');
            activeContent.classList.remove('active');
            activeContent.setAttribute('aria-hidden', 'true');
            let hiddenContent: HTMLElement = document.getElementById(curEle.getAttribute('target-content'));
            hiddenContent.classList.add('active');
            hiddenContent.removeAttribute('aria-hidden');
        }
        this.closeThemeSelection();
    }

    updateSourceTab(path: string): void {
        let pathArray: string[] = path.split('/');
        pathArray = pathArray.slice(2);
        let localPath: string = 'src/' + pathArray.join('/');
        let tsRequest: Observable<Response> = this.http.get(localPath + '.component.ts');
        let htmlRequst: Observable<Response> = this.http.get(localPath + '.html');
        let plunk: Observable<Response> = this.http.get(localPath + '-plnkr.json');
        let observableCollection: Observable<Response>[] = [htmlRequst, tsRequest];
        if (this.sourceFiles.files.length) {
            let splitPath: string[] = localPath.split('/');
            splitPath.splice(splitPath.length - 1)[0];
            let resPath: string = splitPath.join('/');
            for (let name of this.sourceFiles.files) {
                observableCollection.push(this.http.get(resPath + '/' + name));
            }
            this.sourceFiles.files = [];
        }
        observableCollection.push(plunk);
        Observable.forkJoin(observableCollection).subscribe(
            (resultCollection: any) => {
                this.toggleSourceVisibilty();
                document.getElementById('source-nav-tab').innerHTML = '';
                document.getElementById('source-content').innerHTML = '';
                let count: number = 0;
                for (let res of resultCollection) {
                    let splitUrl: string[] = res.url.split('/');
                    let fileName: string = splitUrl[splitUrl.length - 1];
                    let fileSplit: string[] = fileName.split('.');
                    let type: string = typeMapper[fileSplit[fileSplit.length - 1]];
                    this.updateTabs(res._body, type, fileName, (count === 0));
                    count++;
                }
                this.hideWaitingPopup();
                if (!select('#overlay')) {
                    hideLoader();
                }
            },
            (res: any) => {
                this.toggleSourceVisibilty(true);
                this.hideWaitingPopup();
            }
        );
    }
    hideWaitingPopup(): void {
        document.body.classList.remove('sb-overlay');
        document.querySelector('.sb-loading').classList.add('hidden');
    }
    getStringWithOutDescription(code: string): string {
        let lines: string[] = code.split('\n');
        let desStartLine: number = null;
        let desEndLine: number = null;
        let desInsideDivCnt: number = 0;
        for (let i: number = 0; i < lines.length; i++) {
            let curLine: string = lines[i];
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
            if (/description/g.test(curLine)) {
                desStartLine = i;
            }
        }
        if (desEndLine && desStartLine) {
            lines.splice(desStartLine, desEndLine - desStartLine);
        }
        return lines.join('\n');
    }

    updateTabs(data: any, type: string, fileName: string, isInitial?: boolean): void {
        if (type === 'json') {
            this.plunker(data);
            return;
        }
        let hele: Element = document.getElementById('source-nav-tab');
        let hcontent: Element = document.getElementById('source-content');
        let actString: string = isInitial ? 'active' : '';
        let ariaSelected: string = isInitial ? 'aria-controls="' + fileName + '" aria-selected="true"' :
            'aria-controls="' + fileName + '"';
        let ariaHidden: string = isInitial ? '' : 'aria-hidden="true"';
        let header: string = sourceHeader.replace('{2}', actString);
        let cont: any = sourcecontent.replace('{2}', actString);
        let codeCollection: NodeList;
        let iContent: string = data;
        header = header.replace('{1}', ariaSelected);
        header = header.replace(idRegex, fileName);
        cont = cont.replace('{4}', ariaHidden);
        cont = cont.replace(idRegex, fileName);
        cont = cont.replace('{3}', type);
        if (type === 'xml') {
            iContent = this.getStringWithOutDescription(iContent);
            iContent = iContent.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        cont = cont.split('{1}');
        cont.splice(1, 0, iContent);
        cont = cont.join('');
        hele.innerHTML += header;
        hele.innerHTML += isInitial ? plnk : '';
        hcontent.innerHTML += cont;
        codeCollection = hcontent.getElementsByTagName('code');
        hljs.highlightBlock(codeCollection[codeCollection.length - 1]);
    }

    toggleSourceVisibilty(flag?: boolean): void {
        document.getElementById('source-tab').classList[flag ? 'add' : 'remove']('hidden');
    }
    plunker(results: string): void {
        let plnkr: { [key: string]: Object } = JSON.parse(results);
        let form: HTMLFormElement = <HTMLFormElement>createElement('form');
        form.setAttribute('action', 'http://plnkr.co/edit/?p=preview');
        form.setAttribute('method', 'post');
        form.setAttribute('target', '_blank');
        form.id = 'plnkr-form';
        form.style.display = 'none';
        document.body.appendChild(form);
        let plunks: string[] = Object.keys(plnkr);
        for (let x: number = 0; x < plunks.length; x++) {
            let ip: HTMLElement = createElement('input');
            ip.setAttribute('type', 'hidden');
            ip.setAttribute('value', <string>plnkr[plunks[x]]);
            ip.setAttribute('name', 'files[' + plunks[x] + ']');
            form.appendChild(ip);
        }
        document.getElementById('plnkr').addEventListener('click', () => { form.submit(); });
    }
    toggleTheme(): void {
        let target: HTMLElement = document.getElementById('selectdiv');
        target.classList.toggle('e-hidden');
        select('#themeswitcher').classList.toggle('active');
    }
    changeTheme(arg: MouseEvent): void {
        let target: Element = <Element>arg.target;
        let themeName: string = target.textContent || target.className.split(' ')[1];
        themeName = themeName.toLowerCase();
        themeName = (themes.indexOf(themeName) !== -1) ? themeName : 'material';
        localStorage.setItem('ej2-theme', themeName);
        localStorage.setItem('ej2-ng-switch', select('.switcher .active').id);
        location.reload();
    }
    closeThemeSelection(): void {
        if (!select('#selectdiv').classList.contains('e-hidden')) {
            this.toggleTheme();
        }
    }
    getHash(): string {
        let hash: string[] = location.hash.split('/');
        hash = hash.slice(2);
        return ':theme/' + hash.join('/');
    }
}

function loadTheme(theme: string): void {
    selectedTheme = theme;
    let ajax: Ajax = new Ajax('./styles/' + theme + '.css','GET',true);
    ajax.send().then((result:any) =>{
        let doc: HTMLFormElement = <HTMLFormElement>select('#themelink');
        doc.href = './styles/' + theme + '.css';
        select('#themeswitcher-icon').setAttribute('src', 'styles/images/SB_icon/SB_Switcher_icon_' + theme + '.png');
        document.body.classList.add(theme);
        themeFlag = false;
    });
}

function hideLoader(): void {
    document.querySelector('.sb-loading').classList.add('hidden');
    let overlay: Element = select('#overlay');
    if (overlay) {
        detach(overlay);
    }
}

window.onload = () => {
    hideLoader();
 };