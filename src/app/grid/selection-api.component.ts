import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { orderDetails } from './data';
import { SelectionService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej-gridselect',
    templateUrl: 'selection-api.html',
    providers: [SelectionService],
    styleUrls: ['./selection-api.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SelectionApiComponent implements OnInit {
    public data: Object[];
    public selectOptions: { type?: string, mode?: string };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['selection-api.style.css'];
    }

    public ngOnInit(): void {
        this.data = orderDetails;
        this.selectOptions = { type: 'Multiple' };
    }

    public onChangeType(e: MouseEvent): void {
        let element: HTMLElement = <HTMLInputElement>e.target;
        let options: {
            type?: { class: string, val: (mode: string) => string },
            mode?: { class: string, val: (mode: string) => string }
         } = {
             type: { class: '.e-gtype', val: (mode: string) => mode === 'Single' ? 'Multiple' : 'Single' },
             mode: { class: '.e-gmode', val: (mode: string) => mode === 'Row' ? 'Cell' : 'Row' },
         };

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
        let isType: boolean = element.parentElement.parentElement.classList.contains('e-gtype');
        let opt: { class: string, val: (mode: string) => string } = options[isType ? 'type' : 'mode'];
        let parent: Element = document.querySelector('.e-gridlist');
        let typeEle: Element = parent.querySelector(opt.class + ' .e-tbar-btn-text');
        let type: string = typeEle.innerHTML;
        let val: string = opt.val(type);
        typeEle.innerHTML = val;

        this.selectOptions = isType ? { type: val } : { mode: val };
    }
}