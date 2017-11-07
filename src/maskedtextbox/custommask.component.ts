import { Component } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'custommask.html',
})
export class CustomMaskedTextboxController {
    // Custom characters to specify time value
    public customMaskChar: Object = { P: 'P,A,p,a', M: 'M,m'};
    constructor() { }
}