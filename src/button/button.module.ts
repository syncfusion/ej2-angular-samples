import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultButtonController } from './default.component';
import { SharedModule } from '../common/shared.module';

export const buttonAppRoutes: Object[] = [
    { path: 'button/default', component: DefaultButtonController, name: 'Default Functionalities', category: 'Button' }
];

export const buttonRouter: ModuleWithProviders = RouterModule.forChild(buttonAppRoutes);

@NgModule({
    imports: [buttonRouter, SharedModule],
    declarations: [
        DefaultButtonController
    ]
})
export class ButtonModule { }