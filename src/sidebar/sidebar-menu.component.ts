import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-ng-navigations';
import { ListViewComponent } from '@syncfusion/ej2-ng-lists';
import { enableRipple } from '@syncfusion/ej2-base';
@Component({
    selector: 'control-content',
    styleUrls: ['sidebar-menu.css'],
    templateUrl: 'sidebar-menu.html',
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
    public fields: object = { tooltip: 'text' };
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['sidebar-menu.css'];
    }

    // open new tab
    newTabClick(): void {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'samples/sidebar/sidebar-menu/index.html');
    }
    // Listview select event handler
    onSelect(e: any) {
        this.sidebarInstance.hide();
    }

    openClick(): void {
        this.sidebarInstance.show();
    }
    closeClick(): void {
        this.sidebarInstance.hide();
    }

    //To hide the sidebar element skelton during the page load by setting the visibity style when the control is created.
    onCreated(e: any): void {
        this.sidebarInstance.element.style.visibility = 'visible';
    }

};