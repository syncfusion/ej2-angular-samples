import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FabModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Default Fav component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'position.html',
    styleUrls: ['position.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FabModule]
})

export class PositionFABComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['position.css'];
    }
} 