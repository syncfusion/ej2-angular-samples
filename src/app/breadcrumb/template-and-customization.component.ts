import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';

@Component({
    selector: 'control-content',
    templateUrl: 'template-and-customization.html',
    styleUrls: ['template-and-customization.css'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateAndCustomizationController {
    
    public beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
        if(args.item.text !== 'Program Files') {
            args.element.classList.add('e-disabled');
        }
    }
}
