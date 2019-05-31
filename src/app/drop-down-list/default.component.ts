/**
 * DropDownList Default functionality Sample
 */
import { Component, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
    selector: 'control-content',
    templateUrl: 'default.html'
})
export class DefaultDropDownListComponent {
    @ViewChild('sample')
    public listObj: DropDownListComponent;
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
    public height: string = '220px';
    // set the placeholder to DropDownList input element
    public waterMark: string = 'Select a game';
    // set the value to select an item based on mapped value at initial rendering
    public value: string = 'Game3';
    public onChange(args: any): void {
        let value: Element = document.getElementById('value');
        let text: Element = document.getElementById('text');
        // update the text and value property values in property panel based on selected item in DropDownList
        value.innerHTML = this.listObj.value.toString();
        text.innerHTML = this.listObj.text;
    }
    ngAfterViewInit(e: any): void {
        // call the change event's function after initialized the component.
        setTimeout(()=>
      {
        this.onChange(e);
     })
    }
}