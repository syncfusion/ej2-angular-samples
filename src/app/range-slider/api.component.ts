import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderComponent, NumericTextBoxComponent, SliderChangeEventArgs, SliderModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * slider property customization
 */
@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SliderModule, NumericTextBoxModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
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
    }
    orientation_onChange(args: ChangeEventArgs) {
        args.checked ? this.slider.orientation = 'Vertical' : this.slider.orientation = 'Horizontal';
    }
    readOnly_onChange(args: ChangeEventArgs) {
        this.slider.readonly = args.checked;
    }
    disabled_onChange(args: ChangeEventArgs) {
        this.slider.enabled = !args.checked;
    }

    buttonM_onChange(args: ChangeEventArgs) {
        this.slider.showButtons = args.checked;
    }
    orientationM_onChange(args: ChangeEventArgs) {
        args.checked ? this.slider.orientation = 'Vertical' : this.slider.orientation = 'Horizontal';
    }
    readOnlyM_onChange(args: ChangeEventArgs) {
        this.slider.readonly = args.checked;
    }
    disabledM_onChange(args: ChangeEventArgs) {
        this.slider.enabled = !args.checked;
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
