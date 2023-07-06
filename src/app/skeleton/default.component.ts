import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
/**
 *  Sample for CSS Basic Layout Badge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }
}