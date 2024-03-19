/**
 * Tooltip template sample
 */

import { Component, ViewChild, ViewChildren, ViewEncapsulation, Inject } from '@angular/core';
import { TooltipComponent, TooltipEventArgs, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { ListViewComponent, ListViewModule } from '@syncfusion/ej2-angular-lists';
import { closest } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'tooltip-menu.html',
    styleUrls: ['tooltip-menu.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, TooltipModule, ToolbarModule, ListViewModule, SBDescriptionComponent]
})

export class TooltipMenuComponent {
    @ViewChild('tooltip')
    public tooltip: TooltipComponent;
    @ViewChild('listview')
    public listview: ListViewComponent;
    public fields = {
        text: 'Name',
        iconCss: 'icon'
    }

    public data: any;

    public data1: any = [{
        Name: 'WI-FI',
        id: '1',
        icon: 'wifi'
    },
    {
        Name: 'Bluetooth',
        id: '2',
        icon: 'bluetooth'
    },
    {
        Name: 'SIM cards',
        id: '3',
        icon: 'sim'
    }
    ];
    public data2: any = [{
        Name: 'Display',
        icon: 'display'
    },
    {
        Name: 'Sound',
        icon: 'sound'
    },
    {
        Name: 'Battery',
        icon: 'battery'
    },
    {
        Name: 'Users',
        icon: 'user'
    }
    ];
    public data3: any = [{
        Name: 'Location',
        icon: 'location'
    },
    {
        Name: 'Security',
        icon: 'security'
    },
    {
        Name: 'Language',
        icon: 'language'
    }
    ]
    public created() {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane').addEventListener('click', this.onClick.bind(this));
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
    }
    public onClick(args: any) {
        let targetEle: any;
        if (args) {
            targetEle = closest(args.target, '.e-toolbar-item');
        }
        if (!targetEle) {
            if (this.tooltip && document.getElementsByClassName('e-tooltip-wrap').length > 0) {
                this.tooltip.close();
            }
        }
    }
    public onScroll() {
        if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
            this.tooltip.close();
        }
    }
    public onBeforeRender(args: any) {
        let data: any = [{
            title: 'Wireless & networks',
            data: this.data1
        },
        {
            title: 'Device',
            data: this.data2
        },
        {
            title: 'Personal',
            data: this.data3
        }
        ];

        for (let i = 0; i < data.length; i++) {
            if (data[i].title === args.target.parentElement.getAttribute('title')) {
                this.data = data[i].data;
            }
        }
    }
}
