import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { Browser } from '@syncfusion/ej2-base';
/**
 *  Sample for CSS Basic Layout Badge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'toolbar.html',
    styleUrls: ['toolbar.css'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarController {
    public ngAfterViewInit() {
        let toolbar: Toolbar = new Toolbar({
        });
        toolbar.appendTo('#toolbar');
    }
}