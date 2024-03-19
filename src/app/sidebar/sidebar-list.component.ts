import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent, ClickEventArgs, ToolbarModule, SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { SelectEventArgs, ListViewModule } from '@syncfusion/ej2-angular-lists';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    styleUrls: ['sidebar-list.css'],
    templateUrl: 'sidebar-list.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ToolbarModule, SidebarModule, ListViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SidebarListComponent {
    @ViewChild('sidebarInstance')
    public sidebarInstance: SidebarComponent;
    public ListData: { [key: string]: Object }[] = [
        { id: "1", text: "JavaScript", pic: "javascript", 
            description: "JavaScript (JS) is an interpreted computer programming language. " +
            "It was originally implemented as part of web browsers so that client-side scripts" + 
            "could interact with the user, control the browser, communicate asynchronously, and" +
            "alter the document content that was displayed. However, it has recently" +
            "become common in both game development and the creation of desktop applications." },
        { id: "2", text: "TypeScript", pic: "typescript", 
            description: "It is a typed superset of JavaScript that compiles to plain JavaScript." + 
            "TypeScript is an open-source, object-oriented programing language. It contains all elements of JavaScript" + 
            "It is a language designed for large-scale JavaScript application development, which can be executed on any" + 
            "browser, any Host, and any Operating System. TypeScript is a language as well as a set of tools." +
            " TypeScript is the ES6 version of JavaScript with some additional features." },
        { id: "3", text: "Angular", pic: "angular", 
            description: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript." +
            " Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript" +
            " libraries that you import into your applications." },
        { id: "4", text: "React", pic: "react",
            description: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces." +
            " It lets you compose complex UIs from small and isolated pieces of code called “components”." +
            " It can also render on the server using Node." },
        { id: "5", text: "Vue", pic: "vue", 
            description: "A progressive framework for building user interfaces. It is incrementally adoptable." +
            " The core library is focused on the view layer only and is easy to pick up and integrate with other" +
            " libraries or existing projects. On the other hand, Vue is also perfectly capable of powering" +
            " sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries." }
    ];
    public listFields: { [key: string]: Object } = { id: "id", text: "text" };
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['sidebar-list.css'];
    }

    toolbarCliked(args: ClickEventArgs) {
        if(args.item.tooltipText == "Menu") {
            this.sidebarInstance.toggle();
        }
    }
    OnSelect(args: any) {
        document.getElementById("listContent").innerHTML = args.data.description;
    }
};