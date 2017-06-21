import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { GridComponent } from '@syncfusion/ej2-ng-grids';

const SERVICE_URI: string = 'http://services.odata.org/V4/Northwind/Northwind.svc/Products';

@Component({
    selector: 'ej2-griddatabind',
    templateUrl: 'remotedata.html',
    styleUrls: ['remotedata.style.css']
})
export class DataBindingComponent implements OnInit {
    public data: DataManager;

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = new DataManager({ url: SERVICE_URI, adaptor: new ODataV4Adaptor });
    }

    public show(): void {
        let div: HTMLElement = document.getElementById('waitingpopup')
        let width: number = this.grid.element.offsetWidth;
        let height: number = this.grid.element.offsetHeight;
        div.style.top = (height / 2 - 25) + 'px';
        div.style.left = (width / 2 - 25) + 'px';
        if(!this.grid.element.querySelector('#waitingpopup')) {
            this.grid.element.appendChild(div);
        }
        (<HTMLElement>div).style.display = '';
    }
     public hide(): void {
        let div: HTMLElement = document.getElementById('waitingpopup') as HTMLElement;
        div.style.display = 'none';
    }
}