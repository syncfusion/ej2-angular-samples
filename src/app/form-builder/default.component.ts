import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilderModule } from '@syncfusion/ej2-angular-form-builder';

/**
 * Default FormBuilder Controller
 */
@Component({
   selector: 'control-content',
   templateUrl: 'default.html',
   styleUrls: ['form-builder.css'],
   encapsulation: ViewEncapsulation.None,
   standalone: true,
   imports: [FormBuilderModule]
})
export class DefaultFormBuilderController {
    public schema = {
        "properties": {
        },
        "layout": [
        ],
        "settings": {
            "name": "Untitled Form",
            "width": "100%"
        }
    }
}
