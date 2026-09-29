import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ListViewComponent, SelectEventArgs, ListViewModule } from '@syncfusion/ej2-angular-lists';
import { TreeViewComponent, NodeSelectEventArgs, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { Toast } from '@syncfusion/ej2-notifications'
import { samplesList } from './samplelist';
import { Browser, extend, Animation, addClass } from '@syncfusion/ej2-base';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';
import { NgIf } from '@angular/common';
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
    standalone: true,
    imports: [
        TreeViewModule,
        NgIf,
        ListViewModule,
    ],
})
export class LPController {
    public treeReady: boolean = false;
    public isProgrammaticSelection: boolean = false;
    public controlSampleData: { [key: string]: object } = {};
    public listData: any = [];
    public fields: Object = { dataSource: this.getTreeviewList(this.getDataSource()), id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', htmlAttributes: 'url', child: 'samples', query: new Query().sortBy('order') };
    public nodeTemplate: string = '<div class="sb-tree-component"> <span class="e-component text" role="listitem">${name}' +
        '${if(type)}<span class="e-samplestatus ${type}"></span>${/if}</span> </div>';
    public listFields: Object = { id: 'uid', text: 'name', groupBy: 'order', htmlAttributes: 'data' };
    public app: any;
    public navElement: Element;
    public copyRight: number = new Date().getFullYear();

    @ViewChild('controlList')
    public listComponent: ListViewComponent;

    @ViewChild('controlTree')
    public treeComponent: TreeViewComponent;

    constructor(public ngEle: ElementRef, private router: Router) {
    }

    onAllControlClick(e: MouseEvent) {
        this.viewSwitch(this.ngEle.nativeElement.querySelector("#controlSamples"), this.ngEle.nativeElement.querySelector("#controlTree"), true)
            setTimeout(() => {
            this.setTreeActiveItem();
        }, 0);
    }
    onTreeReady(): void {
        this.treeReady = true;
        setTimeout(() => {
            this.setTreeActiveItem();
        }, 0);
    }
    setTreeActiveItem(): void {
        const control = location.hash.split('/')[2];
        if (!control || !this.treeComponent) return;
        const nodes = this.treeComponent.getTreeData();
        const match = nodes.find((node: any) => {
            return node.url && node.url['control-name'] === control;
        });

        if (match && match.id !== undefined) {
            this.isProgrammaticSelection = true;
            this.treeComponent.selectedNodes = [String(match.id)];
            setTimeout(() => {
                this.isProgrammaticSelection = false;
            });
        }
    }
    getDataSource(): { [key: string]: Object; }[] {
        if (Browser.isDevice) {
            let tempSample: any[] = [];
            let tempData: any = extend([], samplesList);
            for (let temp of tempData) {
                if (location.hash.indexOf(temp.path) !== -1 && temp.hideOnDevice) {
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
                        location.hash = '#/material/grid/over-view';

                }
                if (temp.hideOnDevice) {
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
                    this.controlSampleData[list[k].path] = this.getSamples(list[k].samples, list[k].name, list[k].path);
                    this.listData = this.listData.concat(this.controlSampleData[list[k].path]);
                }
            }
        }
        return tempList;
    }

    getSamples(samples: any, controlName: string, groupPath?: string): any {
        let tempSamples: any = [];
        let groupName: string = '';
        let sampleNameAttr: string = '';
        let isAISample: boolean = !!groupPath && groupPath.startsWith('ai-') && ['ai-assistview', 'ai-smart-paste', 'ai-smart-textarea'].indexOf(groupPath) === -1;
        for (let i: number = 0; i < samples.length; i++) {
            tempSamples[i] = samples[i];
            groupName = tempSamples[i].path.split('/')[1];
            sampleNameAttr = samples[i].name.toLowerCase().replace(/ /g, '-');
            tempSamples[i].data = { 'sample-name': samples[i].name, 'data-path': '/' + samples[i].path };
            if (isAISample) {
                tempSamples[i].data['group-name'] = groupName;
                tempSamples[i].data['ai-sample-name'] = sampleNameAttr;
            }
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

    updateGroupItemAttributes(): void {
        const groupItems: NodeListOf<Element> = document.querySelectorAll('#controlList .e-list-group-item.e-level-1');
        groupItems.forEach((groupItem: Element) => {
            let sibling: Element = groupItem.nextElementSibling;
            while (sibling && !sibling.classList.contains('e-list-group-item')) {
                if (!groupItem.hasAttribute('group-name')) {
                    const groupName: string = sibling.getAttribute('group-name');
                    if (groupName) {
                        groupItem.setAttribute('group-name', groupName);
                    }
                }
                sibling.removeAttribute('group-name');
                sibling = sibling.nextElementSibling;
            }
        });
    }

    afterListviewRendered(e: any): void {
        this.updateGroupItemAttributes();
        this.app.setListItemSelect();
        const activeItem: Element | null =document.querySelector('#sdklist li.active');
        if (activeItem) {
        const sdkKey: string =activeItem.getAttribute('data-sdk') || 'all';
        this.applySdkFilter(sdkKey);
        }
    }

    onComponentSelect(e: NodeSelectEventArgs) {
        if (this.isProgrammaticSelection) {
            return;
        }
        let path: string = e.node.getAttribute('data-path');
        // Handle AI-Powered Samples redirect based on active SDK
        if (path && path.includes('/ai-grid/') && this.app) {
            const aiSample: string = typeof this.app.getAiSdkFirstSample === 'function'
                ? this.app.getAiSdkFirstSample()
                : '';
            if (aiSample) {
                path = aiSample;
            }
        }
        if (path && location.hash.replace('/#', '') !== path) {
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
        let sampleName: string= location.hash.split('/')[2];
        if ( sampleName && sampleName.startsWith('ai-') && !['ai-assistview', 'ai-smart-paste', 'ai-smart-textarea'].includes(sampleName)) {
            sampleName = 'ai-grid';
        }
        this.listComponent.dataSource = <any>(this.controlSampleData[sampleName] || this.controlSampleData['grid']);
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
    onTreeNodeClicked(e: any): void {
        const node = e.node;
        if (!node) return;
        this.onComponentSelect({
            node: node
        } as any);
    }

    /**
     * Apply SDK filter to the left pane tree and list views.
     * Hides any tree node / list item whose control-name is not present in the
     * currently selected SDK's allowed-controls list.
     */
    applySdkFilter(sdkKey: string): void {
        const controlTree: HTMLElement | null = document.getElementById('controlTree');
        const controlList: HTMLElement | null = document.getElementById('controlList');
        const leftPane: HTMLElement | null = document.querySelector('.sb-left-pane');

        if (!sdkKey || sdkKey === 'all') {
            // Show everything – clear all hidden classes
            if (controlTree) {
                controlTree.querySelectorAll('[control-name]').forEach((item: Element) => {
                    item.classList.remove('sdk-hidden');
                });
                controlTree.querySelectorAll('.e-list-item.e-level-1').forEach((item: Element) => {
                    item.classList.remove('sdk-parent-hidden');
                });
            }
            if (controlList) {
                controlList.querySelectorAll('.e-list-item, .e-list-group-item').forEach((item: Element) => {
                    item.classList.remove('sdk-hidden');
                    item.classList.remove('sdk-sample-hidden');
                    item.classList.remove('sdk-group-hidden');
                });
            }
            if (leftPane) {
                leftPane.classList.remove('sdk-filter-active');
            }
            return;
        }


        const allowedControls: string[] = (this.app && typeof this.app.getActiveSdkSampleOrder === 'function'
            ? this.app.getAllowedControlsForSdk(sdkKey)
            : []) || [];
        if (leftPane) {
            leftPane.classList.add('sdk-filter-active');
        }

        const ownedAiControls: string[] = allowedControls
            .filter((c: string) => c.indexOf('ai-') === 0);

        // 'ai-grid' umbrella tree node hides entirely when the SDK owns no
        // ai-* control (e.g. file-manager, rich-text-editor).
        const showAiNode: boolean = ownedAiControls.length > 0;

        // Filter tree view nodes (child items with control-name)
        if (controlTree) {
            controlTree.querySelectorAll('[control-name]').forEach((item: Element) => {

                const dataPath: string = item.getAttribute('data-path') || '';
                const cn: string = dataPath.replace(/^\/+/, '').split('/')[1] || item.getAttribute('control-name') || '';

                let visible: boolean;
                if (cn === 'ai-grid') {
                    visible = showAiNode;
                } else if (cn.indexOf('ai-') === 0) {
                    visible = ownedAiControls.indexOf(cn) !== -1;
                } else {
                    visible = allowedControls.indexOf(cn) !== -1;
                }
                if (!visible) {
                    item.classList.add('sdk-hidden');
                } else {
                    item.classList.remove('sdk-hidden');
                }
            });

            // Hide parent category nodes if all their children are hidden.
            controlTree.querySelectorAll('.e-list-item.e-level-1').forEach((parent: Element) => {
                const children: NodeListOf<Element> = parent.querySelectorAll('[control-name]');
                let hasVisible: boolean = false;
                children.forEach((child: Element) => {
                    if (!child.classList.contains('sdk-hidden')) {
                        hasVisible = true;
                    }
                });
                if (!hasVisible) {
                    parent.classList.add('sdk-parent-hidden');
                } else {
                    parent.classList.remove('sdk-parent-hidden');
                }
            });
        }

        // Filter list view items using data-path attribute
        if (controlList) {
            controlList.querySelectorAll('.e-list-item').forEach((item: Element) => {
                const dataPath: string = item.getAttribute('data-path') || '';
                const controlName: string = dataPath.replace(/^\//, '').split('/')[1] || '';
                let isMatch: boolean;
                if (controlName.indexOf('ai-') === 0) {
                    isMatch = ownedAiControls.includes(controlName);
                } else {
                    isMatch = allowedControls.indexOf(controlName) !== -1;
                }
                if (!isMatch) {
                    item.classList.add('sdk-sample-hidden');
                } else {
                    item.classList.remove('sdk-sample-hidden');
                }
            });

            // Hide group headers that have no visible items
            controlList.querySelectorAll('.e-list-group-item').forEach((groupItem: Element) => {
                let sibling: Element | null = groupItem.nextElementSibling;
                let hasVisible: boolean = false;
                while (sibling && !sibling.classList.contains('e-list-group-item')) {
                    if (!sibling.classList.contains('sdk-sample-hidden')) {
                        hasVisible = true;
                        break;
                    }
                    sibling = sibling.nextElementSibling;
                }
                if (!hasVisible) {
                    groupItem.classList.add('sdk-group-hidden');
                } else {
                    groupItem.classList.remove('sdk-group-hidden');
                }
            });
        }
    }
}
