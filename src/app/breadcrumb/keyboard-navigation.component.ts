import { Component, ViewEncapsulation } from '@angular/core';
import { getComponent } from '@syncfusion/ej2-base';
import { Breadcrumb } from '@syncfusion/ej2-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-navigation.html',
    styleUrls: ['keyboard-navigation.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, BreadcrumbModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class KeyboardNavigationController {
    // To refresh Breadcrumb control state when reset button clicked
    public btnClick() {
        let breadcrumb: HTMLElement = document.getElementById('keyboard-navigation');
        let breadcrumbInst: any = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as Breadcrumb);
        breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
    }
}