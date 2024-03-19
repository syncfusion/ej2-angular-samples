import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { StepperDefaultComponent } from './default.component';
import { StepperModule, StepperAllModule } from '@syncfusion/ej2-angular-navigations';
import { StepperOrientationComponent } from './orientation.component';
import { StepperLinearComponent } from './linear.component';
import { StepperValidationComponent } from './validation.component';

export const stepperAppRoutes: Object[] = [
    { path: ':theme/stepper/default', component: StepperDefaultComponent, name: 'Default Functionalities', description: 'Showcases the default combinations of the steps and stepType properties in the Stepper.', category: 'Stepper' },
    { path: ':theme/stepper/orientation', component: StepperOrientationComponent, name: 'Orientation', description: 'Showcases the orientations and label positions supported in the Stepper.', category: 'Stepper' },
    { path: ':theme/stepper/validation', component: StepperValidationComponent, name: 'Validation', description: 'Showcases the validation support for each step in the Stepper.', category: 'Stepper' },
    { path: ':theme/stepper/linear', component: StepperLinearComponent, name: 'Linear Flow', description: 'Showcases the usage of the linear property in the Stepper.', category: 'Stepper' },
];

export const StepperSampleModule: ModuleWithProviders<any> = RouterModule.forChild(stepperAppRoutes);

