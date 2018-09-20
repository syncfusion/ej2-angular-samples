import { Component } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'custom-mask.html',
})
export class CustomMaskedTextboxController {
    // Custom characters to specify time value
    public customMaskChar: Object = { P: 'P,A,p,a', M: 'M,m'};
    constructor() { }
}