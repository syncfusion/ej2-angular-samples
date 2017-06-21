import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { data } from './data';
import { SelectionService } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej-gridselect',
    templateUrl: 'selectionapi.html',
    providers: [SelectionService],
    styleUrls: ['./selectionapi.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SelectionApiComponent implements OnInit {
    public data: Object[];
    public selectOptions: { type?: string, mode?: string };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['selectionapi.style.css'];
    }

    public ngOnInit(): void {
        this.data = data.slice(0, 30);
        this.selectOptions = { type: 'multiple' };
    }

    public onChangeType(e: MouseEvent): void {
        let element: HTMLElement = <HTMLInputElement>e.target;
        let options: {
            type?: { class: string, val: (mode: string) => string },
            mode?: { class: string, val: (mode: string) => string }
         } = {
             type: { class: '.e-gtype', val: (mode: string) => mode === 'single' ? 'Multiple' : 'Single' },
             mode: { class: '.e-gmode', val: (mode: string) => mode === 'row' ? 'Cell' : 'Row' },
         };

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
        let isType: boolean = element.parentElement.parentElement.classList.contains('e-gtype');
        let opt: { class: string, val: (mode: string) => string } = options[isType ? 'type' : 'mode'];
        let parent: Element = document.querySelector('.e-gridlist');
        let typeEle: Element = parent.querySelector(opt.class + ' .e-tbar-btn-text');
        let type: string = typeEle.innerHTML.toLowerCase();
        let val: string = opt.val(type);
        typeEle.innerHTML = val;
        val = val.toLowerCase();

        this.selectOptions = isType ? { type: val } : { mode: val };
    }
}