import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
    selector: 'control-content',
    styleUrls: ['dock-style.css'],
    templateUrl: 'docking-sidebar.html',
    encapsulation: ViewEncapsulation.None
})
export class DockSidebarComponent {
    @ViewChild('dockBar')
    public dockBar: SidebarComponent;
    public enableDock: boolean = true;
    public width: string = '220px';
    public dockSize: string = '72px';
    // only for sample browser use 
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['dock-style.css'];
    }

    // open new tab
    newTabClick(): void {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'sidebar/docking-sidebar');
    }
    positionChange(args: any) {
        this.dockBar.position = args.value == "left" ? "Left" : "Right";
    }
    toggleClick() {
        this.dockBar.toggle();
    }

}