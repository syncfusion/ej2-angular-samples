import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DashboardLayoutComponent, PanelModel } from '@syncfusion/ej2-angular-layouts';
import panelData from './panels-data';

/**

 * Default  component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['predefined-layouts-style.css'],
    templateUrl: 'predefined-layouts.html',
    encapsulation: ViewEncapsulation.None
})
export class PredefinedLayoutsComponent {
    @ViewChild('predefine_dashboard')
    public dashboard: DashboardLayoutComponent;
    public panels: any = panelData;
    public panelsData: PanelModel[] = [{
        'sizeX': 4, 'sizeY': 3, 'row': 0, 'col': 0,
        header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
        content: '<div class="panel-content">Content Area</div>'
    },
    {
        'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 4,
        header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
        content: '<div class="panel-content">Content Area</div>'
    },
    {
        'sizeX': 6, 'sizeY': 2, 'row': 3, 'col': 0,
        header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
        content: '<div class="panel-content">Content Area</div>'
    }];
    public cellSpacing: number[] = [10, 10];
    public headerCount: number = 1;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default-style.css'];
    }
    public count: number = 8;

    onButtonClick(): void {
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        this.dashboard.removeAll();
        this.initializeTemplate(<HTMLElement>selectedElement[0]);
    };
    onTemplateClick(args: any): void {
        let target: any = args.target;
        let selectedElement: any = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        if ((<HTMLElement>target).className === 'image-pattern-style') {
            this.dashboard.removeAll();
            this.initializeTemplate(<HTMLElement>args.target);
        }
        (<HTMLElement>target).classList.add('e-selected-style');
    };
    public initializeTemplate(element: HTMLElement): void {
        let updatedPanels: PanelModel[] = [];
        let index: number = parseInt(element.getAttribute('data-id'), 10) - 1;
        let panel: any = Object.keys(this.panels[index]).map((panelIndex: string) => {
            return this.panels[index][panelIndex];
        });
        for (let i: number = 0; i < panel.length; i++) {
            let panelModelValue: PanelModel = {
                row: panel[i].row,
                col: panel[i].col,
                sizeX: panel[i].sizeX,
                sizeY: panel[i].sizeY,
                header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
                content: '<div class="panel-content">Content Area</div>'
            };
            updatedPanels.push(panelModelValue);
        }
        this.dashboard.panels = updatedPanels;
    }

}