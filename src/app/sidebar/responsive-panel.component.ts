import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';


@Component({
    selector: 'control-content',
    styleUrls: ['responsive-panel.css'],
    templateUrl: 'responsive-panel.html',
    encapsulation: ViewEncapsulation.None
})
export class ResponsivePanelComponent {
    @ViewChild('sidebarTreeviewInstance')
    public sidebarTreeviewInstance: SidebarComponent;
    public width: string = '290px';
    mediaQuery: string = ('(min-width: 600px)');
    target: string = '.main-content';
       constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['responsive-panel.css'];
    }
    
    public data: Object[] = [
        {
            nodeId: '01', nodeText: 'Installation', iconCss: 'icon-microchip icon',
        },
        {
            nodeId: '02', nodeText: 'Deployment', iconCss: 'icon-thumbs-up-alt icon',
        },
        {
            nodeId: '03', nodeText: 'Quick Start', iconCss: 'icon-docs icon',
        },
        {
            nodeId: '04', nodeText: 'Components', iconCss: 'icon-th icon',
            nodeChild: [
                { nodeId: '04-01', nodeText: 'Calendar', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-02', nodeText: 'DatePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-03', nodeText: 'DateTimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-04', nodeText: 'DateRangePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-05', nodeText: 'TimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-06', nodeText: 'SideBar', iconCss: 'icon-circle-thin icon' }
            ]
        },
        {
            nodeId: '05', nodeText: 'API Reference', iconCss: 'icon-code icon',
            nodeChild: [
                { nodeId: '05-01', nodeText: 'Calendar', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-02', nodeText: 'DatePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-03', nodeText: 'DateTimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-04', nodeText: 'DateRangePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-05', nodeText: 'TimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-06', nodeText: 'SideBar', iconCss: 'icon-circle-thin icon' }
            ]
        },
        {
            nodeId: '06', nodeText: 'Browser Compatibility', iconCss: 'icon-chrome icon'
        },
        {
            nodeId: '07', nodeText: 'Upgrade Packages', iconCss: 'icon-up-hand icon'
        },
        {
            nodeId: '08', nodeText: 'Release Notes', iconCss: 'icon-bookmark-empty icon'
        },
        {
            nodeId: '09', nodeText: 'FAQ', iconCss: 'icon-help-circled icon'
        },
        {
            nodeId: '10', nodeText: 'License', iconCss: 'icon-doc-text icon'
        }
    ];
    public field:Object ={ dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss' };

    // open new tab
    newTabClick(): void {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'sidebar/responsive-panel');
    }

    openClick() {
        this.sidebarTreeviewInstance.toggle();
    }
};
// open new tab
