import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListViewModule  } from '@syncfusion/ej2-angular-lists';

import { DefaultAvatarComponent } from './default.component';
import { TypesAvatarComponent } from './types.component';
import { BadgeAvatarComponent } from './badge.component';
import { ListViewAvatarComponent } from './list-view.component';
import { CardAvatarComponent } from './card.component';
import { SharedModule } from '../common/shared.module';
import { CommonModule } from '@angular/common';
export const avatarAppRoutes: Object[] = [
    { path: ':theme/avatar/default', component: DefaultAvatarComponent, order: '01', name: 'Default', category: 'Avatar', description: 'This example demonstrates to display profile images using Syncfusion avatar component in different sizes both in default & circle shapes in Angular application.' },
    { path: ':theme/avatar/types', component: TypesAvatarComponent, order: '01', name: 'Types', category: 'Avatar', description: 'This example demonstrates types of media formats used for Syncfusion avatar content, those are image, SVG, initials, font icon & word in Angular application.' },
    { path: ':theme/avatar/badge', component: BadgeAvatarComponent, order: '02', name: 'Badge', category: 'Integration', description: 'This example demonstrates how to integrate Syncfusion avatar with badge in Angular application, to display notification count on profile images like in Gmail.' },
    { path: ':theme/avatar/listview', component: ListViewAvatarComponent, order: '02', name: 'Listview', category: 'Integration', description: 'This example demonstrates how to integrate Syncfusion avatar with listview to display profile image or letters in mobile contact Angular application.' },
    { path: ':theme/avatar/card', component: CardAvatarComponent, order: '02', name: 'Card', category: 'Integration', description: 'This example demonstrates how to create employee business cards with roles & responsibilities using Syncfusion avatar & card components in Angular application' }
]

export const AvatarRouter: ModuleWithProviders = RouterModule.forChild(avatarAppRoutes);

@NgModule({
    imports: [AvatarRouter, SharedModule, CommonModule, ListViewModule],
    declarations: [
        DefaultAvatarComponent,
        TypesAvatarComponent,
        BadgeAvatarComponent,
        ListViewAvatarComponent,
        CardAvatarComponent
    ],
    exports: [DefaultAvatarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AvatarSampleModule {
}
