import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChangeEventArgs as DropDownChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ChangeEventArgs, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { DiagramComponent, NodeModel, ConnectorModel, ShapeAnnotationModel, VerticalAlignment, HorizontalAlignment, TextStyleModel, ISelectionChangeEventArgs, ConnectorConstraints, OrthogonalSegmentModel, DecoratorModel, SnapSettingsModel, SnapConstraints, Node, AnnotationConstraints, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ColorPickerModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Annotation
 */

let node: NodeModel;
@Component({
    selector: 'control-content',
    templateUrl: 'annotations.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, ButtonModule, ColorPickerModule, NumericTextBoxModule, DropDownListModule, CheckBoxModule, SBDescriptionComponent]
})
export class AnnotationDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;


    public segments1: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Right', length: 60 }];
    public segments2: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Bottom', length: 100 }];
    public segments3: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Left', length: 60 }];
    public segments4: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Top', length: 100 }];

    public decorator: DecoratorModel = { shape: 'None' };

     //FontType Collection
    public fontType: { [key: string]: Object }[] = [
        { type: 'Arial', text: 'Arial' },
        { type: 'Aharoni', text: 'Aharoni' },
        { type: 'Bell MT', text: 'Bell MT' },
        { type: 'Fantasy', text: 'Fantasy' },
        { type: 'Times New Roman', text: 'Times New Roman' },
        { type: 'Segoe UI', text: 'Cubic Bezier' },
        { type: 'Verdana', text: 'Verdana' }
    ];
    //Template Collection
    public templateList: { [key: string]: Object }[] = [
        { value: 'none', text: 'None' },
        { value: 'industry', text: 'Industry Competitors' },
        { value: 'suppliers', text: 'Suppliers' },
        { value: 'potential', text: 'Potential Entrants' },
        { value: 'buyers', text: 'Buyers' },
        { value: 'substitutes', text: 'Substitutes' }
    ];

    public fields: object = { value: 'type', text: 'text' };
    public templateFields: object = { value: 'value', text: 'text' };

    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    //Defines the default node properties
    public nodeDefaults(node: NodeModel): void {
        node.width = 150,
        node.height = 50,
        node.style = {
            fill: '#D5EDED',
            strokeColor: '#7DCFC9',
            strokeWidth: 1
        },
        node.shape = { cornerRadius: 5 }
    };

    //Defines the default connector properties
    public connectorDefaults(connector: ConnectorModel): void {
        connector.type = 'Orthogonal';
        connector.constraints = ConnectorConstraints.Default &~ ConnectorConstraints.Select ;
    };

    ngOnInit(): void {
        document.getElementById('appearance').onclick = this.documentClick.bind(this);
    }

    //Function to set diagram fit to page
    public created(): void {
        this.diagram.fitToPage();
    }

    //Function to set the existing property in property panel
    public selectionChange(arg: ISelectionChangeEventArgs): void {
        if (arg.state === 'Changed') {
            // custom code start
            let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
            if (selectedElement.length) {
                selectedElement[0].classList.remove('e-selected-style');
            }
            // custom code end
            //Checks whether new node is selected or not
            if (arg.newValue[0]) {
                let node: NodeModel = arg.newValue[0] as NodeModel;
                let annotation: ShapeAnnotationModel = node.annotations[0];
                if (annotation.offset.x === 0 && annotation.offset.y === 0) {
                    this.updateAnnotationPosition('left');
                } else if (annotation.offset.x === 1 && annotation.offset.y === 0) {
                    this.updateAnnotationPosition('right');
                } else if (annotation.offset.x === 0 && annotation.offset.y === 1) {
                    this.updateAnnotationPosition('bottomLeft');
                } else if (annotation.offset.x === 1 && annotation.offset.y === 1) {
                    this.updateAnnotationPosition('bottomRight');
                } else if (annotation.offset.x === 0.5 && annotation.offset.y === 0.5) {
                    this.updateAnnotationPosition('center');
                } else if (annotation.offset.x === 0.5 && annotation.offset.y === 1) {
                    this.updateAnnotationPosition('bottomCenter');
                }
            }
            this.enablePropertyPanel(arg);
        }
    };

    public diagramCreate(args: Object): void {
        this.diagram.select([this.diagram.nodes[0]]);
    }

    //Function to remove css property when nothing is selected
    private documentClick(args: MouseEvent): void {
        let target: HTMLElement = args.target as HTMLElement;
        // custom code start
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        // custom code end
        if (target.className === 'image-pattern-style') {
            this.updateAnnotationPosition(target.id);
        }
    };
    //Update the Annotation Position based on the selection
    private updateAnnotationPosition(id: string): void {
        let target: HTMLElement = document.getElementById(id);
        if (target) {
            for (let i: number = 0; i < this.diagram.selectedItems.nodes.length; i++) {
                node = this.diagram.selectedItems.nodes[i];
                //we can refactor this code using a method
                    let annotation: ShapeAnnotationModel = node.annotations[0];
                    switch (target.id) {
                        case 'topLeft':
                            this.setAnnotationPosition(annotation, 0, 0, 'Top', 'Left');
                            break;
                        case 'topRight':
                            this.setAnnotationPosition(annotation, 1, 0, 'Top', 'Right');
                            break;
                        case 'bottomLeft':
                            this.setAnnotationPosition(annotation, 0, 1, 'Bottom', 'Left');
                            break;
                        case 'bottomRight':
                            this.setAnnotationPosition(annotation, 1, 1, 'Bottom', 'Right');
                            break;
                        case 'center':
                            this.setAnnotationPosition(annotation, 0.5, .5, 'Center', 'Center');
                            break;
                        case 'bottomCenter':
                            this.setAnnotationPosition(annotation, 0.5, 1, 'Top', 'Center');
                            break;
                    }
                    // custom code start
                    target.classList.add('e-selected-style');
                    // custom code end
            }
        }
    }
    //set the Annotation Position
    private setAnnotationPosition(
        //it is in dedicated line here.
        annotation: ShapeAnnotationModel, offsetX: number, offsetY: number,
        verticalAlignment: VerticalAlignment, horizontalAlignment: HorizontalAlignment): void {
        annotation.offset.x = offsetX;
        annotation.offset.y = offsetY;
        annotation.verticalAlignment = verticalAlignment;
        annotation.horizontalAlignment = horizontalAlignment;
        if (verticalAlignment === 'Top' && horizontalAlignment === 'Left') {
            annotation.margin = { left: 3, top: 3 };
        } else if (verticalAlignment === 'Top' && horizontalAlignment === 'Right') {
            annotation.margin = { right: 3, top: 3 };
        } else if (verticalAlignment === 'Bottom' && horizontalAlignment === 'Left') {
            annotation.margin = { left: 3, bottom: 3 };
        } else if (verticalAlignment === 'Bottom' && horizontalAlignment === 'Right') {
            annotation.margin = { right: 3, bottom: 3 };
        }
    }

    //Apply the appearence of the Annotation 
    private applyAnnotationStylenotationStyle(propertyName: string, propertyValue: string): void {
        for (let i: number = 0; i < this.diagram.selectedItems.nodes.length; i++) {
            node = this.diagram.selectedItems.nodes[i];
                let textStyle: TextStyleModel = node.annotations[0].style;
                if (propertyName === 'fontsize') {
                    textStyle.fontSize = Number(propertyValue);
                } else if (propertyName === 'underline') {
                    textStyle.textDecoration = textStyle.textDecoration === 'Underline' ? 'None' : 'Underline';
                } else if (propertyName === 'fontfamily') {
                    textStyle.fontFamily = propertyValue;
                } else if (propertyName === 'bold') {
                    textStyle.bold = !textStyle.bold;
                } else if (propertyName === 'italic') {
                    textStyle.italic = !textStyle.italic;
                } else if (propertyName === 'color') {
                    textStyle.color = propertyValue;
                } else if (propertyName === 'template') {
                    if (propertyValue === 'none') {
                        node.annotations[0].template = '';
                        node.annotations[0].width = undefined;
                        node.annotations[0].height = undefined;
                    } else {
                        node.annotations[0].width = 25;
                        node.annotations[0].height = 25;
                        node.annotations[0].template =
                            '<img src="./assets/diagram/Images/annotation/' + propertyValue + '.svg" style="width:100%;height:100%" />';
                    }
                } else if (propertyName === 'interaction') {
                    node.annotations[0].constraints = node.annotations[0].constraints ^ AnnotationConstraints.Interaction;
                }
                this.diagram.dataBind();
        }
    }

     //Button used to apply for Bold of the Annotation
    public btnBoldClick(): void {
        this.applyAnnotationStylenotationStyle('bold', '');
    }

    //Button used to apply for Italic of the Annotation
    public btnItalicClick(): void {
        this.applyAnnotationStylenotationStyle('italic', '');
    }

     //Button used to apply for Underline of the Annotation
    public btnUnderlineClick(): void {
        this.applyAnnotationStylenotationStyle('underline', '');
    }

    //Colorpicker used to apply for Color of the Annotation
    public onFontColorChange(args: ColorPickerEventArgs): void {
        this.applyAnnotationStylenotationStyle('color', args.currentValue.rgba);
    }

    //NumericTextBox used to apply for Fontsize of the Annotation
    public onFontSizeChange(args: ChangeEventArgs): void {
        if (args.event) {
            this.applyAnnotationStylenotationStyle('fontsize', args.value.toString());
        }
    }

     //Function used to apply for fontFamily of the Annotation
    public onFontFamilyChange(args: DropDownChangeEventArgs): void {
        if (args.element) {
            this.applyAnnotationStylenotationStyle('fontfamily', args.value.toString());
        }
    }

    //Function used to apply for template for nodes
    public onLabelTemplateChange(args: DropDownChangeEventArgs): void {
        this.applyAnnotationStylenotationStyle('template', args.value.toString());
    }

    // Enable the label interaction while enabling the checkbox.
    public onLabelInteractionChange(args: CheckBoxChangeEventArgs): void {
        this.applyAnnotationStylenotationStyle('interaction', '');
    }

    //Enable or disable the property panel
    private enablePropertyPanel(arg: ISelectionChangeEventArgs): void {
        let appearance: HTMLElement = document.getElementById('propertyPanel');
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-remove-selection');
        if (arg.newValue) {
            if (arg.newValue[0] instanceof Node && selectedElement.length) {
                selectedElement[0].classList.remove('e-remove-selection');
            } else {
                if (!appearance.classList.contains('e-remove-selection')) {
                    appearance.classList.add('e-remove-selection');
                }
            }
        }
    }
}