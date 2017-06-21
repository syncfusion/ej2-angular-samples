import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopupModule } from '@syncfusion/ej2-ng-popups';
import { DefaultPopupViewComponent } from './default.component';
import { PopupPositionViewComponent } from './position.component';
import { SharedModule } from '../common/shared.module';

export const popupAppRoutes: Object[] = [
    { path: 'popup/basic', component: DefaultPopupViewComponent, name: 'Basic Usage', category: 'Popup' },
    { path: 'popup/Position', component: PopupPositionViewComponent, name: 'Position', category: 'Popup' }
];
export const popupRouter: ModuleWithProviders = RouterModule.forChild(popupAppRoutes);

@NgModule({
    imports: [popupRouter, SharedModule, PopupModule],
    declarations: [
        DefaultPopupViewComponent,
        PopupPositionViewComponent
    ],
     schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopupSampleModule {
}