import { Component, ViewEncapsulation } from '@angular/core';
import { Breadcrumb } from '@syncfusion/ej2-navigations';
import { getComponent } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'overflow-modes.html',
    styleUrls: ['overflow-modes.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, BreadcrumbModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class OverFlowModesController {

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
