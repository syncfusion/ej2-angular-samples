import { Component, ViewEncapsulation } from '@angular/core';
import { Breadcrumb, BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';
import { getComponent } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'bind-to-location.html',
    styleUrls: ['bind-to-location.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, BreadcrumbModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class BindToLocationController {
    
    public url = 'https://ej2.syncfusion.com/angular/demos/#/bootstrap5/breadcrumb/bind-to-location.html';
    public themeName = this.url.split('/')[6];

    public beforeItemRenderHanlder(args: BreadcrumbBeforeItemRenderEventArgs) {
        if (args.item.text == 'demos') {
            args.item.url = args.item.url + '/#/' + this.themeName;
        }
        else if (args.item.text == 'breadcrumb') {
            args.item.url = 'https://ej2.syncfusion.com/angular/demos/#/bootstrap5/breadcrumb/default'
        }
        else if (args.item.text == '#' || args.item.text == this.themeName || args.item.text == 'angular') {
            args.cancel = true;
        }
    }

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