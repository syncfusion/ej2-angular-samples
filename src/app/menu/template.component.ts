import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MenuAnimationSettingsModel } from '@syncfusion/ej2-angular-navigations';

/**
 * Template Menu Controller
 */

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateMenuController {

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['template.css'];
    }

    public animation: MenuAnimationSettingsModel = { effect: 'None' };

    // Template datasource
    public dataSource: { [key: string]: Object }[] = [
        {
            category: 'Products',
            options: [
                { value: 'JavaScript', url: 'javascript' },
                { value: 'Angular', url: 'angular' },
                { value: 'ASP.NET Core', url: 'core' },
                { value: 'ASP.NET MVC', url: 'mvc' }
            ]
        },
        {
            category: 'Services',
            options: [
                { value: 'Application Development', count: '1200+' },
                { value: 'Maintenance & Support', count: '3700+' },
                { value: 'Quality Assurance' },
                { value: 'Cloud Integration', count: '900+' }
            ]
        },
        {
            category: 'About Us',
            options: [
                {
                    id: 'about',
                    about: {
                        value: "We are on a mission to provide world-class best software solutions for web, mobile and desktop platforms. Around 900+ applications are desgined and delivered to our customers to make digital & strengthen their businesses."
                    }
                }
            ]
        },
        { category: 'Careers' },
        { category: 'Sign In' }
    ];

    // Menu fields definition
    public menuFields: object = {
        text: ['category', 'value'],
        children: ['options']
    };
}