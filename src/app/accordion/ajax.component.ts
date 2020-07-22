import { Component, AfterViewInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { Ajax} from '@syncfusion/ej2-base';
import { ExpandEventArgs, Accordion} from '@syncfusion/ej2-navigations';
import { AccordionComponent } from '@syncfusion/ej2-angular-navigations';

/**
 * Accordion Ajax Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'ajax.html',
    styleUrls: ['accordion.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AjaxAccordionComponent implements AfterViewInit  {
    @ViewChild('accordion')
    public acrdn: AccordionComponent;
    public ajaxData: string;
    ngAfterViewInit(): void {
      let ajax: Ajax = new Ajax('source/accordion/ajax-content.html', 'GET', true);
      ajax.send().then();
      ajax.onSuccess = (data: string): void => {
        // Loading Accordion content on AJAX success  
        this.acrdn.items[0].content = data;
        if (this.acrdn.element.childElementCount !== 0) {
            // Refreshing Accoridon Component with AJAX content
            this.acrdn.refresh();
        } else {
         this.acrdn.dataBind();
        }
      };
    }
    public content: string = this.ajaxData;
    expand(e: ExpandEventArgs): void {
        if (e.isExpanded && [].indexOf.call(this.acrdn.items, e.item) === 1) {
            if (e.element.querySelectorAll('.e-accordion').length > 0) {
                return;
            }
            //Initialize Nested Accordion component
            let nestAcrdn: Accordion = new Accordion({
                expandMode: 'Single',
                items: [
                    { header: 'Sensor', content: '#Sensor_features' },
                    { header: 'Camera', content: '#Camera_features' },
                    { header: 'Video Recording', content: '#Video_Rec_features' },
                ]
            });
            //Render initialized Nested Accordion component
            nestAcrdn.appendTo('#nested_Acc');
        }
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['accordion.component.css'];
    }
}