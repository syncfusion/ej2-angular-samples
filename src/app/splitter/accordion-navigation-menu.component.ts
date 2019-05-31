import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SplitterComponent} from '@syncfusion/ej2-angular-layouts';
import { Ajax} from '@syncfusion/ej2-base';
import { ExpandEventArgs, Accordion} from '@syncfusion/ej2-navigations';
import { AccordionComponent } from '@syncfusion/ej2-angular-navigations';


/**
 *  Sample for accordion in splitter
 */
@Component({
    selector: 'control-content',
    templateUrl: 'accordion-navigation-menu.html',
    encapsulation: ViewEncapsulation.None
})
export class AccordionNavigationMenuComponent {
    @ViewChild('accordioncontent1') accordioncontent: AccordionComponent;
    @ViewChild('splitterInstance') splitterObj: SplitterComponent;
    @ViewChild('listviewcontent1') listviewcontent:any ;
    //Define an array of JSON data
    public listviewdata1: Object[] = [
        { text: 'Grid', id: '1' },
        { text: 'Schedule', id: '2'},
        { text: 'Chart', id: '7'}
    ];
    public listviewdata2: Object[] = [
        { text: 'Grid', id: '3' },
        { text: 'Schedule', id: '4'},
        { text: 'Chart', id: '8'}
    ];
    public listviewdata3: Object[] = [
        { text: 'Grid', id: '5' },
        { text: 'Schedule', id: '6'},
        { text: 'Chart', id: '9'}
    ];
    public onSelect(e: any): void {
        let listid: string = e.item.dataset.uid;
        switch (listid) {
            case '1':
                let ajax: Ajax = new Ajax('./assets/splitter/aspnet-grid-ajax.html', 'GET', true);
                ajax.send().then();
                ajax.onSuccess = (data: any) =>  {
                    this.splitterObj.paneSettings[1].content = data;
                };
                break;
            case '2':
                let ajax1: Ajax = new Ajax('./assets/splitter/aspnet-schedule-ajax.html', 'GET', true);
                ajax1.send().then();
                ajax1.onSuccess = (data: any) =>  {
                    this.splitterObj.paneSettings[1].content = data;
                };
                break;
            case '3':
                let ajax2: Ajax = new Ajax('./assets/splitter/aspnetmvc-grid-ajax.html', 'GET', true);
                ajax2.send().then();
                ajax2.onSuccess = (data: any) =>  {
                    this.splitterObj.paneSettings[1].content = data;
                };
                break;
            case '4':
                let ajax3: Ajax = new Ajax('./assets/splitter/aspnetmvc-schedule-ajax.html', 'GET', true);
                ajax3.send().then();
                ajax3.onSuccess = (data: any) =>  {
                    this.splitterObj.paneSettings[1].content = data;
                };
                break;
            case '5':
                let ajax4: Ajax = new Ajax('./assets/splitter/javascript-grid-ajax.html', 'GET', true);
                ajax4.send().then();
                ajax4.onSuccess = (data: any) =>  {
                    this.splitterObj.paneSettings[1].content = data;
                };
                break;
            case '6':
                let ajax5: Ajax = new Ajax('./assets/splitter/javascript-schedule-ajax.html', 'GET', true);
                ajax5.send().then();
                ajax5.onSuccess = (data: any) =>  {
                    this.splitterObj.paneSettings[1].content = data;
                };
                break;
            case '7':
                let ajax6: Ajax = new Ajax('./assets/splitter/aspnet-chart-ajax.html', 'GET', true);
                ajax6.send().then();
                ajax6.onSuccess = (data: any) =>  {
                    this.splitterObj.paneSettings[1].content = data;
                };
                break;
            case '8':
                let ajax7: Ajax = new Ajax('./assets/splitter/aspnetmvc-chart-ajax.html', 'GET', true);
                ajax7.send().then();
                ajax7.onSuccess = (data: any) =>  {
                    this.splitterObj.paneSettings[1].content = data;
                };
                break;
            case '9':
                let ajax8: Ajax = new Ajax('./assets/splitter/javascript-chart-ajax.html', 'GET', true);
                ajax8.send().then();
                ajax8.onSuccess = (data: any) =>  {
                    this.splitterObj.paneSettings[1].content = data;
                };
                break;
            }
    }
    public expanded(e: ExpandEventArgs): void {
        let index: number = e.index;
        switch (index) {
            case 0:
                this.splitterObj.paneSettings[1].content = '<div id="content"><h4>About ASP.NET</h4>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser. ASP.NET pages use a compiled,event-driven programming model that improves performance and enables the separation of application logic and user interface.</div>';
                break;
            case 1:
                this.splitterObj.paneSettings[1].content = '<div id="content"><h4>About ASP.NET MVC</h4>The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern for creating Web applications. The ASP.NET MVC framework is a lightweight, highly testable presentation framework that (as with Web Forms-based applications) is integrated with existing ASP.NET features, such as master pages.</div>';
                break;
            case 2:
                this.splitterObj.paneSettings[1].content = '<div id="content"><h4>About JavaScript</h4>JavaScript (JS) is an interpreted computer programming language.It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, communicate asynchronously, and alter the document content that was displayed.More recently, however, it has become common in both game development and the creation of desktop applications.</div>';
                break;
        }
    }
}