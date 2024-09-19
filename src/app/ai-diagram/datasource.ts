import { ConnectorModel, FlowShapes, NodeModel } from "@syncfusion/ej2-angular-diagrams";
import { ItemModel } from "@syncfusion/ej2-angular-navigations";

export const flowchartData = [
    { id: "A", name: "Start", shape: "Terminator", color: "#90EE90", parentId: null, stroke: "#333", strokeWidth: 1 },
    { id: "B", name: "Open the browser and go to Amazon site", shape: "Rectangle", color: "#1759B7", parentId: ["A"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "C", name: "Already a customer?", shape: "Decision", color: "#2F95D8", parentId: ["B"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "D", name: "Create an account", shape: "Rectangle", color: "#70AF16", parentId: ["C"], label: ["No"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "E", name: "Enter login information", shape: "Rectangle", color: "#70AF16", parentId: ["C"], label: ["Yes"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "F", name: "Search for the book in the search bar", shape: "Predefined Process", color: "#1759B7", parentId: ["E", "D"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "G", name: "Select the preferred book", shape: "Rectangle", color: "#1759B7", parentId: ["F"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "H", name: "Is the book new or used?", shape: "Rectangle", color: "#2F95D8", parentId: ["G"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "I", name: "Select the new book", shape: "Rectangle", color: "#70AF16", parentId: ["H"], label: ["Yes"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "J", name: "Select the used book", shape: "Rectangle", color: "#70AF16", parentId: ["H"], label: ["No"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "K", name: "Add to Cart & Proceed to Checkout", shape: "Rectangle", color: "#1759B7", parentId: ["I", "J"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "L", name: "Enter shipping and payment details", shape: "Rectangle", color: "#1759B7", parentId: ["K", "M"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "M", name: "Is the information correct?", shape: "Decision", color: "#2F95D8", parentId: ["L"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "N", name: "Review and place the order", shape: "Rectangle", color: "#1759B7", parentId: ["M"], label: ["True"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "O", name: "End", shape: "Terminator", color: "#8E44CC", parentId: ["N"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 }
];

export function toolbarItems() {
    let items: ItemModel[] = [
        { prefixIcon: 'e-icons e-circle-add', tooltipText: 'New Diagram' },
        { prefixIcon: 'e-icons e-folder-open', tooltipText: 'Open Diagram', },
        { prefixIcon: 'e-icons e-save', tooltipText: 'Save Diagram' },
        { prefixIcon: 'e-print e-icons', tooltipText: 'Print Diagram' },
        { type: 'Input', tooltipText: 'Export Diagram', template: '<button id="exportBtn" style="width:100%;"></button>' },
        { type: 'Separator' },
        { prefixIcon: 'e-pan e-icons', tooltipText: 'Pan Tool', cssClass: 'tb-item-start pan-item' },
        { prefixIcon: 'e-mouse-pointer e-icons', tooltipText: 'Select Tool', cssClass: 'tb-item-middle tb-item-selected' },
        { type: 'Separator' },
        {
            cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>', align: 'Right'
        },
    ];
    return items;
}
// To create flow shape
function getFlowShape(id: string, shapeType: FlowShapes): NodeModel {
    let flowshape: NodeModel = { id: id, shape: { type: 'Flow', shape: shapeType } };
    return flowshape;
}
//Initializes flow shapes for the symbol palette 
export const flowShapes: NodeModel[] = [
    getFlowShape('Terminator', 'Terminator'), getFlowShape('Process', 'Process'), getFlowShape('Decision', 'Decision'),
    getFlowShape('Document', 'Document'), getFlowShape('PreDefinedProcess', 'PreDefinedProcess'), getFlowShape('PaperTap', 'PaperTap'),
    getFlowShape('DirectData', 'DirectData'), getFlowShape('SequentialData', 'SequentialData'), getFlowShape('Sort', 'Sort'),
    getFlowShape('MultiDocument', 'MultiDocument'), getFlowShape('Collate', 'Collate'), getFlowShape('Or', 'Or'), getFlowShape('Extract', 'Extract'),
    getFlowShape('Merge', 'Merge'), getFlowShape('OffPageReference', 'OffPageReference'), getFlowShape('SequentialAccessStorage', 'SequentialAccessStorage'),
    getFlowShape('Annotation', 'Annotation'), getFlowShape('Annotation2', 'Annotation2'), getFlowShape('Data', 'Data'),
    getFlowShape('Card', 'Card'), getFlowShape('Delay', 'Delay'),
];
export const zoomMenuItems: ItemModel[] = [
    { text: 'Zoom In' }, { text: 'Zoom Out' }, { text: 'Zoom to Fit' }, { text: 'Zoom to 50%' },
    { text: 'Zoom to 100%' }, { text: 'Zoom to 200%' },
];
export const exportItems: ItemModel[] = [
    { text: 'JPG' }, { text: 'PNG' }, { text: 'SVG' }
];

//Initializes connector symbols for the symbol palette 
export const connectorSymbols: ConnectorModel[] = [
    {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
        id: 'link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'Arrow' }
    },
    {
        id: 'Link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 1, strokeDashArray: '5,2', strokeColor: '#757575' }
    },
    {
        id: 'Link4', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'None', style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 1, strokeDashArray: '5,2', strokeColor: '#757575' }
    },
];