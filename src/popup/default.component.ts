import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from '@syncfusion/ej2-ng-popups';
import { PositionData } from '@syncfusion/ej2-popups';



@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
})
export class DefaultPopupViewComponent {
    @ViewChild('pop')
    public pop: PopupComponent;
    constructor() {}
    public offX: number = 0;
    public offY: number = 155;
    public target: HTMLElement;
    public pos: PositionData = { X: 'left', Y: 'bottom' };
    setPosition(): void {
        this.target = document.getElementById('target');
        this.pop.relateTo = this.target;
        if (this.pop.element.style.display === 'none') {
            this.pop.setProperties({offsetX: this.offX, offsetY: this.offY, position: {X: 'left', Y: 'bottom'}});
            this.pop.show();
            this.target.innerText = 'Hide Popup';
        } else {
            this.pop.hide();
            this.target.innerText = 'Show Popup';
        }
    }
    show(): void{
        this.pop.setProperties({offsetX: this.offX, offsetY: this.offY, position: {X: 'left', Y: 'bottom'}});
    }
}