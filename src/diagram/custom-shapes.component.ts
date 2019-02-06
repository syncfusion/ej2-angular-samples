import { Component, ViewEncapsulation } from '@angular/core';
import { HtmlModel, DiagramComponent, SnapSettingsModel, SnapConstraints } from '@syncfusion/ej2-angular-diagrams';
import { CircularGauge, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';


/**
 * Sample for ComplexShapes
 */

function getHtmlContent(): HTMLElement {
    let div: HTMLElement = document.getElementById('gauge');
    let circularGauge: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        axes: [{
            lineStyle: { width: 10, color: 'transparent' },
            labelStyle: {
                position: 'Inside', useRangeColor: false,
                font: { size: '12px', fontFamily: 'Roboto', fontStyle: 'Regular' }
            }, majorTicks: { height: 10, offset: 5, color: '#9E9E9E' }, minorTicks: { height: 0 },
            annotations: [{
                content: '<div><span style="font-size:14px; color:#9E9E9E; font-family:Regular">Speedometer</span></div>',
                radius: '30%', angle: 0, zIndex: '1'
            }, {
                content: '<div><span style="font-size:20px; color:#424242; font-family:Regular">65 MPH</span></div>',
                radius: '40%', angle: 180, zIndex: '1'
            }],
            startAngle: 210, endAngle: 150, minimum: 0, maximum: 120, radius: '80%',
            ranges: [{ start: 0, end: 40, color: '#30B32D' }, { start: 40, end: 80, color: '#FFDD00' },
            { start: 80, end: 120, color: '#F03E3E' }],
            pointers: [{
                value: 65, radius: '60%', color: '#757575', pointerWidth: 8,
                cap: { radius: 7, color: '#757575' }, needleTail: { length: '18%', color: '#757575' }
            }]
        }]
    });
    circularGauge.appendTo('#gauge');
    return div;
}
@Component({
    selector: 'control-content',
    templateUrl: 'custom-shapes.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None

})

export class ComplexShapesDiagramComponent {

    public diagram: DiagramComponent;
    public htmlcontent: string = '<div id="gauge" style="height:100%; width:100%; overflow:hidden;"> </div>';
    public shape: HtmlModel = { type: 'HTML', content: this.htmlcontent };
    public create(arg: Object): void {
        getHtmlContent();
    }
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
}
