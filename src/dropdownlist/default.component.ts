/**
 * DropDownList Default functionality Sample
 */
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
        { Id: 'Game1', Game: 'American Football' },
        { Id: 'Game2', Game: 'Badminton' },
        { Id: 'Game3', Game: 'Basketball' },
        { Id: 'Game4', Game: 'Cricket' },
        { Id: 'Game5', Game: 'Football' },
        { Id: 'Game6', Game: 'Golf' },
        { Id: 'Game7', Game: 'Hockey' },
        { Id: 'Game8', Game: 'Rugby' },
        { Id: 'Game9', Game: 'Snooker' },
        { Id: 'Game10', Game: 'Tennis' }
    ];
    public fields: Object = { text: 'Game', value: 'Id' };
    public height: string = '220px';
    public waterMark: string = 'Select a game';
    public value: string = 'Game3';
    public onChange(args: any): void {
        let value: Element = document.getElementById('value');
        let text: Element = document.getElementById('text');
        value.innerHTML = this.listObj.value.toString();
        text.innerHTML = this.listObj.text;
    }
    ngAfterViewInit(e: any): void {
        this.onChange(e);
    }
}