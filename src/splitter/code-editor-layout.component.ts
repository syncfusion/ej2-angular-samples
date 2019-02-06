import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SplitterComponent} from '@syncfusion/ej2-angular-layouts';
import { Splitter } from '@syncfusion/ej2-layouts';


/**
 * Splitter Code editor layout
 */
@Component({
    selector: 'control-content',
    templateUrl: 'code-editor-layout.html',
    encapsulation: ViewEncapsulation.None
})
export class CodeEditorLayoutComponent {
    @ViewChild('splitterInstance') splitterObj: SplitterComponent;

    public pane1Content: string = '<div><div class="content"><h3 class="h3">HTML</h3><div class="code-preview">&lt;<span>!DOCTYPE html></span><div>&lt;<span>html></span></div>' +
    '<div>&lt;<span>body></span></div>&lt;<span>div</span> id="custom-image"><div style="margin-left: 5px">&lt;<span>img</span> src="src/albert.png"></div>' +
    "<div>&lt;<span>div</span>&gt;</div><div>&lt;<span>/body></span></div><div>&lt;<span>/html></span></div></div></div></div>";
    public pane2Content: string = '<div><div class="content"><h3 class="h3">CSS</h3><div class="code-preview"><span>img {</span><div id="code-text">margin:<span>0 auto;</span></div>' +
    '<div id="code-text">display:<span>flex;</span></div><div id="code-text">height:<span>70px;</span></div><span>}</span></div></div></div>';
    public pane3Content: string = '<div><div class="content"><h3 class="h3">JavaScript</h3><div class="code-preview"><span>var </span>'
    + 'image = document.getElementById("custom-image");<div>image.addEventListener("click", function() {</div>'
    + '<div style="padding-left: 20px;">// Code block for click action</div><span> }</span></div></div></div>';

    public onCreated () {
        document.getElementById('outerSplitter').querySelector('.e-pane-vertical').setAttribute('id', 'Innersplitter');
        let splitterObj1 = new Splitter({
            height: '220px',
            paneSettings: [
                { size: '29%', min: '23%', content: this.pane1Content },
                { size: '20%', min: '15%', content: this.pane2Content },
                { size: '35%', min: '35%', content: this.pane3Content }
            ],
            width: '100%'
        });
        splitterObj1.appendTo('#Innersplitter');
    }
}