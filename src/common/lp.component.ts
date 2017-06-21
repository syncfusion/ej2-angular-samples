import { Component, Inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ListView, SelectEventArgs } from '@syncfusion/ej2-ng-lists';
import { samplesList } from './samplelist';
import {Browser} from '@syncfusion/ej2-base';
import { extend,getValue } from '@syncfusion/ej2-base/util';
import {DataManager, Query}  from '@syncfusion/ej2-data';
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
    public listObj: ListView;

    constructor(public ngEle: ElementRef, private router: Router) {
        this.listObj = new ListView(
            {
                fields: this.fields, dataSource: <any>this.getDataSource(), headerTitle: 'All Controls',
                select: this.onSampleClick.bind(this),
                groupTemplate: '${if(items[0]["category"])}<div class="e-text-content">' +
                '<span class="e-list-text">${items[0].category}</span>' +
                '</div>${/if}'
            }
        );
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
        this.listObj.appendTo(this.ngEle.nativeElement.querySelector('#control-list'));
    }

    slideOut(): void {
        this.leftPan.classList.remove('toggled');
        this.contentPan.classList.remove('control-animate');
    }

}