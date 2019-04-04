import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderComponent, NumericTextBoxComponent, SliderChangeEventArgs } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

/**
 * slider property customization
 */
@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.css'],
    encapsulation: ViewEncapsulation.None
})

export class APIComponent {
    @ViewChild('slider')
    public slider: SliderComponent;
    @ViewChild('numeric1')
    public numericTextBox: NumericTextBoxComponent;
    public value: number = 30;
    public min: number = 0;
    public max: number = 100;
    public type: string = 'MinRange';
    public format: string = 'n0';
    public ticks: Object = { placement: 'After', largeStep: 20 };
    public tooltip: Object = { isVisible: true, placement: 'Before', showOn: 'Hover' };
    change(args: any) {
        if (args.value) {
            this.slider.value = args.value;
        }
    }
    min_change(args: any) {
        if (args.value) {
            this.slider.min = args.value;
        }
    }
    max_change(args: any) {
        if (args.value) {
            this.slider.max = args.value;
        }
    }
    step_change(args: any) {
        if (args.value) {
            this.slider.step = args.value;
        }
    }
    sliderChange(args: SliderChangeEventArgs) {
        if (args.value) {
            this.numericTextBox.value = <number>args.value;
        }
    }

    button_onChange(args: ChangeEventArgs) {
        this.slider.showButtons = args.checked;
        this.slider.dataBind();
    }
    orientation_onChange(args: ChangeEventArgs) {
        args.checked ? this.slider.orientation = 'Vertical' : this.slider.orientation = 'Horizontal';
        this.slider.dataBind();
    }
    readOnly_onChange(args: ChangeEventArgs) {
        this.slider.readonly = args.checked;
        this.slider.dataBind();
    }
    disabled_onChange(args: ChangeEventArgs) {
        this.slider.enabled = !args.checked;
        this.slider.dataBind();
    }

    buttonM_onChange(args: ChangeEventArgs) {
        this.slider.showButtons = args.checked;
        this.slider.dataBind();
    }
    orientationM_onChange(args: ChangeEventArgs) {
        args.checked ? this.slider.orientation = 'Vertical' : this.slider.orientation = 'Horizontal';
        this.slider.dataBind();
    }
    readOnlyM_onChange(args: ChangeEventArgs) {
        this.slider.readonly = args.checked;
        this.slider.dataBind();
    }
    disabledM_onChange(args: ChangeEventArgs) {
        this.slider.enabled = !args.checked;
        this.slider.dataBind();
    }

    ngOnInit() {
        if (!isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
    }
    // Handler used to reposition the tooltip on page scroll
    onScroll(): void {
        let slider: any = [this.slider];
        slider.forEach((slider: any) => {
            slider.refreshTooltip(slider.tooltipTarget);
        });
    }
}
