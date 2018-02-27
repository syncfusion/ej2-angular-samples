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
    { path: ':theme/card/basic', component: BasicCardComponent, name: 'Basic Card', category: 'Card' },
    { path: ':theme/card/vertical', component: VerticalCardComponent, name: 'Vertical Card', category: 'Card' },
    { path: ':theme/card/horizontal', component: HorizontalCardComponent, name: 'Horizontal Card', category: 'Card' },
    { path: ':theme/card/swipeable', component: SwipeCardComponent, name: 'Swipeable Card', category: 'Card' },
    { path: ':theme/card/flip', component: FlipCardComponent, name: 'Flip Card', category: 'Card' },
    { path: ':theme/card/reveal', component: RevealCardComponent, name: 'Reveal Card', category: 'Card' },
    { path: ':theme/card/tile', component: TileViewCardComponent, name: 'Tile View', category: 'Card' },
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