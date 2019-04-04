import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    Diagram, ConnectorModel, Node, DataBinding, NodeConstraints, HierarchicalTree, randomId, NodeModel, Connector,
    ISelectionChangeEventArgs, IEndChangeEventArgs, SnapConstraints, SnapSettingsModel, TextBounds
} from '@syncfusion/ej2-diagrams';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ChangeEventArgs, DropDownList } from '@syncfusion/ej2-dropdowns';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';
import { TextBox } from '@syncfusion/ej2-inputs';

Diagram.Inject(DataBinding, HierarchicalTree);
/**
 * Sample for serialization
 */
@Component({
    selector: 'control-content',
    templateUrl: 'crud.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})

export class CRUDDiagramComponent {

    public fields: Object = { text: 'Label', value: 'Name' };
    public dlgButtons: Object[] = [{ click: this.dlgButtonClick.bind(this), buttonModel: { content: 'Update', isPrimary: true } }];
    public nodeData: { [key: string]: Object; }[] = [];
    public sourceID: string;
    public targetID: string;

    @ViewChild('diagram')
    public diagram: DiagramComponent;

    @ViewChild('dialog')
    public dialog: DialogComponent;

    @ViewChild('toolbar')
    public toolbar: ToolbarComponent;

    @ViewChild('SourceId')
    public sourceDropDown: DropDownList;

    @ViewChild('TargetId')
    public targetDropDown: DropDownList;

    @ViewChild('Description1')
    public description: TextBox;

    @ViewChild('Color')
    public color: TextBox;

    public layout: Object = {
        type: 'HierarchicalTree', verticalSpacing: 40
    };

    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    public data: Object = {
      id: 'Name',
      // Define URL to perform CRUD operations with nodes records in database.
      crudAction: {
        read: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/GetNodes',
        create: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/AddNodes',
        update: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateNodes',
        destroy: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteNodes',
        customFields: ['Id', 'Description', 'Color']
      },
      connectionDataSource: {
        id: 'Name',
        sourceID: 'SourceNode',
        targetID: 'TargetNode',
        // Define URL to perform CRUD operations with connector records in database.
        crudAction: {
          read: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/GetConnectors',
          create: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/AddConnectors',
          update: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateConnectors',
          destroy: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteConnectors',
          customFields: ['Id']
        }
      }
    };
    // Set connector default properties.
    public getConnectorDefaults(connector: ConnectorModel, diagram: Diagram): ConnectorModel {
        connector.type = 'Orthogonal';
        connector.style.fill = '#707070';
        connector.style.strokeColor = '#707070';
        connector.targetDecorator = {
            style: {
                strokeColor: '#707070',
                fill: '#707070'
            },
        };
        return connector;
    }

    // Set node default properties.
    public getNodeDefaults(obj: Node, diagram: Diagram): NodeModel {
        obj.width = 100;
        obj.height = 50;
        obj.shape = { type: 'Basic', shape: 'Rectangle' };
        obj.style = { strokeWidth: 1, strokeColor: '#DDDDDD' };
        return obj;
    }

    // custom code start
    public dlgButtonClick(evt: Event): void {
        let dialogHeader: string = this.dialog.header;
        let description: string = this.description.value;
        let color: string = this.color.value;
        let selectedItem: NodeModel | ConnectorModel;
        if (this.diagram.selectedItems.nodes.length > 0) {
            selectedItem = this.diagram.selectedItems.nodes[0];
        }
        if (this.diagram.selectedItems.connectors.length > 0) {
            selectedItem = this.diagram.selectedItems.connectors[0];
        }
        if (dialogHeader === 'Add') {
            let node: NodeModel | DataInfo = {
                id: 'node' + randomId(),
                style: { fill: color }, Description: description, Color: color, Id: Math.floor((Math.random() * 1000) + 100),
            };
            let connector: ConnectorModel | DataInfo = {
                id: 'connector' + randomId(),
                sourceID: selectedItem.id, targetID: (node as Node).id, Id: Math.floor((Math.random() * 1000) + 100),
            };
            this.diagram.add(node as NodeModel);
            this.diagram.add(connector as ConnectorModel);
            this.diagram.doLayout();
            // Insert newly added elements into the database.
            this.diagram.insertData();
            this.nodeData.push({ Name: (node as Node).id, Label: description });
            this.sourceDropDown.dataSource = this.getDataSource();
            this.sourceDropDown.dataBind();
            this.targetDropDown.dataSource = this.getDataSource();
            this.targetDropDown.dataBind();
        } else {
            if (selectedItem instanceof Connector) {
                // Update sourceNode and targetNode at runtime.
                selectedItem.sourceID = this.sourceID ? this.sourceID : selectedItem.sourceID;
                selectedItem.targetID = this.targetID ? this.targetID : selectedItem.targetID;
                this.diagram.dataBind();
                this.diagram.doLayout();
            } else {
                // update an node text and node bgColor.
                (selectedItem as DataInfo).Description = description;
                (selectedItem as DataInfo).Color = color;
                selectedItem.annotations[0].content = description;
                selectedItem.style.fill = color;
                this.diagram.dataBind();
            }
            this.diagram.updateData();
        }
        this.dialog.hide();
    }

    public toolbarCreate(args: Event): void {
        this.enableToolbarItems(false);
    }

    // Set an sourceId of an selected Connector.
    public sourceDropdownChange(args: ChangeEventArgs): void {
        this.sourceID = args.value as string;
    }

    // Set an targetId of an selected Connector.
    public targetDropdownChange(args: ChangeEventArgs): void {
        this.targetID = args.value as string;
    }

    // Displays nodes name in dropdown.
    public sourceDropdownCreate(args: Event): void {
        this.sourceDropDown.dataSource = this.getDataSource();
        this.sourceDropDown.dataBind();
    }

    // Displays nodes name in dropdown.
    public targetDropdownCreate(args: Event): void {
        this.targetDropDown.dataSource = this.getDataSource();
        this.targetDropDown.dataBind();
    }
    // custom code end

    // Disable or Enable the toolbar items based on element selection.
    public selectionChange(args: ISelectionChangeEventArgs): void {
        if (args.state === 'Changing') {
            if (args.newValue.length > 0) {
                if (args.newValue[0] instanceof Node) {
                    this.enableToolbarItems(true);
                } else {
                    this.toolbar.enableItems(document.getElementById(this.toolbar.items[0].id).parentElement, false);
                    this.toolbar.enableItems(document.getElementById(this.toolbar.items[2].id).parentElement, true);
                    this.toolbar.enableItems(document.getElementById(this.toolbar.items[4].id).parentElement, false);
                }
            } else {
                this.enableToolbarItems(false);
            }
        }
    }

    // custom code start
    // Enable or disable the toolbar items.
    public enableToolbarItems(isEnableItem: boolean): void {
        this.toolbar.enableItems(document.getElementById(this.toolbar.items[0].id).parentElement, isEnableItem);
        this.toolbar.enableItems(document.getElementById(this.toolbar.items[2].id).parentElement, isEnableItem);
        this.toolbar.enableItems(document.getElementById(this.toolbar.items[4].id).parentElement, isEnableItem);
    }
    // custom code end

    public connectionChange(args: IEndChangeEventArgs): void {
        if (args.state === 'Completed') {
            if (!args.connector.targetID || !args.connector.sourceID) {
                args.cancel = true;
            }
        }
    }

    // Set an label for each node.
    public setNodeTemplate(obj: NodeModel): void {
        obj.annotations = [{ style: { color: 'black' } }];
        obj.annotations[0].content = (obj as DataInfo).Description;
        obj.style = { fill: (obj as DataInfo).Color };
        if ((obj as DataInfo).Id === 1) {
            // Restrict Delete Constraints for root node.
            obj.constraints = NodeConstraints.Default & ~NodeConstraints.Delete;
        }
    }

    // custom code start
    // Opens a dialog with textbox and dropdown control based on toolbar clicked items.
    public toolbarClick(args: ClickEventArgs): void {
        let selectedItem: NodeModel | ConnectorModel;
        if (this.diagram.selectedItems.nodes.length > 0) {
            selectedItem = this.diagram.selectedItems.nodes[0];
        }
        if (this.diagram.selectedItems.connectors.length > 0) {
            selectedItem = this.diagram.selectedItems.connectors[0];
        }
        if (selectedItem) {
            switch (args.item.tooltipText) {
                case 'Add':
                    this.openDialog('Add', '', '', true);
                    break;
                case 'Edit':
                    if (selectedItem instanceof Connector) {
                        let sourceNode: NodeModel = this.diagram.getObject(selectedItem.sourceID);
                        let targetNode: NodeModel = this.diagram.getObject(selectedItem.targetID);
                        this.openDialog('Edit', sourceNode.id, targetNode.id, false);
                    } else {
                        this.openDialog('Edit', (selectedItem as DataInfo).Description, (selectedItem as DataInfo).Color, true);
                    }
                    break;
                case 'Delete':
                    this.diagram.remove(selectedItem);
                    this.diagram.doLayout();
                    // Delete an selected items from database.
                    this.diagram.removeData();
                    let element: object = { Name: selectedItem.id, Label: (selectedItem as DataInfo).Description };
                    let index: number = this.nodeData.indexOf(element as { [key: string]: Object; });
                    this.nodeData.splice(index, 1);
                    this.sourceDropDown.dataSource = this.getDataSource();
                    this.sourceDropDown.dataBind();
                    this.targetDropDown.dataSource = this.getDataSource();
                    this.targetDropDown.dataBind();
            }
        }
    }

    public openDialog(title: string, description: string, color: string, isNode: boolean): void {
        this.dialog.header = title;
        if (isNode) {
            this.hideClassElement('.showDropdown', 'none');
            this.hideClassElement('.showLabel', 'block');
            this.description.value = description;
            this.color.value = color;
        } else {
            this.hideClassElement('.showDropdown', 'block');
            this.hideClassElement('.showLabel', 'none');
             this.sourceDropDown.value = description;
            this.targetDropDown.value = color;
        }
        this.dialog.show();
    }

    // Show or Hide the Textbox and Dropdown in dialog control
    public hideClassElement(className: string, display: string): void {
        let i: number;
        let showDropdown: NodeListOf<HTMLElement> = document.querySelectorAll(className);
        for (i = 0; i < showDropdown.length; i++) {
            showDropdown[i].style.display = display;
        }
    }
    // custom code end

    // Returns an node text collection in diagram.
    public getDataSource(): { [key: string]: Object; }[] {
        let i: number;
        this.nodeData = [];
        for (i = 0; i < this.diagram.nodes.length; i++) {
            let node: NodeModel = this.diagram.nodes[i];
            let element: object = { Name: node.id, Label: (node as DataInfo).Description };
            this.nodeData.push(element as { [key: string]: Object; });
        }
        return this.nodeData;
    }
}
interface DataInfo {
    Description: string;
    Color: string;
    Id: number;
}