import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MultiSelectChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { MenuComponent } from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Api Menu Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.css'],
    encapsulation: ViewEncapsulation.None
})

export class ApiMenuController {
    @ViewChild('menu')
    public menuObj: MenuComponent;

    // Menu datasource
    public data: { [key: string]: Object }[] = [
        {
            header: 'Events',
            subItems: [
                { text: 'Conferences' },
                { text: 'Music' },
                { text: 'Workshops' }
            ]
        },
        {
            header: 'Movies',
            subItems: [
                { text: 'Now Showing' },
                { text: 'Coming Soon' }
            ]
        },
        {
            header: 'Directory',
            subItems: [
                { text: 'Media Gallery' },
                { text: 'Newsletters' }
            ]
        },
        {
            header: 'Queries',
            subItems: [
                { text: 'Our Policy' },
                { text: 'Site Map'},
                { text: '24x7 Support'}
            ]
        },
        { header: 'Services' }
    ];

    // Menu fields definition
    public menuFields: object = {
        iconCss: 'icon',
        text: ['header', 'text', 'value'],
        children: ['subItems', 'options']
    };

    // DropDownList datasource
    public modeData: object = [
        { text: 'Horizontal', value: 'Horizontal' },
        { text: 'Vertical', value: 'Vertical' }
    ];

    public mode: string = 'Horizontal';

    public modeChange(args: any): void {
        this.menuObj.orientation = args.itemData.value;
    }

    // MultiSelect datasource
    public headerData: { [key: string]: Object }[] = [
        { text: 'Events' }, { text: 'Movies'}, { text: 'Directory' }, { text: 'Queries' }, { text: 'Services' }
    ];

    public enabledisableChange(args: MultiSelectChangeEventArgs): void {
        if (args.value) {
            this.menuObj.enableItems(['Events', 'Movies', 'Directory', 'Queries', 'Services'], true);
            this.menuObj.enableItems(args.value as string[], false);
        }
    }

    // CheckBox change event
    public showOnClickChange(args: ChangeEventArgs) {
        this.menuObj.showItemOnClick = args.checked;
    }
}