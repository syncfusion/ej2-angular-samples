import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { Ajax} from '@syncfusion/ej2-base';
import { ExpandEventArgs, Accordion} from '@syncfusion/ej2-navigations';
import { AccordionComponent } from '@syncfusion/ej2-ng-navigations';

/**
 * Accordion Ajax Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'ajax.html',
    styleUrls: ['accordion.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AjaxAccordionComponent  {
    @ViewChild('accordion')
    public acrdn: AccordionComponent;
    public ajaxData: string;
    ngAfterViewInit(): void {
      let ajax: Ajax = new Ajax('./src/accordion/Ajax_content.html', 'GET', true);
      ajax.send().then();
      ajax.onSuccess = (data: string): void => {
         this.acrdn.items[0].content = data;
         this.acrdn.refresh();
      };
    }
    public content: string = this.ajaxData;
    expand(e: ExpandEventArgs): void {
        if (e.isExpanded && [].indexOf.call(this.acrdn.items, e.item) === 1) {
            if (e.element.querySelectorAll('.e-accordion').length > 0) {
                return;
            }
            let nestAcrdn: Accordion = new Accordion({
                expandMode: 'Single',
                items: [
                    { header: 'Sensor', content: '#Sensor_features' },
                    { header: 'Camera', content: '#Camera_features' },
                    { header: 'Video Recording', content: '#Video_Rec_features' },
                ]
            });
            nestAcrdn.appendTo('#nested_Acc');
        }
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['accordion.component.css'];
    }
}