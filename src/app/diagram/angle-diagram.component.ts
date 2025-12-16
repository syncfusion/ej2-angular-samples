import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    DiagramComponent, DiagramModule, NodeModel, NodeConstraints, ConnectorModel, ConnectorConstraints, SnapSettingsModel, SnapConstraints, SelectorConstraints, SelectorModel,
    IRotationEventArgs,
    PageSettingsModel
} from "@syncfusion/ej2-angular-diagrams";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { Annotations, CircularGauge } from "@syncfusion/ej2-circulargauge";
import { Message } from "@syncfusion/ej2-notifications";
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ChangeEventArgs, NumericTextBox } from '@syncfusion/ej2-angular-inputs';

CircularGauge.Inject(Annotations);

interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
  angle: number;
}

interface SolarCalculationData {
    currentAngle: number;
    efficiency: number;
    selectedLocation: string;
    selectedDateTime: Date;
    sunElevation: number;
    sunAzimuth: number;
    optimalTilt: number;
    solarIrradiance: number;
    incidenceAngle: number;
    intPanelAngleDeg: number;
}
@Component({
    selector: 'control-content',
    templateUrl: 'angle-diagram.html',
    styleUrls: ['angle-diagram.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent],
})
export class AngleDiagramComponent {
  @ViewChild('diagram') public diagram: DiagramComponent;

  private locationDropdown: DropDownList;
  private efficiencyGauge: CircularGauge;
  private performanceMessage: Message;
  private angleNumeric: NumericTextBox;
  private suppressAngleChange = false;
  private diagramCreated = false;

  public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
  public selectedItems: SelectorModel = { constraints: SelectorConstraints.Rotate };
  public pageSettings: PageSettingsModel = {
    width: 1300, height: 820,
    background: { source: './assets/diagram/Images/angle/background.png', scale: 'Meet' }
  };

  // Solar calculation data
  private solarData: SolarCalculationData = {
    currentAngle: 303,
    efficiency: 78,
    selectedLocation: 'New York',
    selectedDateTime: new Date(),
    sunElevation: 0,
    sunAzimuth: 0,
    optimalTilt: 0,
    solarIrradiance: 0,
    incidenceAngle: 0,
    intPanelAngleDeg: 0
  };

  // Location data
  private locationData: LocationData[] = [
    { name: 'New York', latitude: 40.7128, longitude: -74.0060, angle: 0 },
    { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437, angle: 25 },
    { name: 'Chicago', latitude: 41.8781, longitude: -87.6298, angle: 50 },
    { name: 'Houston', latitude: 29.7604, longitude: -95.3698, angle: 75 },
    { name: 'Phoenix', latitude: 33.4484, longitude: -112.0740, angle: 100 }
  ];

  // SVGs
  private centerSunSvg: string = '<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">            <g filter="url(#filter0_d_1423_96)">                <circle cx="37.9998" cy="38" r="17.2727" fill="url(#paint0_radial_1423_96)" />            </g>            <g filter="url(#filter1_d_1423_96)">                <path fill-rule="evenodd" clip-rule="evenodd" d="M38.0001 6.33331C36.4102 6.33331 35.1213 7.62219 35.1213 9.2121V14.9697C35.1213 16.5596 36.4102 17.8485 38.0001 17.8485C39.59 17.8485 40.8788 16.5596 40.8788 14.9697V9.2121C40.8788 7.62219 39.59 6.33331 38.0001 6.33331ZM60.3915 15.6082C59.2672 14.484 57.4445 14.484 56.3202 15.6082L52.249 19.6794C51.1248 20.8037 51.1248 22.6264 52.249 23.7507C53.3733 24.8749 55.196 24.8749 56.3203 23.7507L60.3915 19.6794C61.5157 18.5552 61.5157 16.7325 60.3915 15.6082ZM66.7877 35.1212C68.3776 35.1212 69.6665 36.41 69.6665 38C69.6665 39.5899 68.3776 40.8787 66.7877 40.8787H61.0301C59.4402 40.8787 58.1513 39.5899 58.1513 38C58.1513 36.41 59.4402 35.1212 61.0301 35.1212H66.7877ZM15.6077 15.6083C14.4834 16.7326 14.4834 18.5553 15.6077 19.6796L19.6789 23.7508C20.8031 24.875 22.6259 24.875 23.7501 23.7508C24.8744 22.6265 24.8744 20.8038 23.7501 19.6796L19.6789 15.6083C18.5547 14.4841 16.7319 14.4841 15.6077 15.6083ZM35.1213 61.0302C35.1213 59.4403 36.4102 58.1514 38.0001 58.1514C39.59 58.1514 40.8788 59.4403 40.8788 61.0302V66.7878C40.8788 68.3777 39.59 69.6666 38.0001 69.6666C36.4102 69.6666 35.1213 68.3777 35.1213 66.7878V61.0302ZM23.7511 52.2492C22.6269 51.125 20.8041 51.125 19.6799 52.2492L15.6087 56.3204C14.4844 57.4447 14.4844 59.2674 15.6087 60.3917C16.7329 61.5159 18.5557 61.5159 19.6799 60.3917L23.7511 56.3204C24.8754 55.1962 24.8754 53.3735 23.7511 52.2492ZM14.9696 35.1212C16.5595 35.1212 17.8484 36.41 17.8484 38C17.8484 39.5899 16.5595 40.8787 14.9696 40.8787H9.21204C7.62213 40.8787 6.33325 39.5899 6.33325 38C6.33325 36.41 7.62213 35.1212 9.21204 35.1212H14.9696ZM52.2491 52.2492C51.1248 53.3734 51.1248 55.1962 52.2491 56.3204L56.3203 60.3916C57.4445 61.5159 59.2673 61.5159 60.3915 60.3916C61.5157 59.2674 61.5157 57.4447 60.3915 56.3204L56.3203 52.2492C55.196 51.125 53.3733 51.125 52.2491 52.2492Z" fill="url(#paint1_linear_1423_96)" />            </g>            <defs>                <filter id="filter0_d_1423_96" x="16.9271" y="16.9272" width="42.9899" height="42.9899" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">                    <feFlood flood-opacity="0" result="BackgroundImageFix" />                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />                    <feOffset dx="0.422222" dy="0.422222" />                    <feGaussianBlur stdDeviation="2.11111" />                    <feComposite in2="hardAlpha" operator="out" />                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0" />                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1423_96" />                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1423_96" result="shape" />                </filter>                <filter id="filter1_d_1423_96" x="2.53325" y="2.53331" width="71.7777" height="71.7777" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">                    <feFlood flood-opacity="0" result="BackgroundImageFix" />                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />                    <feOffset dx="0.422222" dy="0.422222" />                    <feGaussianBlur stdDeviation="2.11111" />                    <feComposite in2="hardAlpha" operator="out" />                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0" />                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1423_96" />                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1423_96" result="shape" />                </filter>                <radialGradient id="paint0_radial_1423_96" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(41.9506 27.1674) rotate(180) scale(32.7949)">                    <stop stop-color="#FFF4C3" />                    <stop offset="0.16" stop-color="#FFE036" />                    <stop offset="1" stop-color="#FA761C" />                </radialGradient>                <linearGradient id="paint1_linear_1423_96" x1="66.8754" y1="5.38557" x2="10.5535" y2="67.6553" gradientUnits="userSpaceOnUse">                    <stop stop-color="#FFBA24" />                    <stop offset="1" stop-color="#FF5500" />                </linearGradient>            </defs>        </svg>';
  private eastSunSvg: string = '<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">            <g clip-path="url(#clip0_7964_371)">                <g filter="url(#filter0_d_7964_371)">                    <path d="M14.9707 35.1214C16.5606 35.1214 17.8496 36.4104 17.8496 38.0003C17.8494 39.59 16.5605 40.8792 14.9707 40.8792H9.21289C7.62318 40.8791 6.33416 39.59 6.33398 38.0003C6.33398 36.4105 7.62307 35.1215 9.21289 35.1214H14.9707ZM66.7881 35.1214C68.3778 35.1216 69.666 36.4105 69.666 38.0003C69.6658 39.5899 68.3777 40.879 66.7881 40.8792H61.0303C59.4405 40.8792 58.1515 39.5901 58.1514 38.0003C58.1514 36.4104 59.4404 35.1214 61.0303 35.1214H66.7881ZM15.6074 15.6087C16.7317 14.4845 18.5545 14.4845 19.6787 15.6087L23.75 19.68C24.8737 20.8041 24.8737 22.6262 23.75 23.7503C22.6259 24.8744 20.803 24.8751 19.6787 23.7513L15.6074 19.68C14.4832 18.5558 14.4832 16.7329 15.6074 15.6087ZM56.3203 15.6087C57.4445 14.4845 59.2674 14.4845 60.3916 15.6087C61.5158 16.7329 61.5158 18.5558 60.3916 19.68L56.3203 23.7513C55.1962 24.8749 53.3741 24.8749 52.25 23.7513C51.1258 22.627 51.1258 20.8042 52.25 19.68L56.3203 15.6087ZM38.001 6.33331C39.5907 6.33352 40.8789 7.62244 40.8789 9.21222V14.97C40.8787 16.5597 39.5906 17.8487 38.001 17.8489C36.4112 17.8489 35.1222 16.5598 35.1221 14.97V9.21222C35.1221 7.62231 36.4111 6.33331 38.001 6.33331Z" fill="url(#paint0_linear_7964_371)" />                </g>                <g filter="url(#filter1_d_7964_371)">                    <path d="M56.9995 63.3337C58.1653 63.3337 59.1106 64.2783 59.1108 65.444C59.1108 66.61 58.1654 67.5554 56.9995 67.5554H23.2222C22.0562 67.5554 21.1108 66.61 21.1108 65.444C21.1111 64.2783 22.0564 63.3337 23.2222 63.3337H56.9995ZM37.9995 50.6667C39.1654 50.6667 40.1108 51.6121 40.1108 52.778C40.1107 53.9438 39.1654 54.8893 37.9995 54.8893H4.22217C3.05631 54.8893 2.11097 53.9438 2.11084 52.778C2.11084 51.6121 3.05623 50.6667 4.22217 50.6667H37.9995ZM71.7778 50.6667C72.9437 50.6668 73.8892 51.6122 73.8892 52.778C73.889 53.9438 72.9436 54.8892 71.7778 54.8893H46.4438C45.2782 54.8891 44.3336 53.9437 44.3335 52.778C44.3335 51.6122 45.2781 50.6669 46.4438 50.6667H71.7778Z" fill="url(#paint1_radial_7964_371)" />                </g>                <g filter="url(#filter2_d_7964_371)">                    <path d="M38 20.7271C47.5394 20.7271 55.2733 28.4602 55.2734 37.9996C55.2734 39.4562 55.0924 40.8709 54.7529 42.2222H21.248C20.9085 40.8709 20.7275 39.4562 20.7275 37.9996C20.7277 28.4603 28.4607 20.7273 38 20.7271Z" fill="url(#paint2_radial_7964_371)" />                </g>            </g>            <defs>                <filter id="filter0_d_7964_371" x="2.53398" y="2.53331" width="71.7765" height="42.9903" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">                    <feFlood flood-opacity="0" result="BackgroundImageFix" />                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />                    <feOffset dx="0.422222" dy="0.422222" />                    <feGaussianBlur stdDeviation="2.11111" />                    <feComposite in2="hardAlpha" operator="out" />                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0" />                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7964_371" />                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7964_371" result="shape" />                </filter>                <filter id="filter1_d_7964_371" x="-1.68916" y="46.8667" width="80.2228" height="25.3331" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">                    <feFlood flood-opacity="0" result="BackgroundImageFix" />                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />                    <feOffset dx="0.422222" dy="0.422222" />                    <feGaussianBlur stdDeviation="2.11111" />                    <feComposite in2="hardAlpha" operator="out" />                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0" />                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7964_371" />                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7964_371" result="shape" />                </filter>                <filter id="filter2_d_7964_371" x="16.9275" y="16.9271" width="42.9903" height="29.9396" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">                    <feFlood flood-opacity="0" result="BackgroundImageFix" />                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />                    <feOffset dx="0.422222" dy="0.422222" />                    <feGaussianBlur stdDeviation="2.11111" />                    <feComposite in2="hardAlpha" operator="out" />                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0" />                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7964_371" />                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7964_371" result="shape" />                </filter>                <linearGradient id="paint0_linear_7964_371" x1="66.875" y1="5.81636" x2="42.3723" y2="55.4803" gradientUnits="userSpaceOnUse">                    <stop stop-color="#FFBA24" />                    <stop offset="1" stop-color="#FF5500" />                </linearGradient>                <radialGradient id="paint1_radial_7964_371" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(49.6112 64.3887) rotate(-168.69) scale(48.441 24.199)">                    <stop stop-color="#FFBA24" />                    <stop offset="1" stop-color="#FF5500" />                </radialGradient>                <radialGradient id="paint2_radial_7964_371" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(41.9513 27.1673) rotate(180) scale(32.7953 32.7951)">                    <stop stop-color="#FFF4C3" />                    <stop offset="0.16" stop-color="#FFE036" />                    <stop offset="1" stop-color="#FA761C" />                </radialGradient>                <clipPath id="clip0_7964_371">                    <rect width="76" height="76" fill="white" />                </clipPath>            </defs>        </svg>';
  private westSunSvg: string = '<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">            <g clip-path="url(#clip0_7964_385)">                <g filter="url(#filter0_d_7964_385)">                    <path d="M56.9998 61.2225C58.1655 61.2225 59.1108 62.1672 59.1111 63.3329C59.1111 64.4988 58.1657 65.4442 56.9998 65.4442H23.2224C22.0565 65.4442 21.1111 64.4988 21.1111 63.3329C21.1113 62.1672 22.0566 61.2225 23.2224 61.2225H56.9998ZM37.9998 48.5555C39.1657 48.5555 40.1111 49.5009 40.1111 50.6669C40.111 51.8327 39.1656 52.7782 37.9998 52.7782H4.22241C3.05655 52.7782 2.11119 51.8327 2.11108 50.6669C2.11108 49.5009 3.05648 48.5555 4.22241 48.5555H37.9998ZM71.7781 48.5555C72.9438 48.5557 73.8884 49.5011 73.8884 50.6669C73.8883 51.8326 72.9438 52.778 71.7781 52.7782H48.5554C47.3896 52.7782 46.4442 51.8327 46.4441 50.6669C46.4441 49.501 47.3895 48.5556 48.5554 48.5555H71.7781Z" fill="url(#paint0_radial_7964_385)" />                </g>                <g filter="url(#filter1_d_7964_385)">                    <path d="M37.7803 8.17151C51.8926 8.17156 63.333 19.6119 63.333 33.7242C63.333 35.8791 63.0648 37.9713 62.5625 39.9703H12.998C12.4958 37.9713 12.2275 35.8791 12.2275 33.7242C12.2275 19.6119 23.6679 8.17151 37.7803 8.17151Z" fill="url(#paint1_radial_7964_385)" />                </g>            </g>            <defs>                <filter id="filter0_d_7964_385" x="-1.68892" y="44.7555" width="80.2218" height="25.3331" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">                    <feFlood flood-opacity="0" result="BackgroundImageFix" />                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />                    <feOffset dx="0.422222" dy="0.422222" />                    <feGaussianBlur stdDeviation="2.11111" />                    <feComposite in2="hardAlpha" operator="out" />                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0" />                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7964_385" />                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7964_385" result="shape" />                </filter>                <filter id="filter1_d_7964_385" x="8.42754" y="4.37151" width="59.5499" height="40.2433" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">                    <feFlood flood-opacity="0" result="BackgroundImageFix" />                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />                    <feOffset dx="0.422222" dy="0.422222" />                    <feGaussianBlur stdDeviation="2.11111" />                    <feComposite in2="hardAlpha" operator="out" />                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0" />                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7964_385" />                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7964_385" result="shape" />                </filter>                <radialGradient id="paint0_radial_7964_385" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(39.8314 62.2776) rotate(-165.864) scale(38.8982 23.931)">                    <stop stop-color="#FFBA24" />                    <stop offset="1" stop-color="#FF5500" />                </radialGradient>                <radialGradient id="paint1_radial_7964_385" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(46.0737 36.9531) rotate(-153.435) scale(41.1658 41.1657)">                    <stop stop-color="#FFF4C3" />                    <stop offset="0.28125" stop-color="#FFE036" />                    <stop offset="0.598958" stop-color="#FA761C" />                </radialGradient>                <clipPath id="clip0_7964_385">                    <rect width="76" height="76" fill="white" />                </clipPath>            </defs>        </svg>';

  // Helper factory methods to create nodes/connectors
  private createTextNode(id: string, width: number, height: number, offsetX: number, offsetY: number, content: string, style: NodeModel['style'], constraints: NodeConstraints = NodeConstraints.None): NodeModel {
    return {
      id, width, height, offsetX, offsetY,
      constraints,
      shape: { type: 'Text', content },
      style
    } as NodeModel;
  }

  private createNativeNode(id: string, width: number, height: number, offsetX: number, offsetY: number, svgContent: string, constraints: NodeConstraints = NodeConstraints.None): NodeModel {
    return {
      id, width, height, offsetX, offsetY,
      constraints,
      shape: { type: 'Native', content: svgContent }
    } as NodeModel;
  }

  private createImageNode(id: string, width: number, height: number, offsetX: number, offsetY: number, source: string, rotateAngle?: number, constraints?: NodeConstraints, pivotX?: number, pivotY?: number): NodeModel {
    const node: NodeModel = {
      id, width, height, offsetX, offsetY,
      shape: { type: 'Image', source },
      style: { fill: 'transparent', strokeColor: 'transparent' }
    } as NodeModel;
    if (typeof rotateAngle === 'number') node.rotateAngle = rotateAngle;
    if (typeof constraints === 'number') node.constraints = constraints;
    if (typeof pivotX === 'number' && typeof pivotY === 'number') node.pivot = { x: pivotX, y: pivotY };
    if (!node.constraints) node.constraints = NodeConstraints.None;
    return node;
  }

  private createEllipseNode(id: string, width: number, height: number, offsetX: number, offsetY: number, fill: string, strokeColor: string, strokeWidth: number, constraints: NodeConstraints = NodeConstraints.None): NodeModel {
    return {
      id, width, height, offsetX, offsetY,
      constraints,
      shape: { type: 'Basic', shape: 'Ellipse' },
      style: { fill, strokeColor, strokeWidth }
    } as NodeModel;
  }

  private createHtmlNode(id: string, width: number, height: number, offsetX: number, offsetY: number, html: string, constraints: NodeConstraints = NodeConstraints.None): NodeModel {
    return {
      id, width, height, offsetX, offsetY,
      constraints,
      shape: { type: 'HTML', content: html }
    } as NodeModel;
  }

  private createRectNode(id: string, width: number, height: number, offsetX: number, offsetY: number, fill: string, strokeColor: string, strokeWidth: number, constraints: NodeConstraints = NodeConstraints.None): NodeModel {
    return {
      id, width, height, offsetX, offsetY,
      constraints,
      style: { fill, strokeColor, strokeWidth }
    } as NodeModel;
  }

  private createConnectorBezier(id: string, spx: number, spy: number, tpx: number, tpy: number, c1x: number, c1y: number, c2x: number, c2y: number, strokeColor: string, strokeWidth: number, dash: string, opacity: number): ConnectorModel {
    return {
      id,
      zIndex: 1,
      type: 'Bezier',
      constraints: ConnectorConstraints.None,
      sourcePoint: { x: spx, y: spy },
      targetPoint: { x: tpx, y: tpy },
      segments: [{ type: 'Bezier', point1: { x: c1x, y: c1y }, point2: { x: c2x, y: c2y } }],
      style: { strokeColor, strokeWidth, strokeDashArray: dash, opacity },
      sourceDecorator: { shape: 'None' },
      targetDecorator: { shape: 'None' }
    } as ConnectorModel;
  }

  private buildNodes(): NodeModel[] {
    return [
      // Title
      this.createTextNode('title', 450, 80, 485, 135, 'SMART SOLAR PANEL TILT SYSTEM',
        { color: '#2c3e50', fill: 'transparent', fontFamily: 'Segoe UI', fontSize: 26, bold: true }),
      // East sun
      this.createNativeNode('eastSun', 60, 60, 221, 422, this.eastSunSvg),
      // Noon sun
      this.createNativeNode('centerSun', 60, 60, 483, 293, this.centerSunSvg),
      // West sun
      this.createNativeNode('westSun', 60, 45, 731, 422, this.westSunSvg),
      // Labels
      this.createTextNode('eastLabel', 60, 30, 238, 365, 'EAST',
        { color: '#34495e', fill: 'transparent', fontFamily: 'Segoe UI', fontSize: 14, bold: true }),
      this.createTextNode('westLabel', 60, 30, 725, 365, 'WEST',
        { color: '#34495e', fill: 'transparent', fontFamily: 'Segoe UI', fontSize: 14, bold: true }),
      // Ground
      this.createRectNode('groundLine', 500, 5, 489, 657, '#2E485F', '#2E485F', 2),
      // Support image
      this.createImageNode('supportPost', 215, 185, 465, 565, './assets/diagram/Images/angle/panelSupport.png'),
      // Solar panel (rotatable)
      this.createImageNode('solarPanelFrame', 260, 50, 478.25, 485, './assets/diagram/Images/angle/solarPanel.png', this.solarData.currentAngle, ((NodeConstraints.Default | NodeConstraints.ReadOnly) & ~NodeConstraints.Drag), 0.5, 0.8),
      // Pivot
      this.createEllipseNode('pivotPoint', 16, 16, 478.5, 488, '#FF5F1F', '#2E485F', 1),
      // Location HTML
      this.createHtmlNode('location', 300, 150, 1130, 100, `
          <div class="angle-control-section" style="height:150px; width:300px">
            <div class="angle-control-label" style="font-size:18px; font-weight:600">Select location</div>
            <div id="locationDropdown"></div>
          </div>`),
      // Efficiency HTML
      this.createHtmlNode('efficiency', 300, 350, 1130, 383, `
          <div class="efficiency-section" style="width:300px; height:345px;">
            <h3 class="angle-control-label" style="font-size:18px; font-weight:600">System Efficiency</h3>
            <div style="width: 210px; height:180px; margin:auto;"><div id="efficiencyGauge"></div></div>
            <div style="width:250px;"><div id="performanceMessage"></div></div>
          </div>`),
      this.createHtmlNode('angle', 300, 185, 1130, 680, `
          <div class="angle-control-section" style="width: 300px; height: 185px;">
            <div class="angle-control-label" style="font-size:18px; font-weight:600">Tilt Angle</div>
            <div>
              <input id="angleValue" style="height:40px !important;font-size:large" />
            </div>
            <div class="angle-description" id="angleDescription">${this.getAngleDescription()}</div>
          </div>`)
    ];
  }

  private buildConnectors(): ConnectorModel[] {
    return [
      this.createConnectorBezier('sunPath', 221, 422, 731, 422, 350, 260, 610, 260, '#3498db', 3, '10,5', 0.8)
    ];
  }
  
  public nodes: NodeModel[] = this.buildNodes();

  public connectors: ConnectorModel[] = this.buildConnectors();

  // Diagram lifecycle hooks
  public scrollChange(): void {
    if ((this.locationDropdown as any)?.isPopupOpen) {
      this.locationDropdown.hidePopup();
    }
  }

  public created(): void {
    this.diagramCreated = true;

    // initialize UI controls, do first binding and fit
    this.initializeLocationDropdown();
    this.initializeEfficiencyGauge();
    this.initializePerformanceMessage();
    this.initializeAngleControls();

    this.calculateSolarPosition();
    this.angleCalculation();
    this.calculateEfficiency();
    this.updateUI();
    this.diagram.fitToPage();
  }

  public click(){
    // Prevent losing selection of the solar panel node
    const solarPanelNode = this.diagram.getObject('solarPanelFrame') as NodeModel;
    if (solarPanelNode) this.diagram.select([solarPanelNode]);
  }

  public load(): void {
    setTimeout(() => {
      if (this.diagramCreated) {
        this.initializeLocationDropdown();
        this.initializeEfficiencyGauge();
        this.initializePerformanceMessage();
        this.initializeAngleControls();
        this.updateUI();
        this.diagram.fitToPage();
      }
    }, 100);
  }

  // Rotation handling
  public onRotationChange(args: IRotationEventArgs): void {
    if (args.state === 'Completed') {
      if (args.source?.nodes?.[0]?.id === 'solarPanelFrame') {
        this.solarData.currentAngle = parseInt(args.newValue.rotateAngle.toString(), 10);
        this.angleCalculation();
        this.calculateSolarPosition();
        this.calculateEfficiency();
        this.updateUI();
      }
    } else if (args.state === 'Progress') {
      if (args.source?.nodes?.[0]?.id === 'solarPanelFrame') {
        const proposedAngle = args.newValue.rotateAngle;
        let normalizedAngle = proposedAngle % 360;
        if (normalizedAngle < 0) normalizedAngle += 360;

        // Allow 303–360 and 0–44
        if (!((normalizedAngle >= 303 && normalizedAngle <= 360) ||
              (normalizedAngle >= 0 && normalizedAngle <= 44))) {
          args.cancel = true;
        }
      }
    }
  }

  // UI controls
  private initializeLocationDropdown(): void {
    const locationOptions = this.locationData.map(location => ({ text: location.name, value: location.name }));
    if (this.locationDropdown) this.locationDropdown.destroy();

    this.locationDropdown = new DropDownList({
      dataSource: locationOptions,
      fields: { text: 'text', value: 'value' },
      value: this.solarData.selectedLocation,
      placeholder: 'Select a location',
      change: this.onLocationChanged.bind(this),
      popupWidth: '212px'
    });
    this.locationDropdown.appendTo('#locationDropdown');
  }

  private onLocationChanged(args: any): void {
    this.solarData.selectedLocation = args.value;
    const location = this.getLocationData(this.solarData.selectedLocation);
    if (!location) return;

    const locationAngle = Math.min(100, location.angle);
    if (locationAngle <= 57) {
      this.solarData.currentAngle = 303 + locationAngle;
    } else {
      this.solarData.currentAngle = locationAngle - 57; // 58..100 => 1..43
    }

    this.angleCalculation();
    this.calculateSolarPosition();
    this.calculateEfficiency();
    this.updateDiagram();
    this.updateUI();
  }

  private initializeEfficiencyGauge(): void {
    if (this.efficiencyGauge) this.efficiencyGauge.destroy();
    this.efficiencyGauge = new CircularGauge({
      width: '200px',
      height: '200px',
      background: 'transparent',
      axes: [{
        startAngle: 225, endAngle: 45, minimum: 0, maximum: 100, radius: '95%',
        lineStyle: { width: 15, color: '#F2F4F6' },
        majorTicks: { height: 0 },
        minorTicks: { height: 0 },
        labelStyle: { font: { size: '0px' } },
        ranges: [
          { start: 0, end: 40, color: '#EF5B2E', startWidth: 18, endWidth: 18 },
          { start: 40, end: 60, color: '#FEA714', startWidth: 18, endWidth: 18 },
          { start: 60, end: 90, color: '#3ABA47', startWidth: 18, endWidth: 18 }
        ],
        pointers: [{
          type: 'Marker', value: this.solarData.efficiency, markerShape: 'Triangle',
          markerHeight: 25, markerWidth: 6, radius: '85%', color: '#111', animation: { enable: false }
        }],
        annotations: [{
          angle: 90, radius: '0%', zIndex: '1',
          content: `
            <div style="text-align: center;">
              <div style="font-size: 20px; font-weight: bold; color: #1A2A3B;" id="gaugeEfficiencyValue">
                ${Math.round(this.solarData.efficiency)}<span style="font-size:20px; font-weight:500;">%</span>
              </div>
              <div style="font-size: 14px; font-weight: 500; color: #888; margin-top: 5px; text-align: right; padding-left: 10px; text-transform: uppercase;">
                EFFICIENCY
              </div>
            </div>`
        }]
      }]
    });
    this.efficiencyGauge.appendTo('#efficiencyGauge');
  }

  private initializePerformanceMessage(): void {
    const efficiencyMsg = this.getPerformanceMessage();
    if (this.performanceMessage) this.performanceMessage.destroy();
    this.performanceMessage = new Message({
      content: efficiencyMsg.message,
      severity: efficiencyMsg.severity,
      showIcon: true,
      cssClass: 'performance-message',
      visible: true,
      showCloseIcon: false
    });
    this.performanceMessage.appendTo('#performanceMessage');
  }

  // Angle input (NumericTextBox) + validation
  private initializeAngleControls(): void {
    if (this.angleNumeric) this.angleNumeric.destroy();

    const relativeAngle = this.solarData.intPanelAngleDeg - 57;
    this.angleNumeric = new NumericTextBox({
      min: -57,
      max: 43,
      strictMode: true,
      step: 1,
      decimals: 0,
      format: 'n0',
      value: relativeAngle,
      showSpinButton: true,
      change: (args: ChangeEventArgs) => {
        if (this.suppressAngleChange) return;
        const val = typeof args.value === 'number' ? args.value : this.angleNumeric.value;
        if (typeof val === 'number') {
          this.applyRelativeAngle(val);
        }
      }
    });
    this.angleNumeric.appendTo('#angleValue');

    const inputEl = document.getElementById('angleValue');

    if (inputEl) {
      // prevent diagram from intercepting interactions while editing
      ['pointerdown', 'mousedown', 'touchstart', 'click'].forEach(evt =>
        inputEl.addEventListener(evt, (e) => e.stopPropagation())
      );
      // Commit on Enter; stop key propagation to diagram
      inputEl.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          (inputEl as HTMLElement).blur(); // triggers strictMode clamping if needed
          setTimeout(() => (inputEl as HTMLElement).focus(), 0);
        }
        e.stopPropagation();
      });

      // Focus input when typing numeric keys on page
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        const active = document.activeElement as HTMLElement | null;
        if (active && (active === inputEl || active.closest('.e-input-group') === inputEl?.closest('.e-input-group'))) return;

        const key = e.key;
        const isEditKey = (key >= '0' && key <= '9') || key === '+' || key === '-' || key === 'Backspace' || key === 'Delete';
        if (isEditKey) {
          e.stopPropagation();
          e.preventDefault();
          (inputEl as HTMLElement).focus();
          setTimeout(() => { try { (inputEl as HTMLInputElement).select(); } catch { } }, 0);
        }
      }, { capture: true });
    }
  }

  // Map relative angle (-57..43) => diagram rotateAngle [303..360, 0..43]
  private applyRelativeAngle(val: number | null | undefined): void {
    if (typeof val !== 'number') return;

    let r = Math.round(val);
    if (r < -57) r = -57;
    if (r > 43) r = 43;

    const rotateAngle = (r < 0) ? (r + 360) : r;
    this.solarData.currentAngle = rotateAngle % 360;

    this.updateDiagram();
    this.angleCalculation();
    this.calculateSolarPosition();
    this.calculateEfficiency();
    this.updateUI();
  }

  // Calculations
  private angleCalculation(): void {
    const normalizedAngle = this.solarData.currentAngle;
    if (normalizedAngle >= 303 && normalizedAngle <= 360) {
      this.solarData.intPanelAngleDeg = normalizedAngle - 303; // 303->0, 360->57
    } else if (normalizedAngle >= 0 && normalizedAngle <= 43) {
      this.solarData.intPanelAngleDeg = 57 + normalizedAngle; // 0->57, 43->100
    } else {
      this.solarData.intPanelAngleDeg = Math.max(0, Math.min(100, this.solarData.intPanelAngleDeg));
    }
  }

  private calculateSolarPosition(): void {
    const location = this.getLocationData(this.solarData.selectedLocation);
    if (!location) return;

    const lat = location.latitude * Math.PI / 180.0;
    const selected = new Date(this.solarData.selectedDateTime);
    const startOfYear = new Date(selected.getFullYear(), 0, 1);

    const dayOfYear = Math.ceil((selected.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const declination = 23.45 * Math.PI / 180.0 * Math.sin(2 * Math.PI * (284 + dayOfYear) / 365.0);
    const hourAngle = 0; // solar noon
    const elevation = Math.asin(Math.sin(declination) * Math.sin(lat) + Math.cos(declination) * Math.cos(lat) * Math.cos(hourAngle));

    this.solarData.sunElevation = Math.max(0, elevation * 180.0 / Math.PI);
    this.solarData.sunAzimuth = 180.0;
    this.solarData.optimalTilt = Math.max(0, Math.min(60, Math.abs(location.latitude)));

    if (this.solarData.sunElevation > 0) {
      const elevationRad = elevation;
      let airMass = 1.0 / Math.sin(elevationRad);
      airMass = Math.max(1.0, Math.min(40.0, airMass));
      this.solarData.solarIrradiance = 1353 * Math.pow(0.7, Math.pow(airMass, 0.678)) * Math.sin(elevationRad);
      this.solarData.solarIrradiance = Math.max(0, this.solarData.solarIrradiance);
    } else {
      this.solarData.solarIrradiance = 0;
    }
  }

  // Updated efficiency model
  private calculateEfficiency(): void {
    if (this.solarData.sunElevation <= 0) {
        this.solarData.efficiency = 0;
        this.solarData.incidenceAngle = 90;
        return;
    }

    // Base calculations
    const panelTiltRad = (this.solarData.intPanelAngleDeg * Math.PI) / 180.0;
    const sunElevRad = (this.solarData.sunElevation * Math.PI) / 180.0;
    const azimuthDiff = 0;

    let cosIncidence =
        Math.sin(sunElevRad) * Math.cos(panelTiltRad) +
        Math.cos(sunElevRad) * Math.sin(panelTiltRad) * Math.cos(azimuthDiff);
    cosIncidence = Math.max(0, Math.min(1, cosIncidence));
    this.solarData.incidenceAngle = (Math.acos(cosIncidence) * 180.0) / Math.PI;

    const irradianceFactor = Math.min(1.0, this.solarData.solarIrradiance / 900.0);
    const temperatureFactor = 0.95;
    const systemLossFactor = 0.95;
    const optimalAngleDiff = Math.abs(
      this.solarData.intPanelAngleDeg - this.solarData.optimalTilt
    );
    const optimalAngleFactor = Math.max(
        0.9,
        1.0 - (optimalAngleDiff / 90.0) * 0.2
    );

    let eff =
        100.0 *
        cosIncidence *
        irradianceFactor *
        temperatureFactor *
        systemLossFactor *
        optimalAngleFactor;

    if (optimalAngleDiff < 5) eff = Math.min(100, eff * 1.08);

    // Gradual noon uplift
    const noonAngle = this.solarData.currentAngle;
    const d = Math.min(noonAngle, 360 - noonAngle);
    const strongFloorWindowDeg = 10;
    const noonWindowDeg = 15;

    if (d <= noonWindowDeg) {
        const weight = 0.5 * (1 + Math.cos((Math.PI * d) / noonWindowDeg));
        const t = Math.min(1, d / strongFloorWindowDeg);
        const minAtD = 65 + (60 - 65) * t;
        const maxAtD = 75 + (68 - 75) * t;
        const noonTarget = minAtD + (maxAtD - minAtD) * irradianceFactor;

        const blended = eff + (noonTarget - eff) * weight;
        let uplifted = Math.max(eff, blended);
        if (d <= strongFloorWindowDeg)
        uplifted = Math.max(uplifted, irradianceFactor);

        eff = Math.min(100, uplifted);
    }

    this.solarData.efficiency = Math.max(0, Math.min(100, eff));
  }

  // UI updates
  private updateDiagram(): void {
    if (!this.diagram) return;
    const solarPanelNode = this.diagram.getObject('solarPanelFrame') as NodeModel;
    if (solarPanelNode) {
      solarPanelNode.rotateAngle = this.solarData.currentAngle;
      this.diagram.dataBind();
    }
  }

  private syncAngleInputFromModel(): void {
    if (!this.angleNumeric) return;
    const relativeAngle = this.solarData.intPanelAngleDeg - 57;
    this.suppressAngleChange = true;
    this.angleNumeric.value = relativeAngle;
    this.angleNumeric.dataBind();
    this.suppressAngleChange = false;
  }

  private updateUI(): void {
    // sync angle input
    this.syncAngleInputFromModel();

    // description
    const angleDescElement = document.getElementById('angleDescription');
    if (angleDescElement) {
      angleDescElement.textContent = this.getAngleDescription();
    }

    // gauge
    if (this.efficiencyGauge) {
      this.efficiencyGauge.axes[0].pointers[0].value = this.solarData.efficiency;
      this.efficiencyGauge.axes[0].annotations[0].content = `
        <div style="text-align: center;">
          <div style="font-size: 20px; font-weight: bold; color: #1A2A3B;" id="gaugeEfficiencyValue">
            ${Math.round(this.solarData.efficiency)}<span style="font-size:20px; font-weight:500;">%</span>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #888; margin-top: 5px; text-align: right; padding-left: 10px; text-transform: uppercase;">
            EFFICIENCY
          </div>
        </div>`;
      this.efficiencyGauge.dataBind();
    }

    // performance message
    if (this.performanceMessage) {
      const messageData = this.getPerformanceMessage();
      this.performanceMessage.content = messageData.message;
      this.performanceMessage.severity = messageData.severity;
      this.performanceMessage.dataBind();
    }
    setTimeout(() => {
      this.diagram.select([this.diagram.getObject('solarPanelFrame')]);
    }, 10);
  }

  // Utilities
  private getAngleDescription(): string {
    const relative = Math.abs(this.solarData.intPanelAngleDeg - 57);
    if (relative <= 5) return 'Horizontal';
    else if (relative < 15) return 'Low Tilt';
    else if (relative < 25) return 'Medium Tilt';
    else if (relative < 40) return 'High Tilt';
    else return 'Steep Tilt';
  }

  private getPerformanceMessage(): { message: string, severity: any } {
    if (this.solarData.efficiency > 60) return { message: 'Excellent Performance', severity: 'Success' };
    if (this.solarData.efficiency > 40) return { message: 'Fair Performance', severity: 'Warning' };
    return { message: 'Poor Performance', severity: 'Error' };
  }

  private getLocationData(locationName: string): LocationData {
    return this.locationData.find(loc => loc.name.toLowerCase() === locationName.toLowerCase());
  }
}