import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';
import { TabComponent as TabComponentBase, TabModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'tab.html',
    standalone: true,
    imports: [TabModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class TabComponent implements AfterViewInit, OnDestroy {

    @ViewChild('tab')
    public tab: TabComponentBase;

    public tabItems: Object[] = [
        {
            header: { text: 'Summary', iconCss: 'e-icons e-description' },
            content: '<div id="rte-container"></div>'
        },
        {
            header: { text: 'Remedies', iconCss: 'e-icons e-description' },
            content: '<div style="padding:16px">Remedies Content</div>'
        },
        {
            header: { text: 'Notes', iconCss: 'e-icons e-description' },
            content: '<div style="padding:16px">Notes Content</div>'
        }
    ];

    private editor: RichTextEditorUI | null = null;

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.initializeRTE();
        }, 0);
    }

    public onTabSelected(event: any): void {
        if (event.selectedIndex === 0) {
            this.initializeRTE();
        }
    }

    private initializeRTE(): void {
        if (this.editor) {
            return;
        }
        const host: HTMLElement | null =
            document.getElementById('rte-container');

        if (host) {
            this.editor = new RichTextEditorUI({
                placeholder: 'Type something'
            });
            this.editor.appendTo(host);
        }
    }

    public ngOnDestroy(): void {
        if (this.editor) {
            this.editor.destroy();
            this.editor = null;
        }
    }
}