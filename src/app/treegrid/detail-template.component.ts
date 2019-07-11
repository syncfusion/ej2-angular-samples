import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { textdata } from './jsontreegriddata';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { Internationalization } from '@syncfusion/ej2-base';

let instance: Internationalization = new Internationalization();

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'detail-template.html',
    // providers: [DetailRowService],
    encapsulation: ViewEncapsulation.None
})
export class DetailTemplateComponent implements OnInit {
    public data: any;

    ngOnInit(): void {
        this.data = textdata;
    }

    public format(value: Date): string {
        return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
    }
}

export interface DateFormat extends Window {
    format?: Function;
}