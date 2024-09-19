/**
 * Sample for virtualization
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    Diagram, NodeModel, ConnectorModel, DataBinding,ZoomOptions,
    HierarchicalTree, SnapConstraints, SnapSettingsModel,Rect,DiagramTools,DiagramConstraints
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { virtualizationData } from './complexShapes.data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(DataBinding, HierarchicalTree);

@Component({
    selector: 'control-content',
    templateUrl: 'virtualization.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToolbarModule, DiagramModule, SBDescriptionComponent]
})

export class VirtualizationComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public bound: Rect = new Rect(200, 100, 500, 100);
    public constraints: DiagramConstraints;
    public tool: DiagramTools = DiagramTools.ZoomPan;
    public virtualData: any = new DataManager(this.dataVirtualization());

    ngOnInit(): void {
        // Sets the diagram constraints to include default constraints and virtualization
        this.constraints = DiagramConstraints.Default | DiagramConstraints.Virtualization;
    }
    public data: Object = {
        // Sets the fields to bind the data
        dataSource: this.virtualData,
        parentId: "Parent",
        id: "Name"
    };
    // Method to generate and return virtualized hierarchical data
    public dataVirtualization() {
        let i: number = 0;
        let data = [];
        // Get the first parent's name from the data
        let parentName = virtualizationData[0].Name;
        // Add the first parent to the data array
        data.push({ 'Name': parentName, 'Parent': "" })
        i++;
        // Loop to create a hierarchical structure
        for (let j = 1; j < 100; j++) {
            let name = virtualizationData[i].Name
            data.push({ 'Name': name, 'Parent': parentName })
            i++;
            // Add two child nodes for each parent
            for (let k = 0; k < 2; k++) {
                data.push({ 'Name': virtualizationData[i].Name, 'Parent': name })
                i++;
            }
        }
        return data;
    }
    // Snap settings for the diagram, disabling snap constraints
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    // Layout settings for the hierarchical tree diagram
    public layout: Object = {
        type: 'HierarchicalTree',
            margin: { left: 10, top: 10 },
            horizontalSpacing: 40.0,
            verticalSpacing: 50.0,
            orientation: 'TopToBottom',
    };

    // Defines the default properties for nodes in the diagram
    public nodeDefaults(node: any): NodeModel {
        node.shape = { type: 'Text', content: node.data.Name,shape: 'Rectangle', cornerRadius: 5 };
        node.style = { fill: '#659be5', strokeColor: 'none', color: 'white', strokeWidth: 2 };
        node.backgroundColor = '#659be5';
        node.margin = { left: 5, right: 5, bottom: 5, top: 5 };
        node.width = 80;
        node.height = 30;
        return node;
    };
    // Event handler for when the diagram is created
    public created(): void {
        // Fit the diagram to the page with custom bounds and margins
        this.diagram.fitToPage({ mode: 'Page', region: 'CustomBounds', margin: { left: 50, right: 50 }, customBounds: this.bound });
    }
    // Defines the default properties for connectors in the diagram
    public connDefaults(connector: ConnectorModel): ConnectorModel {
        connector.type = 'Orthogonal';
        connector.cornerRadius = 7;
        connector.targetDecorator.height = 7;
        connector.targetDecorator.width = 7;
        connector.style.strokeColor = '#6d6d6d';
        return connector;
    }
    // Event handler for item click events
    public onItemClick(args: ClickEventArgs): void {
        switch (args.item.text) {
            case 'Zoom In':
                let zoomin: ZoomOptions = { type: 'ZoomIn', zoomFactor: 0.2 };
                this.diagram.zoomTo(zoomin);
                this.diagram.dataBind();
                break;
            case 'Zoom Out':
                let zoomout: ZoomOptions = { type: 'ZoomOut', zoomFactor: 0.2 };
                this.diagram.zoomTo(zoomout);
                this.diagram.dataBind();
                break;
            case 'Reset':
                this.diagram.reset();
                this.diagram.fitToPage({ mode: 'Page', region: 'CustomBounds', margin: { left: 50, right: 50 }, customBounds: this.bound });
                break;
        }
    }
}