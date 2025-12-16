import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { 
  DiagramComponent, 
  DiagramModule,
  NodeModel, 
  ConnectorModel, 
  DiagramTools, 
  SnapConstraints, 
  NodeConstraints, 
  ConnectorConstraints, 
  SnapSettingsModel,
  PortVisibility,
  FlipDirection,
  IConnectionChangeEventArgs,
  AnnotationModel
} from '@syncfusion/ej2-angular-diagrams';
import { DropDownListModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

interface ItemOptions {
  fill: string;
  strokeColor: string;
  strokeWidth?: number;
  rotateAngle?: number;
  flip?: FlipDirection;
}

interface UnitOption {
  text: string;
  value: string;
}

@Component({
  selector: 'control-content',
  templateUrl: 'distance-diagram.html',
  styleUrls: ['distance-diagram.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [DiagramModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DistanceDiagramComponent implements OnInit {
  @ViewChild('diagram') diagram!: DiagramComponent;

  public tool: DiagramTools = DiagramTools.SingleSelect;
  public nodes: NodeModel[] = [];
  public connectors: ConnectorModel[] = [];
  public selectedUnit: string = 'in';
  private diagramCreated = false;

  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.ShowLines,
    gridType: 'Dots',
    horizontalGridlines: {
      dotIntervals: [1, 30, 1, 30, 1, 30],
    },
    verticalGridlines: {
      dotIntervals: [1, 30, 1, 30, 1, 30],
    },
  };

  public unitOptions: UnitOption[] = [
    { text: 'Feet (ft)', value: 'ft' },
    { text: 'Inches (in)', value: 'in' },
    { text: 'Centimeters (cm)', value: 'cm' },
  ];

  ngOnInit(): void {
    this.createInitialLayout();
  }

  public onSourcePointChanged = (args: IConnectionChangeEventArgs): void => {
    this.updateDimensionConnectors(args.connector);
  }

  public onTargetPointChanged = (args: IConnectionChangeEventArgs): void => {
    this.updateDimensionConnectors(args.connector);
  }

  public onUnitChanged = (args: ChangeEventArgs): void => {
    this.selectedUnit = args.value as string;
    this.updateConnectorAnnotationsFromStoredDistances();
    if (this.diagram) {
        this.diagram.dataBind();
    }
  }

  public getNodeDefaults = (node: NodeModel): NodeModel => {
    node.constraints = NodeConstraints.None;
    return node;
  }

  private createWallConnector(id: string, startX: number, startY: number, endX: number, endY: number, color: string, thickness: number): void {
    let middlePortPosition: number = 0.5;
    let constraints = id.includes('WallOuter')
      ? ConnectorConstraints.None
      : (ConnectorConstraints.Default | ConnectorConstraints.ReadOnly) &
      ~(ConnectorConstraints.Drag | ConnectorConstraints.DragSourceEnd);
    
    switch (id) {
      case 'WallOuterLeft':
        middlePortPosition = 0.35;
        break;
      case 'WallOuterTop':
        middlePortPosition = 0.546;
        break;
      case 'WallOuterRight':
        middlePortPosition = 0.35;
        break;
      case 'WallOuterBottom':
        middlePortPosition = 0.4;
        break;
      default:
        middlePortPosition = 0.5;
        break;
    }

    let wallConnector: ConnectorModel = {
      id: id,
      sourcePoint: { x: startX, y: startY },
      targetPoint: { x: endX, y: endY },
      type: 'Straight',
      constraints: constraints,
      style: { strokeColor: color, strokeWidth: thickness },
      sourceDecorator: { shape: 'None' },
      targetDecorator: { shape: 'None' },
    };

    if (id.includes('WallOuter')) {
      wallConnector.ports = [
        {
          id: id + 'StartPort',
          offset: 0,
          visibility: PortVisibility.Hidden,
          shape: 'Circle',
          width: 8,
          height: 8,
        },
        {
          id: id + 'MiddlePort',
          offset: middlePortPosition,
          visibility: PortVisibility.Hidden,
          shape: 'Square',
          width: 6,
          height: 6,
        },
        {
          id: id + 'EndPort',
          offset: 1,
          visibility: PortVisibility.Hidden,
          shape: 'Circle',
          width: 8,
          height: 8,
        },
      ];

      if (id === 'WallOuterRight') {
        wallConnector.ports!.push({
          id: id + 'MiddlePort2',
          offset: 0.61,
          visibility: PortVisibility.Hidden,
          shape: 'Circle',
          width: 8,
          height: 8,
        });
      }
      if (id === 'WallOuterBottom') {
        wallConnector.ports!.push({
          id: id + 'MiddlePort2',
          offset: 0.8,
          visibility: PortVisibility.Hidden,
          shape: 'Circle',
          width: 8,
          height: 8,
        });
      }
    }
    this.connectors.push(wallConnector);
  }

  private createItem(id: string, x: number, y: number, width: number, height: number, pathData: string, options: ItemOptions): void {
    let item: NodeModel = {
      id: id,
      width: width,
      height: height,
      offsetX: x,
      offsetY: y,
      shape: { type: 'Path', data: pathData },
      style: {
        fill: options.fill,
        strokeColor: options.strokeColor,
        strokeWidth: options.strokeWidth || 2,
      },
      rotateAngle: options.rotateAngle || 0,
      constraints: NodeConstraints.None,
      flip: options.flip || FlipDirection.None,
    };
    this.nodes.push(item);
  }

  private createBedroomItem(id: string, x: number, y: number, width: number, height: number, pathData: string, color: string): void {
    let options: ItemOptions = {
      fill: '#E8F4FD',
      strokeColor: '#2E86AB',
    };
    if (id === 'BedItem2') {
      options.rotateAngle = 270;
      options.fill = '#E0F6FF';
      options.strokeColor = '#4682B4';
    }
    if (id === 'BedItem3') {
      options.rotateAngle = 180;
      options.fill = '#E0F6FF';
      options.strokeColor = '#4682B4';
    }
    if (id === 'BedItem4') {
      options.rotateAngle = 90;
      options.fill = '#F0F8E8';
      options.strokeColor = '#228B22';
    }
    if (id === 'bedroomDoor2') {
      options.flip = FlipDirection.Horizontal;
      options.fill = '#F0F8E8';
      options.strokeColor = '#228B22';
    }
    this.createItem(id, x, y, width, height, pathData, options);
  }

  private createKitchenItem(id: string, x: number, y: number, width: number, height: number, pathData: string, color: string): void {
    let options: ItemOptions = {
      fill: color,
      strokeColor: '#333',
    };
    if (id === 'KitchenSink') {
      options.fill = '#FFF2E8';
      options.strokeColor = '#D2691E';
    }
    if (id === 'KitchenCounter') {
      options.rotateAngle = 90;
      options.fill = '#F5F5DC';
      options.strokeColor = '#8B4513';
    }
    this.createItem(id, x, y, width, height, pathData, options);
  }

  private createLivingRoomItem(id: string, x: number, y: number, width: number, height: number, pathData: string, color: string): void {
    let options: ItemOptions = {
      fill: '#FFF8DC',
      strokeColor: '#B8860B',
    };
    if (id === 'Bathroom') {
      options.rotateAngle = 90;
      options.fill = '#E6E6FA';
      options.strokeColor = '#9370DB';
    }
    if (id === 'SideTable') {
      options.fill = '#FFEFD5';
      options.strokeColor = '#CD853F';
    }
    if (id === 'MainDoor') {
      options.fill = 'yellow';
      options.strokeColor = '#B8860B';
    }
    if (id === 'LivingRoomSofa') {
      options.rotateAngle = 180;
      options.fill = '#ffcccc';
      options.strokeColor = 'red';
    }
    if (id === 'TVStand') {
      options.rotateAngle = 0;
      options.fill = '#ffbf80';
      options.strokeColor = '#cc6600';
    }
    this.createItem(id, x, y, width, height, pathData, options);
  }

  private createBathroomDoor(id: string, x: number, y: number, width: number, height: number, pathData: string, color: string): void {
    let options: ItemOptions = {
      fill: '#E6E6FA',
      strokeColor: '#9370DB',
      rotateAngle: 270,
      flip: FlipDirection.Vertical
    };
    this.createItem(id, x, y, width, height, pathData, options);
  }

  private createDimensionConnector(
    id: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    dimensionText: string,
    isHorizontal: boolean
  ): void {
    let dimensionLine: ConnectorModel = {
      id: id,
      sourcePoint: { x: startX, y: startY },
      targetPoint: { x: endX, y: endY },
      type: 'Straight',
      constraints: ConnectorConstraints.None,
      style: { strokeColor: '#0066CC', strokeWidth: 2 },
      sourceDecorator: {
        shape: 'Arrow',
        style: { fill: '#0066CC', strokeColor: '#0066CC' },
      },
      targetDecorator: {
        shape: 'Arrow',
        style: { fill: '#0066CC', strokeColor: '#0066CC' },
      },
      annotations: [
        {
          content: dimensionText,
          style: {
            color: 'black',
            fontSize: 12,
            fill: 'white',
            fontFamily: 'Arial',
            bold: true,
          },
          offset: 0.5,
          alignment: 'Center',
        } as AnnotationModel,
      ],
    };
    this.connectors.push(dimensionLine);

    if (isHorizontal) {
      this.createExtensionLine(
        id + '_ExtStart',
        startX,
        startY - 10,
        startX,
        startY + 10
      );
      this.createExtensionLine(id + '_ExtEnd', endX, endY - 10, endX, endY + 10);
    } else {
      this.createExtensionLine(
        id + '_ExtStart',
        startX - 10,
        startY,
        startX + 10,
        startY
      );
      this.createExtensionLine(id + '_ExtEnd', endX - 10, endY, endX + 10, endY);
    }
  }

  private createExtensionLine(id: string, startX: number, startY: number, endX: number, endY: number): void {
    let extensionLine: ConnectorModel = {
      id: id,
      sourcePoint: { x: startX, y: startY },
      targetPoint: { x: endX, y: endY },
      type: 'Straight',
      constraints: ConnectorConstraints.None,
      sourceDecorator: { shape: 'None' },
      targetDecorator: { shape: 'None' },
      style: { strokeColor: '#0066CC', strokeWidth: 1 },
    };
    this.connectors.push(extensionLine);
  }

  private createPortConnections(): void {
    let wallOuterTop = this.connectors.find((c) => c.id === 'WallOuterTop');
    let wallOuterLeft = this.connectors.find((c) => c.id === 'WallOuterLeft');
    let wallOuterBottom = this.connectors.find((c) => c.id === 'WallOuterBottom');
    let wallOuterRight = this.connectors.find((c) => c.id === 'WallOuterRight');
    let separator1 = this.connectors.find((c) => c.id === 'Separator1');
    let separator2 = this.connectors.find((c) => c.id === 'Separator2');
    let separator3 = this.connectors.find((c) => c.id === 'Separator3');
    let separator4 = this.connectors.find((c) => c.id === 'Separator4');

    if (wallOuterTop && wallOuterLeft) {
      wallOuterTop.sourceID = 'WallOuterLeft';
    }
    if (wallOuterTop && wallOuterRight) {
      wallOuterTop.targetID = 'WallOuterRight';
    }
    if (wallOuterBottom && wallOuterLeft) {
      wallOuterBottom.sourceID = 'WallOuterLeft';
    }
    if (wallOuterBottom && wallOuterRight) {
      wallOuterBottom.targetID = 'WallOuterRight';
    }
    if (separator3 && wallOuterLeft) {
      separator3.sourceID = 'WallOuterLeft';
      separator3.sourcePortID = 'WallOuterLeftMiddlePort';
    }
    if (separator2 && wallOuterTop) {
      separator2.sourceID = 'WallOuterTop';
      separator2.sourcePortID = 'WallOuterTopMiddlePort';
    }
    if (separator1 && wallOuterRight) {
      separator1.sourceID = 'WallOuterRight';
      separator1.sourcePortID = 'WallOuterRightMiddlePort2';
    }
    if (separator4 && wallOuterRight) {
      separator4.sourceID = 'WallOuterRight';
      separator4.sourcePortID = 'WallOuterRightMiddlePort';
    }
  }

  private createRestroomSeparator(): void {
    this.createWallConnector('RestroomSeparator', 780, 610, 780, 480, '#333333', 5);
    let restroomSeparator = this.connectors.find((c) => c.id === 'RestroomSeparator');
    let wallOuterBottom = this.connectors.find((c) => c.id === 'WallOuterBottom');

    if (restroomSeparator && wallOuterBottom) {
      restroomSeparator.sourceID = 'WallOuterBottom';
      restroomSeparator.sourcePortID = 'WallOuterBottomMiddlePort2';
    }
  }

  private createHallSeparator(): void {
    this.createWallConnector('HallSeparator', 540, 610, 540, 410, '#333333', 5);
    let hallSeparator = this.connectors.find((c) => c.id === 'HallSeparator');
    let wallOuterBottom = this.connectors.find((c) => c.id === 'WallOuterBottom');

    if (hallSeparator && wallOuterBottom) {
      hallSeparator.sourceID = 'WallOuterBottom';
      hallSeparator.sourcePortID = 'WallOuterBottomMiddlePort';
    }
  }

  private createInitialLayout(): void {
        this.createWallConnector('WallOuterTop', 299, 150, 901, 150, '#333333', 3);
        this.createWallConnector('WallOuterLeft', 300, 150, 300, 610, '#333333', 3);
        this.createWallConnector('WallOuterBottom', 299, 610, 901, 610, '#333333', 3);
        this.createWallConnector('WallOuterRight', 900, 150, 900, 610, '#333333', 3);
        this.createWallConnector('Separator1', 900, 430, 670, 430, '#333333', 5);
        this.createWallConnector('Separator2', 628, 150, 628, 313, '#333333', 5);
        this.createWallConnector('Separator3', 300, 310, 560, 310, '#333333', 5);
        this.createWallConnector('Separator4', 900, 310, 700, 310, '#333333', 5);
        this.createPortConnections();

        this.createBedroomItem(
            'BedItem2',380,215,80,140, 'M1 2C1 1.44771 1.44772 1 2 1H26C26.5523 1 27 1.44772 27 2V54C27 54.5523 26.5523 55 26 55H2C1.44772 55 1 54.5523 1 54V2Z M1 27.5941C1 27.5432 1.0038 27.4928 1.01218 27.4426C1.13134 26.7284 2.13402 21.153 4.41646 21.0198C4.47147 21.0165 4.52813 21.0118 4.58296 21.0063C7.51272 20.7131 9.98932 30.7524 14.8322 30.9965C14.9423 31.002 15.0553 30.9826 15.1593 30.946C18.0006 29.9475 18.036 28.9499 20 28.5008C22.6744 27.8892 25.3331 28.7977 26.4505 29.2665C26.794 29.4106 27 29.7509 27 30.1234V52.0177C27 52.5699 26.5523 53.0177 26 53.0177H2C1.44772 53.0177 1 52.5699 1 52.0177V27.5941Z M7.47077 8.3988C7.27248 7.71969 7.76957 7 8.47703 7H19.0951C19.901 7 20.4243 7.93945 20.1178 8.68485C19.7917 9.47806 19.5 10.4742 19.5 11.5C19.5 12.5349 19.7571 13.4842 20.0583 14.2413C20.363 15.007 19.824 16 19 16H8.47703C7.76957 16 7.27248 15.2803 7.47077 14.6012C7.73012 13.7129 8 12.539 8 11.5C8 10.461 7.73012 9.28707 7.47077 8.3988Z','#654321'
        );
        this.createBedroomItem(
            'BedItem3',480,290,80,42, 'M42.14,32.03 L63.66,16.79 L67.91,16.76 L72.15,16.76 L46.34,35 L42.14,32.03 Z M9.34,16.79 L30.56,32.03 L26.36,35 L0.85,16.79 L9.34,16.79 Z M59.25,26.31 C59.08,26.19,59.08,26,59.25,25.88 C59.41,25.76,59.68,25.76,59.85,25.88 L61.05,26.73 C61.21,26.85,61.21,27.04,61.05,27.15 C60.88,27.27,60.61,27.27,60.45,27.15 L59.25,26.31 Z M12.85,25.88 C13.02,25.76,13.29,25.76,13.45,25.88 C13.62,26,13.62,26.19,13.45,26.31 L12.25,27.15 C12.09,27.27,11.82,27.27,11.65,27.15 C11.49,27.04,11.49,26.85,11.65,26.73 L12.85,25.88 Z M0,0 L73,0 L73,16.79 L0,16.79 L0,0 Z ','#8B4513'
        );
        this.createBedroomItem(
            'BedItem4',808,221,80,140, 'M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z  M8 14V8C8 7.44772 8.44772 7 9 7H19C19.5523 7 20 7.44772 20 8V14C20 14.5523 19.5523 15 19 15H9C8.44772 15 8 14.5523 8 14Z M26 14V8C26 7.44772 26.4477 7 27 7H37C37.5523 7 38 7.44772 38 8V14C38 14.5523 37.5523 15 37 15H27C26.4477 15 26 14.5523 26 14Z M0.5 2V54H1.5V2H0.5ZM2 55.5H44V54.5H2V55.5ZM45.5 54V2H44.5V54H45.5ZM2 1.5H44V0.5H2V1.5ZM45.5 2C45.5 1.17157 44.8284 0.5 44 0.5V1.5C44.2761 1.5 44.5 1.72386 44.5 2H45.5ZM44 55.5C44.8284 55.5 45.5 54.8284 45.5 54H44.5C44.5 54.2761 44.2761 54.5 44 54.5V55.5ZM0.5 54C0.5 54.8284 1.17157 55.5 2 55.5V54.5C1.72386 54.5 1.5 54.2761 1.5 54H0.5ZM1.5 2C1.5 1.72386 1.72386 1.5 2 1.5V0.5C1.17157 0.5 0.5 1.17157 0.5 2H1.5ZM1 21.5H45V20.5H1V21.5ZM7.5 8V14H8.5V8H7.5ZM9 15.5H19V14.5H9V15.5ZM20.5 14V8H19.5V14H20.5ZM19 6.5H9V7.5H19V6.5ZM20.5 8C20.5 7.17157 19.8284 6.5 19 6.5V7.5C19.2761 7.5 19.5 7.72386 19.5 8H20.5ZM19 15.5C19.8284 15.5 20.5 14.8284 20.5 14H19.5C19.5 14.2761 19.2761 14.5 19 14.5V15.5ZM7.5 14C7.5 14.8284 8.17157 15.5 9 15.5V14.5C8.72386 14.5 8.5 14.2761 8.5 14H7.5ZM8.5 8C8.5 7.72386 8.72386 7.5 9 7.5V6.5C8.17157 6.5 7.5 7.17157 7.5 8H8.5ZM25.5 8V14H26.5V8H25.5ZM27 15.5H37V14.5H27V15.5ZM38.5 14V8H37.5V14H38.5ZM37 6.5H27V7.5H37V6.5ZM38.5 8C38.5 7.17157 37.8284 6.5 37 6.5V7.5C37.2761 7.5 37.5 7.72386 37.5 8H38.5ZM37 15.5C37.8284 15.5 38.5 14.8284 38.5 14H37.5C37.5 14.2761 37.2761 14.5 37 14.5V15.5ZM25.5 14C25.5 14.8284 26.1716 15.5 27 15.5V14.5C26.7239 14.5 26.5 14.2761 26.5 14H25.5ZM26.5 8C26.5 7.72386 26.7239 7.5 27 7.5V6.5C26.1716 6.5 25.5 7.17157 25.5 8H26.5Z','#8B4513'
        );
        this.createBedroomItem(
            'bedroomDoor1',593,285,60,50, 'M 0 26.92 L 0 30 L 28 30 L 28 26.92 M 0 26.92 L 28 26.92 M 0 26.92 C 0 12.05 12.36 0 27.61 0 L 28 0 L 28 26.92','#FFD700'
        );
        this.createBedroomItem(
            'bedroomDoor2',664,285,60,50, 'M 0 26.92 L 0 30 L 28 30 L 28 26.92 M 0 26.92 L 28 26.92 M 0 26.92 C 0 12.05 12.36 0 27.61 0 L 28 0 L 28 26.92','#FFD700'
        );
        this.createKitchenItem(
            'KitchenSink',768,331,80,35, 'M0,6.33 C0,2.84,2.23,0,4.98,0 L71.02,0 C73.77,0,76,2.84,76,6.33 L76,31.67 C76,35.16,73.77,38,71.02,38 L4.98,38 C2.23,38,0,35.16,0,31.67 L0,6.33 Z M3.74,9.5 C3.74,7.75,4.85,6.33,6.23,6.33 L33.64,6.33 C35.02,6.33,36.13,7.75,36.13,9.5 L36.13,28.5 C36.13,30.25,35.02,31.67,33.64,31.67 L6.23,31.67 C4.85,31.67,3.74,30.25,3.74,28.5 L3.74,9.5 Z M39.87,9.5 C39.87,7.75,40.98,6.33,42.36,6.33 L69.77,6.33 C71.15,6.33,72.26,7.75,72.26,9.5 L72.26,28.5 C72.26,30.25,71.15,31.67,69.77,31.67 L42.36,31.67 C40.98,31.67,39.87,30.25,39.87,28.5 L39.87,9.5 Z M21.18,19.4 C21.18,20.49,20.48,21.37,19.62,21.37 C18.76,21.37,18.07,20.49,18.07,19.4 C18.07,18.3,18.76,17.42,19.62,17.42 C20.48,17.42,21.18,18.3,21.18,19.4 Z M57.31,19.4 C57.31,20.49,56.61,21.37,55.75,21.37 C54.89,21.37,54.2,20.49,54.2,19.4 C54.2,18.3,54.89,17.42,55.75,17.42 C56.61,17.42,57.31,18.3,57.31,19.4 Z M39.47,7.51 C39.47,7.51,39.91,7.51,40.35,6.95 C40.79,6.39,40.79,5.83,40.79,5.83 L45.78,11.26 C46.42,11.95,46.45,13.19,45.86,13.95 C45.27,14.7,44.29,14.65,43.74,13.84 L39.47,7.51 Z M40.13,2.75 C40.98,3.83,40.98,5.59,40.13,6.67 C39.28,7.75,37.9,7.75,37.05,6.67 C36.2,5.59,36.2,3.83,37.05,2.75 C37.9,1.67,39.28,1.67,40.13,2.75 Z ','#34495E'
        );
        this.createKitchenItem(
            'KitchenCounter',866,368,68,35, 'M67.5828 1.96454C67.5828 1.43184 67.151 1 66.6183 1L1.96405 1.00001C1.43135 1.00001 0.999512 1.43184 0.999512 1.96454L0.999515 34.0355C0.999515 34.5682 1.43135 35 1.96405 35L66.6183 35C67.151 35 67.5828 34.5682 67.5828 34.0355V1.96454Z M33.5828 4.79852C33.5828 4.26582 33.151 3.83398 32.6183 3.83398L4.79737 3.83399C4.26467 3.83399 3.83283 4.26583 3.83283 4.79853L3.83284 31.2028C3.83284 31.7355 4.26468 32.1673 4.79738 32.1673L32.6183 32.1673C33.151 32.1673 33.5828 31.7355 33.5828 31.2028L33.5828 4.79852Z M64.7488 4.79852C64.7488 4.26582 64.317 3.83398 63.7843 3.83398L35.9634 3.83399C35.4307 3.83399 34.9988 4.26583 34.9988 4.79853L34.9989 31.2028C34.9989 31.7355 35.4307 32.1673 35.9634 32.1673L63.7843 32.1673C64.317 32.1673 64.7489 31.7355 64.7489 31.2028L64.7488 4.79852Z M26.4988 18C26.4988 22.6944 22.6933 26.5 17.9988 26.5C13.3044 26.5 9.49885 22.6944 9.49885 18C9.49885 13.3056 13.3044 9.5 17.9988 9.5C22.6933 9.5 26.4988 13.3056 26.4988 18Z M25.4363 18C25.4363 22.1076 22.1065 25.4375 17.9988 25.4375C13.8912 25.4375 10.5613 22.1076 10.5613 18C10.5613 13.8924 13.8912 10.5625 17.9988 10.5625C22.1065 10.5625 25.4363 13.8924 25.4363 18Z M25.0574 24.6826L24.6818 25.0583L22.0015 22.378L22.3772 22.0024L25.0574 24.6826Z M13.9442 13.5703L13.5685 13.946L10.888 11.2655L11.2637 10.8898L13.9442 13.5703Z M24.786 11.0938L25.1616 11.4694L22.4813 14.1497L22.1057 13.774L24.786 11.0938Z M13.7733 21.9844L14.1489 22.36L11.4686 25.0403L11.093 24.6646L13.7733 21.9844Z M21.452 18C21.452 19.9071 19.906 21.4531 17.9988 21.4531C16.0917 21.4531 14.5457 19.9071 14.5457 18C14.5457 16.0929 16.0917 14.5469 17.9988 14.5469C19.906 14.5469 21.452 16.0929 21.452 18Z M57.6658 18C57.6658 22.6944 53.8603 26.5 49.1658 26.5C44.4714 26.5 40.6658 22.6944 40.6658 18C40.6658 13.3056 44.4714 9.5 49.1658 9.5C53.8603 9.5 57.6658 13.3056 57.6658 18Z M56.6033 18C56.6033 22.1076 53.2735 25.4375 49.1658 25.4375C45.0582 25.4375 41.7283 22.1076 41.7283 18C41.7283 13.8924 45.0582 10.5625 49.1658 10.5625C53.2735 10.5625 56.6033 13.8924 56.6033 18Z M56.2235 24.6826L55.8478 25.0583L53.1675 22.378L53.5432 22.0024L56.2235 24.6826Z M45.1121 13.5703L44.7365 13.946L42.056 11.2655L42.4317 10.8898L45.1121 13.5703Z M55.952 11.0938L56.3276 11.4694L53.6474 14.1497L53.2717 13.774L55.952 11.0938Z M44.9403 21.9844L45.3159 22.36L42.6356 25.0403L42.26 24.6646L44.9403 21.9844Z M52.619 18C52.619 19.9071 51.0729 21.4531 49.1658 21.4531C47.2587 21.4531 45.7127 19.9071 45.7127 18C45.7127 16.0929 47.2587 14.5469 49.1658 14.5469C51.0729 14.5469 52.619 16.0929 52.619 18Z','#8B4513'
        );
        this.createLivingRoomItem(
            'TVStand',420,368,90,40, 'M55 23H4C2.34315 23 1 24.3431 1 26V40H58V26C58 24.3431 56.6569 23 55 23ZM55 23L48.1968 4.29128C47.4783 2.31534 45.6004 1 43.4979 1H16.5021C14.3996 1 12.5217 2.31533 11.8032 4.29128L5 23H55ZM16 1V23M25 1V23M34 1V23M43 1V23M1 36.5H58','#8B4513'
        );
        this.createLivingRoomItem(
            'LivingRoomSofa',420,560,180,70, 'M83,24.33 C83,24.96,82.37,25.47,81.59,25.47 C80.81,25.47,80.18,24.96,80.18,24.33 C80.18,23.7,80.81,23.19,81.59,23.19 C82.37,23.19,83,23.7,83,24.33 Z M83,19.2 C83,19.83,82.37,20.34,81.59,20.34 C80.81,20.34,80.18,19.83,80.18,19.2 C80.18,18.57,80.81,18.06,81.59,18.06 C82.37,18.06,83,18.57,83,19.2 Z M83,14.07 C83,14.7,82.37,15.21,81.59,15.21 C80.81,15.21,80.18,14.7,80.18,14.07 C80.18,13.44,80.81,12.93,81.59,12.93 C82.37,12.93,83,13.44,83,14.07 Z M73.48,24.33 C73.48,24.96,72.85,25.47,72.07,25.47 C71.29,25.47,70.65,24.96,70.65,24.33 C70.65,23.7,71.29,23.19,72.07,23.19 C72.85,23.19,73.48,23.7,73.48,24.33 Z M73.48,19.2 C73.48,19.83,72.85,20.34,72.07,20.34 C71.29,20.34,70.65,19.83,70.65,19.2 C70.65,18.57,71.29,18.06,72.07,18.06 C72.85,18.06,73.48,18.57,73.48,19.2 Z M73.48,14.07 C73.48,14.7,72.85,15.21,72.07,15.21 C71.29,15.21,70.65,14.7,70.65,14.07 C70.65,13.44,71.29,12.93,72.07,12.93 C72.85,12.93,73.48,13.44,73.48,14.07 Z M55.68,24.33 C55.68,24.96,55.05,25.47,54.27,25.47 C53.49,25.47,52.86,24.96,52.86,24.33 C52.86,23.7,53.49,23.19,54.27,23.19 C55.05,23.19,55.68,23.7,55.68,24.33 Z M55.68,14.07 C55.68,14.7,55.05,15.21,54.27,15.21 C53.49,15.21,52.86,14.7,52.86,14.07 C52.86,13.44,53.49,12.93,54.27,12.93 C55.05,12.93,55.68,13.44,55.68,14.07 Z M46.16,24.33 C46.16,24.96,45.53,25.47,44.75,25.47 C43.97,25.47,43.33,24.96,43.33,24.33 C43.33,23.7,43.97,23.19,44.75,23.19 C45.53,23.19,46.16,23.7,46.16,24.33 Z M46.16,19.2 C46.16,19.83,45.53,20.34,44.75,20.34 C43.97,20.34,43.33,19.83,43.33,19.2 C43.33,18.57,43.97,18.06,44.75,18.06 C45.53,18.06,46.16,18.57,46.16,19.2 Z M46.16,14.07 C46.16,14.7,45.53,15.21,44.75,15.21 C43.97,15.21,43.33,14.7,43.33,14.07 C43.33,13.44,43.97,12.93,44.75,12.93 C45.53,12.93,46.16,13.44,46.16,14.07 Z M55.68,19.2 C55.68,19.83,55.05,20.34,54.27,20.34 C53.49,20.34,52.86,19.83,52.86,19.2 C52.86,18.57,53.49,18.06,54.27,18.06 C55.05,18.06,55.68,18.57,55.68,19.2 Z M28.36,25.09 C28.36,25.72,27.73,26.23,26.95,26.23 C26.17,26.23,25.54,25.72,25.54,25.09 C25.54,24.46,26.17,23.95,26.95,23.95 C27.73,23.95,28.36,24.46,28.36,25.09 Z M28.36,19.96 C28.36,20.59,27.73,21.1,26.95,21.1 C26.17,21.1,25.54,20.59,25.54,19.96 C25.54,19.33,26.17,18.82,26.95,18.82 C27.73,18.82,28.36,19.33,28.36,19.96 Z M28.36,14.83 C28.36,15.46,27.73,15.97,26.95,15.97 C26.17,15.97,25.54,15.46,25.54,14.83 C25.54,14.2,26.17,13.69,26.95,13.69 C27.73,13.69,28.36,14.2,28.36,14.83 Z M18.84,24.72 C18.84,25.35,18.21,25.86,17.43,25.86 C16.65,25.86,16.01,25.35,16.01,24.72 C16.01,24.09,16.65,23.58,17.43,23.58 C18.21,23.58,18.84,24.09,18.84,24.72 Z M18.84,20.16 C18.84,20.79,18.21,21.3,17.43,21.3 C16.65,21.3,16.01,20.79,16.01,20.16 C16.01,19.53,16.65,19.02,17.43,19.02 C18.21,19.02,18.84,19.53,18.84,20.16 Z M18.84,14.83 C18.84,15.46,18.21,15.97,17.43,15.97 C16.65,15.97,16.01,15.46,16.01,14.83 C16.01,14.2,16.65,13.69,17.43,13.69 C18.21,13.69,18.84,14.2,18.84,14.83 Z M63.56,32.88 C75.46,36.7,87.37,34.5,91.89,32.91 M63.56,7.69 L63.56,32.88 M8.27,32.87 C7.71,33.54,6.74,33.97,5.68,33.97 L3.73,33.97 C2.07,33.97,0.7,32.94,0.59,31.6 C0.36,28.58,0,23.12,0,17.94 C0,13.88,0.22,9.99,0.43,7.23 C0.61,4.87,2.83,2.97,5.74,2.66 C14.51,1.75,33.37,0,49.21,0 C65.02,0,84.29,1.05,93.3,1.6 C96.29,1.78,98.68,3.64,98.99,6.05 C99.44,9.55,100,14.53,100,17.94 C100,21.97,99.61,28.18,99.38,31.57 C99.29,32.92,97.9,33.97,96.22,33.97 L94.45,33.97 C93.4,33.97,92.46,33.55,91.89,32.91 M8.27,32.87 C8.52,32.57,8.69,32.23,8.76,31.85 C10.53,21.8,9.26,11.57,8.33,7.48 C19.71,9.62,31.59,8.38,36.11,7.48 C45.37,10.05,58.27,8.55,63.56,7.48 C75.46,10.05,87.26,8.55,91.67,7.48 C89.28,11.92,90.3,24.36,91.33,31.74 C91.39,32.17,91.59,32.57,91.89,32.91 M36.44,32.88 C49.14,36.49,59.81,34.39,63.56,32.88 M36.44,32.88 C31.48,34.3,18.85,36.26,8.27,32.87 M36.44,7.69 L36.44,32.88','#2C3E50'
        );
        this.createLivingRoomItem(
            'Bathroom',845,550,50,60, 'M46.4065 37.9425C46.4065 55.0951 36.823 69.0002 25.0011 69.0002C13.1792 69.0002 3.5957 55.0951 3.5957 37.9425C3.5957 30.1141 5.2059 23.4623 8.5 18C8.61402 18 25 18 25 18H41.2425C44.5366 23.4623 46.4065 30.1141 46.4065 37.9425Z M41.2161 43.5006C41.2161 53.9728 33.9559 62.4621 24.9999 62.4621C16.0439 62.4621 8.78369 53.9728 8.78369 43.5006C8.78369 33.0284 16.0439 24.5391 24.9999 24.5391C33.9559 24.5391 41.2161 33.0284 41.2161 43.5006Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 33C31 37.4183 28.3137 41 25 41C21.6863 41 19 37.4183 19 33C19 28.5817 21.6863 25 25 25C28.3137 25 31 28.5817 31 33Z','#654321'
        );
        this.createLivingRoomItem(
            'livingroomtable',420,470,80,50, 'M2.79,2.86 C2.79,2.46,3.21,2.14,3.72,2.14 L76.28,2.14 C76.79,2.14,77.21,2.46,77.21,2.86 L77.21,37.14 C77.21,37.54,76.79,37.86,76.28,37.86 L3.72,37.86 C3.21,37.86,2.79,37.54,2.79,37.14 L2.79,2.86 Z M2.79,3.93 C2.79,4.13,2.58,4.29,2.33,4.26 C1.94,4.21,1.57,4.09,1.24,3.92 C0.78,3.69,0.42,3.35,0.21,2.96 C0,2.57,-0.05,2.14,0.05,1.72 C0.16,1.31,0.43,0.93,0.82,0.63 C1.21,0.33,1.7,0.12,2.25,0.04 C2.79,-0.04,3.35,0,3.86,0.16 C4.37,0.33,4.8,0.6,5.11,0.95 C5.33,1.21,5.48,1.49,5.54,1.79 C5.59,1.98,5.37,2.14,5.12,2.14 L3.26,2.14 C3,2.14,2.79,2.3,2.79,2.5 L2.79,3.93 Z M74.88,2.14 C74.63,2.14,74.41,1.98,74.46,1.79 C74.52,1.49,74.67,1.21,74.89,0.95 C75.2,0.6,75.63,0.33,76.14,0.16 C76.65,0,77.21,-0.04,77.75,0.04 C78.3,0.12,78.79,0.33,79.18,0.63 C79.57,0.93,79.84,1.31,79.95,1.72 C80.05,2.14,80,2.57,79.79,2.96 C79.58,3.35,79.22,3.69,78.76,3.92 C78.43,4.09,78.06,4.21,77.67,4.26 C77.42,4.29,77.21,4.13,77.21,3.93 L77.21,2.5 C77.21,2.3,77,2.14,76.74,2.14 L74.88,2.14 Z M5.12,37.86 C5.37,37.86,5.59,38.02,5.54,38.21 C5.48,38.51,5.33,38.79,5.11,39.05 C4.8,39.4,4.37,39.67,3.86,39.84 C3.35,40,2.79,40.04,2.25,39.96 C1.7,39.88,1.21,39.67,0.82,39.37 C0.43,39.07,0.16,38.69,0.05,38.28 C-0.05,37.86,0,37.43,0.21,37.04 C0.42,36.65,0.78,36.31,1.24,36.08 C1.57,35.91,1.94,35.79,2.33,35.74 C2.58,35.71,2.79,35.87,2.79,36.07 L2.79,37.5 C2.79,37.7,3,37.86,3.26,37.86 L5.12,37.86 Z M77.21,36.07 C77.21,35.87,77.42,35.71,77.67,35.74 C78.06,35.79,78.43,35.91,78.76,36.08 C79.22,36.31,79.58,36.65,79.79,37.04 C80,37.43,80.05,37.86,79.95,38.28 C79.84,38.69,79.57,39.07,79.18,39.37 C78.79,39.67,78.3,39.88,77.75,39.96 C77.21,40.04,76.65,40,76.14,39.84 C75.63,39.67,75.2,39.4,74.89,39.05 C74.67,38.79,74.52,38.51,74.46,38.21 C74.41,38.02,74.63,37.86,74.88,37.86 L76.74,37.86 C77,37.86,77.21,37.7,77.21,37.5 L77.21,36.07 Z ','#8B4513'
        );
        this.createLivingRoomItem(
            'MainDoor',630,586,90,40, 'M 76 56.54 L 76 63 L 0 63 L 0 56.54 M 76 56.54 L 0 56.54 M 76 56.54 L 76 0 L 75.46 0 C 54.77 0 38 25.31 38 56.54 M 76 56.54 L 38 56.54 M 0 56.54 L 0 0 L 0.54 0 C 21.23 0 38 25.31 38 56.54 M 0 56.54 L 38 56.54 M 38 62.6 L 38 56.54','#FFD700'
        );

        this.createRestroomSeparator();
        this.createBathroomDoor(
            'bathDoor1',802,456,45,45, 'M 0 26.92 L 0 30 L 28 30 L 28 26.92 M 0 26.92 L 28 26.92 M 0 26.92 C 0 12.05 12.36 0 27.61 0 L 28 0 L 28 26.92','#FFD700'
        );
        this.createHallSeparator();
        this.addMeasurementConnectorsRuntime();
        this.addOverallMeasurementConnectors();
  }

  private addMeasurementConnectorsRuntime(): void {
    let allSeparators = this.connectors.filter(
      (c) =>
        c.id.startsWith('Separator') ||
        c.id === 'RestroomSeparator' ||
        c.id === 'HallSeparator'
    );

    allSeparators.forEach((separator) => {
      this.addSpecificSeparatorMeasurement(separator);
    });
  }

  private addOverallMeasurementConnectors(): void {
    let wallOuterTop = this.connectors.find((c) => c.id === 'WallOuterTop');
    let wallOuterLeft = this.connectors.find((c) => c.id === 'WallOuterLeft');
    let wallOuterBottom = this.connectors.find((c) => c.id === 'WallOuterBottom');
    let wallOuterRight = this.connectors.find((c) => c.id === 'WallOuterRight');

    if (wallOuterTop && wallOuterLeft && wallOuterBottom && wallOuterRight) {
      let totalWidth = Math.abs(
        wallOuterRight.targetPoint.x - wallOuterLeft.sourcePoint.x
      );
      let widthText = this.formatMeasurement(this.convertPixelsToSelectedUnit(totalWidth));
      this.createDimensionConnector('TotalWidthMeasurement',wallOuterLeft.sourcePoint.x,wallOuterTop.sourcePoint.y - 50,wallOuterRight.targetPoint.x,wallOuterTop.sourcePoint.y - 50,widthText,true);

      let totalHeight = Math.abs(
        wallOuterBottom.targetPoint.y - wallOuterTop.sourcePoint.y
      );
      let heightText = this.formatMeasurement(
        this.convertPixelsToSelectedUnit(totalHeight)
      );
      this.createDimensionConnector('TotalHeightMeasurement',wallOuterLeft.sourcePoint.x - 70,wallOuterTop.sourcePoint.y,wallOuterLeft.sourcePoint.x - 70,wallOuterBottom.targetPoint.y,heightText,false);
    }
  }

  private addSpecificSeparatorMeasurement(separator: ConnectorModel): void {
    let wallOuterTop = this.connectors.find((c) => c.id === 'WallOuterTop');
    let wallOuterBottom = this.connectors.find((c) => c.id === 'WallOuterBottom');
    let wallOuterRight = this.connectors.find((c) => c.id === 'WallOuterRight');
    let yOffset: number, xOffset: number, distance: number;

    switch (separator.id) {
      case 'Separator1':
        distance = Math.abs(separator.targetPoint.x - separator.sourcePoint.x);
        yOffset = wallOuterBottom.sourcePoint.y + 40;
        this.createDimensionConnector(separator.id + 'Measurement', separator.sourcePoint.x, yOffset, separator.targetPoint.x, yOffset, this.formatMeasurement(this.convertPixelsToSelectedUnit(distance)), true);
        break;
      case 'Separator3':
        distance = Math.abs(separator.targetPoint.x - separator.sourcePoint.x);
        yOffset = wallOuterBottom.sourcePoint.y + 20;
        this.createDimensionConnector(separator.id + 'Measurement', separator.sourcePoint.x, yOffset, separator.targetPoint.x, yOffset, this.formatMeasurement(this.convertPixelsToSelectedUnit(distance)), true);
        break;
      case 'HallSeparator':
        distance = Math.abs(separator.targetPoint.y - separator.sourcePoint.y);
        xOffset = 270;
        this.createDimensionConnector(separator.id + 'Measurement', xOffset, separator.sourcePoint.y, xOffset, separator.targetPoint.y, this.formatMeasurement(this.convertPixelsToSelectedUnit(distance)), false);
        break;
      case 'Separator4':
        distance = Math.abs(separator.targetPoint.x - separator.sourcePoint.x);
        yOffset = wallOuterTop.sourcePoint.y - 20;
        this.createDimensionConnector(separator.id + 'Measurement', separator.sourcePoint.x, yOffset, separator.targetPoint.x, yOffset, this.formatMeasurement(this.convertPixelsToSelectedUnit(distance)), true);
        break;
      case 'Separator2':
        distance = Math.abs(separator.targetPoint.y - separator.sourcePoint.y);
        xOffset = wallOuterRight.sourcePoint.x + 30;
        this.createDimensionConnector(separator.id + 'Measurement', xOffset, separator.sourcePoint.y, xOffset, separator.targetPoint.y, this.formatMeasurement(this.convertPixelsToSelectedUnit(distance)), false);
        break;
      case 'RestroomSeparator':
        distance = Math.abs(separator.targetPoint.y - separator.sourcePoint.y);
        xOffset = wallOuterRight.sourcePoint.x + 60;
        this.createDimensionConnector(separator.id + 'Measurement', xOffset, separator.sourcePoint.y, xOffset, separator.targetPoint.y, this.formatMeasurement(this.convertPixelsToSelectedUnit(distance)), false);
        break;
    }
  }

  private formatMeasurement(value: number): string {
    return value.toFixed(1) + ' ' + this.selectedUnit;
  }

  private convertPixelsToSelectedUnit(pixelValue: number): number {
    switch (this.selectedUnit) {
      case 'ft':
        return pixelValue / 96.0;
      case 'in':
        return pixelValue / 8.0;
      case 'cm':
        return pixelValue / 3.15;
      default:
        return pixelValue / 96.0;
    }
  }

  private convertBetweenUnits(value: number, fromUnit: string, toUnit: string): number {
    if (fromUnit === toUnit) return value;
    let inchValue: number;
    switch (fromUnit) {
      case 'ft':
        inchValue = value * 12.0;
        break;
      case 'cm':
        inchValue = value / 2.54;
        break;
      default:
        inchValue = value; 
    }
    switch (toUnit) {
      case 'ft':
        return inchValue / 12.0;
      case 'cm':
        return inchValue * 2.54;
      default:
        return inchValue;
    }
  }

  private updateConnectorAnnotationsFromStoredDistances(): void {
    if (!this.diagram.connectors) return;
    this.diagram.connectors.forEach((connector: ConnectorModel) => {
      if (
        connector.id.includes('Measurement') &&
        connector.annotations &&
        connector.annotations.length > 0
      ) {
        let content = connector.annotations[0].content as string;
        let parts = content.split(' ');
        if (parts.length > 1) {
          let value = parseFloat(parts[0]);
          let currentUnit = parts[1];
          let convertedValue = this.convertBetweenUnits(
            value,
            currentUnit,
            this.selectedUnit
          );
          (connector.annotations[0] as AnnotationModel).content = this.formatMeasurement(convertedValue);
        }
      }
    });
  }

  private updateDimensionConnectors(movedConnector: ConnectorModel): void {
    let id: string = movedConnector.id;
    if (
      id.startsWith('Separator') ||
      id === 'RestroomSeparator' ||
      id === 'HallSeparator'
    ) {
      let measurementId = id + 'Measurement';
      let dimConnector = this.diagram.getObject(measurementId) as ConnectorModel;
      let extStartConnector = this.diagram.getObject(measurementId + '_ExtStart') as ConnectorModel;
      let extEndConnector = this.diagram.getObject(measurementId + '_ExtEnd') as ConnectorModel;

      if (!dimConnector || !extStartConnector || !extEndConnector) return;

      let wallOuterTop = this.diagram.getObject('WallOuterTop') as ConnectorModel;
      let wallOuterBottom = this.diagram.getObject('WallOuterBottom') as ConnectorModel;
      let wallOuterRight = this.diagram.getObject('WallOuterRight') as ConnectorModel;
      let startX: number, startY: number, endX: number, endY: number, distance: number, isHorizontal: boolean;

      switch (id) {
        case 'Separator1':
          distance = Math.abs(movedConnector.targetPoint.x - movedConnector.sourcePoint.x);
          startX = movedConnector.sourcePoint.x;
          endX = movedConnector.targetPoint.x;
          startY = endY = wallOuterBottom.sourcePoint.y + 40;
          isHorizontal = true;
          break;
        case 'Separator3':
          distance = Math.abs(movedConnector.targetPoint.x - movedConnector.sourcePoint.x);
          startX = movedConnector.sourcePoint.x;
          endX = movedConnector.targetPoint.x;
          startY = endY = wallOuterBottom.sourcePoint.y + 20;
          isHorizontal = true;
          break;
        case 'HallSeparator':
          distance = Math.abs(movedConnector.targetPoint.y - movedConnector.sourcePoint.y);
          startY = movedConnector.sourcePoint.y;
          endY = movedConnector.targetPoint.y;
          startX = endX = 270;
          isHorizontal = false;
          break;
        case 'Separator4':
          distance = Math.abs(movedConnector.targetPoint.x - movedConnector.sourcePoint.x);
          startX = movedConnector.sourcePoint.x;
          endX = movedConnector.targetPoint.x;
          startY = endY = wallOuterTop.sourcePoint.y - 20;
          isHorizontal = true;
          break;
        case 'Separator2':
          distance = Math.abs(movedConnector.targetPoint.y - movedConnector.sourcePoint.y);
          startY = movedConnector.sourcePoint.y;
          endY = movedConnector.targetPoint.y;
          startX = endX = wallOuterRight.sourcePoint.x + 30;
          isHorizontal = false;
          break;
        case 'RestroomSeparator':
          distance = Math.abs(movedConnector.targetPoint.y - movedConnector.sourcePoint.y);
          startY = movedConnector.sourcePoint.y;
          endY = movedConnector.targetPoint.y;
          startX = endX = wallOuterRight.sourcePoint.x + 60;
          isHorizontal = false;
          break;
        default:
          return;
      }

      dimConnector.sourcePoint = { x: startX, y: startY };
      dimConnector.targetPoint = { x: endX, y: endY };
      (dimConnector.annotations![0] as AnnotationModel).content = this.formatMeasurement(
        this.convertPixelsToSelectedUnit(distance)
      );

      if (isHorizontal) {
        extStartConnector.sourcePoint = { x: startX, y: startY - 10 };
        extStartConnector.targetPoint = { x: startX, y: startY + 10 };
        extEndConnector.sourcePoint = { x: endX, y: endY - 10 };
        extEndConnector.targetPoint = { x: endX, y: endY + 10 };
      } else {
        extStartConnector.sourcePoint = { x: startX - 10, y: startY };
        extStartConnector.targetPoint = { x: startX + 10, y: startY };
        extEndConnector.sourcePoint = { x: endX - 10, y: endY };
        extEndConnector.targetPoint = { x: endX + 10, y: endY };
      }

      this.diagram.dataBind();
    }
  }

  public created(): void {
    this.diagramCreated = true;
    this.diagram.fitToPage();
  }
  
  public diagramLoad(): void {
    if (this.diagramCreated) {
        setTimeout(() => this.diagram.fitToPage(), 100);
    }
  }
}