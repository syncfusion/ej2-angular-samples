import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { StepModel, Stepper, StepperModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [StepperModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class StepperDefaultComponent{
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.component.css'];
    }

    @ViewChild('stepperCustom') stepperObj1: Stepper;
    @ViewChild('stepperIcon') stepperObj2: Stepper;
    @ViewChild('stepperLabel') stepperObj3: Stepper;
    @ViewChild('stepperIconLabel') stepperObj4: Stepper;

    public iconOnly: StepModel[] = [
        { iconCss: 'sf-icon-cart' },
        { iconCss: 'sf-icon-user' },
        { iconCss: 'sf-icon-transport' },
        { iconCss: 'sf-icon-payment' },
        { iconCss: 'sf-icon-success' }
    ];
    public labelOnly: StepModel[] = [
        { label: 'Cart' },
        { label: 'Address' },
        { label: 'Delivery' },
        { label: 'Payment' },
        { label: 'Ordered' }
    ];
    public iconWithLabel: StepModel[] = [
        { label: 'Cart', iconCss: 'sf-icon-cart' },
        { label: 'Address', iconCss: 'sf-icon-user' },
        { label: 'Delivery', iconCss: 'sf-icon-transport' },
        { label: 'Payment', iconCss: 'sf-icon-payment', optional: true },
        { label: 'Ordered', iconCss: 'sf-icon-success' }
    ];

    public customText: StepModel[] = [
        { text: '1' },
        { text: '2' },
        { text: '3' },
        { text: '4' },
        { text: '5' }
    ];

    public customStepperCreated(): void {
        this.stepperObj1.activeStep = 2;
    }

    public iconStepperCreated(): void {
        this.stepperObj2.activeStep = 2;
    }

    public labelStepperCreated(): void {
        this.stepperObj3.activeStep = 2;
    }

    public iconLabelStepperCreated(): void {
        this.stepperObj4.activeStep = 2;
    }
}