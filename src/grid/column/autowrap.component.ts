import { Component } from '@angular/core';
import { inventoryData } from '../data';

@Component({
    selector: 'ej2-gridcontainer',
    templateUrl: 'autowrap.html'
})
export class AutoWrapComponent {
    public data: Object[] = inventoryData;
}