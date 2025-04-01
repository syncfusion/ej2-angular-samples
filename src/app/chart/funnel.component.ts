import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChartComponent, AccumulationChart,ChartAllModule, IAccLoadedEventArgs, IAccPointRenderEventArgs, IAccResizeEventArgs, AccumulationTheme, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme, funnelPointRender } from './theme-color';

/**
 * Sample for Funnel Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'funnel.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AccumulationChartAllModule,ChartAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class FunnelComponent {
    public data: Object[] = [
        { InterviewProcess : "Candidates Applied", Candidates : 170, DataLabelMappingName:"Applications Received: 170"},
        { InterviewProcess : "Initial Validation", Candidates : 145, DataLabelMappingName: "Initial Validation: 145"},
        { InterviewProcess : "Screening", Candidates : 105, DataLabelMappingName: Browser.isDevice ? "Screening <br> Completed: 105" : "Screening Completed: 105"},
        { InterviewProcess : "Telephonic Interview", Candidates : 85, DataLabelMappingName: Browser.isDevice ? "Phone <br> Interview: 85" : "Phone Interview: 85"},
        { InterviewProcess : "Personal Interview", Candidates : 58, DataLabelMappingName: Browser.isDevice ? "Final <br> Interview: 58" : "Final Interview: 58"},
        { InterviewProcess : "Hired", Candidates : 30, DataLabelMappingName: "Final <br> Selections: 30"},
];
    //Initializing DataLabel
    public dataLabel: Object = {
        name: 'DataLabelMappingName', visible: true, position: 'Inside', connectorStyle: {length:'20px'},
        font: {
            fontWeight: '600', size: Browser.isDevice ? '11px' : '13px'
          }
    };
    // custom code start
    public load(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    };
    public pointRender(args: IAccPointRenderEventArgs): void {
        funnelPointRender(args);
    };
   // custom code end
    public explode: boolean = false;
    public enableAnimation: boolean = false;
    public legendSettings: Object = { visible: false };
    public tooltip: Object = { enable: false };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public title: string = 'Recruitment Funnel: From Application to Hiring';
    constructor() {
        //code
    };

}