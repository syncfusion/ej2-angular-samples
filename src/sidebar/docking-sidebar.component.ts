import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
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
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'samples/sidebar/docking-sidebar/index.html');
    }
    positionChange(args: any) {
        this.dockBar.position = args.event.target.id == "left" ? "Left" : "Right";
    }
    toggleClick() {
        this.dockBar.toggle();
    }

}