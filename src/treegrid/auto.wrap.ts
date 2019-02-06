import { Component, OnInit } from '@angular/core';
import { textWrapData } from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'auto.wrap.html'
})
export class AutoWrap implements OnInit {
    public data: Object[] = [];
    public pageSetting: Object;
    ngOnInit(): void {
        this.data = textWrapData;
        this.pageSetting = { pageCount: 5 };
    }
}