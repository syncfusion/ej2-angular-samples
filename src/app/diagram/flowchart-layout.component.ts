import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { DiagramComponent, DiagramModule, DiagramTools } from '@syncfusion/ej2-angular-diagrams';
import {
    Diagram, NodeModel, ConnectorModel, FlowShapeModel, LayoutModel,
    RulerSettingsModel, FlowchartLayout, DataBinding
} from '@syncfusion/ej2-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DataManager } from '@syncfusion/ej2-data';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
Diagram.Inject(FlowchartLayout, DataBinding);

/**
 * Default FlowShape sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'flowchart-layout.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, CheckBoxModule, SBDescriptionComponent,NumericTextBoxModule,DropDownListModule]
})
export class FlowchartLayoutDiagramComponent {
    @ViewChild('diagram')
    //Diagram Properties
    public diagram: DiagramComponent;
    constructor() {

    }
    public rulerSettings: RulerSettingsModel = { showRulers: true };

    //Initializes the data source for the layout
    public flowchartData = [
        { id: "A", name: "Start", shape: "Terminator", color: "#90EE90", parentId: null as any, stroke: "#333", strokeWidth: 1 },
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

    public layout: LayoutModel = {
        type: 'Flowchart',
        orientation: 'TopToBottom',
        flowchartLayoutSettings: {
            yesBranchDirection: 'LeftInFlow',
            noBranchDirection: 'RightInFlow',
            yesBranchValues: ['Yes', 'True'],
            noBranchValues: ['No', 'False']
        },
        verticalSpacing: 50,
        horizontalSpacing: 50
    };
    public tool = DiagramTools.ZoomPan;
    public dataSourceSettings: object = {
        id: 'id',
        parentId: 'parentId',
        dataSource: new DataManager(this.flowchartData),
    };

    //Defines the default node properties
    public getNodeDefaults(node: NodeModel): NodeModel {
        node.width = 150;
        node.height = 50;
        if ((node.shape as FlowShapeModel).shape === 'Decision') {
            node.width = 120;
            node.height = 100;
        }
        return node;
    };

    //Defines the default connector properties
    public getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
        connector.type = 'Orthogonal';
        if(connector.annotations && connector.annotations.length > 0) {
            connector.annotations[0].style.fill = 'white';
            connector.annotations[0].style.color = 'black';
        }
        return connector;
    };
    // Property panel functionalities

    public branchDataSource = [
        { text: 'Left in flow', value: 'LeftInFlow' }, { text: 'Right in flow', value: 'RightInFlow' }, { text: 'Same as flow', value: 'SameAsFlow' }
    ];

    public orientationDataSource = [
        { text: 'Top to bottom', value: 'TopToBottom' }, { text: 'Left to right', value: 'LeftToRight' }
    ];

    public yesBranchChange(args: ChangeEventArgs): void {
        let value: string = args.value as string;
        this.diagram.layout.flowchartLayoutSettings.yesBranchDirection = value === 'Same as flow' ? 'SameAsFlow' : value === 'Right in flow' ? 'RightInFlow' : 'LeftInFlow';
        this.diagram.dataBind();
    };

    public noBranchChange(args: ChangeEventArgs): void {
        let value: string = args.value as string;
        this.diagram.layout.flowchartLayoutSettings.noBranchDirection = value === 'Same as flow' ? 'SameAsFlow' : value === 'Right in flow' ? 'RightInFlow' : 'LeftInFlow';
        this.diagram.dataBind();
    };

    public orientationChange(args: ChangeEventArgs): void {
        let value: string = args.value as string;
        this.diagram.layout.orientation = value === 'Top to bottom' ? 'TopToBottom' : 'LeftToRight';
        this.diagram.dataBind();
    };

    public horizontalSpacingChange(args: ChangeEventArgs): void {
        this.diagram.layout.horizontalSpacing = Number(args.value);
        this.diagram.dataBind();
    };

    public verticalSpacingChange(args: ChangeEventArgs): void {
        this.diagram.layout.verticalSpacing = Number(args.value);
        this.diagram.dataBind();
    };
}
