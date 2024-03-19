import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgTemplateOutlet } from '@angular/common';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
/**
 * Splitter Code editor layout
 */
@Component({
    selector: 'control-content',
    templateUrl: 'code-editor-layout.html',
    styleUrls: ['code-editor-layout.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SplitterModule, NgTemplateOutlet, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class CodeEditorLayoutComponent {}
