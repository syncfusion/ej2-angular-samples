import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BasicCardComponent } from './basic.component';
import { VerticalCardComponent } from './vertical.component';
import { HorizontalCardComponent } from './horizontal.component';
import { SwipeCardComponent } from './swipeable.component';
import { FlipCardComponent } from './flip.component';
import { RevealCardComponent } from './reveal.component';
import { TileViewCardComponent} from './tile.component';

import { SharedModule } from '../common/shared.module';
export const cardAppRoutes: Object[] = [
    { path: ':theme/card/basic', component: BasicCardComponent, name: 'Basic Card', description: 'The sample demonstrates how to design basic card and weather layout card in Angular platform. The component is pure CSS component and more flexible.', category: 'Card' },
    { path: ':theme/card/vertical', component: VerticalCardComponent, name: 'Vertical Card', description: 'The sample demonstrates how to design a business card and profile card using a vertical layout of card component in Angular platform.', category: 'Card' },
    { path: ':theme/card/horizontal', component: HorizontalCardComponent, name: 'Horizontal Card', description: 'The sample demonstrates how to design product card with icon and its specification using horizontal layout in card component in Angular platform.', category: 'Card' },
    { path: ':theme/card/swipeable', component: SwipeCardComponent, name: 'Swipeable Card', description: 'The sample demonstrates how to design a stacked card with swipeable action and corresponding images using card component in Angular platform.', category: 'Card' },
    { path: ':theme/card/flip', component: FlipCardComponent, name: 'Flip Card', description: 'The sample demonstrates how to achieve flip behavior to the card to show hidden information which is on a back side on the card in Angular platform.', category: 'Card' },
    { path: ':theme/card/reveal', component: RevealCardComponent, name: 'Reveal Card', description: 'The sample demonstrates how to render a card with reveal layouts, hidden information can be revealed while action on “Know more” in Angular platform.', category: 'Card' },
    { path: ':theme/card/tile', component: TileViewCardComponent, name: 'Tile View',description: 'The sample demonstrates how to design tile-view with filtering and searching using a template engine, data manager, and card component in Angular platform.', category: 'Card' },
];

export const cardRouter: ModuleWithProviders = RouterModule.forChild(cardAppRoutes);

@NgModule({
    imports: [cardRouter, SharedModule, CommonModule],
    declarations: [
        BasicCardComponent,
        VerticalCardComponent,
        HorizontalCardComponent,
        SwipeCardComponent,
        FlipCardComponent,
        RevealCardComponent,
        TileViewCardComponent

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardSampleModule {
}