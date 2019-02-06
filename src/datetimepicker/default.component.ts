import { Component, ViewEncapsulation, Inject } from '@angular/core';
@Component({
    selector: 'control-content',
    styleUrls: ['default-style.css'],
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultDateTimePickerComponent {

    public date: Object = new Date();

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default-style.css'];
    }

}