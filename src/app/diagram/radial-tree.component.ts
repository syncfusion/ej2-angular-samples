import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    Diagram, NodeModel, DiagramTools, BasicShapeModel, SnapSettingsModel,
    NodeConstraints, DataBinding, RadialTree, SnapConstraints, ZoomOptions
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { radialTree } from './diagram-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';
export interface DataInfo {
    [key: string]: string;
}
Diagram.Inject(DataBinding, RadialTree);

/**
 * Sample for Radial Tree layout
 */
@Component({
    selector: 'control-content',
    templateUrl: 'radial-tree.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToolbarModule, DiagramModule, SBDescriptionComponent]
})
export class RadialTreeDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public tool: DiagramTools = DiagramTools.ZoomPan;
    public data: Object = {
        //sets the fields to bind
        id: 'Id', parentId: 'ReportingPerson',
        dataSource: new DataManager(radialTree),
        //binds the data to the nodes
        doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
            //Set the styling for the annotation 
            nodeModel.annotations = [{
                content: data.Name,
                style: data.Id === 'parent' ? { color: 'white', fontSize: 50 } : { color: 'black', fontSize: 20 }
            }];
            nodeModel.constraints = NodeConstraints.Default | NodeConstraints.Tooltip;
           //Set properties for the tooltip
            nodeModel.tooltip = {
                content: data.Name + '<br/>' + data.Designation, relativeMode: 'Object',
                position: 'TopCenter', showTipPointer: true,
            };
            if (data.Designation === 'Managing Director') {
                nodeModel.width = 400;
                nodeModel.height = 400;
                nodeModel.shape = { shape: 'Ellipse' } as BasicShapeModel;
                nodeModel.style = { fill: 'black' };
            } else if (data.Designation === 'Project Manager') {
                nodeModel.width = 130;
                nodeModel.height = 130;
                nodeModel.height = 130;
                nodeModel.style = { fill: '#f8ab52' };
            } else {
                nodeModel.width = 100;
                nodeModel.height = 100;
                nodeModel.shape = { shape: 'Ellipse' } as BasicShapeModel;
                nodeModel.style = { fill: '#afeeee' };
            }
        }
    };
    //Configures automatic layout
    public layout: Object = {
        type: 'RadialTree', verticalSpacing: 30, horizontalSpacing: 20,
        root: 'Category'
    };

    public create(args: Object): void {
        this.diagram.fitToPage();
        this.diagram.dataBind();
    }
    //Disables all interactions except zoom and pan.
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
   // Handles click events to perform ZoomIn, ZoomOut, and Reset based on the selected option.
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
                this.diagram.fitToPage();
                break;
        }
    }
}