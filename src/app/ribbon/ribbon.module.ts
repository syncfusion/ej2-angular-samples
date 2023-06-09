import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RibbonAllModule, RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { RibbonDefaultComponent } from './default.component';
import { RibbonSimplifiedComponent } from './simplified.component';
import { RibbonResizeComponent } from './resize.component';
import { SharedModule } from '../common/shared.module';
import { BrowserModule } from '@angular/platform-browser';

export const ribbonAppRoutes: Object[] = [
  { path: ':theme/ribbon/default', component: RibbonDefaultComponent, name: 'Default Functionalities', description: 'This sample demonstrates the default functionalities of the Syncfusion Angular Ribbon component.', category: 'Ribbon' },
  { path: ':theme/ribbon/simplified', component: RibbonSimplifiedComponent, name: 'Simplified Mode', description: 'This sample demonstrates the simplified mode of the Syncfusion Angular Ribbon component.', category: 'Ribbon' },
  { path: ':theme/ribbon/resize', component: RibbonResizeComponent, name: 'Ribbon Resizing', description: 'This sample demonstrates the resize functionalities of the Syncfusion Angular Ribbon component.', category: 'Ribbon' }
];

export const ribbonRouter: ModuleWithProviders<any> = RouterModule.forChild(ribbonAppRoutes);

@NgModule({
  imports: [ribbonRouter,RibbonAllModule, RibbonModule, SliderModule, ToastModule, ListViewModule ,SharedModule, BrowserModule],
  declarations: [
    RibbonDefaultComponent,
    RibbonSimplifiedComponent,
    RibbonResizeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RibbonSampleModule { }
