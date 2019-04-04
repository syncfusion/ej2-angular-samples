import { Component, ViewEncapsulation } from '@angular/core';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'custom-value.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CustomTagMultiSelectComponent {
    // define the JSON of data
    public gameList: { [key: string]: Object }[] = [
        { Id: 'Game1', Game: 'American Football' },
        { Id: 'Game2', Game: 'Badminton' },
        { Id: 'Game3', Game: 'Basketball' },
        { Id: 'Game4', Game: 'Cricket' },
        { Id: 'Game5', Game: 'Football' },
        { Id: 'Game6', Game: 'Golf' },
        { Id: 'Game7', Game: 'Hockey' },
        { Id: 'Game8', Game: 'Rugby' },
        { Id: 'Game9', Game: 'Snooker' },
        { Id: 'Game10', Game: 'Tennis' },
    ];
    // map the appropriate columns to fields property
    public fields: object = {text: 'Game', value: 'Id'};
    // set the placeholder to MultiSelect input element
    public waterMark: string = 'Favorite sports';
    // set the type of mode for how to visualized the selected items in input element.
    public box : string = 'Box';

}