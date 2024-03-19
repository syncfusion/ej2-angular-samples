import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked, ElementRef } from '@angular/core';
import { StepModel, Stepper, StepperChangedEventArgs, StepperModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'linear.html',
    styleUrls: ['linear.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [StepperModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class StepperLinearComponent{
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['linear.component.css'];
    }
    @ViewChild('linearStepper') stepperObj: Stepper;
    @ViewChild('linearStepperContent') stepperContent: ElementRef;
    @ViewChild('previousStep') prevBtn: ElementRef;
    @ViewChild('nextStep') nextBtn: ElementRef;


    public stepper: StepModel[] = [
        { iconCss: 'sf-icon-form', label: 'Project Setup' },
        { iconCss: 'sf-icon-tasksheet', label: 'Task Planning' },
        { iconCss: 'sf-icon-progress', label: ' Progress Tracking' },
        { iconCss: 'sf-icon-submit', label: 'Project Completion' }
    ];

    public updateBack(): void {
        this.stepperObj.previousStep();
        this.updateContent(this.stepperObj.activeStep);
    };

    public updateNext(): void {
        this.stepperObj.nextStep();
        this.updateContent(this.stepperObj.activeStep);
    };

    public toggleNavigationButtons(activeStep: number): void {
        this.prevBtn.nativeElement.style.display = (activeStep !== 0) ? 'block' : 'none';
        this.nextBtn.nativeElement.style.display = (activeStep !== 3) ? 'block' : 'none';
    }

    public updateContent(args: number): void {
        switch (args) {
            case 0:
                this.stepperContent.nativeElement.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>During this phase, the project's scope and objectives are clearly defined, along with the establishment of initial settings and parameters.</li><li>This step involves outlining the primary goals, deliverables, and the overall vision of the project to ensure a comprehensive understanding among all stakeholders.</li></ul>`;
                break;
            case 1:
                this.stepperContent.nativeElement.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>Task planning involves creating a comprehensive roadmap that outlines specific tasks, sets achievable milestones, and allocates responsibilities among team members. </li>
                <li>This phase requires a detailed breakdown of the project's requirements, resources, and a strategic timeline to ensure a systematic and efficient execution of tasks.</li>
                </ul>`;
                break;
            case 2:
                this.stepperContent.nativeElement.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>In this phase, project managers closely monitor the progress of individual tasks, track the overall project's advancement, and regularly update task statuses.</li><li>Continuous assessment of the project's timeline and potential challenges allows for timely adjustments, ensuring that the project stays on course and within the predefined parameters.</li></ul>`;
                break;
            case 3:
                this.stepperContent.nativeElement.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>
                The final phase focuses on the comprehensive evaluation of the project's success, completion of all deliverables, and documentation of lessons learned. </li><li>Analyzing the outcomes and documenting the experiences gained during the project's lifecycle are crucial for improving future project management processes and enhancing overall organizational efficiency.</li>`;
                break;
            default:
                break;
        }
        this.toggleNavigationButtons(args);
    }

    public updateLinear(args: any): void {
        this.stepperObj.linear = (/true/).test(args.currentTarget.value) ? true : false;
        this.stepperObj.reset();
        this.updateContent(this.stepperObj.activeStep);
    };

    public handleStepChange(args: StepperChangedEventArgs): void {
        this.updateContent(args.activeStep);
    }
}
