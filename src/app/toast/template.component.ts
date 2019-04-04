import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { createElement, Effect, compile, Browser, closest } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ToastComponent, ToastOpenArgs, ToastCloseArgs, ToastBeforeOpenArgs } from '@syncfusion/ej2-angular-notifications';

/**
 *  Sample Dynamic and Static template support
 */
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateController {
    @ViewChild('toasttemplate')
    private toastObj: ToastComponent;
    public cusPosition: Object = { X: 'Right' };
    public tempPosition: Object = !Browser.isDevice ? { X: 'Right', Y: 'Bottom' } : { X: 'Center', Y: 'Top' };
    public tempTarget: any = !Browser.isDevice ? document.body : '#toast_template_target';
    public true: Boolean = true;
    public timeOut: Number = 0;
    public cusAnimation: {
            hide: { effect: 'SlideRightOut' },
            show: { effect: 'SlideRightIn' }
        };
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['template.css'];
    }
    /* HTML static template toast customization */
    private toastFlag: number = 0;
    private snoozeFlag: boolean = false;
    private listObj: DropDownList = new DropDownList({
             placeholder: 'Select a snooze time',
             popupHeight: '200px',
             change: this.listChange.bind(this)
        }) as DropDownList;

    public alarmClick(): void {
         this.toastObj.show();
    }
    public onOpenToast(): void {
        let dismisBtn: HTMLElement = document.getElementById('dismiss');
        let snooze: HTMLElement = document.getElementById('snooze');
        snooze.addEventListener('click',  function() : void {
             this.snoozeFlag = true;
            this.toastObj.hide();
        }.bind(this));
        dismisBtn.addEventListener('click',  function() : void {
            this.toastObj.hide();
        }.bind(this));
        document.addEventListener('click',  function(e: Event) : void {
           let closestEle: HTMLElement = closest(e.target as Element, '.e-toast-container') as HTMLElement;
           let alarm: HTMLElement = document.getElementById('Alarm_turn_on');
           let btnEle: HTMLElement = document.getElementById('toast_mail_remainder');
           if (e.target !== alarm && e.target !== btnEle && closestEle !== this.toastObj.element && closestEle !== this.toastObjEmail.element) {
               this.toastObj.hide('All');
               this.toastObjEmail.hide('All');
           }
        }.bind(this));
    }
    public onToastClose(): void {
         let alarm: HTMLElement = document.getElementById('Alarm_turn_on');
         alarm.style.display = 'inline-block';
        if (this.snoozeFlag) {
            //Set time out for toast based on selected time from drop down
            this.toastObj.show({ timeOut: (parseInt(this.listObj.value.toString(), 10) * 60000) });
            this.snoozeFlag = false;
        }
    }
    public onToastBeforeOpen(e: ToastBeforeOpenArgs): void {
        let alarm: HTMLElement = document.getElementById('Alarm_turn_on');
        alarm.style.display = 'none';
        this.listObj.appendTo(e.element.querySelector('#snoozeDD') as HTMLElement);
    }
    public listChange(e: ChangeEventArgs): void {
        this.snoozeFlag = true;
        this.toastObj.hide();
    }
    public toastObjCreate(): void {
         setTimeout(function(){
           this.toastObj.show();
         }.bind(this),200);
    }
    /* Create toast using template engine dynamically */
    @ViewChild('toastcustom')
    private toastObjEmail: ToastComponent;
    private template: string = '<div class="e-toast-template">${if(image)}<img class="e-toast-icon e-toast-image" src="${image.url}" />${/if} ${if(from || subject)}<div class="e-toast-message">${if(from)}<div class="e-toast-title">${from}</div>${/if} ${if(subject)}<div class="e-toast-content">${subject}</div>${/if}</div>${/if}</div>';
    private toastData: Object[] = [
        { from: ' Anjolie Stokes', subject: 'Networking Referral', image: { url: './assets/toast/resource/laura.png' }, },
        { from: ' Ila Russo', subject: 'Business dinner invitation', image: { url: './assets/toast/resource/janat.png' }, },
        { from: ' Camden Mcmillan', subject: 'Reference Request - Cameran Hester', image: { url: './assets/toast/resource/camden.png' }, },
        { from: ' Chase Solomon', subject: 'New business relationship confirmation', image: { url: './assets/toast/resource/chase.png' }, },
        {
            from: ' Inga Scott', subject: 'Application for Sales Associate', image: { url: './assets/toast/resource/michael.png' },
        }];
    public toastObjEmailCreate(): void {
        setTimeout(function(){
            this.toastObjEmail.show({ template: this.cardTemplateFn(this.toastData[this.toastFlag])[0].outerHTML });
            ++this.toastFlag;
        }.bind(this),200);
    }
    public remainderClick(): void {
        var obj: HTMLElement = this.cardTemplateFn(this.toastData[this.toastFlag])[0] as HTMLElement;
        this.toastObjEmail.show({ template: obj.outerHTML});
        ++this.toastFlag;
        if (this.toastFlag === (this.toastData.length)) {
            this.toastFlag = 0;
        }
    }
    public cardTemplateFn(data: Object): NodeList {
        return compile(this.template.trim())(data) as NodeList;
    }
}