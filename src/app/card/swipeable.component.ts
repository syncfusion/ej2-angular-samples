import { Component, ViewEncapsulation, Inject, AfterViewInit } from '@angular/core';
import { closest, SwipeEventArgs, Touch} from '@syncfusion/ej2-base';

/**
 *  Sample for CSS Swipeable Cards.
 */
function swipeable(): void {
    let fanStructuteCard: NodeList = document.querySelectorAll('#horizontal_product .e-card');
    let len: number = fanStructuteCard.length;
    [].slice.call(fanStructuteCard).forEach((ele: HTMLElement): void => {
        ele.style.removeProperty('transform');
    });
    let transformRatio: number = 2;
    let temp: number;
    let divide: number = (parseInt((len / 2).toString(), 10));
    temp = transformRatio;
    for (let i: number = divide - 1; i >= 0; i--) {
        (<HTMLElement>fanStructuteCard[i]).style.transform = 'rotate(' + (temp) + 'deg)';
        temp += transformRatio;
    }
    transformRatio = 2;
    temp = transformRatio;
    for (let i: number = divide + 1; i < len; i++) {
        (<HTMLElement>fanStructuteCard[i]).style.transform = 'rotate(' + (-temp) + 'deg)';
        temp += transformRatio;
    }
}

@Component({
    selector: 'control-content',
    templateUrl: 'swipeable.html',
    styleUrls: ['card.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class SwipeCardComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        let ele: HTMLElement = document.getElementById('horizontal_product');
        swipeable();
        new Touch(ele, { swipe: this.touchSwipeHandler });
        let cards: NodeList = document.querySelectorAll('#horizontal_product .e-card');
        [].slice.call(cards).forEach((ele: HTMLElement): void => {
            ele.querySelector('img').onmousedown = () => {return false; };
        });
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['card.component.css'];
    }
    public touchSwipeHandler(e: SwipeEventArgs): void {
        let ele: HTMLElement = <HTMLElement>closest(<Element>e.originalEvent.target, '.e-card');
        if (!ele.classList.contains('e-card')) {
            return;
        }
        if (ele.parentElement.querySelector('.card-out')) {
            ele.parentElement.querySelector('.card-out').classList.remove('card-out');
        }
        if (ele.parentElement.querySelector('.card-out-left')) {
            ele.parentElement.querySelector('.card-out-left').classList.remove('card-out-left');
        }
        e.swipeDirection === 'Right' ? ele.classList.add('card-out') : ele.classList.add('card-out-left');
        ele.parentElement.insertBefore(ele, ele.parentElement.children[0]);
        swipeable();
        ele.style.removeProperty('left');
    }
}