import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { rippleEffect } from '@syncfusion/ej2-base';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';

/**
 * Orientation Tab Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'orientation.html',
    styleUrls: ['tab.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class OrientationTabComponent {
    @ViewChild('place')
    public placeObj: DropDownListComponent;
    @ViewChild('styles')
    public styleObj: DropDownListComponent;
    @ViewChild('orientationTab')
    public tabObj: TabComponent;

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['tab.component.css'];
    }

    // Mapping Tab items Header property
    public headerText: Object = [{ text: 'Rome' }, { text: 'Paris' }, { text: 'London' }];

    // Mapping DropDownList dataSource property
    public dataPlace: Object[] = [
        { id: 'top', position: 'Top' }, { id: 'bottom', position: 'Bottom' },
        { id: 'left', position: 'Left' }, { id: 'right', position: 'Right' }
    ];

    // Mapping DropDownList dataSource property
    public dataStyles: Object[] = [
        { id: 'default', class: 'Default' }, { id: 'fill', class: 'Fill' }, { id: 'accent', class: 'Accent' }
    ];

    // Mapping DropDownList fields property
    public placeFields: Object = { text: 'position', value: 'id' };

    // Mapping DropDownlist fields property
    public styleFields: Object = { text: 'class', value: 'id' };

    // Mapping DropDownList value property
    public placeValue: string = 'top';

    // Mapping DropDownList value property
    public styleValue: string = 'default';

    // Mapping Tab items showCloseButton property
    public enableClose: boolean = true;

    // Change event funtion for DropDownList component    
    public placeChange(e: Object): void {
        //set headerPlacement property to Tab Component
        this.tabObj.headerPlacement = this.placeObj.text as any;
        this.tabObj.dataBind();
    }

    // Change event funtion for DropDownList component
    public styleChange(e: Object): void {
        this.styleValue = this.styleObj.value.toString();
        this.removeStyleClass();
        let name: string = this.styleValue;
        if (name === 'fill') {
            this.tabObj.element.classList.add('e-fill');
        } else if (name === 'accent') {
            this.tabObj.element.classList.add('e-background');
            this.tabObj.element.classList.add('e-accent');
        }
    }

    public removeStyleClass(): void {
        this.tabObj.element.classList.remove('e-fill');
        this.tabObj.element.classList.remove('e-background');
        this.tabObj.element.classList.remove('e-accent');
    }
}