import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultButtonController } from './default.component';
import { CheckBoxModule  } from '@syncfusion/ej2-ng-buttons';
import { CheckBoxController } from './check-box.component';
import { SharedModule } from '../common/shared.module';

export const buttonAppRoutes: Object[] = [
    { path: 'button/default', component: DefaultButtonController, name: 'Default Functionalities', category: 'Button' },
    { path: 'button/check-box', component: CheckBoxController, name: 'CheckBox', category: 'Button', type: 'new' }
];

export const buttonRouter: ModuleWithProviders = RouterModule.forChild(buttonAppRoutes);

@NgModule({
    imports: [buttonRouter, CheckBoxModule, SharedModule],
    declarations: [
        DefaultButtonController,
        CheckBoxController
    ]
})
export class ButtonModule { }