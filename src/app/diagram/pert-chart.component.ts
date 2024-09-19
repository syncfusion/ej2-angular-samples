import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    Diagram, NodeModel, DataBinding, DiagramElement, StackPanel, VerticalAlignment,
    SnapConstraints, TextStyleModel, TextElement, HorizontalAlignment, DiagramTools,
    HierarchicalTree, ComplexHierarchicalTree, ConnectorModel, SnapSettingsModel, randomId
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { pertChartData } from './diagram-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

export interface DataInfo {
    [key: string]: string;
}
// Injecting necessary features into the Diagram component
Diagram.Inject(DataBinding, HierarchicalTree, ComplexHierarchicalTree);

/**
 * Sample for PERT Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pert-chart.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})
export class PertChartDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    // Data source configuration for the diagram
    public data: Object = {
        id: 'id', parentId: 'Category',
        dataSource: new DataManager(pertChartData),
        //binds the external data with node
        doBinding: (nodeModel: NodeModel, data: object, diagram: Diagram) => {
            nodeModel.shape = { type: 'Text' };
        }
    };
    // Layout configuration for the diagram
    public layout: Object = {
        type: 'ComplexHierarchicalTree', orientation: 'LeftToRight', verticalSpacing: 100, horizontalSpacing: 70
    };
     // Connector defaults configuration
    public connectorDefaults(connector: ConnectorModel): ConnectorModel {
        connector.style.strokeColor = '#979797';
        connector.targetDecorator.width = 10;
        connector.targetDecorator.height = 10;
        connector.targetDecorator.style = { fill: '#979797', strokeColor: '#979797' };
        return connector;
    };
    // Tool configuration for the diagram
    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public setNodeTemplate: Function = this.nodeTemplate.bind(this);
    // Function to define the custom node template
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
        stack.horizontalAlignment = 'Stretch';
        this.addRows(stack, node);
        table.children = [this.getTextElement((node.data as DataInfo)[nameKey], 'Stretch', 170, 'Stretch'), stack];
        (table.children[0].style as TextStyleModel).color = 'white';
        (table.children[0].style as TextStyleModel).fontSize = 14;
        return table;
    };
    // Function to create text element with specified properties
    private getTextElement(text: string, horizontalAlignment: HorizontalAlignment, width?: number, verticalAlignment?: VerticalAlignment): DiagramElement {
        let textElement: TextElement = new TextElement();
        textElement.id = randomId();
        textElement.content = text;
        textElement.width = width;
        textElement.height = 25;
        textElement.horizontalAlignment = horizontalAlignment;
        textElement.verticalAlignment = verticalAlignment;
        textElement.style.strokeWidth = 1;
        textElement.style.strokeColor = '#b5b5b5';
        textElement.style.fill = 'transparent';
        textElement.style.color = '#3c3c3c';
        textElement.relativeMode = 'Object';
        return textElement;
    }
    // Function to fit diagram to the page after creation
    public create(args: Object): void {
        this.diagram.fitToPage();
    }
    // Function to add rows to the stack panel
    private addRows(column: StackPanel, node: NodeModel): void {
        column.children.push(this.getTextElement((node.data as DataInfo).startDate, 'Left', 70));
        column.children.push(this.getTextElement((node.data as DataInfo).duration, 'Center', 30));
        column.children.push(this.getTextElement((node.data as DataInfo).endDate, 'Right', 70));
    }

}

