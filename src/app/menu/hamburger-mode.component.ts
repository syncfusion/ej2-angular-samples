import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MenuComponent, MenuModule } from '@syncfusion/ej2-angular-navigations';
// custom code start
import { Browser, select } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
// custom code end

/**
 * Hamburger Menu Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'hamburger-mode.html',
    styleUrls: ['hamburger-mode.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MenuModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class HamburgerMenuController {
    @ViewChild('menu')
    public menuObj: MenuComponent;

    // Menu datasource
    public data: { [key: string]: Object }[] = [
        {
            "text": "Accessories",
            "items": [
                {
                    "text": "Mobile",
                    "id": "mobile",
                    "items": [
                        {
                            "text": "Headphones"
                        },
                        {
                            "text": "Batteries"
                        },
                        {
                            "text": "Memory Cards"
                        }
                    ]
                },
                {
                    "text": "Laptops"
                },
                {
                    "text": "Desktop PC",
                    "items": [
                        {
                            "text": "Pendrives"
                        },
                        {
                            "text": "External Hard Disks"
                        }
                    ]
                },
                {
                    "text": "Camera",
                    "items": [
                        {
                            "text": "Lens"
                        },
                        {
                            "text": "Tripods"
                        }
                    ]
                }
            ]
        },
        {
            "text": "Fashion",
            "items": [
                {
                    "text": "Men"
                },
                {
                    "text": "Women"
                }
            ]
        },
        {
            "text": "Home & Living",
            "items": [
                {
                    "text": "Furniture"
                },
                {
                    "text": "Decor"
                },
                {
                    "text": "Smart Home Automation"
                },
                {
                    "text": "Dining & Serving"
                }
            ]
        },
        {
            "text": "Entertainment",
            "items": [
                {
                    "text": "Televisions"
                },
                {
                    "text": "Home Theatres"
                },
                {
                    "text": "Gaming Laptops"
                }
            ]
        },
        {
            "text": "Contact Us"
        },
        {
            "text": "Help"
        }
    ];

    // DropDownList datasource
    public viewModeData: object = [
        { text: 'Mobile', value: 'Mobile' },
        { text: 'Tablet', value: 'Tablet' },
        { text: 'Desktop', value: 'Desktop' }
    ];

	public viewMode: string = 'Mobile';

    public modeChange(args: ChangeEventArgs): void {
        let container: HTMLElement = document.querySelector('#layoutcontainer');
        switch (args.value) {
            case 'Mobile':
            case 'Tablet':
                this.menuObj.close();
                container.classList.add('deviceLayout');
                container.classList[args.value === 'Mobile' ? 'remove' : 'add']('tabletview');
                this.menuObj.element.parentElement.classList[args.value === 'Mobile' ? 'remove' : 'add']('e-menu-icon-right');
                this.menuObj.hamburgerMode = true;
                this.menuObj.showItemOnClick = true;
            break;
            case 'Desktop':
                container.classList.remove('deviceLayout', 'tabletview');
                this.menuObj.hamburgerMode = false;
                this.menuObj.showItemOnClick = false;
            break;
        }
    }

    // custom code start
    public menuCreated(): void {
        if (Browser.isDevice) {
            select('.property-section').remove();
            select('#layoutcontainer').removeAttribute('class');
            select('#layoutcontainer').removeAttribute('id');
            (select('.e-menu') as HTMLElement).style.height = '363px';
        }
    }
    // custom code end
}