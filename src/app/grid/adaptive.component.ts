import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { data } from './data';
import { Browser } from '@syncfusion/ej2-base';
import { PageService, FilterService, SortService, AggregateService, EditService, GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej2-adaptive',
    templateUrl: 'adaptive.html',
    styleUrls: ['adaptive.style.css'],
    providers: [PageService, FilterService, SortService, AggregateService, EditService],
    encapsulation: ViewEncapsulation.None
})
export class AdaptiveComponent implements OnInit {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['adaptive.style.css'];
    }

    @ViewChild('adaptive')
    public grid: GridComponent;
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public pageSettings: Object;
    public rowMode: string;
    public filterSettings: Object;
    public isDeskTop: Boolean;
    ngOnInit(): void {
        this.data = data;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.pageSettings = { pageCount: 3 };
        this.rowMode = 'Vertical';
        this.filterSettings = { type: 'Excel' };
        this.isDeskTop = !Browser.isDevice;
    }
    public changeHandler(e: any): void {
        if (e.checked) {
            this.grid.rowRenderingMode = 'Horizontal';
        } else {
            this.grid.rowRenderingMode = 'Vertical';
        }
    }

    public onLoad(): void {
        this.grid.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0] as HTMLElement;
    }
}