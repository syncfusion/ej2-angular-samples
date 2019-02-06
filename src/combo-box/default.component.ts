/**
 * ComboBox Defaut functionality Sample
 */
import { Component, ViewChild, NgModule } from '@angular/core';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
    selector: 'control-content',
    templateUrl: 'default.html'
})
export class DefaultComboBoxComponent {
    @ViewChild('sample')
    public comboBoxObj: ComboBoxComponent;
    // define the JSON of data
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
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Game', value: 'Id' };
    // set the height of the popup element
    public height: string = '250px';
    // set the value to select an item based on mapped value at initial rendering
    public value: string = 'Game3';
    // set the placeholder to ComboBox input element
    public waterMark: string = 'Select a game';
    public onChange(args: any): void {
        let valueEle: HTMLInputElement = document.getElementsByClassName('e-input')[0] as HTMLInputElement;
        let text: Element = document.getElementById('text');
        // make empty the input value when typed characters is 'null' in input element
        if (this.comboBoxObj.value === "null" || this.comboBoxObj.value === null || this.comboBoxObj.value === "") {
            valueEle.value = '';
        }
        // set null text to the input value when clear the text in ComboBox element
        if (this.comboBoxObj.text === "null" || this.comboBoxObj.text === null || this.comboBoxObj.text === "") {
            text.innerHTML =  'null';
        } else {
            text.innerHTML = this.comboBoxObj.text.toString();
        }
    }
    ngAfterViewInit(e: any): void {
        // call the change event's function after initialized the component.
           setTimeout(()=>
      {
        this.onChange(e);
     })
    }
}