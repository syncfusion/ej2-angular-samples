import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import {
  DiagramComponent,
  DiagramModule
} from '@syncfusion/ej2-angular-diagrams';
import {
  Diagram,
  NodeModel,
  ShapeAnnotationModel,
  BasicShapeModel,
  SnapConstraints,
  NodeConstraints,
  DiagramTools,
  PointModel,
  randomId,
  MouseEventArgs,
  SelectorConstraints,
  ConnectorModel,
  ConnectorConstraints,
  SnapSettingsModel,
  DiagramConstraints
} from '@syncfusion/ej2-diagrams';

import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

// Interface for element data
interface Element {
  atomicNumber?: number;
  atomicMass?: number;
  symbol: string;
  name: string;
  period: number;
  group: number;
  category: string;
  block?: string;
}

@Component({
    selector: 'control-content',
    templateUrl: 'periodic-table.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})
export class PeriodicTableComponent implements OnInit {
  @ViewChild('diagram')
  public diagram: DiagramComponent;
  public constraints: DiagramConstraints = DiagramConstraints.Default &~ DiagramConstraints.UndoRedo;

  public nodes: NodeModel[] = [];
  public connectors: ConnectorModel[] = [];
  public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
  public tool = DiagramTools.SingleSelect;
  public selectedItems = { constraints: SelectorConstraints.None };

  // Element categories and their corresponding colors
  private categoryColors: { [key: string]: string } = {
    'alkali-metals': '#006AC7',
    'alkaline-earth-metals': '#08970E',
    'transition-metals': '#F08000',
    'other-metals': '#B75A09',
    'metalloids': '#95B506',
    'non-metals': '#DE2362',
    'halogens': '#DE2723',
    'noble-gases': '#0B98A9',
    'lanthanides': '#5C1FA8',
    'actinides': '#8C04A1',
  };

  // Configuration constants
  private readonly CELL_WIDTH: number = 60;
  private readonly CELL_HEIGHT: number = 60;
  private readonly CELL_SPACING: number = 10;
  private readonly START_X: number = 50;
  private readonly START_Y: number = 50;

  // Periodic table data
  private periodicTableData: Element[] = [
    // Period 1
    { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', period: 1, group: 1, category: 'non-metals', atomicMass: 1.008 },
    { atomicNumber: 2, symbol: 'He', name: 'Helium', period: 1, group: 18, category: 'noble-gases', atomicMass: 4.0026 },

    // Period 2
    { atomicNumber: 3, symbol: 'Li', name: 'Lithium', period: 2, group: 1, category: 'alkali-metals', atomicMass: 6.94 },
    { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', period: 2, group: 2, category: 'alkaline-earth-metals', atomicMass: 9.0122 },
    { atomicNumber: 5, symbol: 'B', name: 'Boron', period: 2, group: 13, category: 'metalloids', atomicMass: 10.81 },
    { atomicNumber: 6, symbol: 'C', name: 'Carbon', period: 2, group: 14, category: 'non-metals', atomicMass: 12.011 },
    { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', period: 2, group: 15, category: 'non-metals', atomicMass: 14.007 },
    { atomicNumber: 8, symbol: 'O', name: 'Oxygen', period: 2, group: 16, category: 'non-metals', atomicMass: 15.999 },
    { atomicNumber: 9, symbol: 'F', name: 'Fluorine', period: 2, group: 17, category: 'halogens', atomicMass: 18.998 },
    { atomicNumber: 10, symbol: 'Ne', name: 'Neon', period: 2, group: 18, category: 'noble-gases', atomicMass: 20.18 },

    // Period 3
    { atomicNumber: 11, symbol: 'Na', name: 'Sodium', period: 3, group: 1, category: 'alkali-metals', atomicMass: 22.99 },
    { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', period: 3, group: 2, category: 'alkaline-earth-metals', atomicMass: 24.305 },
    { atomicNumber: 13, symbol: 'Al', name: 'Aluminum', period: 3, group: 13, category: 'other-metals', atomicMass: 26.982 },
    { atomicNumber: 14, symbol: 'Si', name: 'Silicon', period: 3, group: 14, category: 'metalloids', atomicMass: 28.085 },
    { atomicNumber: 15, symbol: 'P', name: 'Phosphorus', period: 3, group: 15, category: 'non-metals', atomicMass: 30.974 },
    { atomicNumber: 16, symbol: 'S', name: 'Sulfur', period: 3, group: 16, category: 'non-metals', atomicMass: 32.06 },
    { atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', period: 3, group: 17, category: 'halogens', atomicMass: 35.45 },
    { atomicNumber: 18, symbol: 'Ar', name: 'Argon', period: 3, group: 18, category: 'noble-gases', atomicMass: 39.948 },

    // Period 4
    { atomicNumber: 19, symbol: 'K', name: 'Potassium', period: 4, group: 1, category: 'alkali-metals', atomicMass: 39.098 },
    { atomicNumber: 20, symbol: 'Ca', name: 'Calcium', period: 4, group: 2, category: 'alkaline-earth-metals', atomicMass: 40.078 },
    { atomicNumber: 21, symbol: 'Sc', name: 'Scandium', period: 4, group: 3, category: 'transition-metals', atomicMass: 44.956 },
    { atomicNumber: 22, symbol: 'Ti', name: 'Titanium', period: 4, group: 4, category: 'transition-metals', atomicMass: 47.867 },
    { atomicNumber: 23, symbol: 'V', name: 'Vanadium', period: 4, group: 5, category: 'transition-metals', atomicMass: 50.942 },
    { atomicNumber: 24, symbol: 'Cr', name: 'Chromium', period: 4, group: 6, category: 'transition-metals', atomicMass: 51.996 },
    { atomicNumber: 25, symbol: 'Mn', name: 'Manganese', period: 4, group: 7, category: 'transition-metals', atomicMass: 54.938 },
    { atomicNumber: 26, symbol: 'Fe', name: 'Iron', period: 4, group: 8, category: 'transition-metals', atomicMass: 55.845 },
    { atomicNumber: 27, symbol: 'Co', name: 'Cobalt', period: 4, group: 9, category: 'transition-metals', atomicMass: 58.933 },
    { atomicNumber: 28, symbol: 'Ni', name: 'Nickel', period: 4, group: 10, category: 'transition-metals', atomicMass: 58.693 },
    { atomicNumber: 29, symbol: 'Cu', name: 'Copper', period: 4, group: 11, category: 'transition-metals', atomicMass: 63.546 },
    { atomicNumber: 30, symbol: 'Zn', name: 'Zinc', period: 4, group: 12, category: 'transition-metals', atomicMass: 65.38 },
    { atomicNumber: 31, symbol: 'Ga', name: 'Gallium', period: 4, group: 13, category: 'other-metals', atomicMass: 69.723 },
    { atomicNumber: 32, symbol: 'Ge', name: 'Germanium', period: 4, group: 14, category: 'metalloids', atomicMass: 72.63 },
    { atomicNumber: 33, symbol: 'As', name: 'Arsenic', period: 4, group: 15, category: 'metalloids', atomicMass: 74.922 },
    { atomicNumber: 34, symbol: 'Se', name: 'Selenium', period: 4, group: 16, category: 'non-metals', atomicMass: 78.971 },
    { atomicNumber: 35, symbol: 'Br', name: 'Bromine', period: 4, group: 17, category: 'halogens', atomicMass: 79.904 },
    { atomicNumber: 36, symbol: 'Kr', name: 'Krypton', period: 4, group: 18, category: 'noble-gases', atomicMass: 83.798 },

    // Period 5
    { atomicNumber: 37, symbol: 'Rb', name: 'Rubidium', period: 5, group: 1, category: 'alkali-metals', atomicMass: 85.468 },
    { atomicNumber: 38, symbol: 'Sr', name: 'Strontium', period: 5, group: 2, category: 'alkaline-earth-metals', atomicMass: 87.62 },
    { atomicNumber: 39, symbol: 'Y', name: 'Yttrium', period: 5, group: 3, category: 'transition-metals', atomicMass: 88.906 },
    { atomicNumber: 40, symbol: 'Zr', name: 'Zirconium', period: 5, group: 4, category: 'transition-metals', atomicMass: 91.224 },
    { atomicNumber: 41, symbol: 'Nb', name: 'Niobium', period: 5, group: 5, category: 'transition-metals', atomicMass: 92.906 },
    { atomicNumber: 42, symbol: 'Mo', name: 'Molybdenum', period: 5, group: 6, category: 'transition-metals', atomicMass: 95.95 },
    { atomicNumber: 43, symbol: 'Tc', name: 'Technetium', period: 5, group: 7, category: 'transition-metals', atomicMass: 98.0 },
    { atomicNumber: 44, symbol: 'Ru', name: 'Ruthenium', period: 5, group: 8, category: 'transition-metals', atomicMass: 101.07 },
    { atomicNumber: 45, symbol: 'Rh', name: 'Rhodium', period: 5, group: 9, category: 'transition-metals', atomicMass: 102.91 },
    { atomicNumber: 46, symbol: 'Pd', name: 'Palladium', period: 5, group: 10, category: 'transition-metals', atomicMass: 106.42 },
    { atomicNumber: 47, symbol: 'Ag', name: 'Silver', period: 5, group: 11, category: 'transition-metals', atomicMass: 107.87 },
    { atomicNumber: 48, symbol: 'Cd', name: 'Cadmium', period: 5, group: 12, category: 'transition-metals', atomicMass: 112.41 },
    { atomicNumber: 49, symbol: 'In', name: 'Indium', period: 5, group: 13, category: 'other-metals', atomicMass: 114.82 },
    { atomicNumber: 50, symbol: 'Sn', name: 'Tin', period: 5, group: 14, category: 'other-metals', atomicMass: 118.71 },
    { atomicNumber: 51, symbol: 'Sb', name: 'Antimony', period: 5, group: 15, category: 'metalloids', atomicMass: 121.76 },
    { atomicNumber: 52, symbol: 'Te', name: 'Tellurium', period: 5, group: 16, category: 'metalloids', atomicMass: 127.6 },
    { atomicNumber: 53, symbol: 'I', name: 'Iodine', period: 5, group: 17, category: 'halogens', atomicMass: 126.9 },
    { atomicNumber: 54, symbol: 'Xe', name: 'Xenon', period: 5, group: 18, category: 'noble-gases', atomicMass: 131.29 },

    // Period 6
    { atomicNumber: 55, symbol: 'Cs', name: 'Cesium', period: 6, group: 1, category: 'alkali-metals', atomicMass: 132.91 },
    { atomicNumber: 56, symbol: 'Ba', name: 'Barium', period: 6, group: 2, category: 'alkaline-earth-metals', atomicMass: 137.33 },
    { symbol: '57-71', name: 'Lanthanides', period: 6, group: 3, category: 'lanthanides' },
    { atomicNumber: 72, symbol: 'Hf', name: 'Hafnium', period: 6, group: 4, category: 'transition-metals', atomicMass: 178.49 },
    { atomicNumber: 73, symbol: 'Ta', name: 'Tantalum', period: 6, group: 5, category: 'transition-metals', atomicMass: 180.95 },
    { atomicNumber: 74, symbol: 'W', name: 'Tungsten', period: 6, group: 6, category: 'transition-metals', atomicMass: 183.84 },
    { atomicNumber: 75, symbol: 'Re', name: 'Rhenium', period: 6, group: 7, category: 'transition-metals', atomicMass: 186.21 },
    { atomicNumber: 76, symbol: 'Os', name: 'Osmium', period: 6, group: 8, category: 'transition-metals', atomicMass: 190.23 },
    { atomicNumber: 77, symbol: 'Ir', name: 'Iridium', period: 6, group: 9, category: 'transition-metals', atomicMass: 192.22 },
    { atomicNumber: 78, symbol: 'Pt', name: 'Platinum', period: 6, group: 10, category: 'transition-metals', atomicMass: 195.08 },
    { atomicNumber: 79, symbol: 'Au', name: 'Gold', period: 6, group: 11, category: 'transition-metals', atomicMass: 196.97 },
    { atomicNumber: 80, symbol: 'Hg', name: 'Mercury', period: 6, group: 12, category: 'transition-metals', atomicMass: 200.59 },
    { atomicNumber: 81, symbol: 'Tl', name: 'Thallium', period: 6, group: 13, category: 'other-metals', atomicMass: 204.38 },
    { atomicNumber: 82, symbol: 'Pb', name: 'Lead', period: 6, group: 14, category: 'other-metals', atomicMass: 207.2 },
    { atomicNumber: 83, symbol: 'Bi', name: 'Bismuth', period: 6, group: 15, category: 'other-metals', atomicMass: 208.98 },
    { atomicNumber: 84, symbol: 'Po', name: 'Polonium', period: 6, group: 16, category: 'metalloids', atomicMass: 209.0 },
    { atomicNumber: 85, symbol: 'At', name: 'Astatine', period: 6, group: 17, category: 'halogens', atomicMass: 210.0 },
    { atomicNumber: 86, symbol: 'Rn', name: 'Radon', period: 6, group: 18, category: 'noble-gases', atomicMass: 222.0 },

    // Period 7
    { atomicNumber: 87, symbol: 'Fr', name: 'Francium', period: 7, group: 1, category: 'alkali-metals', atomicMass: 223.0 },
    { atomicNumber: 88, symbol: 'Ra', name: 'Radium', period: 7, group: 2, category: 'alkaline-earth-metals', atomicMass: 226.0 },
    { symbol: '89-103', name: 'Actinides', period: 7, group: 3, category: 'actinides' },
    { atomicNumber: 104, symbol: 'Rf', name: 'Rutherfordium', period: 7, group: 4, category: 'transition-metals', atomicMass: 267.0 },
    { atomicNumber: 105, symbol: 'Db', name: 'Dubnium', period: 7, group: 5, category: 'transition-metals', atomicMass: 270.0 },
    { atomicNumber: 106, symbol: 'Sg', name: 'Seaborgium', period: 7, group: 6, category: 'transition-metals', atomicMass: 271.0 },
    { atomicNumber: 107, symbol: 'Bh', name: 'Bohrium', period: 7, group: 7, category: 'transition-metals', atomicMass: 270.0 },
    { atomicNumber: 108, symbol: 'Hs', name: 'Hassium', period: 7, group: 8, category: 'transition-metals', atomicMass: 277.0 },
    { atomicNumber: 109, symbol: 'Mt', name: 'Meitnerium', period: 7, group: 9, category: 'transition-metals', atomicMass: 276.0 },
    { atomicNumber: 110, symbol: 'Ds', name: 'Darmstadtium', period: 7, group: 10, category: 'transition-metals', atomicMass: 281.0 },
    { atomicNumber: 111, symbol: 'Rg', name: 'Roentgenium', period: 7, group: 11, category: 'transition-metals', atomicMass: 282.0 },
    { atomicNumber: 112, symbol: 'Cn', name: 'Copernicium', period: 7, group: 12, category: 'transition-metals', atomicMass: 285.0 },
    { atomicNumber: 113, symbol: 'Nh', name: 'Nihonium', period: 7, group: 13, category: 'other-metals', atomicMass: 286.0 },
    { atomicNumber: 114, symbol: 'Fl', name: 'Flerovium', period: 7, group: 14, category: 'other-metals', atomicMass: 289.0 },
    { atomicNumber: 115, symbol: 'Mc', name: 'Moscovium', period: 7, group: 15, category: 'other-metals', atomicMass: 290.0 },
    { atomicNumber: 116, symbol: 'Lv', name: 'Livermorium', period: 7, group: 16, category: 'other-metals', atomicMass: 293.0 },
    { atomicNumber: 117, symbol: 'Ts', name: 'Tennessine', period: 7, group: 17, category: 'halogens', atomicMass: 294.0 },
    { atomicNumber: 118, symbol: 'Og', name: 'Oganesson', period: 7, group: 18, category: 'noble-gases', atomicMass: 294.0 },

    // Lanthanides (Period 6, separate row)
    { atomicNumber: 57, symbol: 'La', name: 'Lanthanum', period: 6, group: 3, category: 'lanthanides', atomicMass: 138.91, block: 'f' },
    { atomicNumber: 58, symbol: 'Ce', name: 'Cerium', period: 6, group: 4, category: 'lanthanides', atomicMass: 140.12, block: 'f' },
    { atomicNumber: 59, symbol: 'Pr', name: 'Praseodymium', period: 6, group: 5, category: 'lanthanides', atomicMass: 140.91, block: 'f' },
    { atomicNumber: 60, symbol: 'Nd', name: 'Neodymium', period: 6, group: 6, category: 'lanthanides', atomicMass: 144.24, block: 'f' },
    { atomicNumber: 61, symbol: 'Pm', name: 'Promethium', period: 6, group: 7, category: 'lanthanides', atomicMass: 145.0, block: 'f' },
    { atomicNumber: 62, symbol: 'Sm', name: 'Samarium', period: 6, group: 8, category: 'lanthanides', atomicMass: 150.36, block: 'f' },
    { atomicNumber: 63, symbol: 'Eu', name: 'Europium', period: 6, group: 9, category: 'lanthanides', atomicMass: 151.96, block: 'f' },
    { atomicNumber: 64, symbol: 'Gd', name: 'Gadolinium', period: 6, group: 10, category: 'lanthanides', atomicMass: 157.25, block: 'f' },
    { atomicNumber: 65, symbol: 'Tb', name: 'Terbium', period: 6, group: 11, category: 'lanthanides', atomicMass: 158.93, block: 'f' },
    { atomicNumber: 66, symbol: 'Dy', name: 'Dysprosium', period: 6, group: 12, category: 'lanthanides', atomicMass: 162.5, block: 'f' },
    { atomicNumber: 67, symbol: 'Ho', name: 'Holmium', period: 6, group: 13, category: 'lanthanides', atomicMass: 164.93, block: 'f' },
    { atomicNumber: 68, symbol: 'Er', name: 'Erbium', period: 6, group: 14, category: 'lanthanides', atomicMass: 167.26, block: 'f' },
    { atomicNumber: 69, symbol: 'Tm', name: 'Thulium', period: 6, group: 15, category: 'lanthanides', atomicMass: 168.93, block: 'f' },
    { atomicNumber: 70, symbol: 'Yb', name: 'Ytterbium', period: 6, group: 16, category: 'lanthanides', atomicMass: 173.05, block: 'f' },
    { atomicNumber: 71, symbol: 'Lu', name: 'Lutetium', period: 6, group: 17, category: 'lanthanides', atomicMass: 174.97, block: 'f' },

    // Actinides (Period 7, separate row)
    { atomicNumber: 89, symbol: 'Ac', name: 'Actinium', period: 7, group: 3, category: 'actinides', atomicMass: 227.0, block: 'f' },
    { atomicNumber: 90, symbol: 'Th', name: 'Thorium', period: 7, group: 4, category: 'actinides', atomicMass: 232.04, block: 'f' },
    { atomicNumber: 91, symbol: 'Pa', name: 'Protactinium', period: 7, group: 5, category: 'actinides', atomicMass: 231.04, block: 'f' },
    { atomicNumber: 92, symbol: 'U', name: 'Uranium', period: 7, group: 6, category: 'actinides', atomicMass: 238.03, block: 'f' },
    { atomicNumber: 93, symbol: 'Np', name: 'Neptunium', period: 7, group: 7, category: 'actinides', atomicMass: 237.0, block: 'f' },
    { atomicNumber: 94, symbol: 'Pu', name: 'Plutonium', period: 7, group: 8, category: 'actinides', atomicMass: 244.0, block: 'f' },
    { atomicNumber: 95, symbol: 'Am', name: 'Americium', period: 7, group: 9, category: 'actinides', atomicMass: 243.0, block: 'f' },
    { atomicNumber: 96, symbol: 'Cm', name: 'Curium', period: 7, group: 10, category: 'actinides', atomicMass: 247.0, block: 'f' },
    { atomicNumber: 97, symbol: 'Bk', name: 'Berkelium', period: 7, group: 11, category: 'actinides', atomicMass: 247.0, block: 'f' },
    { atomicNumber: 98, symbol: 'Cf', name: 'Californium', period: 7, group: 12, category: 'actinides', atomicMass: 251.0, block: 'f' },
    { atomicNumber: 99, symbol: 'Es', name: 'Einsteinium', period: 7, group: 13, category: 'actinides', atomicMass: 252.0, block: 'f' },
    { atomicNumber: 100, symbol: 'Fm', name: 'Fermium', period: 7, group: 14, category: 'actinides', atomicMass: 257.0, block: 'f' },
    { atomicNumber: 101, symbol: 'Md', name: 'Mendelevium', period: 7, group: 15, category: 'actinides', atomicMass: 258.0, block: 'f' },
    { atomicNumber: 102, symbol: 'No', name: 'Nobelium', period: 7, group: 16, category: 'actinides', atomicMass: 259.0, block: 'f' },
    { atomicNumber: 103, symbol: 'Lr', name: 'Lawrencium', period: 7, group: 17, category: 'actinides', atomicMass: 262.0, block: 'f' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.initPeriodicTable();
  }

  // Function to calculate position based on period and group
  private calculatePosition(period: number, group: number, fblock: boolean): PointModel {
    let x: number = this.START_X + (group - 1) * (this.CELL_WIDTH + this.CELL_SPACING);
    let y: number = this.START_Y + (period - 1) * (this.CELL_HEIGHT + this.CELL_SPACING);
    if (fblock) {
      y += (2 * (this.CELL_HEIGHT + this.CELL_SPACING)) + this.CELL_HEIGHT / 2;
    }
    return { x: x, y: y };
  }

  // Function to create an element node
  private createElementNode(element: Element): NodeModel {
    const position: PointModel = this.calculatePosition(element.period, element.group, element.block === 'f');
    const color: string = this.categoryColors[element.category];
    const id: string = element.atomicNumber ? element.atomicNumber.toString() : randomId();
    
    const annotations: ShapeAnnotationModel[] = [
      // Atomic number annotation (top-left)
      {
        content: element.atomicNumber ? element.atomicNumber.toString() : '',
        offset: { x: 0.15, y: 0.2 },
        style: {
          fontSize: 11,
          fontFamily: 'Roboto',
          color: '#FFFFFF',
        }
      },
      // Element symbol annotation (center)
      {
        content: element.symbol,
        offset: { x: 0.5, y: 0.5 },
        style: {
          fontSize: 16,
          fontFamily: 'Roboto',
          color: '#FFFFFF',
          bold: true
        }
      },
      // Element name annotation (bottom)
      {
        content: element.name,
        offset: { x: 0.5, y: 0.85 },
        style: {
          fontSize: 11,
          fontFamily: 'Roboto',
          color: '#FFFFFF',
          textOverflow: 'Ellipsis',
          textWrapping: 'NoWrap',
        }
      },
      // Atomic mass annotation (top-right)
      {
        content: element.atomicMass ? element.atomicMass.toString() : '',
        offset: { x: 0.75, y: 0.2 },
        style: {
          fontSize: 11,
          fontFamily: 'Roboto',
          color: '#FFFFFF',
        },
        visibility: false
      }
    ];

    const node: NodeModel = {
      id: `element_${id}`,
      offsetX: position.x! + this.CELL_WIDTH / 2,
      offsetY: position.y! + this.CELL_HEIGHT / 2,
      width: this.CELL_WIDTH,
      height: this.CELL_HEIGHT,
      shape: {
        type: 'Basic',
        shape: 'Rectangle',
        cornerRadius: 5
      } as BasicShapeModel,
      annotations: annotations,
      constraints: (NodeConstraints.Default | NodeConstraints.ReadOnly) & ~NodeConstraints.Select,
      style: { fill: color },
      addInfo: element
    };

    return node;
  }

  // Function to create legend nodes
  private createLegendNodes(): NodeModel[] {
    const legendData: { category: string, label: string; }[] = [
      { category: 'alkali-metals', label: 'Alkali metals' },
      { category: 'alkaline-earth-metals', label: 'Alkaline earth metals' },
      { category: 'transition-metals', label: 'Transition metals' },
      { category: 'other-metals', label: 'Other metals' },
      { category: 'metalloids', label: 'Metalloids' },
      { category: 'non-metals', label: 'Non-metals' },
      { category: 'halogens', label: 'Halogens' },
      { category: 'noble-gases', label: 'Noble gases' },
      { category: 'lanthanides', label: 'Lanthanides' },
      { category: 'actinides', label: 'Actinides' },
    ];

    const legendNodes: NodeModel[] = [];
    const tableWidth = 19 * (this.CELL_WIDTH + this.CELL_SPACING);
    const tableCenterX = this.START_X + tableWidth / 2;
    const legendItemWidth = 170;
    const legendItemHeight = 20;
    const legendSpacing = 10;
    const legendRowItems = 5;
    const totalLegendWidth = legendRowItems * legendItemWidth + (legendRowItems - 1) * legendSpacing;
    const legendStartY: number = this.START_Y + 10 * (this.CELL_HEIGHT + this.CELL_SPACING) + 20;
    const legendStartX = tableCenterX - totalLegendWidth / 2;

    legendData.forEach((item, index) => {
      const row: number = Math.floor(index / 5);
      const col: number = index % 5;
      const x: number = legendStartX + col * (legendItemWidth + legendSpacing);
      const y: number = legendStartY + row * (legendItemHeight + legendSpacing);

      // Color indicator
      const colorNode: NodeModel = {
        id: `legend_color_${index}`,
        offsetX: x + 10,
        offsetY: y + legendItemHeight / 2,
        width: 20,
        height: 20,
        constraints: NodeConstraints.None,
        shape: {
          type: 'Basic',
          shape: 'Ellipse'
        } as BasicShapeModel,
        style: {
          fill: this.categoryColors[item.category],
          strokeColor: '#444444',
          strokeWidth: 1
        }
      };

      // Label
      const labelNode: NodeModel = {
        id: `legend_label_${index}`,
        offsetX: x + 90,
        offsetY: y + legendItemHeight / 2,
        width: 140,
        height: legendItemHeight,
        constraints: NodeConstraints.None,
        shape: {
          type: 'Text',
          content: item.label,
        },
        style: {
          fill: 'transparent',
          fontSize: 14,
          fontFamily: 'Roboto',
          color: '#212121'
        }
      };

      legendNodes.push(colorNode, labelNode);
    });

    return legendNodes;
  }

  // Function to create group & period numbers
  private createRowsColumns(): NodeModel[] {
    const nodes: NodeModel[] = [];
    
    const period: NodeModel = {
      id: 'PERIOD',
      offsetX: this.START_X - (this.CELL_WIDTH + this.CELL_SPACING) / 2 - 10,
      offsetY: this.START_Y + (this.CELL_HEIGHT + this.CELL_SPACING) / 2 - 30,
      rotateAngle: 270,
      constraints: NodeConstraints.None,
      shape: {
        type: 'Text',
        content: 'PERIOD'
      },
      style: {
        fill: 'transparent',
        fontFamily: 'Roboto',
        bold: true
      },
    };
    nodes.push(period);
    
    const group: NodeModel = {
      id: 'GROUP',
      offsetX: this.START_X,
      offsetY: this.START_Y - (this.CELL_HEIGHT + this.CELL_SPACING) / 2 - 30,
      constraints: NodeConstraints.None,
      shape: {
        type: 'Text',
        content: 'GROUP'
      },
      style: {
        fill: 'transparent',
        fontFamily: 'Roboto',
        bold: true
      },
    };
    nodes.push(group);

    for (let period: number = 0; period < 7; period++) {
      const node: NodeModel = {
        id: 'PERIOD_' + period,
        offsetX: this.START_X - (this.CELL_WIDTH + this.CELL_SPACING) / 3,
        offsetY: (this.START_Y + period * (this.CELL_HEIGHT + this.CELL_SPACING)) + this.CELL_HEIGHT / 2,
        width: this.CELL_WIDTH / 3,
        height: this.CELL_HEIGHT,
        shape: {
          type: 'Text',
          content: (period + 1).toString()
        },
        style: {
          fontSize: 14,
          color: '#424242',
          fill: period % 2 ? '#fbfcff' : '#dfe6f3',
          fontFamily: 'Roboto',
        },
        borderWidth: 1,
        borderColor: '#d0d7e2',
        constraints: NodeConstraints.Select | NodeConstraints.PointerEvents | NodeConstraints.ReadOnly,
        addInfo: { label: 'PERIOD', cellValue: period + 1 }
      };
      nodes.push(node);
    }
    
    for (let group: number = 0; group < 18; group++) {
      const node: NodeModel = {
        id: 'GROUP_' + group,
        offsetX: this.START_X + group * (this.CELL_WIDTH + this.CELL_SPACING) + this.CELL_WIDTH / 2,
        offsetY: this.START_Y - (this.CELL_HEIGHT + this.CELL_SPACING) / 2 - 10,
        width: this.CELL_WIDTH,
        height: this.CELL_HEIGHT / 3,
        shape: {
          type: 'Text',
          content: (group + 1).toString()
        },
        style: {
          fontSize: 14,
          color: '#424242',
          fill: group % 2 ? '#fbfcff' : '#dfe6f3',
          fontFamily: 'Roboto',
        },
        borderWidth: 1,
        borderColor: '#d0d7e2',
        constraints: NodeConstraints.Select | NodeConstraints.PointerEvents| NodeConstraints.ReadOnly,
        addInfo: { label: 'GROUP', cellValue: group + 1 }
      };
      nodes.push(node);
    }
    return nodes;
  }

  // function to create block label nodes
  private createBlock(): NodeModel[] {
    const nodes: NodeModel[] = [
      {
        id: 'p_block',
        offsetX: this.START_X + 15 * (this.CELL_WIDTH + this.CELL_SPACING) - 5,
        offsetY: this.START_Y - 19,
        width: 70, height: 15,
        constraints: NodeConstraints.None,
        shape: {
          type: 'Text',
          content: 'P Block'
        },
        style: {
          fill: 'transparent',
          color: '#555555',
          bold: true,
          fontSize: 16
        },
        ports: [
          {
            id: 'port1',
            offset: { x: 0, y: 0.5 }
          },
          {
            id: 'port2',
            offset: { x: 1, y: 0.5 }
          }
        ]
      },
      {
        id: 's_block',
        offsetX: this.START_X + (this.CELL_WIDTH + this.CELL_SPACING) - 5,
        offsetY: this.START_Y - 19,
        width: 70, height: 15,
        constraints: NodeConstraints.None,
        shape: {
          type: 'Text',
          content: 'S Block'
        },
        style: {
          fill: 'transparent',
          bold: true,
          fontSize: 16,
          color: '#555555'
        },
        ports: [
          {
            id: 'port1',
            offset: { x: 0, y: 0.5 }
          },
          {
            id: 'port2',
            offset: { x: 1, y: 0.5 }
          }
        ]
      },
      {
        id: 'd_block',
        offsetX: this.START_X + 7 * (this.CELL_WIDTH + this.CELL_SPACING) - 5,
        offsetY: this.START_Y + 3 * (this.CELL_HEIGHT + this.CELL_SPACING) - 19,
        width: 70, height: 15,
        constraints: NodeConstraints.None,
        shape: {
          type: 'Text',
          content: 'D Block',
        },
        style: {
          fill: 'transparent',
          color: '#555555',
          bold: true,
          fontSize: 16
        },
        ports: [
          {
            id: 'port1',
            offset: { x: 0, y: 0.5 }
          },
          {
            id: 'port2',
            offset: { x: 1, y: 0.5 }
          }
        ]
      },
      {
        id: 'f_block',
        offsetX: this.START_X + 2 * (this.CELL_WIDTH + this.CELL_SPACING) - 25,
        offsetY: this.START_Y + 8.5 * (this.CELL_HEIGHT + this.CELL_SPACING) - 10,
        width: 70, height: 15,
        rotateAngle: 270,
        constraints: NodeConstraints.None,
        shape: {
          type: 'Text',
          content: 'F Block'
        },
        style: {
          fill: 'transparent',
          color: '#555555',
          bold: true,
          fontSize: 16
        },
        ports: [
          {
            id: 'port1',
            offset: { x: 0, y: 0.5 }
          },
          {
            id: 'port2',
            offset: { x: 1, y: 0.5 }
          }
        ]
      },
    ];
    
    this.connectors = [
      {
        sourceID: 'p_block', sourcePortID: 'port1',
        targetPoint: {
          x: this.START_X + 12 * (this.CELL_WIDTH + this.CELL_SPACING),
          y: this.START_Y - 9
        },
        segments: [{ length: 170, direction: 'Left', type:"Orthogonal" },],
      },
      {
        sourceID: 'p_block', sourcePortID: 'port2',
        targetPoint: {
          x: this.START_X + 17 * (this.CELL_WIDTH + this.CELL_SPACING) + this.CELL_WIDTH,
          y: this.START_Y - 9
        },
        segments: [{ length: 170, direction: 'Right', type:"Orthogonal" },],
      },
      {
        sourceID: 's_block', sourcePortID: 'port1',
        targetPoint: {
          x: this.START_X,
          y: this.START_Y - 9
        },
        segments: [{ length: 30, direction: 'Left', type:"Orthogonal" },],
      },
      {
        sourceID: 's_block', sourcePortID: 'port2',
        targetPoint: {
          x: this.START_X + 1 * (this.CELL_WIDTH + this.CELL_SPACING) + this.CELL_WIDTH,
          y: this.START_Y - 9
        },
        segments: [{ length: 30, direction: 'Right', type:"Orthogonal" },],
      },
      {
        sourceID: 'd_block', sourcePortID: 'port1',
        targetPoint: {
          x: this.START_X + 2 * (this.CELL_WIDTH + this.CELL_SPACING),
          y: this.START_Y + 3 * (this.CELL_HEIGHT + this.CELL_SPACING) - 9
        },
        segments: [{ length: 310, direction: 'Left', type:"Orthogonal" },],
      },
      {
        sourceID: 'd_block', sourcePortID: 'port2',
        targetPoint: {
          x: this.START_X + 11 * (this.CELL_WIDTH + this.CELL_SPACING) + this.CELL_WIDTH,
          y: this.START_Y + 3 * (this.CELL_HEIGHT + this.CELL_SPACING) - 9
        },
        segments: [{ length: 310, direction: 'Right', type:"Orthogonal" },],
      },
      {
        sourceID: 'f_block', sourcePortID: 'port1',
        targetPoint: {
          x: this.START_X + 2 * (this.CELL_WIDTH + this.CELL_SPACING) - 10,
          y: 700
        },
        segments: [{ length: 30, direction: 'Bottom', type:"Orthogonal" },],
      },
      {
        sourceID: 'f_block', sourcePortID: 'port2',
        targetPoint: {
          x: this.START_X + 2 * (this.CELL_WIDTH + this.CELL_SPACING) - 10,
          y: 570
        },
        segments: [{ length: 30, direction: 'Top', type:"Orthogonal" },],
      }
    ];
    
    return nodes;
  }

  // Main function to initialize the periodic table diagram
  private initPeriodicTable(): void {
    this.nodes = [];

    // Create element nodes
    this.periodicTableData.forEach(element => {
      this.nodes.push(this.createElementNode(element));
    });

    // Add legend nodes
    this.nodes.push(...this.createLegendNodes());

    // Add row and column numbers
    this.nodes.push(...this.createRowsColumns());

    // Add block labels
    this.nodes.push(...this.createBlock());

    // Add title
    const titleNode: NodeModel = {
      id: 'title',
      offsetX: this.START_X + 9 * (this.CELL_WIDTH + this.CELL_SPACING),
      offsetY: this.START_Y - 100,
      constraints: NodeConstraints.None,
      shape: {
        type: 'Text',
        content: 'Periodic Table of Elements',
      },
      style: {
        fontSize: 24,
        color: '#212121',
        fontFamily: 'Roboto',
        bold: true,
      }
    };
    this.nodes.push(titleNode);
  }

  // Configure default values of connector
  public connectorDefaults = (connector: any) => {
    connector.constraints = ConnectorConstraints.None;
    connector.type = 'Orthogonal';
    connector.style = { strokeColor: '#555555' };
    connector.targetDecorator = { shape: 'None' };
  };

  // Handle Interaction with elements
  public mouseEnter(args: MouseEventArgs): void {
    const element: NodeModel = args.actualObject as NodeModel;
    if (element.shape?.type != 'Text') {
      if (element.annotations!.length > 0) {
        // Toggle atomic mass number visibility
        element.annotations![element.annotations?.length! - 1].visibility = true;
        // scale up the node
        this.diagram.scale(element, 1.25, 1.25, { x: 0.5, y: 0.5 });
        this.diagram.dataBind();
      }
    }
  }

  public mouseLeave(args: MouseEventArgs): void {
    const element: NodeModel = (args as any).element as NodeModel;
    if (element.shape?.type != 'Text') {
      if (element.annotations!.length > 0) {
        // Toggle atomic mass number visibility
        element.annotations![element.annotations?.length! - 1].visibility = false;
        // scale down the node
        this.diagram.scale(element, 1 / 1.25, 1 / 1.25, { x: 0.5, y: 0.5 });
        this.diagram.dataBind();
      }
    }
  }

  // Handle Interaction with Group/Period labels
  public selectionChange(args: any): void {
    if (args.state === 'Changed') {
      const selectednode: NodeModel = args.newValue[0];
      if ((selectednode?.addInfo as any)?.label) {
        const label = (selectednode.addInfo as any).label;
        const cellValue = (selectednode.addInfo as any).cellValue;
        // Highlight Selected Group/Period Elements
        this.diagram.nodes.forEach((node: NodeModel) => {
          const element = node.addInfo as any;
          if (element?.name) {
            node.style.opacity =
              ((label === 'PERIOD' && element.period === cellValue) ||
                (label === 'GROUP' && element.group === cellValue && element.category !== 'lanthanides' && element.category !== 'actinides'))
                ? 1 : 0.3;
          }
        });
      }
      else {
        this.diagram.nodes.forEach(node => node.style.opacity = 1);
      }
    }
  }

  public created(args: any): void {
    this.diagram.fitToPage();
  }

  public load(): void {
    this.diagram.fitToPage();
  }
}