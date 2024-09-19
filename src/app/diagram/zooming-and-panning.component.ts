/**
 * Sample for Zoom and Pan.
 */

// Importing needed dependencies for diagram
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NodeModel, DiagramTools, ScrollSettingsModel, LayoutModel, Diagram, ConnectorModel,
    SnapConstraints, SnapSettingsModel,Container, TextElement, StackPanel, ImageElement, DataBinding,
    HierarchicalTree, TreeInfo,UndoRedo } from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { data } from './overview-data';
import { DiagramComponent, DiagramModule, ISelectionChangeEventArgs,Node } from '@syncfusion/ej2-angular-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { ToolbarComponent, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(UndoRedo, DataBinding, HierarchicalTree);


/**
 * Component for displaying a Zoom and Pan sample.
 * Manages the presentation and behavior of the diagram using Syncfusion's Angular Diagram component.
 */
@Component({
    selector: 'control-content', // Angular component selector
    templateUrl: 'zooming-and-panning.html', // HTML template file for the component
    styleUrls: ['zooming-and-panning.component.css'],  // CSS styles specific to the component
    encapsulation: ViewEncapsulation.None, // No view encapsulation
    standalone: true,  // Indicates it's a standalone component
    imports: [SBActionDescriptionComponent, ToolbarModule, DiagramModule, SBDescriptionComponent]  // Importing necessary Angular modules and components
})

/**
 * Represents a diagram component of zoom and pan.
 */
export class ZoomingAndPanning {
  // Reference to the diagram component
  @ViewChild('diagram')
  public diagram: DiagramComponent;

  // Reference to the toolbar component
  @ViewChild('toolbar')
  public toolbar: ToolbarComponent;

    //Sets the parent and child relationship of DataSource.
    public data: Object = {
        id: 'Id', parentId: 'ReportingPerson', dataSource: new DataManager(data)
    };

    //Configration for hierarchical tree layout
    public layout: LayoutModel = {
        type: 'OrganizationalChart', margin: { top: 20 },
        getLayoutInfo: (node: Node, tree: TreeInfo) => {
            if (!tree.hasSubTree) {
                tree.orientation = 'Vertical';
                tree.type = 'Right';
            }
        }
    };

    //Sets the default values of Node
    public nodeDefaults(node: NodeModel): NodeModel {
        node.height = 50;
        node.style = { fill: 'transparent', strokeWidth: 2 };
        return node;
    };

    //Sets the default values of Connector
    public connectorDefaults(connector: ConnectorModel): ConnectorModel {
        connector.targetDecorator.shape = 'None';
        connector.type = 'Orthogonal';
        connector.style.strokeColor = 'gray';
        return connector;
    };
        
    // Function to handle toolbar item clicks and perform corresponding actions
    public toolbarClick(args) {
        // Switch statement based on the tooltip text of the clicked toolbar item
        switch (args.item.tooltipText) {
            // Zoom in action
            case 'Zoom In':
                var zoomin: any = { type: 'ZoomIn', zoomFactor: 0.2 };
                this.diagram.zoomTo(zoomin);
                break;
            // Zoom Out action
            case 'Zoom Out':
                var zoomout: any = { type: 'ZoomOut', zoomFactor: 0.2 };
                this.diagram.zoomTo(zoomout);
                break;
            // Reset action
            case 'Reset':
                this.diagram.reset();
                break;
            // Pan tool action
            case 'Pan Tool':
                this.diagram.tool = DiagramTools.ZoomPan;
                break;
            // Pointer action
            case 'Pointer':
                this.diagram.clearSelection();
                this.diagram.drawingObject = {};
                this.diagram.tool = DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
                break;
            // Fit to page action
            case 'Fit To Page':
                this.diagram.fitToPage();
                break;
            // Bring selected node into view action
            case 'Bring Into View':
                if (this.diagram.selectedItems.nodes.length > 0) {
                    var bound = this.diagram.selectedItems.nodes[0].wrapper.bounds;
                    this.diagram.bringIntoView(bound);
                }
                break;
            // Bring selected node into center action
            case 'Bring Into Center':
                if (this.diagram.selectedItems.nodes.length > 0) {
                    var bounds = this.diagram.selectedItems.nodes[0].wrapper.bounds;
                    this.diagram.bringToCenter(bounds);
                }
                break;
        }
    }

    public tool: DiagramTools = DiagramTools.Default;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public scrollSettings: ScrollSettingsModel = { scrollLimit: 'Infinity' };

    //Funtion to add the Template of the Node.
    public setNodeTemplate(node: NodeModel): Container {
        
        // Create an outer StackPanel as content to contain image and text elements
        let content: StackPanel = new StackPanel();
        content.id = node.id + '_outerstack';
        content.orientation = 'Horizontal';
        content.style.strokeColor = 'gray';
        content.padding = { left: 5, right: 10, top: 5, bottom: 5 };
        
        // Create an image element to display employee image
        let image: ImageElement = new ImageElement();
        image.width = 50;
        image.height = 50;
        image.style.strokeColor = 'none';
        image.source = (node.data as EmployeeInfo).ImageUrl;
        image.id = node.id + '_pic';
        
        // Create an inner stack panel to organize text elements
        let innerStack: StackPanel = new StackPanel();
        innerStack.style.strokeColor = 'none';
        innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
        innerStack.id = node.id + '_innerstack';

        // Create a text element for displaying employee name
        let text: TextElement = new TextElement();
        text.content = (node.data as EmployeeInfo).Name;
        text.style.color = 'black';
        text.style.bold = true;
        text.style.strokeColor = 'none';
        text.horizontalAlignment = 'Left';
        text.style.fill = 'none';
        text.id = node.id + '_text1';

        // Create a TextElement for the node's designation
        let desigText: TextElement = new TextElement();
        desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
        desigText.content = (node.data as EmployeeInfo).Designation;
        desigText.style.color = 'black';
        desigText.style.strokeColor = 'none';
        desigText.style.fontSize = 12;
        desigText.style.fill = 'none';
        desigText.horizontalAlignment = 'Left';
        desigText.style.textWrapping = 'Wrap';
        desigText.id = node.id + '_desig';

        // Add text elements to the inner StackPanel
        innerStack.children = [text, desigText];

        // Add image element and inner StackPanel to the outer content
        content.children = [image, innerStack];

        return content;
    };

    //selectionChange method to enable/disable toolbar items 
    public selectionChange(args:ISelectionChangeEventArgs){
        if(args.state === 'Changed'){
            if(args.newValue && args.newValue[0] instanceof Node){
                this.toolbar.items.find(item=>item.id==='BringIntoView').disabled = false;
                this.toolbar.items.find(item=>item.id==='BringIntoCenter').disabled = false;
            }else{
                this.toolbar.items.find(item=>item.id==='BringIntoView').disabled = true;
                this.toolbar.items.find(item=>item.id==='BringIntoCenter').disabled = true;
            } 
        }
    }
}

// Define an interface to represent employee information
export interface EmployeeInfo {
    Name: string;
    Designation: string;
    ImageUrl: string;
}
