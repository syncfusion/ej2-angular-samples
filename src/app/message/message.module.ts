import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageModule } from '@syncfusion/ej2-angular-notifications';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DefaultController } from './default.component';
import { VariantsController } from './variants.component';
import { IconsController } from './icons.component';
import { CustomizationController } from './customization.component';
import { MessageTemplateController } from './template.component'


export const messageAppRoutes: Object[] = [
    { path: ':theme/message/default', component: DefaultController, order: '01', name: 'Default Functionalities', description: 'This sample demonstrates the basic layout of Message with different severity types.', category: 'Message' },
    { path: ':theme/message/variants', component: VariantsController, order: '01', name: 'Variants', description: 'This sample demonstrates the Message with differentvariant type.', category: 'Message' },
    { path: ':theme/message/icons', component: IconsController, order: '01', name: 'Icons', description: 'This sample demonstrates the Message with severity and close icon.', category: 'Message' },
    { path: ':theme/message/customization', component: CustomizationController, order: '01', name: 'Customization', description: 'This sample demonstrates the Message with customizing the contents and styles for Message.', category: 'Message' },
    { path: ':theme/message/template', component: MessageTemplateController, order: '01', name: 'Template', description: 'This sample demonstrates the template rendering in Message.', category: 'Message' }

];

export const MessageSampleModule: ModuleWithProviders<any> = RouterModule.forChild(messageAppRoutes);

