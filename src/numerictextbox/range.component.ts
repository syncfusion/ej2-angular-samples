import { Component } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'range.html',
})
export class RangeTextboxController {
    public minValue = 10;
    public maxValue = 100;
    public step = 1;
    clickMe() {
        this.minValue = parseFloat((document.getElementById('min') as HTMLInputElement).value);
        this.maxValue = parseFloat((document.getElementById('max') as HTMLInputElement).value);
        this.step = parseFloat((document.getElementById('step') as HTMLInputElement).value);
    }
    constructor() { }
}