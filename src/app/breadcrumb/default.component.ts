import { Component, ViewEncapsulation } from '@angular/core';
import { getComponent } from '@syncfusion/ej2-base';
import { Breadcrumb } from '@syncfusion/ej2-navigations';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultBreadcrumbController {
    
    // To refresh Breadcrumb control state when reset button clicked
    public btnClick() {
        let breadcrumb: any, breadcrumbInst: any, breadcrumbs: any = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
        for (var i = 0; i < breadcrumbs.length; i++) {
            breadcrumb = breadcrumbs[i];
            breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as Breadcrumb);
            breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
        }
    }
}