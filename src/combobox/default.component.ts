/**
 * ComboBox Defaut functionality Sample
 */
import { Component, ViewChild, NgModule } from '@angular/core';
import { ComboBoxComponent } from '@syncfusion/ej2-ng-dropdowns';
@Component({
    selector: 'control-content',
    templateUrl: 'default.html'
})
export class DefaultComboBoxComponent {
    @ViewChild('sample')
    public comboBoxObj: ComboBoxComponent;
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
    public height: string = '250px';
    public value: string = 'Game3';
    public waterMark: string = 'Select a game';
    public onChange(args: any): void {
        let valueEle: HTMLInputElement = document.getElementsByClassName('e-input')[0] as HTMLInputElement;
        let text: Element = document.getElementById('text');
        if (this.comboBoxObj.value === "null" || this.comboBoxObj.value === null || this.comboBoxObj.value === "") {
            valueEle.value = '';
        }
        if (this.comboBoxObj.text === "null" || this.comboBoxObj.text === null || this.comboBoxObj.text === "") {
            text.innerHTML =  'null';
        } else {
            text.innerHTML = this.comboBoxObj.text.toString();
        }
    }
    ngAfterViewInit(e: any): void {
        this.onChange(e);
    }
}