/**
 * Loading ajax content sample
 */

import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { TooltipComponent, TooltipEventArgs, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { HttpClient } from '@angular/common/http';
import { SBDescriptionComponent } from '../common/dp.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'ajax-content.html',
    styleUrls: ['tooltip.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, TooltipModule, ListViewModule, SBDescriptionComponent]
})

export class AjaxContentTooltipComponent {

    //Define an Array of JSON data
    public listViewData: { [key: string]: Object }[] = [
        { id: '1', text: 'Australia' },
        { id: '2', text: 'Bhutan' },
        { id: '3', text: 'China' },
        { id: '4', text: 'Cuba' },
        { id: '5', text: 'India' },
        { id: '6', text: 'Switzerland' },
        { id: '7', text: 'United States' }
    ];

    //Map appropriate columns to fields property
    public fields: Object = { text: 'text', tooltip: 'id' };

    @ViewChild('tooltip')
    public tooltipControl: TooltipComponent;

    constructor( @Inject('sourceFiles') private sourceFiles: any, @Inject(HttpClient) public http: HttpClient) {
        sourceFiles.files = ['tooltip.component.css'];
    }

/**
 * Process tooltip ajax content.
 */

    onBeforeRender(args: TooltipEventArgs) {
        this.tooltipControl.content = 'Loading...';
        this.tooltipControl.dataBind();
        this.http.get('assets/tooltip/tooltipdata.json').subscribe((result: any) => {
                for (let i: number = 0; i < result.length; i++) {
                    if (result[i].Id === args.target.getAttribute('data-content')) {
                        /* tslint:disable */
                        this.tooltipControl.content = "<div class='contentWrap'><span class=" + result[i].Class
                            + "></span><div class='def'>" + result[i].Sports + "</div></div>";
                        /* tslint:enable */
                    }
                }
                this.tooltipControl.dataBind();
            },
            (err: Response) => {
                this.tooltipControl.content = err.statusText;
                this.tooltipControl.dataBind();
            });
    }
}
