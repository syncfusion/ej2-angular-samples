import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent, SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent, ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    styleUrls: ['api-style.css'],
    templateUrl: 'api.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, DropDownListModule, SidebarModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ApiSidebarComponent {
    @ViewChild('sidebarInstance')
    public sidebarInstance: SidebarComponent;
    @ViewChild('positionObj')
    public positionBtn: ButtonComponent;
    @ViewChild('documentObj')
    public documentBtn: ButtonComponent;
    @ViewChild('backDropObj')
    public backdropBtn: ButtonComponent;
    @ViewChild('dropDownObj')
    public dropDownObj: DropDownListComponent;
    public dataTypes: { [key: string]: Object }[] = [
        {  Type: 'Over', value: 'Over' },
        {  Type: 'Push', value: 'Push' },
        {  Type: 'Slide', value: 'Slide' },
        {  Type: 'Auto', value: 'Auto' }
    ];
    public fields: object = { text: 'Type', value: 'value' };
    public showBackdrop: boolean = false;
    public closeOnDocumentClick: boolean = false;
    public height: string = '220px';
    public index: number = 3;
    // only for sample browser use 
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['api-style.css'];
    }

    onChange() {
        let types: any = this.dropDownObj.value;
        this.sidebarInstance.type = types;
        this.sidebarInstance.dataBind();
    }
    toggleBtnClick() {
        this.sidebarInstance.toggle();
        if (this.backdropBtn.content == "True") {
            this.sidebarInstance.showBackdrop = true;
        }
    }
    positionBtnClick() {
        if (this.positionBtn.content == "Right") {
            this.positionBtn.content = "Left";
            this.sidebarInstance.position = "Left";
        } else {
            this.positionBtn.content = "Right";
            this.sidebarInstance.position = "Right";
        }
        this.positionBtn.dataBind();
        this.sidebarInstance.dataBind();
    }
    docBtnClick() {
        if (this.documentBtn.content == "False") {
            this.documentBtn.content = "True";
            this.sidebarInstance.closeOnDocumentClick = true;
        } else {
            this.documentBtn.content = "False";
            this.sidebarInstance.closeOnDocumentClick = false;
        }
        this.sidebarInstance.dataBind();
        this.documentBtn.dataBind();
    }
    backBtnClick() {
        if (this.backdropBtn.content == "True") {
            this.backdropBtn.content = "False";
            this.sidebarInstance.showBackdrop = false;
        } else {
            this.backdropBtn.content = "True";
            this.sidebarInstance.showBackdrop = true;
        }
    }
    sidebarClose() {
        this.sidebarInstance.hide();
        if (this.sidebarInstance.showBackdrop == true){
            this.sidebarInstance.showBackdrop = false;
        }
    }
}