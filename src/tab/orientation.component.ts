import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-ng-dropdowns';
import { rippleEffect } from '@syncfusion/ej2-base';
import { TabComponent } from '@syncfusion/ej2-ng-navigations';

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

    public headerText: Object = [{ text: 'Rome' }, { text: 'Paris' }, { text: 'London' }];
    public dataPlace: Object[] = [
        { id: 'top', position: 'Top' }, { id: 'bottom', position: 'Bottom' }
    ];
    public dataStyles: Object[] = [
        { id: 'default', class: 'Default' }, { id: 'fill', class: 'Fill' }, { id: 'accent', class: 'Accent' }
    ];
    public placeFields: Object = { text: 'position', value: 'id' };
    public styleFields: Object = { text: 'class', value: 'id' };
    public placeValue: string = 'top';
    public styleValue: string = 'default';
    public enableClose: boolean = true;

    public content0: string = '<div class="content-title"><div class="cnt-text">Employee Info</div></div><div id="rome">' +
        '<div class="template-container"><div class="left"><img class="empImg" src="src/dropdownlist/Employees/1.png" ' +
        'alt="Anne Dodsworth" /></div><div class="left info"><div class="name">Anne Dodsworth</div> <div class="role">' +
        'Product Manager</div></div></div><div class="template-container"><div class="left"><img class="empImg" ' +
        'src="src/dropdownlist/Employees/2.png" alt="Laura Callahan" /></div><div class="left info"><div class="name">' +
        'Laura Callahan</div> <div class="role">Team Lead</div></div></div><div class="template-container"><div ' +
        'class="left"><img class="empImg" src="src/dropdownlist/Employees/3.png" alt="Andrew Fuller" /></div><div ' +
        'class="left info"><div class="name">Andrew Fuller</div> <div class="role">Developer</div></div></div></div>';

    public content1: string = '<div class="content-title"><div class="cnt-text">Employee Info</div></div><div id="rome">' +
        '<div class="template-container"><div class="left"><img class="empImg" src="src/dropdownlist/Employees/4.png" ' +
        'alt="Robert King" /></div><div class="left info"><div class="name">Robert King</div> <div class="role">' +
        'Team Lead</div></div></div><div class="template-container"><div class="left"><img class="empImg" ' +
        'src="src/dropdownlist/Employees/5.png" alt="Michael Suyama" /></div><div class="left info"><div class="name">' +
        'Michael Suyama</div> <div class="role">Developer</div></div></div><div class="template-container"><div ' +
        'class="left"><img class="empImg" src="src/dropdownlist/Employees/6.png" alt="Margaret Peacock" /></div><div ' +
        'class="left info"><div class="name">Margaret Peacock</div> <div class="role">Developer</div></div></div></div>';

    public content2: string = '<div class="content-title"><div class="cnt-text">Employee Info</div></div><div id="rome">' +
        '<div id="ripple" class="template-container"><div class="left"><img class="empImg" src="src/dropdownlist/Employees/7.png" ' +
        'alt="Janet Leverling" /></div><div class="left info"><div class="name">Janet Leverling</div> <div class="role">' +
        'CEO</div></div></div><div class="template-container"><div class="left"><img class="empImg" ' +
        'src="src/dropdownlist/Employees/8.png" alt="Steven Buchanan" /></div><div class="left info"><div class="name">' +
        'Steven Buchanan</div> <div class="role">HR</div></div></div><div class="template-container"><div ' +
        'class="left"><img class="empImg" src="src/dropdownlist/Employees/9.png" alt="Nancy Davolio" /></div><div ' +
        'class="left info"><div class="name">Nancy Davolio</div> <div class="role">Product Manager</div></div></div></div>';

    public placeChange(e: Object): void {
        this.placeValue = this.placeObj.value.toString();
        if (this.placeObj.value === 'bottom') {
            this.tabObj.headerPlacement = 'Bottom';
        } else {
            this.tabObj.headerPlacement = 'Top';
        }
        this.tabObj.dataBind();
    }

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