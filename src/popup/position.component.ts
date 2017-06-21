import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from '@syncfusion/ej2-ng-popups';
import { PositionData } from '@syncfusion/ej2-popups';

@Component({
    selector: 'control-content',
    templateUrl: 'position.html',
})
export class PopupPositionViewComponent {
    @ViewChild('pop')
    public pop: PopupComponent;
    constructor() {}
    public offX: number = 0;
    public offY: number = 0;
    @ViewChild('target')
    public target: HTMLElement;
    @ViewChild('PosY')
    public PosY: HTMLSelectElement;
    @ViewChild('')
    public PosX: HTMLSelectElement;
    public pos: PositionData = { X: 'left', Y: 'bottom' };
    showEvent(): void {
        this.pop.setProperties({relateTo:(<HTMLElement>document.querySelector("#target")),
            position: {X: (<HTMLSelectElement>document.querySelector("#PosX")).value,
            Y: (<HTMLSelectElement>document.querySelector("#PosY")).value}});
            this.pop.show();
        }
}