import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuAnimationSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { closest } from '@syncfusion/ej2-base';

/**
 * Scrollable Menu Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'scrollable.html',
    styleUrls: ['scrollable.css'],
    encapsulation: ViewEncapsulation.None
})

export class ScrollableMenuController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['scrollable.css'];
    }

    public animation: MenuAnimationSettingsModel = { duration: 800 };

    // Menu items definition
    public menuItems: MenuItemModel[] = [
        {
            text: 'Appliances',
            id: 'appliances',
            items: [
                {
                    text: 'Kitchen',
                    items: [
                        { text: 'Electric Cookers' },
                        { text: 'Coffee Makers' },
                        { text: 'Blenders' },
                        { text: 'Microwave Ovens' }
                    ]
                },
                {
                    text: 'Television',
                    items: [
                        { text: 'Our Exclusive TVs' },
                        { text: 'Smart TVs' },
                        { text: 'Big Screen TVs' }
                    ]
                },
                {
                    text: 'Washing Machine'
                },
                {
                    text: 'Refrigerators'
                },
                {
                    text: 'Air Conditioners',
                    items: [
                        { text: 'Inverter ACs' },
                        { text: 'Split ACs' },
                        { text: 'Window ACs' },
                    ]
                },
                {
                    text: 'Water Purifiers'
                },
                {
                    text: 'Air Purifiers'
                },
                {
                    text: 'Chimneys'
                },
                {
                    text: 'Inverters'
                },
                {
                    text: 'Healthy Living'
                },
                {
                    text: 'Vacuum Cleaners'
                },
                {
                    text: 'Room Heaters'
                },
                {
                    text: 'New Launches'
                }
            ]
        },
        {
            text: 'Accessories',
            items: [
                {
                    text: 'Mobile',
                    id: 'mobile',
                    items: [
                        { text: 'Headphones' },
                        { text: 'Batteries' },
                        { text: 'Memory Cards' },
                        { text: 'Power Banks' },
                        { text: 'Mobile Cases' },
                        { text: 'Screen Protectors' },
                        { text: 'Data Cables' },
                        { text: 'Chargers' },
                        { text: 'Selfie Sticks' },
                        { text: 'OTG Cable' }
                    ]
                },
                {
                    text: 'Laptops'
                },
                {
                    text: 'Desktop PC',
                    items: [
                        { text: 'Pendrives' },
                        { text: 'External Hard Disks' },
                        { text: 'Monitors' },
                        { text: 'Keyboards' }
                    ]
                },
                {
                    text: 'Camera',
                    items: [
                        { text: 'Lens' },
                        { text: 'Tripods' }
                    ]
                }
            ]
        },
        {
            text: 'Fashion',
            items: [
                {
                    text: 'Men'
                },
                {
                    text: 'Women'
                }
            ]
        },
        {
            text: 'Home & Living',
            items: [
                {
                    text: 'Furniture'
                },
                {
                    text: 'Decor'
                },
                {
                    text: 'Smart Home Automation'
                },
                {
                    text: 'Dining & Serving'
                }
            ]
        },
        {
            text: 'Entertainment',
            items: [
                {
                    text: 'Televisions'
                },
                {
                    text: 'Home Theatres'
                },
                {
                    text: 'Gaming Laptops'
                }
            ]
        },
        {
            text: 'Contact Us'
        },
        {
            text: 'Help'
        }
    ];

    public onBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        // Restricting sub menu wrapper height
        if (args.parentItem.text === 'Appliances') {
            (closest(args.element, '.e-menu-wrapper') as HTMLElement).style.height = '320px';
        }
        if (args.parentItem.text === 'Mobile') {
            (closest(args.element, '.e-menu-wrapper') as HTMLElement).style.height = '260px';
        }
    }
}