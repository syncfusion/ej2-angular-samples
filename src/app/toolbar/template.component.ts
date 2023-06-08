import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TemplateToolbarComponent {
    public data: string[] = ['25%', '50%', '75%', '100%'];
}