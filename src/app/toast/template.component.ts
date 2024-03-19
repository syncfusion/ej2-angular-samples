import { Component, ViewEncapsulation, Inject, ViewChild, ElementRef } from '@angular/core';
import { compile, Browser, closest } from '@syncfusion/ej2-base';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownList, ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ToastComponent, ToastBeforeOpenArgs, ToastPositionModel, ToastAnimationSettingsModel, ToastModule } from '@syncfusion/ej2-angular-notifications';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 *  Sample Dynamic and Static template support
 */
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ButtonModule, ToastModule, DropDownListModule, SBDescriptionComponent]
})

export class TemplateController {

    @ViewChild('toasttemplate')
    private toastObj: ToastComponent;

    @ViewChild('snooze')
    private listObj: DropDownList;

    @ViewChild('toastcustom')
    private toastObjEmail: ToastComponent;

    @ViewChild('alarmTurnOn')
    private alarmOn: ButtonComponent;

    @ViewChild('toastMailRemainder')
    private toastMail: ButtonComponent;

    @ViewChild('snoozeBtn')
    private snooze: ElementRef;

    @ViewChild('dismiss')
    private dismiss: ElementRef;

    public cusPosition: ToastPositionModel = { X: 'Right' };
    public tempPosition: ToastPositionModel = !Browser.isDevice ? { X: 'Right', Y: 'Bottom' } : { X: 'Center', Y: 'Top' };
    public tempTarget: HTMLElement | Element | string = !Browser.isDevice ? document.body : '#toast_template_target';
    public true: Boolean = true;
    public timeOut: Number = 0;

    public cusAnimation: ToastAnimationSettingsModel = {
        hide: { effect: 'SlideRightOut' },
        show: { effect: 'SlideRightIn' }
    };

    private template: string = '<div class="e-toast-template">${if(image)}<img class="e-toast-icon e-toast-image" src="${image.url}" />${/if} ${if(from || subject)}<div class="e-toast-message">${if(from)}<div class="e-toast-title">${from}</div>${/if} ${if(subject)}<div class="e-toast-content">${subject}</div>${/if}</div>${/if}</div>';

    private toastData: Object[] = [
        { from: ' Anjolie Stokes', subject: 'Networking Referral', image: { url: 'https://ej2.syncfusion.com/demos/src/toast/resource/laura.png' }, },
        { from: ' Ila Russo', subject: 'Business dinner invitation', image: { url: '//ej2.syncfusion.com/demos/src/toast/resource/janat.png' }, },
        { from: ' Camden Mcmillan', subject: 'Reference Request - Cameran Hester', image: { url: 'https://ej2.syncfusion.com/demos/src/toast/resource/camden.png' }, },
        { from: ' Chase Solomon', subject: 'New business relationship confirmation', image: { url: 'https://ej2.syncfusion.com/demos/src/toast/resource/chase.png' }, },
        { from: ' Inga Scott', subject: 'Application for Sales Associate', image: { url: 'https://ej2.syncfusion.com/demos/src/toast/resource/michael.png' },}
    ];

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['template.css'];
    }

    /* HTML static template toast customization */
    private toastFlag: number = 0;
    private snoozeFlag: boolean = false;
    private waterMark: string = 'Select a snooze time';
    private height: string = '200px';
    private value: string = '2min';
    private snoozeData: { [key: string]: Object }[] = [
        { value: '2min', text: '2 minutes' },
        { value: '5min', text: '5 minutes' },
        { value: '10min', text: '10 minutes' }
    ];

    public alarmClick(): void {
        this.toastObj.show();
    }
    public onOpenToast(): void {
        document.getElementById('snooze').addEventListener('click', function (): void {
            this.snoozeFlag = true;
            this.toastObj.hide();
        }.bind(this));
        document.getElementById('dismiss').addEventListener('click', function (): void {
            this.toastObj.hide();
        }.bind(this));
        document.addEventListener('click', function (e: Event): void {
            const closestEle: HTMLElement = closest(e.target as Element, '.e-toast-container') as HTMLElement;
            if (e.target !== this.alarmOn.element && e.target !== this.toastMail.element && closestEle !== this.toastObj.element && closestEle !== this.toastObjEmail.element) {
                this.toastObj.hide('All');
                this.toastObjEmail.hide('All');
            }
        }.bind(this));
    }

    public onToastClose(): void {
        this.alarmOn.element.style.display = 'inline-block';
        if (this.snoozeFlag) {
            // Set time out for toast based on selected time from drop down
            this.toastObj.show({ timeOut: (parseInt(this.listObj.value.toString(), 10) * 60000) });
            this.snoozeFlag = false;
        }
    }

    public onToastBeforeOpen(e: ToastBeforeOpenArgs): void {
        this.alarmOn.element.style.display = 'none';
    }

    public listChange(e: ChangeEventArgs): void {
        this.snoozeFlag = true;
        this.toastObj.hide();
    }

    public toastObjCreate(): void {
        setTimeout(function () {
            this.toastObj.show();
        }.bind(this), 200);
    }

    /* Create toast using template engine dynamically */

    public toastObjEmailCreate(): void {
        setTimeout(function () {
            this.toastObjEmail.show({ template: this.cardTemplateFn(this.toastData[this.toastFlag])[0].outerHTML });
            ++this.toastFlag;
        }.bind(this), 200);
    }

    public remainderClick(): void {
        const obj: HTMLElement = this.cardTemplateFn(this.toastData[this.toastFlag])[0] as HTMLElement;
        this.toastObjEmail.show({ template: obj.outerHTML });
        ++this.toastFlag;
        if (this.toastFlag === (this.toastData.length)) {
            this.toastFlag = 0;
        }
    }

    public cardTemplateFn(data: Object): NodeList {
        return compile(this.template.trim())(data) as NodeList;
    }
}
