import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { employeeData } from './data';
import { DetailRowService } from '@syncfusion/ej2-angular-grids';
import { Internationalization } from '@syncfusion/ej2-base';

let instance: Internationalization = new Internationalization();

@Component({
    selector: 'ej2-griddetailtemplate',
    templateUrl: 'detailtemplate.html',
    styleUrls: ['detailtemplate.style.css'],
    providers: [DetailRowService],
    encapsulation: ViewEncapsulation.None
})
export class DetailTemplateComponent implements OnInit {
    public data: any;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['detailtemplate.style.css'];
    }

    ngOnInit(): void {
        this.data = employeeData;
    }

    public format(value: Date): string {
        return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
    }
}

export interface DateFormat extends Window {
    format?: Function;
}