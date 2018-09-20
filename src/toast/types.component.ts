import { Component, ViewEncapsulation, Inject, ViewChild, HostListener, ElementRef } from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { ToastComponent, ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';
/**
 *  Sample for types of toast
 */
@Component({
    selector: 'control-content',
    templateUrl: 'types.html',
    styleUrls: ['types.css'],
    encapsulation: ViewEncapsulation.None
})

export class TypesController {
    @ViewChild('toasttype')
    public toastObj: ToastComponent;
    @ViewChild('infoToast') btninfo: ElementRef;
    @ViewChild('warningToast') btnwarn: ElementRef;
    @ViewChild('errorToast') btnerr: ElementRef;
    @ViewChild('successToast') btnsuccess: ElementRef;
    public position: object = { X: 'Right' };
    public toasts: { [key: string]: Object }[] = [
         { title: 'Warning!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
         { title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
         { title: 'Error!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
         { title: 'Information!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
    ];
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['types.css'];
    }
     public onCreate(): void {
      setTimeout(function(){
            this.toastObj.show(this.toasts[3]);
        }.bind(this),200);
    }
    public infoClick(e: Object): void {
       this.toastObj.show(this.toasts[3]);
    }
    public warningClick(e: Object): void {
         this.toastObj.show(this.toasts[0]);
    }
    public successClick(e: Object): void {
         this.toastObj.show(this.toasts[1]);
    }
    public errorClick(e: Object): void {
       this.toastObj.show(this.toasts[2]);
    }
    public hideClick(e: Object): void {
       this.toastObj.hide('All');
    }
    public onclose(e: ToastCloseArgs): void {
        if (e.toastContainer.childElementCount === 0 ) {
            let hideBtn: HTMLElement = document.getElementById('hideTosat');
            hideBtn.style.display = 'none';
        }
    }
    public onBeforeOpen(): void {
        let hideBtn: HTMLElement = document.getElementById('hideTosat');
        hideBtn.style.display = 'inline-block';
    }
    @HostListener('document:click', ['$event'])
    documentClick(e: MouseEvent) {
        let infoToast: HTMLElement = document.getElementById('infoToast');
        let warningToast: HTMLElement = document.getElementById('warningToast');
        let successToast: HTMLElement = document.getElementById('successToast');
        let errorToast: HTMLElement = document.getElementById('errorToast');
        if (e.target !== infoToast && e.target !== successToast && e.target !== errorToast && e.target !== warningToast && this.toastObj.target === document.body) {
            this.toastObj.hide('All');
        }
    }
}