import { Component, ViewEncapsulation } from '@angular/core';
import { SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';
/**
 * Default Speed Dial component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'styles.html',
    styleUrls: ['styles.css'],
    encapsulation: ViewEncapsulation.None
})

export class StylesComponent {
    public items: SpeedDialItemModel[] = [
        {
            text: 'Home',
            iconCss: 'speeddial-icons speeddial-icon-house'
        },
        {
            text: 'Contacts',
            iconCss: 'speeddial-icons speeddial-icon-people'
        },
        {
            text: 'Search',
            iconCss: 'speeddial-icons speeddial-icon-search'
        },
        {
            text: 'Message',
            iconCss: 'speeddial-icons speeddial-icon-message'
        }
    ];
    public itemLabel: SpeedDialItemModel[] = [
        {
            text: 'Home'
        },
        {
            text: 'Contacts'
        },
        {
            text: 'Search'
        },
        {
            text: 'Message'
        }
    ];
    public tooltItem: SpeedDialItemModel[] = [
        {
            title: 'Home',
            iconCss: 'speeddial-icons speeddial-icon-house'
        },
        {
            title: 'Contacts',
            iconCss: 'speeddial-icons speeddial-icon-people'
        },
        {
            title: 'Search',
            iconCss: 'speeddial-icons speeddial-icon-search'
        },
        {
            title: 'Message',
            iconCss: 'speeddial-icons speeddial-icon-message'
        }
    ];
}
