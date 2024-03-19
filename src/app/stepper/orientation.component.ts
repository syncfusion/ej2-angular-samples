import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { StepModel, Stepper, StepperModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'orientation.html',
    styleUrls: ['orientation.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [StepperModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class StepperOrientationComponent{
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['orientation.component.css'];
    }
    @ViewChild('orientationStepper') stepperObj: Stepper;
    
    public orientationSteps: StepModel[] = [
        { iconCss: 'sf-icon-ordered', label: 'Orders' },
        { iconCss: 'sf-icon-review', label: 'Review' },
        { iconCss: 'sf-icon-package', label: 'Packing' },
        { iconCss: 'sf-icon-delivery', label: 'Shipping' }
    ];

    public updateOrientation(args: any): void {
        this.stepperObj.orientation = args.currentTarget.value;
    };

    public updateLabelPosition(args: any): void {
        this.stepperObj.labelPosition = args.currentTarget.value;
    };

}