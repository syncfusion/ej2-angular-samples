import { Connector, ConnectorModel, DiagramComponent, NodeModel, Node, NodeConstraints, randomId, UserHandleModel, Side, MarginModel, HorizontalAlignment, VerticalAlignment, DiagramTools, IExportOptions, FileFormats, SnapConstraints } from "@syncfusion/ej2-angular-diagrams";
import { ClickEventArgs, MenuEventArgs } from "@syncfusion/ej2-angular-navigations";
import { DropDownButtonComponent } from "@syncfusion/ej2-angular-splitbuttons";
import { BasicShapeModel, ISelectionChangeEventArgs, PointPort, UserHandleEventsArgs, ConnectorConstraints } from "@syncfusion/ej2-angular-diagrams";

//Sets the default values of a connector
export function getConnectorDefaults(connector: Connector): ConnectorModel {
    let diagram: DiagramComponent = (document.querySelector('#diagram') as any).ej2_instances[0];
    let currentBranch = 'Left'
    connector.type = 'Bezier';
    connector.targetDecorator = { shape: 'None' };
    connector.bezierSettings.allowSegmentsReset = false;
    connector.segments = [{ type: 'Bezier' }];
    var sourceNode: any = diagram.getObject(connector.sourceID);
    var targetNode: any = diagram.getObject(connector.targetID);
  
    if (!sourceNode.data) {
        sourceNode.data = {};
        sourceNode.data.id = sourceNode.id;
        sourceNode.data.branch = 'Root';
        sourceNode.data.orientation = 'Root';
        sourceNode.data.level = 0;
        sourceNode.data.parentId = '';
        sourceNode.data.Label = sourceNode.annotations[0].content;
        sourceNode.addInfo = sourceNode.data;
        let nodeData: any = getMindMapShape(sourceNode);
        sourceNode.data.fill = nodeData.node.style.fill;
        sourceNode.data.strokeColor = nodeData.node.style.strokeColor;
        sourceNode.addInfo = sourceNode.data;
        sourceNode.style.fill = sourceNode.data.fill;
        sourceNode.style.strokeColor = sourceNode.data.strokeColor;
    }
    if (!targetNode.data) {
        targetNode.data = {};
        targetNode.data.id = targetNode.id;
        targetNode.data.branch = sourceNode.data.branch === 'Root'
            ? currentBranch
            : (sourceNode.data.branch === 'Left' || sourceNode.data.branch === 'subLeft' || sourceNode.data.branch === 'SubLeft' ? 'subLeft' : 'subRight');
  
        targetNode.data.orientation = targetNode.data.branch === 'Left' || targetNode.data.branch === 'subLeft' ? 'Left' : 'Right';
        targetNode.data.level = sourceNode.data.level + 1;
        targetNode.data.parentId = sourceNode.data.id;
        targetNode.data.Label = targetNode.annotations[0].content;
        targetNode.addInfo = targetNode.data;
        let nodeData: any = getMindMapShape(sourceNode);
        targetNode.data.fill = nodeData.node.style.fill;
        targetNode.data.strokeColor = nodeData.node.style.strokeColor;
        targetNode.addInfo = targetNode.data;
        targetNode.style.fill = targetNode.data.fill;
        targetNode.style.strokeColor = targetNode.data.strokeColor;
        currentBranch = sourceNode.data.branch === 'Root' ? currentBranch === 'Left' ? 'Right' : 'Left' : currentBranch;
    }
    if (targetNode.data && (targetNode.data.branch === 'Right' || targetNode.data.branch === 'subRight' || targetNode.data.branch === 'SubRight')) {
        connector.sourcePortID = sourceNode.ports[0].id;
        connector.targetPortID = targetNode.ports[1].id;
        connector.style = { strokeWidth: 1, strokeColor: '#8c8c8c' };
    }
    else if (targetNode.data && (targetNode.data.branch === 'Left' || targetNode.data.branch === 'subLeft' || targetNode.data.branch === 'SubLeft')) {
        connector.sourcePortID = sourceNode.ports[1].id;
        connector.targetPortID = targetNode.ports[0].id;
        connector.style = { strokeWidth: 1, strokeColor: '#8c8c8c' };
    }
    connector.constraints &= ~ConnectorConstraints.Select;
    return connector;
  }

  let lastFillIndex = 0;
let fillColorCode = ['#C4F2E8', '#F7E0B3', '#E5FEE4', '#E9D4F1', '#D4EFED', '#DEE2FF'];
let borderColorCode = ['#8BC1B7', '#E2C180', '#ACCBAA', '#D1AFDF', '#90C8C2', '#BBBFD6'];

  export function getMindMapShape(parentNode: NodeModel) {
    var sss = {};
    var node = {};
    var connector: ConnectorModel = {};
    var addInfo = parentNode.addInfo;
    node = {
        minWidth: 100, maxWidth: 100, shape: { type: 'Basic', shape: 'Rectangle' },
        annotations: [{ content: '' }],
        style: { fill: '#000000', strokeColor: '#000000' },
        addInfo: { level: (addInfo as any).level + 1 },
        offsetX: 200, offsetY: 200
    };
    connector = { type: 'Bezier', style: { strokeColor: '#000000' } };
    if ((addInfo as any).level < 1) {
        (node as Node).style.fill = fillColorCode[lastFillIndex];
        (node as Node).style.strokeColor = borderColorCode[lastFillIndex];
        ;
        if (lastFillIndex + 1 >= fillColorCode.length) {
          lastFillIndex = 0;
        }
        else {
          lastFillIndex++;
        }
    }
    else {
        (node as Node).style.strokeColor = (node as Node).style.fill = (parentNode as Node).style.fill;
    }
    connector.type = 'Bezier';
    (connector as Connector).style.strokeColor = (node as Node).style.fill;
    connector.targetDecorator = { shape: 'None' };
    (node as Node).constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
    (node as Node).ports = [
        { id: 'leftPort', offset: { x: 0, y: 0.5 } },
        { id: 'rightPort', offset: { x: 1, y: 0.5 } },
        { id: 'topPort', offset: { x: 0.5, y: 0 } },
        { id: 'bottomPort', offset: { x: 0.5, y: 1 } }];
    (sss as any).node = node;
    (sss as any).connector = connector;
    return sss;
  }