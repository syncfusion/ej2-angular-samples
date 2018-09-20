import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

/**
 * DropDownButton Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'drop-down-button.html',
    styleUrls: ['drop-down-button.css'],
    encapsulation: ViewEncapsulation.None
})

export class DropDownButtonController {
    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['drop-down-button.css'];
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