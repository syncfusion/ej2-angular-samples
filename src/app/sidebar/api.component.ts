import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { enableRipple } from '@syncfusion/ej2-base';
@Component({
    selector: 'control-content',
    styleUrls: ['api-style.css'],
    templateUrl: 'api.html',
    encapsulation: ViewEncapsulation.None
})
export class ApiSidebarComponent {
    @ViewChild('sidebarInstance')
    public sidebarInstance: SidebarComponent;
    @ViewChild('sidebarTypesBtn')
    public sidebarTypesBtn: ButtonComponent;
    @ViewChild('backdropBtn')
    public backdropBtn: ButtonComponent;
    @ViewChild('documentClickBtn')
    public documentClickBtn: ButtonComponent
    @ViewChild('listObj')
    public listObj: DropDownListComponent;
    public dataTypes: Object[] = [
        { Id: '1', Type: 'Over', value: 'Over' },
        { Id: '2', Type: 'Push', value: 'Push' },
        { Id: '3', Type: 'Slide', value: 'Slide' },
        { Id: '4', Type: 'Auto', value: 'Auto' }
    ];
    public fields: object = { id: 'Id', text: 'Type', value: 'value' };
    public showBackdrop: boolean = false;
    public closeOnDocumentClick: boolean = false;
    public height: string = '220px';
    public width: string = '75px';
    public waterMark: string = 'Select a Type';
    public index: number = 3;
    // only for sample browser use 
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['api-style.css'];
    }

    // open new tab
    newTabClick(): void {
        document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'sidebar/api');
    }

    //Toggle button click event handler
    toggleSidebar(): void {
        this.sidebarInstance.toggle();
    };
    closeClick(): void {
        this.sidebarInstance.hide();
    };
    openClick(): void {
        this.sidebarInstance.show();
    };
    documentClick(): void {

        if (this.documentClickBtn.element.classList.contains('e-active')) {
            this.documentClickBtn.content = 'False';
            //enable the closeOnDocumentClick property
            this.sidebarInstance.closeOnDocumentClick = true;

        } else {
            this.documentClickBtn.content = 'True';
            //disable the closeOnDocumentClick property
            this.sidebarInstance.closeOnDocumentClick = false;
        }
    };
    onTypeChange(): void {
        if (this.sidebarTypesBtn.element.classList.contains('e-active')) {
            this.sidebarTypesBtn.content = 'Left';
            this.sidebarInstance.position = 'Right';
            document.getElementById("hamburger").className += " e-rtl";
        } else {
            this.sidebarTypesBtn.content = 'Right';
            this.sidebarInstance.position = 'Left';
             document.getElementById("hamburger").classList.remove("e-rtl");
        }
    };
    backdrop(): void {
        if (this.backdropBtn.element.classList.contains('e-active')) {
            this.backdropBtn.content = 'True';
            //enable the backdrop property
            this.sidebarInstance.showBackdrop = false;

        } else {
            this.backdropBtn.content = 'False';
            //disable the backdrop property
            this.sidebarInstance.showBackdrop = true;
        }
    };
    onChange(): void {
        let types: any = this.listObj.value;
        this.sidebarInstance.type = types;
    }

}