import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselAllModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { CarouselDefaultComponent } from './default.component';
import { CarouselTemplateComponent } from './templates.component';
import { CarouselDataBindingComponent } from './data-binding.component';
import { CarouselAPIComponent } from './api.component';
import { CarouselKeyboardNavigationComponent } from './keyboard-navigation.component';
import { SharedModule } from '../common/shared.module';
import { CarouselPartialComponent } from './partial-visible.component';

export const carouselAppRoutes: Object[] = [
  { path: ':theme/carousel/default', component: CarouselDefaultComponent, name: 'Default Functionalities', description: 'This example demonstrates the simple slide show of images using Syncfusion Angular Carousel component.', category: 'Carousel' },
  { path: ':theme/carousel/data-binding', component: CarouselDataBindingComponent, name: 'Data Binding', description: 'This example demonstrates how to bind data and customize them by using dataSource and templates to the Syncfusion Angular Carousel component.', category: 'Carousel' },
  { path: ':theme/carousel/templates', component: CarouselTemplateComponent, name: 'Templates', description: 'This example demonstrates the template options available in Angular Carousel component.', category: 'Carousel' },
  { path: ':theme/carousel/partial-visible', component: CarouselPartialComponent, name: 'Partial Visible', description: 'This example demonstrates the simple slide show of images using Syncfusion Angular Carousel component.', category: 'Carousel', type:'new' },
  { path: ':theme/carousel/keyboard-navigation', component: CarouselKeyboardNavigationComponent, name: 'Keyboard Navigation', description: 'This example explains the key combinations used to perform various actions in Syncfusion Angular Carousel component.', category: 'Carousel' },
  { path: ':theme/carousel/api', component: CarouselAPIComponent, name: 'API', description: 'This example showcase the available APIs and its functionalities in Syncfusion Angular Carousel component.', category: 'Carousel' }
];

export const carouselRouter: ModuleWithProviders<any> = RouterModule.forChild(carouselAppRoutes);

@NgModule({
  imports: [carouselRouter, CarouselAllModule, DropDownListAllModule, ButtonAllModule, SwitchAllModule, SharedModule],
  declarations: [
    CarouselDefaultComponent,
    CarouselPartialComponent,
    CarouselTemplateComponent,
    CarouselDataBindingComponent,
    CarouselAPIComponent,
    CarouselKeyboardNavigationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarouselSampleModule { }
