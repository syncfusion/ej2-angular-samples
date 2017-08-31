import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultTextboxController } from './default.component';
import { SharedModule } from '../common/shared.module';


export const textboxesAppRoutes: Object[] = [
    { path: 'textboxes/default', component: DefaultTextboxController, name: 'Default Functionalities', category: 'TextBoxes',
    type: 'update' }
];

export const textBoxesRouter: ModuleWithProviders = RouterModule.forChild(textboxesAppRoutes);

@NgModule({
    imports: [textBoxesRouter, SharedModule],
    declarations: [
        DefaultTextboxController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TextboxesModule {
}