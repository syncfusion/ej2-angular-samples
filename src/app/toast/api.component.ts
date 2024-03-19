import { Component, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { createElement, Effect, EmitType } from '@syncfusion/ej2-base';
import { ToastComponent, ToastBeforeOpenArgs, ToastCloseArgs, ToastPositionModel, ToastAnimationSettingsModel, ProgressDirectionType, ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DropDownListComponent, FieldSettingsModel, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { ButtonComponent, CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Sample for Animation and Advanced APIs in toast
 */
@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToastModule, CheckBoxModule, DropDownListModule, ButtonModule, SBDescriptionComponent]
})
export class ApiController {

    @ViewChild('toastApi')
    private toastObj: ToastComponent;

    @ViewChild('ShowEasing')
    private dropDownListShowEase: DropDownListComponent;

    @ViewChild('ProgressDirection')
    private dropDownListProgressDirection: DropDownListComponent;

    @ViewChild('HideEasing')
    private dropDownListHideEase: DropDownListComponent;

    @ViewChild('ShowAnimation')
    private dropDownListShow: DropDownListComponent;

    @ViewChild('HideAnimation')
    private dropDownListHide: DropDownListComponent;

    @ViewChild('toastBtnShow')
    private btnEleShow: ButtonComponent;

    public showData: { [key: string]: Object }[] = [
        { Id: 'ease', Text: 'Ease' },
        { Id: 'linear', Text: 'Linear' }
    ];

    public directionData: { [key: string]: Object }[] = [
        { Id: 'Rtl', Text: 'Right to Left' },
        { Id: 'Ltr', Text: 'Left to Right' }
    ];

    public animationData1: { [key: string]: Object }[] = [
        { Id: 'SlideBottomOut', Effect: 'Slide Bottom Out' },
        { Id: 'FadeIn', Effect: 'Fade In' },
        { Id: 'FadeZoomIn', Effect: 'Fade Zoom In' },
        { Id: 'FadeZoomOut', Effect: 'Fade Zoom Out' },
        { Id: 'FlipLeftDownIn', Effect: 'Flip Left Down In' },
        { Id: 'FlipLeftDownOut', Effect: 'Flip Left Down Out' },
        { Id: 'FlipLeftUpIn', Effect: 'Flip Left Up In' },
        { Id: 'FlipLeftUpOut', Effect: 'Flip Left Up Out' },
        { Id: 'FlipRightDownIn', Effect: 'Flip Right Down In' },
        { Id: 'FlipRightDownOut', Effect: 'Flip Right Down Out' },
        { Id: 'FlipRightUpIn', Effect: 'Flip Right Up In' },
        { Id: 'FlipRightUpOut', Effect: 'Flip Right Up Out' },
        { Id: 'SlideBottomIn', Effect: 'Slide Bottom In' },
        { Id: 'SlideLeftIn', Effect: 'Slide Left In' },
        { Id: 'SlideLeftOut', Effect: 'Slide Left Out' },
        { Id: 'SlideRightIn', Effect: 'Slide Right In' },
        { Id: 'SlideRightOut', Effect: 'Slide Right Out' },
        { Id: 'SlideTopIn', Effect: 'Slide Top In' },
        { Id: 'SlideTopOut', Effect: 'Slide Top Out' },
        { Id: 'ZoomIn', Effect: 'Zoom In' },
        { Id: 'ZoomOut', Effect: 'Zoom Out' }
    ];

    public animationData: { [key: string]: Object }[] = [
        { Id: 'SlideBottomIn', Effect: 'Slide Bottom In' },
        { Id: 'FadeIn', Effect: 'Fade In' },
        { Id: 'FadeZoomIn', Effect: 'Fade Zoom In' },
        { Id: 'FadeZoomOut', Effect: 'Fade Zoom Out' },
        { Id: 'FlipLeftDownIn', Effect: 'Flip Left Down In' },
        { Id: 'FlipLeftDownOut', Effect: 'Flip Left Down Out' },
        { Id: 'FlipLeftUpIn', Effect: 'Flip Left Up In' },
        { Id: 'FlipLeftUpOut', Effect: 'Flip Left Up Out' },
        { Id: 'FlipRightDownIn', Effect: 'Flip Right Down In' },
        { Id: 'FlipRightDownOut', Effect: 'Flip Right Down Out' },
        { Id: 'FlipRightUpIn', Effect: 'Flip Right Up In' },
        { Id: 'FlipRightUpOut', Effect: 'Flip Right Up Out' },
        { Id: 'SlideBottomOut', Effect: 'Slide Bottom Out' },
        { Id: 'SlideLeftIn', Effect: 'Slide Left In' },
        { Id: 'SlideLeftOut', Effect: 'Slide Left Out' },
        { Id: 'SlideRightIn', Effect: 'Slide Right In' },
        { Id: 'SlideRightOut', Effect: 'Slide Right Out' },
        { Id: 'SlideTopIn', Effect: 'Slide Top In' },
        { Id: 'SlideTopOut', Effect: 'Slide Top Out' },
        { Id: 'ZoomIn', Effect: 'Zoom In' },
        { Id: 'ZoomOut', Effect: 'Zoom Out' }
    ];

    public position: ToastPositionModel = { X: 'Right', Y: 'Bottom' };
    public showFields: FieldSettingsModel = { text: 'Text', value: 'Id' };
    public directionFields: FieldSettingsModel = { text: 'Text', value: 'Id' };
    public animationFields: FieldSettingsModel = { text: 'Effect', value: 'Id' };
    public easeValue: string = "ease";
    public progressDirectionValue: string = "Rtl";
    public animationValue: string = "SlideBottomIn";
    public hideAnimationValue: string = "SlideBottomOut";
    public true: boolean = true;
    private prevDuplicates: boolean = false;

    public showAnimation: ToastAnimationSettingsModel = {
        show:
        {
            effect: 'SlideBottomIn'
        },
        hide: {
            effect: 'SlideBottomOut',
        }
    };

    public closeOnChange(e: ChangeEventArgs): void {
        e.checked ? this.toastObj.showCloseButton = true : this.toastObj.showCloseButton = false;
    }

    public OnProgressChange(e: ChangeEventArgs): void {
        e.checked ? this.toastObj.showProgressBar = true : this.toastObj.showProgressBar = false;
    }

    public closeNewestOnChange(e: ChangeEventArgs): void {
        e.checked ? this.toastObj.newestOnTop = true : this.toastObj.newestOnTop = false;
    }

    public OnPrevDubChange(e: ChangeEventArgs): void {
        this.prevDuplicates = e.checked;
    }

    public OnactionBtnChange(e: ChangeEventArgs): void {
        if (e.checked) {
            this.toastObj.buttons = [{ model: { content: '<div class="e-toast-btn"> Click Here </div>' }, click: this.onActionBtnClick }];
        } else { this.toastObj.buttons = []; }
    }

    public onActionBtnClick(): void {
        alert('Action button is clicked');
    }

    public showToast(): void {
        const title: string = (document.getElementById('toast_input_title') as HTMLInputElement).value;
        let content: string = (document.getElementById('toast_input_content') as HTMLInputElement).value;
        if (title === '' && content === '') {
            content = 'You have created a Toast message';
        }
        let showDuration: number = parseInt((document.getElementById('showDuration') as HTMLInputElement).value, 10);
        let hideDuration: number = parseInt((document.getElementById('hideDuration') as HTMLInputElement).value, 10);
        let timeOut: number = parseInt((document.getElementById('timeOut') as HTMLInputElement).value, 10);
        this.toastObj.show(
            {
                title: title, content: content, timeOut: timeOut,
                animation: {
                    show: { duration: showDuration },
                    hide: { duration: hideDuration }
                }
            });
    }

    public onShowEase(): void {
        this.toastObj.animation.show.easing = this.dropDownListShowEase.value.toString();
    }

    public onProgressDirectionChange(): void {
        this.toastObj.progressDirection = this.dropDownListProgressDirection.value.toString() as ProgressDirectionType;
    }

    public showChange(): void {
        this.toastObj.animation.show.effect = this.dropDownListShow.value as Effect;
    }

    public hideChange(): void {
        this.toastObj.animation.hide.effect = this.dropDownListHide.value as Effect;
    }

    public onHideEase(): void {
        this.toastObj.animation.hide.easing = this.dropDownListHideEase.value.toString();
    }

    public showBtnClick(e: Object): void {
        this.showToast();
    }

    public hideBtnClick(): void {
        this.toastObj.hide('All');
    }

    public onBeforeOpen(e: ToastBeforeOpenArgs): void {
        const hideBtn: HTMLElement = document.getElementById('toastBtnHide');
        hideBtn.style.display = 'inline-block';
        if (this.prevDuplicates) {
            e.cancel = this.preventDuplicate(e);
        }
    }

    public onClose(e: ToastCloseArgs): void {
        if (e.toastContainer.childElementCount === 0) {
            const hideBtn: HTMLElement = document.getElementById('toastBtnHide');
            hideBtn.style.display = 'none';
        }
    }

    public preventDuplicate(e: ToastBeforeOpenArgs): boolean {
        const toastEle: HTMLElement = e.element;
        const toasts: HTMLCollection = e.toastObj.element.children;
        for (let i: number = 0; i < toasts.length; i++) {
            const toastTitle: HTMLElement = (toasts[i] as HTMLElement).querySelector('.e-toast-title') as HTMLElement;
            const toastMessage: HTMLElement = (toasts[i] as HTMLElement).querySelector('.e-toast-message') as HTMLElement;
            if (toastTitle && toastTitle.isEqualNode(toastEle.querySelector('.e-toast-title'))) {
                return true;
            }
            if (!toastTitle && toastMessage && toastMessage.isEqualNode(toastEle.querySelector('.e-toast-message'))) {
                return true;
            }
        }
        return false;
    }

    @HostListener('document:click', ['$event'])
    documentClick: EmitType<Object> = (e: MouseEvent) => {
        if (e.target !== this.btnEleShow.element && this.toastObj.target === document.body) {
            this.toastObj.hide('All');
        }
    }
}
