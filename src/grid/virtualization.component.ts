import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { VirtualScrollService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { datasource, virtualData } from './data';

@Component({
    selector: 'ej2-gridvirtual',
    templateUrl: 'virtualization.html',
    styleUrls: ['virtualization.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [VirtualScrollService]
})
export class VirtualizationComponent implements OnInit {
    public vData: Object[] = virtualData;
    @ViewChild('grid')
    public grid: GridComponent;
    public date1: number;
    public date2: number;
    public flag: boolean = true;
    public ngOnInit(): void { }

    onClick = (args: any) => {
        this.show();
        if (!this.vData.length) {
             datasource();
            this.grid.dataSource = this.vData;
        }
        this.flag = true;
        this.date1 = new Date().getTime();
        this.grid.refresh();
    }
    show(): void {
        document.getElementById('popup').style.display = 'inline-block';
    }
    hide(): void {
        if (this.flag && this.date1) {
            this.date2 = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (this.date2 - this.date1) + 'ms';
            this.flag = false;
        }
        document.getElementById('popup').style.display = 'none';
    }
}