import { Component, ViewEncapsulation } from '@angular/core';
import {
    Diagram, NodeModel, ConnectorModel, SnapConstraints,
    DataBinding, HierarchicalTree, DiagramTools,SnapSettingsModel
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(DataBinding, HierarchicalTree);

export interface DataInfo {
    [key: string]: string;
}

/**
 * Remote Data binding sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})
export class RemoteDataDiagramComponent {
    // Default settings for nodes
    public nodeDefaults(node: NodeModel): NodeModel {
        node.width = 80;
        node.height = 40;
        //Initialize shape
        node.shape = { type: 'Basic', shape: 'Rectangle' };
        node.style = { fill: '#048785', strokeColor: 'Transparent' };
        return node;
    };
    // Data source and binding configuration
    public data: Object = {
        id: 'Id', parentId: 'ParentId',
        dataSource: new DataManager(
            { url: 'https://services.syncfusion.com/angular/production/api/RemoteData', crossDomain: true },
        ),
        //binds the external data with node
        doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
            nodeModel.annotations = [{
                /* tslint:disable:no-string-literal */
                content: data['Label'],
                style: { color: 'white' }
            }];
        }
    };
    // Default settings for connectors
    public connDefaults(connector: ConnectorModel): void {
        connector.type = 'Orthogonal';
        connector.style.strokeColor = '#048785';
        connector.targetDecorator.shape = 'None';
    };
    // Enable zoom and pan tools for the diagram
    public tool: DiagramTools = DiagramTools.ZoomPan;
    // Disable all snap constraints by default
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    // Configure the layout settings for the diagram
    public layout: Object = {
        type: 'HierarchicalTree', margin: { left: 0, right: 0, top: 100, bottom: 0 },
        verticalSpacing: 40,
    };
}
