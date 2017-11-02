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