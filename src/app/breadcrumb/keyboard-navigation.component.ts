import { Component, ViewEncapsulation } from '@angular/core';
import { getComponent } from '@syncfusion/ej2-base';
import { Breadcrumb } from '@syncfusion/ej2-navigations';

@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-navigation.html',
    styleUrls: ['keyboard-navigation.css'],
    encapsulation: ViewEncapsulation.None
})

export class KeyboardNavigationController {
    // To refresh Breadcrumb control state when reset button clicked
    public btnClick() {
        let breadcrumb: HTMLElement = document.getElementById('keyboard-navigation');
        let breadcrumbInst: any = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as Breadcrumb);
        breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
    }
}