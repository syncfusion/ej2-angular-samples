import { Component } from '@angular/core';
import { inventoryData } from './data';

@Component({
    selector: 'ej2-gridcontainer',
    templateUrl: 'auto-wrap.html'
})
export class AutoWrapComponent {
    public data: Object[] = inventoryData;
    public pageSettings: Object = { pageCount: 5 };
}