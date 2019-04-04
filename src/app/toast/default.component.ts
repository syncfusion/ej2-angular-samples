import { Component, ViewEncapsulation, ViewChild, HostListener, ElementRef, Inject } from '@angular/core';
import { ToastComponent, ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';
import { EmitType } from '@syncfusion/ej2-base';
/**
 *  Sample for Basic Toast
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultController  {
    @ViewChild('defaulttoast')
    public toastObj: ToastComponent;
    @ViewChild('toastBtnShow')
    public btnEleShow: ElementRef;
    public position: Object = { X: "Right" };
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }
    public onCreate: EmitType<Object> = () => {
        setTimeout(()=>{
        this.toastObj.show();
        },200);
    }
    public onClose: EmitType<Object> = (e: ToastCloseArgs) => {
        if (e.toastContainer.childElementCount === 0 ) {
           let hideBtn: HTMLElement = document.getElementById('toastBtnHide');
           hideBtn.style.display = 'none';
      }
    }
    public onBeforeOpen: EmitType<Object> = () => {
           let hideBtn: HTMLElement = document.getElementById('toastBtnHide');
           hideBtn.style.display = 'inline-block';
    }
    public showToast: EmitType<Object> = (e: Object) => {
        this.toastObj.show();
    }
    public hideToast: EmitType<Object> = (e: Object) => {
        this.toastObj.hide('All');
    }
    @HostListener('document:click', ['$event'])
    documentClick: EmitType<Object> = (e: MouseEvent) => {
        let showButton: HTMLElement = document.getElementById('toastBtnShow');
        if (e.target !== showButton && this.toastObj.target === document.body) {
            this.toastObj.hide('All');
        }
    }
}