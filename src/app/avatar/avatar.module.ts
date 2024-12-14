import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListViewModule  } from '@syncfusion/ej2-angular-lists';

import { DefaultAvatarComponent } from './default.component';
import { TypesAvatarComponent } from './types.component';
import { BadgeAvatarComponent } from './badge.component';
import { ListViewAvatarComponent } from './list-view.component';
import { CardAvatarComponent } from './card.component';

import { CommonModule } from '@angular/common';
export const avatarAppRoutes: Object[] = [
    { path: ':theme/avatar/default', component: DefaultAvatarComponent, order: '01', name: 'Default', category: 'Avatar', description: 'This example demonstrates to display profile images using Syncfusion avatar component in different sizes both in default & circle shapes in Angular application.', sourceFiles: [
        {displayName: 'default.component.ts', path: './src/avatar/default.component.ts'},
        {displayName: 'default.html', path: './src/avatar/default.html'},
        {displayName: 'default.css', path: './src/avatar/default.css'}
    ] },
    { path: ':theme/avatar/types', component: TypesAvatarComponent, order: '01', name: 'Types', category: 'Avatar', description: 'This example demonstrates types of media formats used for Syncfusion avatar content, those are image, SVG, initials, font icon & word in Angular application.', sourceFiles: [
        {displayName: 'types.component.ts', path: './src/avatar/types.component.ts'},
        {displayName: 'types.html', path: './src/avatar/types.html'},
        {displayName: 'types.css', path: './src/avatar/types.css'}
    ] },
    { path: ':theme/avatar/badge', component: BadgeAvatarComponent, order: '02', name: 'Badge', category: 'Integration', description: 'This example demonstrates how to integrate Syncfusion avatar with badge in Angular application, to display notification count on profile images like in Gmail.', sourceFiles: [
        {displayName: 'badge.component.ts', path: './src/avatar/badge.component.ts'},
        {displayName: 'badge.html', path: './src/avatar/badge.html'},
        {displayName: 'badge.css', path: './src/avatar/badge.css'}
    ] },
    { path: ':theme/avatar/list-view', component: ListViewAvatarComponent, order: '02', name: 'Listview', category: 'Integration', description: 'This example demonstrates how to integrate Syncfusion avatar with listview to display profile image or letters in mobile contact Angular application.', sourceFiles: [
        {displayName: 'list-view.component.ts', path: './src/avatar/list-view.component.ts'},
        {displayName: 'list-view.html', path: './src/avatar/list-view.html'},
        {displayName: 'list-view.css', path: './src/avatar/list-view.css'}
    ] },
    { path: ':theme/avatar/card', component: CardAvatarComponent, order: '02', name: 'Card', category: 'Integration', description: 'This example demonstrates how to create employee business cards with roles & responsibilities using Syncfusion avatar & card components in Angular application', sourceFiles: [
        {displayName: 'card.component.ts', path: './src/avatar/card.component.ts'},
        {displayName: 'card.html', path: './src/avatar/card.html'},
        {displayName: 'card.css', path: './src/avatar/card.css'}
    ] }
]

export const AvatarSampleModule: ModuleWithProviders<any> = RouterModule.forChild(avatarAppRoutes);


