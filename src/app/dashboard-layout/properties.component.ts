import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DashboardLayoutComponent, PanelModel } from '@syncfusion/ej2-angular-layouts';
import panelData from './panels-data';

/**

 * Default  component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['properties-style.css'],
    templateUrl: 'properties.html',
    encapsulation: ViewEncapsulation.None
})
export class PropertiesComponent {
    @ViewChild('api_dashboard')
    public dashboardObject: DashboardLayoutComponent;
    public panels: any = panelData;
    public count: number = 5;
    public panelsData: PanelModel[] = [{
        'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, header: '<div>Panel 1</div>'
    },
    {
        'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, header: '<div>Panel 2</div>'
    },
    {
        'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 4, header: '<div>Panel 3</div>'
    },
    {
        'sizeX': 4, 'sizeY': 2, 'row': 2, 'col': 0, header: '<div>Panel 4</div>'
    },
    {
        'sizeX': 2, 'sizeY': 2, 'row': 2, 'col': 4, header: '<div>Panel 5</div>'
    }];
    public cellSpacing: number[] =  [10, 10];
    public headerCount: number = 1;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['properties-style.css'];
    }
    onChange(args: any): void {
        let targetElement = args.event.target;
        let previousElement = targetElement.previousElementSibling;
        let nextElement = targetElement.nextElementSibling;
        if ((previousElement !== null && previousElement.id === 'floating') || nextElement !== null && nextElement.previousElementSibling.id === 'floating') {
            this.dashboardObject.allowFloating = args.checked;
         }
         if ((previousElement !== null && previousElement.id === 'resizing') || nextElement !== null && nextElement.previousElementSibling.id === 'resizing') {
            this.dashboardObject.allowResizing = args.checked;
         }
    }
	
	onChangeEvent(args: any): void  {
		 this.dashboardObject.cellSpacing =  [parseInt(args.value, 10), parseInt(args.value, 10)];
	}

    onRemove(): void {
        if (this.dashboardObject.panels.length > 0) {
            for (let i: number = this.dashboardObject.panels.length - 1; i < this.dashboardObject.panels.length; i++) {
                this.dashboardObject.removePanel(this.dashboardObject.panels[this.dashboardObject.panels.length - 1 - i].id);
            }
        }
    };

    onAdd(): void {
        this.count = this.count + 1;
        let panel: PanelModel[] = [{
            'id': this.count.toString() + '_layout', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0,
                content: '<div></div>',
                header: '<div>Panel ' + this.count.toString() + '</div>'
        }];
        this.dashboardObject.addPanel(panel[0]);
    }
}