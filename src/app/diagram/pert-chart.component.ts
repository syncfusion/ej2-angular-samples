import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import {
    Diagram, NodeModel, DataBinding, DiagramElement, StackPanel, VerticalAlignment,
    SnapConstraints, TextStyleModel, TextElement, HorizontalAlignment, DiagramTools,
    HierarchicalTree, ComplexHierarchicalTree, ConnectorModel, SnapSettingsModel, randomId
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './diagram-data.json';

export interface DataInfo {
    [key: string]: string;
}

Diagram.Inject(DataBinding, HierarchicalTree, ComplexHierarchicalTree);

/**
 * Sample for PERT Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pert-chart.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PertChartDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;

    public data: Object = {
        id: 'id', parentId: 'Category',
        dataManager: new DataManager((Data as any).pertChartData),
        //binds the external data with node
        doBinding: (nodeModel: NodeModel, data: object, diagram: Diagram) => {
            nodeModel.shape = { type: 'Text' };
        }
    };
    public layout: Object = {
        type: 'ComplexHierarchicalTree', orientation: 'LeftToRight', verticalSpacing: 100, horizontalSpacing: 70
    };

    public connDefaults(connector: ConnectorModel): ConnectorModel {
        connector.type = 'Straight';
        connector.style.strokeColor = '#979797';
        connector.targetDecorator.width = 10;
        connector.targetDecorator.height = 10;
        connector.targetDecorator.style = { fill: '#979797', strokeColor: '#979797' };
        return connector;
    };

    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public setNodeTemplate: Function = this.nodeTemplate.bind(this);

    private nodeTemplate(node: NodeModel): StackPanel {
        let table: StackPanel = new StackPanel();
        table.id = randomId();
        table.style.fill = '#0069d9';
        table.orientation = 'Vertical';
        let nameKey: string = 'id';
        let stack: StackPanel = new StackPanel();
        stack.id = randomId();
        stack.children = [];
        stack.height = 25;
        stack.orientation = 'Horizontal';
        stack.style.fill = 'white';
        stack.horizontalAlignment = 'Stretch';
        this.addRows(stack, node);
        table.children = [this.getTextElement((node.data as DataInfo)[nameKey], 'Stretch', 170, 'Stretch'), stack];
        (table.children[0].style as TextStyleModel).color = 'white';
        (table.children[0].style as TextStyleModel).fontSize = 14;
        return table;
    };

    private getTextElement(text: string, alignment: HorizontalAlignment, width?: number, valignment?: VerticalAlignment): DiagramElement {
        let textElement: TextElement = new TextElement();
        textElement.id = randomId();
        textElement.content = text;
        textElement.width = width;
        textElement.height = 25;
        textElement.horizontalAlignment = alignment;
        textElement.verticalAlignment = valignment;
        textElement.style.strokeWidth = 1;
        textElement.style.strokeColor = '#b5b5b5';
        textElement.style.fill = 'transparent';
        textElement.style.color = '#3c3c3c';
        textElement.relativeMode = 'Object';
        return textElement;
    }
    public create(args: Object): void {
        this.diagram.fitToPage();
    }
    private addRows(column: StackPanel, node: NodeModel): void {
        column.children.push(this.getTextElement((node.data as DataInfo).startDate, 'Left', 70));
        column.children.push(this.getTextElement((node.data as DataInfo).duration, 'Center', 30));
        column.children.push(this.getTextElement((node.data as DataInfo).endDate, 'Right', 70));
    }

}

