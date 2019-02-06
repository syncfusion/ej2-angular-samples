import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListViewModule  } from '@syncfusion/ej2-angular-lists';

import { DefaultAvatarComponent } from './default.component';
import { TypesAvatarComponent } from './types.component';
import { BadgeAvatarComponent } from './badge.component';
import { ListViewAvatarComponent } from './listview.component';
import { CardAvatarComponent } from './card.component';
import { SharedModule } from '../common/shared.module';
import { CommonModule } from '@angular/common';
export const avatarAppRoutes: Object[] = [
    { path: ':theme/avatar/default', component: DefaultAvatarComponent, description: 'Demo of the pure CSS Essential JS 2 Avatar component displaying profile images in different sizes in both default and circle shapes.', order: '01', name: 'Default', category: 'Avatar' },
    { path: ':theme/avatar/types', component: TypesAvatarComponent, description: 'Demo of the pure CSS Essential JS 2 Avatar components supported media formats for avatar content: images, SVG, initials, font icons, and words.', order: '01', name: 'Types', category: 'Avatar' },
    { path: ':theme/avatar/badge', component: BadgeAvatarComponent, description: 'Demo integrating the Essential JS 2 Avatar and Badge components to display a notification count on profile images, similar to Gmail.', order: '02', name: 'Badge', category: 'Integration' },
    { path: ':theme/avatar/listview', component: ListViewAvatarComponent, description: 'Demo integrating the Essential JS 2 Avatar and ListView components to display profile images or letters in a mobile contact application.', order: '02', name: 'Listview', category: 'Integration' },
    { path: ':theme/avatar/card', component: CardAvatarComponent, description: 'Demo integrating the Essential JS 2 Avatar and Card components to display business cards for employees with profile images, roles, and responsibilities.', order: '02', name: 'Card', category: 'Integration' }
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
