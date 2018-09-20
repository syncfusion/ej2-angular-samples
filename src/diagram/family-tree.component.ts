import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    Diagram, NodeModel, Canvas, PathElement, ConnectorModel, PortVisibility, DiagramElement,
    DiagramTools, TextElement, DataBinding, HierarchicalTree, HorizontalAlignment,
    SnapConstraints, SnapSettingsModel
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { familyData, DataInfo } from './diagram-data';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
Diagram.Inject(DataBinding, HierarchicalTree);

/**
 * Sample for Family Tree
 */
@Component({
    selector: 'control-content',
    templateUrl: 'family-tree.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class FamilyTreeDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;

    public node: NodeModel;
    public data: Object = {
        id: 'Name', parentId: 'Category',
        dataManager: new DataManager(familyData as JSON[]),
        //binds the external data with node
        doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
            let key: string = 'shape';
            let name: string = 'Name';
            /* tslint:disable:no-string-literal */
            nodeModel.shape = { type: 'Text', content: data[name] };
        }
    };
    public layout: Object = {
        type: 'HierarchicalTree', verticalSpacing: 45, horizontalSpacing: 15
    };
    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };


    public nodeDefaults(node: NodeModel): NodeModel {
        let obj: NodeModel = {};
        obj.backgroundColor = '#e8ebef';
        obj.ports = [
            {
                id: 'port1', shape: 'Circle', offset: { x: 0.5, y: 0.51 }, height: 4, width: 4, visibility: PortVisibility.Visible,
                style: {
                    fill: 'black',
                }
            }];
        return obj;
    };

    public connDefaults(connector: ConnectorModel): ConnectorModel {
        connector.type = 'Orthogonal';
        connector.sourcePortID = 'port1';
        connector.targetDecorator = { shape: 'None' };
        return connector;
    };


    public setNodeTemplate: Function = this.nodeTemplate.bind(this);
    
    private nodeTemplate(node: NodeModel): Canvas {
        let canvas: Canvas = new Canvas(); canvas.children = [];
        canvas.width = 140;
        canvas.style.strokeWidth = 0; canvas.style.fill = 'transparent';
        canvas.margin = { left: 5, right: 5, top: 5, bottom: 5 };
        canvas.children.push(this.getPathElement('M 0 100 L 140 100 '));
        let nameKey: string = 'Name';
        let spouseNameKey: string = 'spouse';
        canvas.children.push(this.getTextElement((node.data as DataInfo)[nameKey], '#c8c8f5', 'Left'));
        canvas.children.push(this.getTextElement((node.data as DataInfo)[spouseNameKey], '#f3bcd7', 'Right'));
        return canvas;
    };

    private getTextElement(text: string, color: string, alignment: HorizontalAlignment): DiagramElement {
        let textElement: TextElement = new TextElement();
        textElement.width = 60;
        textElement.height = 35;
        textElement.content = text;
        textElement.style.fill = color;
        textElement.horizontalAlignment = alignment;
        textElement.style.strokeColor = 'none';
        textElement.relativeMode = 'Object';
        return textElement;
    }

    private getPathElement(data: string): PathElement {
        let pathElement: PathElement = new PathElement();
        pathElement.data = data;
        pathElement.style.strokeColor = ' black';
        pathElement.style.strokeWidth = 1;
        pathElement.verticalAlignment = 'Center';
        pathElement.relativeMode = 'Object';
        return pathElement;
    }
}

