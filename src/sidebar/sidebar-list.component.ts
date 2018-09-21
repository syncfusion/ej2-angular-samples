import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-angular-lists';
import { enableRipple } from '@syncfusion/ej2-base';
@Component({
    selector: 'control-content',
    styleUrls: ['sidebar-list.css'],
    templateUrl: 'sidebar-list.html',
    encapsulation: ViewEncapsulation.None
})
export class SidebarListComponent {
    @ViewChild('sidebarInstance')
    public sidebarInstance: SidebarComponent;
    public width: string = '250px';
    public type: string = 'Over';
    public dataList: { [key: string]: Object }[] = [
        { text: 'Home' },
        { text: 'About' },
        { text: 'Careers' },
        { text: 'FAQs' },
        { text: 'Blog' },
        { text: 'Uses' },
        { text: 'Contact' }
    ];
    public fields: Object = { tooltip: 'text' };
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['sidebar-menu.css'];
    }

    // open new tab
    newTabClick(): void {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'samples/sidebar/sidebar-list/index.html');
    }
    // Listview select event handler
    onSelect(args: SelectEventArgs) {
        this.sidebarInstance.hide();
        document.getElementsByClassName('content')[0].innerHTML =args.text+ " Page Content";
    }

    openClick(): void {
        this.sidebarInstance.show();
    }
    closeClick(): void {
        this.sidebarInstance.hide();
    }
};