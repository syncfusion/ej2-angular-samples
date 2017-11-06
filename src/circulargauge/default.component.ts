import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultComponent {
    public ticks: Object = {
        width: 0
    };
    public lineStyle: Object = {
        width: 8, color: '#E0E0E0'
    };
    //Initializing Label Style
    public labelStyle: Object = {
        font: {
            color: '#424242',
            fontFamily: 'Roboto',
            size: '12px',
            fontWeight: 'Regular'
        },
        offset: -5
    };
    public cap: Object = {
        radius: 8,
        color: '#757575',
        border: { width: 0 }
    };
    public tail: Object = {
        length: '25%'
    }
    constructor() {
        // code
    };
}