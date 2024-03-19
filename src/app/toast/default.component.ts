import { Component, ViewEncapsulation, ViewChild, HostListener, ElementRef, Inject, Injector } from '@angular/core';
import { ToastComponent, ToastCloseArgs, ToastPositionModel, ToastModule } from '@syncfusion/ej2-angular-notifications';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 *  Sample for Basic Toast
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToastModule, ButtonModule, SBDescriptionComponent]
})

export class DefaultController {

    @ViewChild('defaulttoast')
    public toastObj: ToastComponent;

    @ViewChild('toastBtnHide')
    public btnEleHide: ButtonComponent;

    @ViewChild('toastBtnShow')
    public btnEleShow: ButtonComponent;

    public position: ToastPositionModel = { X: "Right" };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }

    public onCreate = (): void => {
        setTimeout((): void => {
            this.toastObj.show();
        }, 200);
    }

    public onClose = (e: ToastCloseArgs): void => {
        if (e.toastContainer.childElementCount === 0) {
            this.btnEleHide.element.style.display = 'none';
        }
    }

    public onBeforeOpen = (): void => {
        this.btnEleHide.element.style.display = 'inline-block';
    }

    public showToast = (): void => {
        this.toastObj.show();
    }

    public hideToast = (): void => {
        this.toastObj.hide('All');
    }

    @HostListener('document:click', ['$event'])
    documentClick = (e: MouseEvent): void => {
        if (e.target !== this.btnEleShow.element && this.toastObj.target === document.body) {
            this.toastObj.hide('All');
        }
    }
}