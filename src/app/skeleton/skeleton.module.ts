import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultController } from './default.component';
import { AnimationController } from './animation.component';
import { CommonModule } from '@angular/common';  

import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';

export const skeletonAppRoutes: Object[] = [
    {
        path: ':theme/skeleton/default',
        component: DefaultController,
        name: 'Default Functionalities',
        category: 'Skeleton',
        description: "This sample illustrates all the variants of Skeleton component and it's customization.",
        sourceFiles: [
            {displayName: 'default.component.ts', path: './src/skeleton/default.component.ts'},
            {displayName: 'default.html', path: './src/skeleton/default.html'},
            {displayName: 'default.css', path: './src/skeleton/default.css'}
        ]

    },
    {
        path: ':theme/skeleton/animation',
        component: AnimationController,
        name: 'Animation',
        category: 'Skeleton',
        description: "This sample illustrates a card & list layout that rendered with individual Skeletons with fade & pulse animation effect.",
        sourceFiles: [
            {displayName: 'animation.component.ts', path: './src/skeleton/animation.component.ts'},
            {displayName: 'animation.html', path: './src/skeleton/animation.html'},
            {displayName: 'animation.css', path: './src/skeleton/animation.css'}
        ]
    }
];

export const SkeletonSampleModule: ModuleWithProviders<any> = RouterModule.forChild(skeletonAppRoutes);


