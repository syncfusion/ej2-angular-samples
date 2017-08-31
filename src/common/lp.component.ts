import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-ng-lists';
import { samplesList } from './samplelist';
import { Browser, extend } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
export interface MyWindow extends Window {
    isInteractedList: boolean;
}

declare let window: MyWindow;


/**
 * 
 */
@Component({
    selector: 'left-pane',
    templateUrl: 'left-pane.html',
})
export class LPController {

    public fields: Object = { text: 'name', id: 'path', groupBy: 'order', child: 'samples' };
    private contentPan: any;
    private leftPan: any;

    @ViewChild('controlList')
    public listObj: ListViewComponent;

    public dataSource: Object[] = this.getDataSource();

    constructor(public ngEle: ElementRef, private router: Router) {
    }

    onSampleClick(e: SelectEventArgs) {
        window.isInteractedList = e.isInteracted;
        if (e.isInteracted) {
            if (e.data.component && location.hash.replace('/#', '') !== e.data.path) {
                document.body.classList.add('sb-overlay');
                document.querySelector('.sb-loading').classList.remove('hidden');
                this.router.navigateByUrl(<string>e.data.path);
                this.slideOut();
            } else {
                this.showBackButton();
            }
        }
    }
    getDataSource(): Object[] {
        if (Browser.isDevice) {
            let tempList: { samples: object[] }[] = <{ samples: object[] }[]>extend([], samplesList);
            for (let temp of tempList) {
                let data: DataManager = new DataManager(temp.samples);
                temp.samples = data.executeLocal(new Query().where('hideOnDevice', 'notEqual', true));
            }
            return tempList;
        }
        return samplesList;
    }
    showBackButton(hide?: Boolean): void {
        let icon: HTMLElement = this.ngEle.nativeElement.querySelector('#tree-back > .e-icon-back');
        icon.style.display = hide ? 'none' : '';
    }

    onBackClick(): void {
        this.showBackButton(true);
        this.listObj.back();
    }

    ngAfterViewInit(): void {
        this.contentPan = document.querySelector('.control-panel');
        this.leftPan = document.querySelector('.left-panel');
    }

    slideOut(): void {
        this.leftPan.classList.remove('toggled');
        this.contentPan.classList.remove('control-animate');
    }

}