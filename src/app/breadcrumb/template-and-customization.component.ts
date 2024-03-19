import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { Breadcrumb, BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';
import { getComponent } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgIf } from '@angular/common';
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, ChipListModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'template-and-customization.html',
    styleUrls: ['template-and-customization.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, BreadcrumbModule, ChipListModule, NgIf, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class TemplateAndCustomizationController {
    
    public beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
        if(args.item.text !== 'Program Files') {
            args.item.disabled = true;
        }
    }
    // To refresh Breadcrumb control state when reset button clicked
  public btnClick() {
    let breadcrumb: any, breadcrumbInst: any, breadcrumbs: any = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
    for (var i = 0; i < breadcrumbs.length; i++) {
        breadcrumb = breadcrumbs[i];
        breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as Breadcrumb);
        breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length  -1].text;
    }
  }
}
