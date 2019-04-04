import { Component, ViewEncapsulation } from '@angular/core';
import { DataManager } from '@syncfusion/ej2-data';
import {
    Diagram, NodeModel, ConnectorModel, PointPortModel, DiagramTools,
    DataBinding, HierarchicalTree, SnapConstraints, SnapSettingsModel, ShapeAnnotationModel
} from '@syncfusion/ej2-angular-diagrams';
import * as Data from './diagram-data.json';

export interface DataInfo {
    [key: string]: string;
}
Diagram.Inject(DataBinding, HierarchicalTree);

/**
 * Sample for RTL Tree
 */
@Component({
    selector: 'control-content',
    templateUrl: 'right-to-left-tree.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class RTLTreeDiagramComponent {

    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    public data: Object = {
        id: 'Name', parentId: 'Category',
        dataManager: new DataManager((Data as any).artificialIntelligence),
        doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
            let nameKey: string = 'Name';
            nodeModel.annotations = [{ content: data[nameKey] }];
        }
    };
    public layout: Object = {
        type: 'HierarchicalTree', orientation: 'RightToLeft',
        verticalAlignment: 'Center', horizontalAlignment: 'Center', verticalSpacing: 100,
        horizontalSpacing: -10
    };

    public getNodeDefaults: Function = this.nodeDefaults.bind(this);
    public getConnectorDefaults: Function = this.connDefaults.bind(this);

    private nodeDefaults(obj: NodeModel): NodeModel {
        obj.width = 120;
        obj.style = { fill: '#034d6d', strokeWidth: 1 };
        let key: string = 'branch';
        //Initialize shape
        if ((obj.data as DataInfo)[key] === 'root') {
            obj.shape = { type: 'Basic', shape: 'Ellipse' };
            obj.height = 120;
        } else {
            obj.shape = {
                type: 'Native',
                content: '<svg width="120" height="61"><g><line x1="0" x2="120" y1="60" y2="60" stroke-width="1" stroke= "black"></line>'
                    + '<rect x="0" y="0" width="120" height="60" fill="transparent" stroke="none"></rect></g></svg>'
            };
            obj.style.strokeWidth = 0;
            obj.height = 60;
        }
        //Set ports and annotations
        obj.ports = this.getPorts((obj.data as DataInfo)[key] === 'root');
        let annotation: ShapeAnnotationModel = obj.annotations[0];
        if ((obj.data as DataInfo)[key] !== 'root') {
            annotation.offset = { y: 1 };
            annotation.verticalAlignment = 'Bottom';
            annotation.margin = { bottom: 10 };
        } else {
            annotation.style = { color: 'white' };
        }
        return obj;
    };

    public connDefaults(connector: ConnectorModel): ConnectorModel {
        connector.sourcePortID = 'port1';
        connector.type = 'Bezier';
        connector.targetPortID = 'port2';
        connector.targetDecorator = { shape: 'None' };
        return connector;
    };

    private getPorts(root: boolean): PointPortModel[] {
        let ports: PointPortModel[] = [
            {
                id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 }, horizontalAlignment: 'Left',
                verticalAlignment: 'Bottom', margin: { right: -2, bottom: -5.5 }
            },
            {
                id: 'port2', shape: 'Circle', offset: { x: 1, y: 0.99 }, horizontalAlignment: 'Right',
                verticalAlignment: 'Bottom', margin: { right: -2, bottom: -5.5 }
            }
        ];
        if (!root) {
            ports[0].offset.y = 1;
        } else {
            ports[0].verticalAlignment = 'Center';
            ports[0].horizontalAlignment = 'Center';
        }
        return ports;
    }

}

