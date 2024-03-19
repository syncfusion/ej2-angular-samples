import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FabModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Default Fav component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FabModule]
})

export class DefaultFABComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }
} 