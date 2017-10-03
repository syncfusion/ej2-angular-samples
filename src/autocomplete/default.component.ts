/**
 * AutoComplete Default functionality Sample
 */
import { Component, ViewChild } from '@angular/core';
import { AutoCompleteComponent } from '@syncfusion/ej2-ng-dropdowns';
@Component({
    selector: 'control-content',
    templateUrl: 'default.html'
})
export class DefaultAutoCompleteComponent {
    @ViewChild('sample')
    public AutoCompleteObj: AutoCompleteComponent;
    public sportsData: Object[] = [
        { id: 'Game1', game: 'American Football' },
        { id: 'Game2', game: 'Badminton' },
        { id: 'Game3', game: 'Basketball' },
        { id: 'Game4', game: 'Cricket' },
        { id: 'Game5', game: 'Football' },
        { id: 'Game6', game: 'Golf' },
        { id: 'Game7', game: 'Hockey' },
        { id: 'Game8', game: 'Rugby' },
        { id: 'Game9', game: 'Snooker' },
        { id: 'Game10', game: 'Tennis' }
    ];
    public fields: Object = { value: 'game' };
    public value: string = 'Basketball';
    public waterMark: string = 'e.g. Basketball';
    public height: string = '250px';
    public onChange(args: any): void {
        let valueEle: HTMLInputElement = document.getElementsByClassName('e-input')[0] as HTMLInputElement;
        let text: Element = document.getElementById('text');
        if (this.AutoCompleteObj.value === "null" || this.AutoCompleteObj.value === null || this.AutoCompleteObj.value === "") {
            valueEle.value = '';
        }
    }
    ngAfterViewInit(e: any): void {
        this.onChange(e);
    }
}