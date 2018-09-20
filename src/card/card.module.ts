import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BasicCardComponent } from './basic.component';
import { VerticalCardComponent } from './vertical.component';
import { HorizontalCardComponent } from './horizontal.component';
import { SwipeCardComponent } from './swipeable.component';
import { FlipCardComponent } from './flip.component';
import { RevealCardComponent } from './reveal.component';
import { TileViewCardComponent} from './tile.component';

import { SharedModule } from '../common/shared.module';
export const cardAppRoutes: Object[] = [
    { path: ':theme/card/basic', component: BasicCardComponent, name: 'Basic Card', description: 'This sample demonstrates card rendering with the following basic weather layout.', category: 'Card' },
    { path: ':theme/card/vertical', component: VerticalCardComponent, name: 'Vertical Card', description: 'This sample demonstrates rendering of vertical layout card with business and profile card information.', category: 'Card' },
    { path: ':theme/card/horizontal', component: HorizontalCardComponent, name: 'Horizontal Card', description: 'This sample demonstrates card rendering with horizontal layout.', category: 'Card' },
    { path: ':theme/card/swipeable', component: SwipeCardComponent, name: 'Swipeable Card', description: 'This sample demonstrates card rendering with stacked layout.', category: 'Card' },
    { path: ':theme/card/flip', component: FlipCardComponent, name: 'Flip Card', description: 'This sample demonstrates to flip(rotate) the card to show hidden information which is on back side of the card by clicking or focus-out of it.', category: 'Card' },
    { path: ':theme/card/reveal', component: RevealCardComponent, name: 'Reveal Card', description: 'This sample demonstrates rendering the card with reveal layouts.', category: 'Card' },
    { path: ':theme/card/tile', component: TileViewCardComponent, name: 'Tile View', description: 'This sample demonstrates filter and search of the card based on categories, and text containing the card.', category: 'Card' },
];

export const cardRouter: ModuleWithProviders = RouterModule.forChild(cardAppRoutes);

@NgModule({
    imports: [cardRouter, SharedModule],
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