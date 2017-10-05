import { Component } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'custommask.html',
})
export class CustomMaskedTextboxController {
    public customMaskChar: Object = { P: 'P,A,p,a', M: 'M,m'};
    constructor() { }
}