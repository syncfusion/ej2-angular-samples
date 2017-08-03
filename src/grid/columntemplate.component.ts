import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { employeeData } from './data';

@Component({
    selector: 'ej2-gridcolumntemplate',
    templateUrl: 'columntemplate.html',
    styleUrls: ['columntemplate.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ColumnTemplateComponent implements OnInit {
    public data: Object[];

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['columntemplate.style.css'];
    }

    ngOnInit(): void {
        this.data = employeeData;
    }

}