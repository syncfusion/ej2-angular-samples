import { Component, AfterViewInit, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Default Card Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['card.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DefaultCardComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        /* On click event for flip the card*/
        document.getElementById('e-card-flip').onclick = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget as HTMLElement);
            if (cardEle.classList.contains('e-flipped')) {
                cardEle.classList.remove('e-flipped');
            } else {
                cardEle.classList.add('e-flipped');
            }
        };
        /* On blur event for flip the card*/
        document.getElementById('e-card-flip').onblur = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget as HTMLElement);
            cardEle.classList.remove('e-flipped');
        };

        /* On click event for Revealing hidden card elements*/
        document.getElementById('showcarddata').onclick = () => {
            let cEle: HTMLElement = document.getElementById('card_revealed');
            let cardEle: HTMLElement = cEle.parentNode.parentNode as HTMLElement;
            let revealEle: HTMLElement = cardEle.querySelector('#card_reveal') as HTMLElement;
            revealEle.classList.add('e-reveal-show');
            revealEle.classList.remove('e-reveal-hide');
            let revealedEle: HTMLElement = cardEle.querySelector('#card_revealed') as HTMLElement;
            revealedEle.classList.add('e-reveal-hide');
            revealedEle.classList.remove('e-reveal-show');
        };

        /* On click event for hidden Revealled card elements*/
        document.getElementById('card-reveal_collapse').onclick = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget as HTMLElement).parentNode.parentNode as HTMLElement;
            let revealEle: HTMLElement = cardEle.querySelector('#card_reveal') as HTMLElement;
            revealEle.classList.add('e-reveal-hide');
            revealEle.classList.remove('e-reveal-show');
            let revealedEle: HTMLElement = cardEle.querySelector('#card_revealed') as HTMLElement;
            revealedEle.classList.add('e-reveal-show');
            revealedEle.classList.remove('e-reveal-hide');
        };
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['card.component.css'];
    }
}