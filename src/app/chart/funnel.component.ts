import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChartComponent, AccumulationChart,ChartAllModule, IAccLoadedEventArgs, IAccResizeEventArgs, AccumulationTheme, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

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
        { InterviewProcess : "Hired", Candidates : 50, DataLabelMappingName:"Hired: 50"},
        { InterviewProcess : "Personal Interview", Candidates : 58, DataLabelMappingName: Browser.isDevice ? "Personal <br> Interview: 58" :"Personal Interview: 58"},
        { InterviewProcess : "Telephonic Interview", Candidates : 85, DataLabelMappingName:"Telephonic <br> Interview: 85"},
        { InterviewProcess : "Screening", Candidates : 105, DataLabelMappingName:"Screening: 105"},
        { InterviewProcess : "Initial Validation", Candidates : 145, DataLabelMappingName:Browser.isDevice ? "Initial <br> Validation: 145" :"Initial Validation: 145"},
        { InterviewProcess : "Candidates Applied", Candidates : 250, DataLabelMappingName:"Candidates Applied: 250"},
];
    //Initializing DataLabel
    public dataLabel: Object = {
        name: 'DataLabelMappingName', visible: true, position: 'Inside', connectorStyle: {length:'20px'},
        font: {
            fontWeight: '600',
          }
    };
    // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
   // custom code end
    public width: string = Browser.isDevice ? '65%' : '45%';
    public neckWidth: string = Browser.isDevice ? '12%' : '15%';
    public neckHeight: string = '18%';
    public explode: boolean = false;
    public enableAnimation: boolean = false;
    public legendSettings: Object = { visible: false };
    public tooltip: Object = { enable: false };
    public title: string = 'Recruitment Process';
    constructor() {
        //code
    };

}