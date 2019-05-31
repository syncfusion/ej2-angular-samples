import { Component, OnInit } from '@angular/core';
import { employeeData } from './data';
import { ReorderService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej-gridreorder',
    templateUrl: 'reorder.html',
    providers: [ReorderService]
})
export class ReorderComponent implements OnInit {
    public data: Object[];

    ngOnInit(): void {
        this.data = employeeData;
    }
}