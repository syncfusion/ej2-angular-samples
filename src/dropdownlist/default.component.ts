import { Component, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-ng-dropdowns';
@Component({
    selector: 'control-content',
    templateUrl: 'default.html'
})
export class DefaultDropDownListComponent {
    @ViewChild('sample')
    public listObj: DropDownListComponent;
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
    public fields: Object = { text: 'game', value: 'id' };
    public height: string = '220px';
    public waterMark: string = 'Select a game';
    public value: string = 'Game3';
    public onChange(e: Object): void {
        let value: Element = document.getElementById('value');
        let index: Element = document.getElementById('index');
        let text: Element = document.getElementById('text');
        value.innerHTML = this.listObj.value.toString();
        text.innerHTML = this.listObj.text;
        index.innerHTML = this.listObj.index.toString();
    }
}