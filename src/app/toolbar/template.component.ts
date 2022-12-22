import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TemplateToolbarComponent {
    @ViewChild('textboxobj') textboxobj: TextBoxComponent;
    public data: string[] = ['25%', '50%', '75%', '100%'];

    public onCreate() {
        this.textboxobj.addIcon('prepend', 'e-icons e-search')
    }
}