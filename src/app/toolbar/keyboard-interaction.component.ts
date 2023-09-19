import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

/**
 * Keyboard Interactions in Toolbar Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-interaction.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class KeyboardToolbarComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['toolbar.component.css'];
    }
    @ViewChild('toolbarObj') toolbarObj: ToolbarComponent;
    public ngAfterViewInit(): void {
      document.body.addEventListener('keydown', (e: KeyboardEvent) => {
        const toolbarElement: HTMLElement = this.toolbarObj.element.querySelector(
          '.e-toolbar-items .e-toolbar-item .e-tbar-btn'
        );
        if (e.altKey && e.keyCode === 74 && toolbarElement) {
          toolbarElement.focus();
        }
      });
    }
}