import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-angular-lists';
import { TreeViewComponent, NodeSelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Toast } from '@syncfusion/ej2-notifications'
import { samplesList } from './samplelist';
import { Browser, extend, Animation, addClass } from '@syncfusion/ej2-base';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';
export interface MyWindow extends Window {
    isInteractedList: boolean;
}

declare let window: MyWindow;


/**
 * Left Panel Control
 */
@Component({
    selector: 'left-pane',
    templateUrl: 'left-pane.html',
})
export class LPController {

    public controlSampleData: { [key: string]: object } = {};
    public listData: any = [];
    public fields: Object = { dataSource: this.getTreeviewList(this.getDataSource()), id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', htmlAttributes: 'url', child: 'samples', query: new Query().sortBy('order') };
    public nodeTemplate: string = '<div class="sb-tree-component"> <span class="e-component text" role="listitem">${name}' +
        '${if(type)}<span class="e-samplestatus ${type}"></span>${/if}</span> </div>';
    public listFields: Object = { id: 'uid', text: 'name', groupBy: 'order', htmlAttributes: 'data' };
    public app: any;
    public navElement: Element

    @ViewChild('controlList')
    public listComponent: ListViewComponent;

    @ViewChild('controlTree')
    public treeComponent: TreeViewComponent;

    constructor(public ngEle: ElementRef, private router: Router) {
    }

    onAllControlClick(e: SelectEventArgs) {
        this.viewSwitch(this.ngEle.nativeElement.querySelector("#controlSamples"), this.ngEle.nativeElement.querySelector("#controlTree"), true)
    }

    getDataSource(): { [key: string]: Object; }[] {
        if (Browser.isDevice) {
            let tempSample: any[] = [];
            let tempData: any = extend([], samplesList);
            for (let temp of tempData) {
                if (location.hash.indexOf(temp.path)) {
                    if (temp.hideOnDevice == true) {
                        let toastObj: Toast = new Toast({
                            position: {
                                X: 'Right'
                            }
                        });
                        let hideLocation: string = location.hash.split('/')[2];
                        toastObj.appendTo('#sb-home');
                        setTimeout(
                            () => {
                                toastObj.show({
                                    content: `${hideLocation} component not supported in mobile device`
                                });
                            }, 200);
                        location.hash = '#/material/grid/over-view'

                    }
                }
                if (temp.hideOnDevice == true) {
                    continue;
                }
                let data: DataManager = new DataManager(temp.samples);
                temp.samples = data.executeLocal(new Query().where('hideOnDevice', 'notEqual', true));
                tempSample = tempSample.concat(temp);
            }
            return tempSample;
        }
        return samplesList;
    }

    getTreeviewList(list: any[]): any[] | { [key: string]: Object }[] {
        let id: number = 1;
        let pid: number;
        let tempList: any[] = [];
        let category: string = '';
        let categories: Object[] = [];
        let res: any = new DataManager(list).executeLocal(new Query().sortBy('order').select('category'));
        categories = DataUtil.distinct(res, 'category');
        for (let j: number = 0; j < categories.length; j++) {
            tempList = tempList.concat({ id: id, name: categories[j], hasChild: true, expanded: true });
            pid = id;
            for (let k: number = 0; k < list.length; k++) {
                if (list[k].category === categories[j]) {
                    id += 1;
                    tempList = tempList.concat(
                        {
                            id: id,
                            pid: pid,
                            name: list[k].name,
                            type: list[k].type,
                            url: {
                                'data-path': list[k].samples[0].path,
                                'control-name': list[k].path,
                            }
                        });
                    this.controlSampleData[list[k].path] = this.getSamples(list[k].samples, list[k].name);
                    this.listData = this.listData.concat(this.controlSampleData[list[k].path]);
                }
            }
        }
        return tempList;
    }

    getSamples(samples: any, controlName: string): any {
        let tempSamples: any = [];
        for (let i: number = 0; i < samples.length; i++) {
            tempSamples[i] = samples[i];
            tempSamples[i].data = { 'sample-name': samples[i].name, 'data-path': '/' + samples[i].path };
            tempSamples[i].uid = '' + i;
            tempSamples[i].cName = controlName;
            tempSamples[i].searchValue = controlName + ' ' + samples[i].name;
        }
        return tempSamples;
    }

    viewSwitch(from: HTMLElement, to: HTMLElement, reverse?: boolean): void {
        let anim: Animation = new Animation({ duration: 500, timingFunction: 'ease' });
        from.style.overflowY = 'hidden';
        to.classList.remove('sb-hide');
        anim.animate(from, {
            name: reverse ? 'SlideRightOut' : 'SlideLeftOut', end: (): void => {
                from.style.overflowY = '';
                from.classList.add('sb-hide');
            }
        });
        anim.animate(to, { name: reverse ? 'SlideLeftIn' : 'SlideRightIn' });
    }

    afterListviewRendered(e: any): void {
        this.app.setListItemSelect();
    }

    onComponentSelect(e: NodeSelectEventArgs) {
        let path: string = e.node.getAttribute('data-path');
        if (location.hash.replace('/#', '') !== path) {
            this.navigateSample(path.replace(':theme', this.getCurrentTheme()));
            this.listComponent.dataSource = <any>this.controlSampleData[path.split('/')[1]];
            this.listComponent.dataBind();
            this.viewSwitch(this.ngEle.nativeElement.querySelector("#controlTree"), this.ngEle.nativeElement.querySelector("#controlSamples"))
        }
        if (!this.app.isDesktop) {
            this.app.onNavButtonClick(true);
        }
        addClass([this.app.mobileOverlay], 'sb-hide');
    }

    onSampleSelect(e: SelectEventArgs) {
        let path: string = (<any>e.data).path;
        if (location.hash.replace('/#', '') !== path) {
            this.navigateSample(path.replace(':theme', this.getCurrentTheme()));
        }
        if (!this.app.isDesktop && !this.app.isInitialRender) {
            this.app.onNavButtonClick(true);
        }
        addClass([this.app.mobileOverlay], 'sb-hide');
    }

    getCurrentTheme(): string {
        return location.hash.split('/')[1];
    }

    navigateSample(path: string) {
        this.router.navigateByUrl(path);
    }

    updateListViewDataSource() {
        this.listComponent.dataSource = <any>(this.controlSampleData[location.hash.split('/')[2]] || this.controlSampleData.grid);
    }

    ngAfterViewInit(): void {
        this.updateListViewDataSource();
        this.navElement = this.ngEle.nativeElement.querySelector('.sb-control-navigation');
    }

    onWindowResize(mobile: boolean): void {
        if (mobile) {
            this.setMobileView();
        } else {
            this.setDesktopView();
        }
    }

    setMobileView() {
        this.navElement.classList.remove('e-view');
    }

    setDesktopView() {
        if (this.navElement.classList.contains('e-view')) {
            this.navElement.classList.add('e-view');
        }
    }

}
