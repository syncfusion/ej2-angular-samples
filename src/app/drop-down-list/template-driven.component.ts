/**
 * DropDownList Template Driven Sample
 */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'template-driven.html',
    styleUrls: ['./form-support.css'],
    encapsulation: ViewEncapsulation.None
})
export class TemplateDrivenDropDownListComponent {
    public autoSkillsetData: string[] = [
        'ASP.NET', 'ActionScript', 'Basic',
        'C++' , 'C#' , 'dBase' , 'Delphi' ,
        'ESPOL' , 'F#' , 'FoxPro' , 'Java',
        'J#' , 'Lisp' , 'Logo' , 'PHP'
    ];
    public autoDrivenPlaceholder: String = 'Select book';

    public autoskillname: string =  null;

    public autosname: string = '';

    public autosmail: string =  '';
    onfocus(element: FocusEvent) : void {
        let target: HTMLInputElement = element.target as HTMLInputElement;
        let parentNode: HTMLElement = target.parentNode as HTMLElement;
        if (parentNode.classList.contains('e-input-in-wrap')) {
            parentNode = (parentNode.parentNode as HTMLElement);
        }
        parentNode.classList.add('e-input-focus');
        parentNode.querySelector('.e-float-text').classList.add('e-label-top');
        parentNode.querySelector('.e-float-text').classList.remove('e-label-bottom');
    }
    onblur(element: FocusEvent) : void {
        let target: HTMLInputElement = element.target as HTMLInputElement;
        let parentNode: HTMLElement = target.parentNode as HTMLElement;
        if (parentNode.classList.contains('e-input-in-wrap')) {
            (parentNode.parentNode as HTMLElement).classList.remove('e-input-focus');
        }
        parentNode.classList.remove('e-input-focus');
        if (target.value === null || target.value === '') {
            parentNode.querySelector('.e-float-text').classList.remove('e-label-top');
            parentNode.querySelector('.e-float-text').classList.add('e-label-bottom');
        }else {
            parentNode.querySelector('.e-float-text').classList.add('e-label-top');
            parentNode.querySelector('.e-float-text').classList.remove('e-label-bottom');
        }
    }
    onreset(element: MouseEvent) : void {
        let parentNode: NodeListOf<HTMLElement> = document.getElementsByClassName('box-form')[0].querySelectorAll('.e-float-text');
        for (let i: number = 0; i < parentNode.length; i++) {
            parentNode[i].classList.remove('e-label-top');
            parentNode[i].classList.add('e-label-bottom');
        }
    }
}
