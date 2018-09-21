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
    { path: ':theme/avatar/default', component: DefaultAvatarComponent, order: '01', name: 'Default', category: 'Avatar' },
    { path: ':theme/avatar/types', component: TypesAvatarComponent, order: '01', name: 'Types', category: 'Avatar' },
    { path: ':theme/avatar/badge', component: BadgeAvatarComponent, order: '02', name: 'Badge', category: 'Integration' },
    { path: ':theme/avatar/listview', component: ListViewAvatarComponent, order: '02', name: 'Listview', category: 'Integration' },
    { path: ':theme/avatar/card', component: CardAvatarComponent, order: '02', name: 'Card', category: 'Integration' }
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
