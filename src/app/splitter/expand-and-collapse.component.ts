import { Component, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
/**
 * Splitter Expand and Collapse
 */
@Component({
    selector: 'control-content',
    templateUrl: 'expand-and-collapse.html',
    styleUrls: ['expand-and-collapse.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SplitterModule, NgTemplateOutlet]
})

export class ExpandCollapseComponent {}
