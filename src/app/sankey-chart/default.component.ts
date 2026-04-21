import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SankeyAllModule, SankeyLegendService, SankeyTooltipService, SankeyHighlightService, SankeyLoadedEventArgs, Sankey, SankeyExportService } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadSankeyTheme } from './theme-color';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SankeyAllModule, SBDescriptionComponent],
    providers: [
        SankeyLegendService,
        SankeyTooltipService,
        SankeyHighlightService,
        SankeyExportService
    ]
})
export class SankeyDefaultComponent {
    @ViewChild('sankey')
    public sankey: Sankey;
    public height: string = Browser.isDevice ? '600' : '450';
    public title: string = 'California Energy Consumption in 2023';
    public subTitle: string = 'Source: Lawrence Livermore National Laboratory';
    public linkStyle: Object = {
        opacity: 0.6,
        curvature: 0.55,
        colorType: 'Source'
    };
     public labelSettings = Browser.isDevice? { visible: false } : { visible: true }

    public tooltip: Object = {
        enable: true,
        nodeTemplate: '${name}: ${value} TBtu',
        linkTemplate: Browser.isDevice ? '${start.name}: ${start.out} TBtu → <br/> ${target.name}: ${target.in} TBtu' : '${start.name}: ${start.out} TBtu → ${target.name}: ${target.in} TBtu',
    };

    public legendSettings: Object = {
        visible: true,
        position: 'Bottom',
        itemPadding: 8
    };

    // custom code start
    public load(args: SankeyLoadedEventArgs): void {
        loadSankeyTheme(args);
    };
 

    constructor() {
        //code
    }

}