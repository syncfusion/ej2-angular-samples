/**
 * Fishbone Diagram sample
 */

// Importing needed dependencies for diagram
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    NodeModel, DecoratorModel, DiagramTools, ConnectorModel, SnapSettingsModel
} from '@syncfusion/ej2-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Component for displaying a Fishbone Diagram.
 * Manages the presentation and behavior of the diagram using Syncfusion's Angular Diagram component.
 */
@Component({
    selector: 'control-content',  // Angular component selector
    templateUrl: 'fishbone-diagram.html',  // HTML template file for the component
    styleUrls: ['diagram-style.css'],  // CSS styles specific to the component
    encapsulation: ViewEncapsulation.None,  // No view encapsulation
    standalone: true,  // Indicates it's a standalone component
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]  // Importing necessary Angular modules and components
})

export class FishboneDiagramComponent {

    // ViewChild to get a reference to the DiagramComponent named 'diagram'
    @ViewChild('diagram')

    // Define a variable to hold an instance of the DiagramComponent
    public diagram: DiagramComponent;

    // Define a variable to hold an instance of the DiagramTool ZoomPan
    public tool = DiagramTools.ZoomPan;

    // Function to create a node
    public createNode(id: string, height: number, width: number, offsetX: number, offsetY: number, content: string): NodeModel {
        return {
            id: id,
            height: height,
            width: width,
            offsetX: offsetX,
            offsetY: offsetY,
            annotations: [{ content: content, style: { color: 'white' } }],
            shape: { type: 'Path', data: 'M 10 0 L 166 0 L 156 44 L 0 44 z' },
            style: { fill: '#39AFA9', strokeColor: 'black' }
        }
    };
    // Function to create an ellipse
    public createEllipseNode(id: string, height: number, width: number, offsetX: number, offsetY: number, content: string = "", fill: string = "white", strokeColor = '#A52A2A'): NodeModel {
        return {
            id: id,
            height: height,
            width: width,
            offsetX: offsetX,
            offsetY: offsetY,
            annotations: [{ content: content, style: { color: 'white' } }],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: fill, strokeColor: strokeColor }
        }
    };

    // Function to create an Text Node
    public createTextNode(id: string, height: number, width: number, offsetX: number, offsetY: number, content: string): NodeModel {
        return {
            id: id,
            height: height,
            width: width,
            offsetX: offsetX,
            offsetY: offsetY,
            style: { fill: 'transparent', strokeWidth: 0 },
            shape: { type: 'Text', content: content }
        }
    };
  
  
  //Initializes the nodes for the diagram.
  public nodes:NodeModel[]  = [
    this.createNode('Equipment', 40, 120, 300, 80, 'Equipment'),
    this.createNode('Environment', 40, 120, 450, 80, 'Environment'),
    this.createNode('Person', 40, 120, 600, 80, 'Person'),
    this.createNode('Materials', 40, 120, 300, 600, 'Materials'),
    this.createNode('Machine', 40, 120, 450, 600, 'Machine'),
    this.createNode('Methods', 40, 120, 600, 600, 'Methods'),
    this.createEllipseNode('ellipse1', 20, 20, 290, 130),
    this.createEllipseNode('ellipse2', 20, 20, 323, 183),
    this.createEllipseNode('ellipse3', 20, 20, 354, 237),
    this.createEllipseNode('ellipse4', 20, 20, 440, 130),
    this.createEllipseNode('ellipse5', 20, 20, 470, 182),
    this.createEllipseNode('ellipse6', 20, 20, 590, 130),
    this.createEllipseNode('ellipse7', 20, 20, 622, 179),
    this.createEllipseNode('ellipse8', 20, 20, 660, 221),
    this.createEllipseNode('ellipse9', 20, 20, 694, 264),
    this.createEllipseNode('ellipse10', 20, 20,354, 460),
    this.createEllipseNode('ellipse11', 20, 20, 590, 530),
    this.createEllipseNode('ellipse12', 20, 20, 660, 460),
    this.createEllipseNode('ellipse13', 20, 20, 440, 530),
    this.createEllipseNode('ellipse14', 20, 20, 510, 460),
    this.createEllipseNode('ellipse15', 20, 20, 290, 530),
    this.createEllipseNode('Colorellipse1', 50, 50, 717, 310),
    this.createEllipseNode('Colorellipse2', 50, 50, 560, 310),
    this.createEllipseNode('Colorellipse3', 50, 50, 390, 310),
    this.createEllipseNode('Colorellipse4', 50, 50, 220, 310),
    this.createEllipseNode('Colorellipse5', 90, 140, 900, 310,'Productivity Increase',"#39AFA9", 'black'),
    this.createTextNode('TextPrograms',20,90,189,130,'Text Programs'),
    this.createTextNode('VentilatorsSound',20,120,359,130,'Ventilators Sound'),
    this.createTextNode('Education',20,70,500,130,'Education'),
    this.createTextNode('DataBooks',20,70,213,183,'DataBooks'),
    this.createTextNode('Fixtures',20,70,240,237,'Fixtures'),
    this.createTextNode('Noise',20,70,390,182,'Noise'),
    this.createTextNode('Motivation',20,70,535,182,'Motivation'),
    this.createTextNode('Tiredness',20,70,565,224,'Tiredness'),
    this.createTextNode('Storer',20,70,606,264,'Storer'),
    this.createTextNode('Computer',20,70,260,460,'Computer'),
    this.createTextNode('Quality',20,120,417,460,'Quality of Element'),
    this.createTextNode('Order',20,70,562,460,'Order'),
    this.createTextNode('Software',20,70, 225, 530,'Software'),
    this.createTextNode('Procurement', 20, 70, 358, 530,'Procurement'),
    this.createTextNode('Standardization',20, 90, 501, 530,'Standardization'),
  
  ];
   

    // Specify constraints for snapping behavior 
    public snapSettings: SnapSettingsModel = { constraints: 0 };

    // Creates a diagram based on the provided arguments.
    public diagramCreate(args: Object): void {
        // Adjusts the diagram to fit the page based on height.
        this.diagram.fitToPage({ mode: 'Height' });
    }


    // Function to create a connector model.
    public createConnector(
        id: string, lineDashArray: string, source: string, target: string, strokeColor: string): ConnectorModel {
        return {
            id: id,
            sourceID: source,
            targetID: target,
            style: {
                strokeColor: strokeColor,
                strokeWidth: 2,
                strokeDashArray: lineDashArray,
            }
        }
    }

    //Initializes the Connectors for the diagram
    public connectors: ConnectorModel[] = [
        this.createConnector('connector01', '5,5', 'Equipment', 'ellipse1', '#A52A2A' ),
        this.createConnector('connector02', '5,5', 'ellipse1', 'ellipse2', '#A52A2A' ),
        this.createConnector('connector03', '5,5', 'ellipse2', 'ellipse3', '#A52A2A' ),
        this.createConnector('connector04', '5,5', 'ellipse3', 'Colorellipse3', '#A52A2A' ),
        this.createConnector('connector05', '5,5', 'Environment', 'ellipse4', '#A52A2A' ),
        this.createConnector('connector06', '5,5', 'ellipse4', 'ellipse5', '#A52A2A' ),
        this.createConnector('connector07', '5,5', 'ellipse4', 'ellipse5', '#A52A2A' ),
        this.createConnector('connector08', '5,5', 'ellipse5', 'Colorellipse2', '#A52A2A' ),
        this.createConnector('connector09', '5,5', 'Person', 'ellipse6', '#A52A2A' ),
        this.createConnector('connector10', '5,5', 'ellipse6', 'ellipse7', '#A52A2A' ),
        this.createConnector('connector11', '5,5', 'ellipse7', 'ellipse8', '#A52A2A' ),
        this.createConnector('connector12', '5,5', 'ellipse8', 'ellipse9', '#A52A2A' ),
        this.createConnector('connector13', '5,5', 'ellipse9', 'Colorellipse1', '#A52A2A' ),
        this.createConnector('connector14', '5,5', 'Materials', 'ellipse15', '#A52A2A' ),
        this.createConnector('connector15', '5,5', 'ellipse15', 'ellipse10', '#A52A2A' ),
        this.createConnector('connector16', '5,5', 'ellipse10', 'Colorellipse3', '#A52A2A' ),
        this.createConnector('connector17', '5,5', 'Machine', 'ellipse13', '#A52A2A' ),
        this.createConnector('connector18', '5,5', 'ellipse13', 'ellipse14', '#A52A2A' ),
        this.createConnector('connector19', '5,5', 'ellipse14', 'Colorellipse2', '#A52A2A' ),
        this.createConnector('connector20', '5,5', 'Methods', 'ellipse11', '#A52A2A' ),
        this.createConnector('connector21', '5,5', 'ellipse11', 'ellipse12', '#A52A2A' ),
        this.createConnector('connector22', '5,5', 'ellipse12', 'Colorellipse1', '#A52A2A' ),
        this.createConnector('connector23', '', 'Colorellipse4', 'Colorellipse3', '#000000' ),
        this.createConnector('connector24', '', 'Colorellipse3', 'Colorellipse2', '#000000' ),
        this.createConnector('connector25', '', 'Colorellipse2', 'Colorellipse1', '#000000' ),
        this.createConnector('connector26', '', 'Colorellipse1', 'Colorellipse5', '#000000' ),
        this.createConnector('connector27', '5,5', 'TextPrograms', 'ellipse1', '#A52A2A' ),
        this.createConnector('connector28', '5,5', 'DataBooks', 'ellipse2', '#A52A2A' ),
        this.createConnector('connector29', '5,5', 'Fixtures', 'ellipse3', '#A52A2A' ),
        this.createConnector('connector30', '5,5', 'VentilatorsSound', 'ellipse4', '#A52A2A' ),
        this.createConnector('connector31', '5,5', 'Noise', 'ellipse5', '#A52A2A' ),
        this.createConnector('connector32', '5,5', 'Education', 'ellipse6', '#A52A2A' ),
        this.createConnector('connector33', '5,5', 'Motivation', 'ellipse7', '#A52A2A' ),
        this.createConnector('connector34', '5,5', 'Tiredness', 'ellipse8', '#A52A2A' ),
        this.createConnector('connector35', '5,5', 'Storer', 'ellipse9', '#A52A2A' ),
        this.createConnector('connector36', '5,5', 'Software', 'ellipse15', '#A52A2A' ),
        this.createConnector('connector37', '5,5', 'Computer', 'ellipse10', '#A52A2A' ),
        this.createConnector('connector38', '5,5', 'Procurement', 'ellipse13', '#A52A2A' ),
        this.createConnector('connector39', '5,5', 'Quality', 'ellipse14', '#A52A2A' ),
        this.createConnector('connector40', '5,5', 'Order', 'ellipse12', '#A52A2A'),
        this.createConnector('connector41', '5,5', 'Standardization', 'ellipse11', '#A52A2A')
    ];


    // Function to define defaults for connectors
    public getConnectorDefaults(connector: ConnectorModel): void {
        connector.targetDecorator = { shape: 'Arrow', width: 5, height: 5 } as DecoratorModel;
        // Condition to set target decorator style based on connector ID
        if (connector.id !== 'connector23' && connector.id !== 'connector24' &&
        connector.id !== 'connector25' && connector.id !== 'connector26') {
            connector.targetDecorator.style = { strokeColor: '#A52A2A', fill: '#A52A2A' };
        }
    }
}