import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FabModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Default Fav component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'styles.html',
    styleUrls: ['styles.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FabModule]
})

export class StylesFABComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['styles.css'];
    }
 }