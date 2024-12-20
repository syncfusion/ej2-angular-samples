import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, SymbolPaletteModule, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    Diagram, NodeModel, UndoRedo, ConnectorModel,
    SymbolInfo, IDragEnterEventArgs, IDragLeaveEventArgs,
    PaletteModel,
    IDragOverEventArgs, IClickEventArgs, IHistoryChangeArgs, IDoubleClickEventArgs,
    ITextEditEventArgs, IScrollChangeEventArgs, ISelectionChangeEventArgs, ISizeChangeEventArgs,
    IConnectionChangeEventArgs, IEndChangeEventArgs, IPropertyChangeEventArgs, IDraggingEventArgs, IRotationEventArgs,
    ICollectionChangeEventArgs,
    IMouseEventArgs, DiagramContextMenu, Snapping, SnapConstraints, SnapSettingsModel, ContextMenuSettingsModel, MarginModel,
    DiagramBeforeMenuOpenEventArgs,
    NodeConstraints
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { ListView } from '@syncfusion/ej2-lists';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { SBActionDescriptionComponent } from '../common/adp.component';
// Inject required modules and services into the Diagram component
Diagram.Inject(UndoRedo, DiagramContextMenu, Snapping);

/**
 * Sample for events
 */

@Component({
    selector: 'control-content',
    templateUrl: 'diagram-events.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SymbolPaletteModule, DiagramModule, ListViewModule, ButtonModule, SBDescriptionComponent]
})
export class EventsDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    // Symbol default settings
    public getSymbolDefaults(symbol: NodeModel): void {
        symbol.width = 50;
        symbol.height = 50;
        symbol.constraints = NodeConstraints.Default | NodeConstraints.AllowDrop;
        symbol.style.strokeColor = '#757575';
    }
    // connector default settings
    public getConnectorDefaults(symbol: ConnectorModel): void {
        symbol.style = { strokeWidth: 1 , strokeColor: '#757575' };
    }
    // Snap settings for the diagram
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    // Margin for symbols in the symbol palette
    public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };
     // Expand mode for the symbol palette
    public expandMode: ExpandMode = 'Multiple';
    // Symbol fit information for the symbol palette
    public getSymbolInfo(symbol: NodeModel): SymbolInfo {
        return { fit: true };
    }
    // Event handlers for various diagram events
    public dragEnter(args: IDragEnterEventArgs): void {
        this.getEventDetails(args);
    }

    public dragLeave(args: IDragLeaveEventArgs): void {
        this.getEventDetails(args);
    }

    public dragOver(args: IDragOverEventArgs): void {
        if (args.target) {
            this.getEventDetails(args);
        }
    }

    public click(args: IClickEventArgs): void {
        this.getEventDetails(args);
    }

    public historyChange(args: IHistoryChangeArgs): void {
        this.getEventDetails(args);
    }

    public doubleClick(args: IDoubleClickEventArgs): void {
        this.getEventDetails(args);
    }

    public textEdit(args: ITextEditEventArgs): void {
        this.getEventDetails(args);
    }

    public scrollChange(args: IScrollChangeEventArgs): void {
        this.getEventDetails(args);
    }

    public selectionChange(args: ISelectionChangeEventArgs): void {
        if (args.state === 'Changed') {
            this.getEventDetails(args);
        }
    }

    public sizeChange(args: ISizeChangeEventArgs): void {
        if (args.state === 'Completed') {
            this.getEventDetails(args);
        }
    }

    public connectionChange(args: IConnectionChangeEventArgs): void {
        if (args.state === 'Changed') {
            this.getEventDetails(args);
        }
    }

    public sourcePointChange(args: IEndChangeEventArgs): void {
        if (args.state === 'Completed') {
            this.getEventDetails(args);
        }
    }

    public targetPointChange(args: IEndChangeEventArgs): void {
        if (args.state === 'Completed') {
            this.getEventDetails(args);
        }
    }

    public propertyChange(args: IPropertyChangeEventArgs): void {
        this.getEventDetails(args);
    }

    public positionChange(args: IDraggingEventArgs): void {
        if (args.state === 'Completed') {
            this.getEventDetails(args);
        }
    }

    public rotateChange(args: IRotationEventArgs): void {
        if (args.state === 'Completed') {
            this.getEventDetails(args);
        }
    }

    public collectionChange(args: ICollectionChangeEventArgs): void {
        if (args.state === 'Changed') {
            this.getEventDetails(args);
        }
    }

    public mouseEnter(args: IMouseEventArgs): void {
        this.getEventDetails(args);
    }

    public mouseLeave(args: IMouseEventArgs): void {
        this.getEventDetails(args);
    }

    public mouseOver(args: IMouseEventArgs): void {
        this.getEventDetails(args);
    }

    public contextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void {
        this.getEventDetails(args);
    }

    public contextMenuBeforeItemRender(args: MenuEventArgs): void {
        this.getEventDetails(args);
    }

    public contextMenuClick(args: MenuEventArgs): void {
        this.getEventDetails(args);
    }
      // Data for the ListView used to display event names and checkboxes
    public data: { [key: string]: Object }[] = [
        { text: 'Drag enter', id: 'dragEnter' },
        { text: 'Drag leave', id: 'dragLeave' },
        { text: 'Drag over', id: 'dragOver' },
        { text: 'Click', id: 'click', isChecked: true },
        { text: 'History change', id: 'historyChange', isChecked: true },
        { text: 'Double click', id: 'doubleClick' },
        { text: 'Text edit', id: 'textEdit', isChecked: true },
        { text: 'Scroll change', id: 'scrollChange' },
        { text: 'Selection change', id: 'selectionChange', isChecked: true },
        { text: 'Size change', id: 'sizeChange', isChecked: true },
        { text: 'Connection change', id: 'connectionChange', isChecked: true },
        { text: 'SourcePoint change', id: 'sourcePointChange' },
        { text: 'TargetPoint change', id: 'targetPointChange' },
        { text: 'Position change', id: 'positionChange', isChecked: true },
        { text: 'Rotate change', id: 'rotateChange', isChecked: true },
        { text: 'Collection change', id: 'collectionChange', isChecked: true },
        { text: 'Mouse enter', id: 'mouseEnter' },
        { text: 'Mouse leave', id: 'mouseLeave' },
        { text: 'Mouse over', id: 'mouseOver' },
        { text: 'Context menu open', id: 'contextMenuOpen' },
        { text: 'Context menu before item render', id: 'contextMenuBeforeItemRender' },
        { text: 'Context menu click', id: 'contextMenuClick' }
    ];

    //Initialize the basicshapes for the symbol palatte
    public basicShapes: NodeModel[] = [
        { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
        { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
        { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
        { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
        { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
        { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
        { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' } },
        { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' } },
        { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' } },
        { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' } },
        { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' } },
        { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' } },
        { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' } },
        { id: 'Diamond', shape: { type: 'Basic', shape: 'Diamond' } },
        { id: 'Star', shape: { type: 'Basic', shape: 'Star' } }
    ];

    //Initializes connector symbols for the symbol palette
    public connectorSymbols: ConnectorModel[] = [
        {
            id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} }
        },
        {
            id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            targetDecorator: { shape: 'None' }
        },
        {
            id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} }
        },
        {
            id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            targetDecorator: { shape: 'None' }
        },
        {
            id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            targetDecorator: { shape: 'None' }
        },
    ];
    // Palettes for the symbol palette
    public palettes: PaletteModel[] = [
        { id: 'basic', expanded: true, symbols: this.basicShapes, iconCss: 'e-ddb-icons e-basic', title: 'Basic Shapes' },
        { id: 'connectors', expanded: true, symbols: this.connectorSymbols, iconCss: 'e-ddb-icons e-diagram-connector', title: 'Connectors' }
    ];
    // Context menu settings for the diagram
    public contextMenu: ContextMenuSettingsModel = {
        show: true,
    }
    // Function to get event details based on selected items
    public getEventDetails(args: any): void {
        let listView: any = document.getElementById('listview-def');
        if (listView && listView.ej2_instances) {
            let listViewComponent: ListView = listView.ej2_instances[0];
            let selectedItems: any = listViewComponent.getSelectedItems();
            if (selectedItems.data.length > 0) {
                let elementName: boolean = this.getName(selectedItems, args);
                if (elementName) {
                    this.eventInformation(args);
                }
            }
        }
    }
    // Function to check if the event name matches any selected item
    public getName(selectedItems: any, args: any): boolean {
        for (let i: number = 0; i < selectedItems.data.length; i++) {
            let eventName: string = selectedItems.data[i].id;
            if (eventName === args.name) {
                return true;
            }
        }
        return false;
    }
    public created() {
        this.clearEventLog();

    }
    // Method to clear the event log
    public clearEventLog(): void {
        let data: HTMLElement = document.getElementById('EventLog');
        data.innerHTML = '';
    }
    // Function to display event information in the event log
    public eventInformation(args: any): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = 'Diagram ' + args.name.bold() + ' event called' + '<hr>';
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }

    onClick = (args: MouseEvent) => {
        let data: HTMLElement = document.getElementById('EventLog');
        for (let i: number = data.childNodes.length - 1; i >= 0; i--) {
            data.removeChild(data.childNodes[i]);
        }
    }
}