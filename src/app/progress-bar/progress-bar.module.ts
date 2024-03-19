/**
 * Progress bar Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule, ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ProgressBarLinearComponent } from './Linear.component';
import { ProgressBarCircularComponent } from './default.component';
import { ProgressBarSemiComponent } from './semi-Circle.component';
import { ProgressBarCustomComponent } from './custom-content.component';
import { ProgressBarLabelComponent } from './labels.component';
import { ProgressBarRadiusComponent } from './Radius.component';
import { ProgressBarStripesComponent } from './stripes.component';
import { ProgressBarProgressSegmentComponent } from './progress-segment.component';
import { ProgressBarTooltipComponent } from './tooltip.component';

export const progressBarAppRoutes: Object[] = [
    {
        path: ':theme/progress-bar/Linear',
        component: ProgressBarLinearComponent,
        name: 'Linear',
        order: '01',
        category: 'Progress Bar',
    },
    {
        path: ':theme/progress-bar/default',
        component: ProgressBarCircularComponent,
        name: 'Circular',
        order: '01',
        category: 'Progress Bar'
    },
    {
        path: ':theme/progress-bar/semi-Circle',
        component: ProgressBarSemiComponent,
        name: 'Angle',
        order: '01',
        category: 'Progress Bar'
    },
    {
        path: ':theme/progress-bar/custom-content',
        component: ProgressBarCustomComponent,
        name: 'Custom content',
        order: '01',
        category: 'Progress Bar'
    },
    {
        path: ':theme/progress-bar/labels',
        component: ProgressBarLabelComponent,
        name: 'Labels',
        order: '01',
        category: 'Progress Bar',
    },
    {
        path: ':theme/progress-bar/tooltip',
        component: ProgressBarTooltipComponent,
        name: 'Tooltip',
        order: '01',
        category: 'Progress Bar',
    },
    {
        path: ':theme/progress-bar/Radius',
        component: ProgressBarRadiusComponent,
        name: 'Radius',
        order: '01',
        category: 'Progress Bar'
    },
    {
        path: ':theme/progress-bar/stripes',
        component: ProgressBarStripesComponent,
        name: 'Stripes',
        order: '01',
        category: 'Progress Bar',
    },
    {
        path: ':theme/progress-bar/progress-segment',
        component: ProgressBarProgressSegmentComponent,
        name: 'Progress Segment',
        order: '01',
        category: 'Progress Bar',
    }
];

export const ProgressBarSampleModule: ModuleWithProviders<any> = RouterModule.forChild(progressBarAppRoutes);

