import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderComponent, SliderChangeEventArgs } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

/**
 * slider property customization
 */
@Component({
    selector: 'control-content',
    templateUrl: 'azure-pricing.html',
    styleUrls: ['azure-pricing.css'],
    encapsulation: ViewEncapsulation.None
})

export class AzureComponent {
    @ViewChild('processorSlider')
    public processorSlider: any;
    @ViewChild('memorySlider')
    public memorySlider: any;
    @ViewChild('storageSlider')
    public storageSlider: any;
    @ViewChild('dialog')
    public dialogInstance: DialogComponent;
    @ViewChild('discountCheckbox')
    public discountCheckbox: CheckBoxComponent;
    @ViewChild('cPanelCheckbox')
    public cPanelCheckbox: CheckBoxComponent;
    public buttonCss: string = 'e-info';
    public processorValue: number = 4;
    public processorMin: number = 1;
    public processorMax: number = 16;
    public memoryValue: number = 4;
    public memoryMin: number = 1;
    public memoryMax: number = 12;
    public storageValue: number = 300;
    public storageMin: number = 10;
    public storageMax: number = 500;
    public storageStep: number = 10;
    public target: string = '#pricing-slider';
    public width: string = '360px';
    public animationSettings: any = { effect: 'None' };
    public alertContent: string = '<div id = "dialog-content"><div id = "dialog-header">Cloud Price Details</div>' +
        '<div id="processorDialog"><span id="processorPriceName">Processor Price</span><span id="processorPrice"></span></div>' +
        '<div id="MemoryDialog"><span id="memoryPriceName">Memory Price</span><span id="memoryPrice"></span></div>' +
        '<div id="StorgeDialog"><span id="storgePriceName">Storge Price</span><span id="storgePrice"></span></div>' +
        '<div id="CloudDialog"><span id="cloudPriceName">Estimated Price</span><span id="cloudPrice"></span></div></div>';
    public alertDlgButtons: any = [{
        click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'Close', isPrimary: true }
    }];
    public proceessorElem: HTMLElement;
    public memoryElem: HTMLElement;
    public storageElem: HTMLElement;
    public elemValue: HTMLElement;
    public finalValue: number;
    public discountValue: number;
    ngOnInit() {
        //change the slider value based on workload
        document.getElementById('xSmallBtn').onclick = (e: Event) => {
            this.sliderPriceValue(1, 1, 10);
        };
        document.getElementById('smallBtn').onclick = (e: Event) => {
            this.sliderPriceValue(1, 2, 10);
        };
        document.getElementById('mediumBtn').onclick = (e: Event) => {
            this.sliderPriceValue(4, 4, 300);
        };
        document.getElementById('largeBtn').onclick = (e: Event) => {
            this.sliderPriceValue(12, 6, 100);
        };
        document.getElementById('xLargeBtn').onclick = (e: Event) => {
            this.sliderPriceValue(8, 12, 300);
        };
        document.getElementById('btn').onclick = (e: Event) => {
            let processorPrice: HTMLElement = document.getElementById('processorPrice');
            this.onChange(processorPrice, <number>this.processorSlider.value, 'CORE');
            let memoryPrice: HTMLElement = document.getElementById('memoryPrice');
            this.onChange(memoryPrice, <number>this.memorySlider.value, 'GB');
            let storgePrice: HTMLElement = document.getElementById('storgePrice');
            this.onChange(storgePrice, <number>this.storageSlider.value, 'GB');
            let cloudPrice: HTMLElement = document.getElementById('cloudPrice');
            cloudPrice.innerText = '$' + this.finalValue;
            this.sliderValueChange();
            this.dialogInstance.refreshPosition();
            this.dialogInstance.show();
        };
    }

    sliderPriceValue(processor: number, memory: number, storage: number): void {
        this.processorSlider.value = processor;
        this.processorSlider.dataBind();
        this.memorySlider.value = memory;
        this.memorySlider.dataBind();
        this.storageSlider.value = storage;
        this.storageSlider.dataBind();
    }
    //Sets processor value
    onCreateProcessor(args: any): void {
        document.getElementById('processor').innerHTML = this.processorSlider.value + '  ' + 'CORE';
    }
    //Sets memory value
    onCreateMemory(args: any): void {
        document.getElementById('memory').innerHTML = this.memorySlider.value + '  ' + 'GB';
    }
    //Sets storage value
    onCreateStorage(args: any): void {
        document.getElementById('storage').innerHTML = this.storageSlider.value + '  ' + 'GB';
        this.sliderValueChange();
    }

    //Processor Slider value change method
    onChangeProcessor(args: SliderChangeEventArgs): void {
        this.onChange(document.getElementById('processor'), <number>args.value, 'CORE');
    }

    //Memory Slider value change method
    onChangeMemory(args: SliderChangeEventArgs): void {
        this.onChange(document.getElementById('memory'), <number>args.value, 'GB');
    }

    //Storage Slider value change method
    onChangeStorage(args: SliderChangeEventArgs): void {
        this.onChange(document.getElementById('storage'), <number>args.value, 'GB');
    }
    //common method for Slider value change
    onChange(elem: HTMLElement, value: number, notation: string): void {
        elem.innerText = value + '  ' + notation;
        this.sliderValueChange();
    }
    sliderValueChange(): void {
        this.elemValue = document.getElementById('value');
        let porcessorValue: number = <number>this.processorSlider.value;
        let memoryValue: number = <number>this.memorySlider.value;
        let storageValue: number = <number>this.storageSlider.value;
        //formula to calculate cloud price based on slider value
        this.finalValue = Number(((((porcessorValue * memoryValue) * 1000) + ((porcessorValue * memoryValue) * storageValue)
            + ((porcessorValue * memoryValue) * 100)) / 12).toFixed(2));
        if (this.cPanelCheckbox && this.cPanelCheckbox.checked) {
            this.finalValue = Number((this.finalValue - 10).toFixed(2));
        }
        if (this.discountCheckbox && this.discountCheckbox.checked) {
            this.finalValue = Number((this.finalValue - ((this.finalValue * 25) / 100)).toFixed(2));
        }
        this.elemValue.innerText = this.finalValue.toString();
    }

    alertDlgBtnClick(): void {
        this.dialogInstance.hide();
    }
}
