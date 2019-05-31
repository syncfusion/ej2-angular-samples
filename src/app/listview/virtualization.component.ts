/**
 * ListView Virtualization Sample
 */

import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { Browser } from '@syncfusion/ej2-base';
import { ListView } from '@syncfusion/ej2-lists';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { virtualizationdata }from './dataSource';

@Component({
    selector: 'control-content',
    templateUrl: 'virtualization.html',
    styleUrls: ['virtualization.css'],
    encapsulation: ViewEncapsulation.None
})

export class VirtualizationListViewComponent {
    @ViewChild('listviewInstance')
    public listviewInstance: ListView;
    public commonData: { [key: string]: string | object }[] = [];
    public dataSource: { [key: string]: { [key: string]: string | object }[] } = {};
    public startTime: Date;
    public endTime: Date;
    public liElement: HTMLElement;
    public cssClass: string = 'e-list-template';
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['virtualization.css'];
    }

    public ngOnInit() {
        this.commonData = virtualizationdata;

        this.liElement = document.getElementById('ui-list');

        if (Browser.isDevice) {
            this.liElement.classList.add('ui-mobile');
        }

        createSpinner({
            target: this.liElement
        });

        [[1010, 'data1'], [5010, 'data5'], [10010, 'data10'], [25010, 'data25']].forEach((ds: string[] | number[]) => {
            let data: { [key: string]: string | object }[] = this.commonData.slice();
            let index: number;
            let spyIndex: number;
            for (let i: number = 10; i <= ds[0]; i++) {
                while (index === spyIndex) {
                    index = parseInt((Math.random() * 10).toString(), 10);
                }
                data.push({ name: data[index].name, icon: data[index].icon, imgUrl: data[index].imgUrl, id: i.toString() });
                spyIndex = index;
            }
            this.dataSource[ds[1]] = data;
        });
    }

    public template: string = '<div class="e-list-wrapper e-list-avatar">' +
        '<span class="e-avatar e-avatar-circle ${icon} ${$imgUrl ? \'hideUI\' : \'showUI\' }">' +
        '${icon}</span> <span class="e-avatar e-avatar-circle ${$imgUrl ? $imgUrl + \'-showUI\' : \'hideUI\' }" ' +
        '></span>' +
        '<span class="e-list-content">${name}</span></div>';


    public ddlDatasource: Object[] = [
        { value: '1', text: '1k' },
        { value: '5', text: '5k' },
        { value: '10', text: '10k' },
        { value: '25', text: '25k' }
    ];
    public ddlFields: Object = { text: 'text', value: 'value' };

    public fields: Object = { text: 'name' };

    public onActionComplete() {
        this.endTime = new Date();
        document.getElementById('time').innerText = (this.endTime.getTime() - this.startTime.getTime()) + ' ms';
    }

    public onActionBegin() {
        this.startTime = new Date();
    }

    public onChange(e: ChangeEventArgs) {
        showSpinner(this.liElement);
        this.startTime = new Date();
        this.listviewInstance.dataSource = this.dataSource['data' + e.value];
        this.listviewInstance.dataBind();
        this.endTime = new Date();
        document.getElementById('time').innerText = (this.endTime.getTime() - this.startTime.getTime()) + ' ms';
        hideSpinner(this.liElement);
    }
}
