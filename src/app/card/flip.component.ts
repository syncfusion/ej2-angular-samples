import { Component, ViewEncapsulation, Inject, AfterViewInit } from '@angular/core';

/**
 *  Sample for CSS Flip Cards.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'flip.html',
    styleUrls: ['card.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FlipCardComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        /* On click event for flip the card*/
        document.getElementById('card_flip').onclick = (e: Event) => {
            let cardEle: HTMLElement = (<HTMLElement>e.currentTarget);
            if (cardEle.classList.contains('e-flipped')) {
                cardEle.classList.remove('e-flipped');
            } else {
                cardEle.classList.add('e-flipped');
            }
        };

        /* On blur event for flip the card*/
        document.getElementById('card_flip').onblur = (e: Event) => {
            let cardEle: HTMLElement = (<HTMLElement>e.currentTarget);
            cardEle.classList.remove('e-flipped');
        };

        /* On click event for flip the card*/
        document.getElementById('card_flip_profile').onclick = (e: Event) => {
            let cardEle: HTMLElement = (<HTMLElement>e.currentTarget);
            if (cardEle.classList.contains('e-flipped')) {
                cardEle.classList.remove('e-flipped');
            } else {
                cardEle.classList.add('e-flipped');
            }
        };

        /* On blur event for flip the card*/
        document.getElementById('card_flip_profile').onblur = (e: Event) => {
            let cardEle: HTMLElement = (<HTMLElement>e.currentTarget);
            cardEle.classList.remove('e-flipped');
        };

    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['card.component.css'];
    }
}