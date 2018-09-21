import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
@Component({
    selector: 'control-content',
    styleUrls: ['default-style.css'],
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultSidebarComponent {
    @ViewChild('sidebar')
    public sidebar: SidebarComponent;
    public closeOnDocumentClick: boolean = false;
    // only for sample browser use 
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default-style.css'];
    }

    // open new tab
    newTabClick(): void {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'samples/sidebar/default/index.html');
    }
    positionChange(args: any) {
        this.sidebar.position = args.event.target.id == "left" ? "Left" : "Right";
        if(args.event.target.id == "right"){
            document.getElementById("hamburger").className += " e-rtl";
        }
        if(args.event.target.id == "left"){
            document.getElementById("hamburger").classList.remove("e-rtl");
        }
    }
    toggleClick() {
        this.sidebar.toggle();
    }
    closeClick() {
        this.sidebar.hide();
    }
    openClick() {
        this.sidebar.show();
    }
}