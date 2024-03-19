import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ItemModel, MenuEventArgs, DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * DropDownButton Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'dropdown-button.html',
    styleUrls: ['dropdown-button.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DropDownButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class DropDownButtonController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
         sourceFiles.files = ['dropdown-button.css'];
    }

    //DropDownButton items definition
    public items: ItemModel[] = [
        {
            text: 'Dashboard',
            iconCss: 'e-ddb-icons e-dashboard'
        },
        {
            text: 'Notifications',
            iconCss: 'e-ddb-icons e-notifications',
        },
        {
            text: 'User Settings',
            iconCss: 'e-ddb-icons e-settings',
        },
        {
            text: 'Log Out',
            iconCss: 'e-ddb-icons e-logout'
        }];
 }