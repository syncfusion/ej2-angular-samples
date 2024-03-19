import { Component, ViewEncapsulation, Inject, ViewChild, HostListener, ElementRef } from '@angular/core';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ToastComponent, ToastCloseArgs, ToastPositionModel, ToastModule } from '@syncfusion/ej2-angular-notifications';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 *  Sample for types of toast
 */
@Component({
    selector: 'control-content',
    templateUrl: 'types.html',
    styleUrls: ['types.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToastModule, ButtonModule, SBDescriptionComponent]
})

export class TypesController {

    @ViewChild('toasttype')
    private toastObj: ToastComponent;

    @ViewChild('infoToast') 
    private btninfo: ButtonComponent;

    @ViewChild('warningToast') 
    private btnwarn: ButtonComponent;

    @ViewChild('errorToast') 
    private btnerr: ButtonComponent;

    @ViewChild('successToast')
    private btnsuccess: ButtonComponent;

    @ViewChild('hideTosat')
    private hidebtn: ButtonComponent;

    public position: ToastPositionModel = { X: 'Right' };

    public toasts: { [key: string]: Object }[] = [
        { title: 'Warning!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
        { title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
        { title: 'Error!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
        { title: 'Information!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
    ];

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['types.css'];
    }

    public onCreate(): void {
        setTimeout(function () {
            this.toastObj.show(this.toasts[3]);
        }.bind(this), 200);
    }

    public infoClick(): void {
        this.toastObj.show(this.toasts[3]);
    }

    public warningClick(): void {
        this.toastObj.show(this.toasts[0]);
    }

    public successClick(): void {
        this.toastObj.show(this.toasts[1]);
    }

    public errorClick(): void {
        this.toastObj.show(this.toasts[2]);
    }

    public hideClick(): void {
        this.toastObj.hide('All');
    }

    public onclose(e: ToastCloseArgs): void {
        if (e.toastContainer.childElementCount === 0) {
            this.hidebtn.element.style.display = 'none';
        }
    }

    public onBeforeOpen(): void {
        this.hidebtn.element.style.display = 'inline-block';
    }

    @HostListener('document:click', ['$event'])
    documentClick(e: MouseEvent): void {
        if (e.target !== this.btninfo.element && e.target !== this.btnwarn.element && e.target !== this.btnerr.element && e.target !== this.btnsuccess.element && this.toastObj.target === document.body) {
            this.toastObj.hide('All');
        }
    }
}