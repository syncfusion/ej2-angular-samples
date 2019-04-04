import { Component, ViewEncapsulation, Inject, ViewChild, HostListener, ElementRef } from '@angular/core';
import { createElement, Effect, compile, Browser, closest, EmitType } from '@syncfusion/ej2-base';
import { ButtonComponent, RadioButtonComponent, CheckBoxComponent, ChangeEventArgs as CheckBoxChange } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ToastComponent, ToastCloseArgs  } from '@syncfusion/ej2-angular-notifications';

/**
 *  Sample for Positioning options in Toast
 */
@Component({
    selector: 'control-content',
    templateUrl: 'positions.html',
    styleUrls: ['positions.css'],
    encapsulation: ViewEncapsulation.None
})

export class PositionsController {
    //Get the object for components used in sample
    @ViewChild('toastpos')
    private toastObj: ToastComponent;
    @ViewChild('position')
    private dropDownObj: DropDownListComponent;
    @ViewChild('dropdownRadio')
    private dropRadioObj: RadioButtonComponent;
    @ViewChild('customRadio')
    private customRadioObj: RadioButtonComponent;
    @ViewChild('radio1')
    private radio1: RadioButtonComponent;
    @ViewChild('radio2')
    private radio2: RadioButtonComponent;
    public toastPosition: Object = { X: 'Right', Y: 'Bottom' };
    public target: HTMLElement = document.body;
    private initialWid: string = '';
    public true: boolean = true;
    private customFlag: boolean = false;
    //Pre-defined positioning values for drop down list
    public dropData: { [key: string]: Object }[] = [
        { Id: 'topleft', Text: 'Top Left' },
        { Id: 'topright', Text: 'Top Right' },
        { Id: 'topcenter', Text: 'Top Center' },
        { Id: 'topfullwidth', Text: 'Top Full Width' },
        { Id: 'bottomleft', Text: 'Bottom Left' },
        { Id: 'bottomright', Text: 'Bottom Right' },
        { Id: 'bottomcenter', Text: 'Bottom Center' },
        { Id: 'bottomfullwidth', Text: 'Bottom Full Width' },
    ];
    public dropFields: Object = { text: 'Text', value: 'Id' };
    public value: string = 'bottomright';
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['positions.css'];
    }
    public checkboxChange(e: ChangeEventArgs): void {
        if (this.radio1.checked) {
            this.toastObj.hide('All');
            this.toastObj.target = '#toast_pos_target';
            this.toastShow(1000);
        }
    }
    public toastShow(timeOutDelay: number): void {
        setTimeout(function(){
                this.toastObj.show();
         }.bind(this),timeOutDelay);
    }
    public checkboxChange1(e: CheckBoxChange): void {
         if (this.radio2.checked) {
            this.toastObj.hide('All');
            this.toastObj.target = document.body;
            this.toastShow(1000);
        }
    }
    public checkboxChange2(e: CheckBoxChange): void {  
         if (this.dropRadioObj.checked) {
            this.toastObj.hide('All');
            document.getElementById('dropdown').style.display = 'table-cell';
            document.getElementById('customChoose').style.display = 'none';
            this.setToastPosValue(this.dropDownObj.value.toString()); this.customFlag = false; this.toastShow(1000);
        }
    }
    public checkboxChange3(e: CheckBoxChange): void {
         if (this.customRadioObj.checked) {
            this.toastObj.hide('All');
            document.getElementById('dropdown').style.display = 'none';
            document.getElementById('customChoose').style.display = 'table-cell';
            this.setcustomPosValue(); this.customFlag = true; this.toastShow(1000);
        }
    }
    public valueChange(e: ChangeEventArgs): void {
         this.toastObj.hide('All'); this.setToastPosValue(e.value.toString()); this.toastShow(1000);
    }
    //To set custom position values
    public setcustomPosValue(): void {
        this.toastObj.width = this.initialWid;
        this.toastObj.position.X = parseInt((document.getElementById('xPos') as HTMLInputElement).value, 10);
        this.toastObj.position.Y = parseInt((document.getElementById('yPos') as HTMLInputElement).value, 10);
    }
    public showBtnClick(): void {
         if (this.customFlag) {
            this.setcustomPosValue();
        }
        this.toastObj.show();
    }
    //Pre defined postions available based on target
    public setToastPosValue(value: string): void {
        this.toastObj.width = this.initialWid;
        switch (value) {
            case 'topleft':
                this.toastObj.position.X = 'Left'; this.toastObj.position.Y = 'Top'; break;
            case 'topright':
                this.toastObj.position.X = 'Right'; this.toastObj.position.Y = 'Top'; break;
            case 'topcenter':
                this.toastObj.position.X = 'Center'; this.toastObj.position.Y = 'Top'; break;
            case 'topfullwidth':
                this.toastObj.width = '100%'; this.toastObj.position.X = 'Center'; this.toastObj.position.Y = 'Top'; break;
            case 'bottomleft':
                this.toastObj.position.X = 'Left'; this.toastObj.position.Y = 'Bottom'; break;
            case 'bottomright':
                this.toastObj.position.X = 'Right'; this.toastObj.position.Y = 'Bottom'; break;
            case 'bottomcenter':
                this.toastObj.position.X = 'Center'; this.toastObj.position.Y = 'Bottom'; break;
            case 'bottomfullwidth':
                this.toastObj.width = '100%'; this.toastObj.position.X = 'Center'; this.toastObj.position.Y = 'Bottom'; break;
        }
    }
    public hideBtnClick(): void {
         this.toastObj.hide('All');
    }
    public created(): void {
         setTimeout(function(){
            this.toastShow(200);
            this.initialWid = this.toastObj.width.toString();
        }.bind(this),200);
    }
    @HostListener('document:click', ['$event'])
    documentClick: EmitType<Object> = (e: MouseEvent) => {
        let showButton: HTMLElement = document.getElementById('show_Toast');
        if (e.target !== showButton && this.toastObj.target === document.body) {
            this.toastObj.hide('All');
        }
    }
    public onClose(e: ToastCloseArgs): void {
        if (e.toastContainer.childElementCount === 0 ) {
            let hideBtn: HTMLElement = document.getElementById('hideTosat');
            hideBtn.style.display = 'none';
        }
    }
    public onBeforeOpen(): void {
        let hideBtn: HTMLElement = document.getElementById('hideTosat');
        hideBtn.style.display = 'inline-block';
         if (!Browser.isDevice) {
              this.toastObj.width = 350;
              this.toastObj.dataBind();
         }
    }
}