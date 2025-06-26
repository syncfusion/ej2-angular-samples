import { Component, ViewEncapsulation, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { BlockModel, BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { blockDataEvents } from './blockData'

@Component({
    selector: 'control-content',
    templateUrl: 'events.html',
    styleUrls: ['events.component.css'],   
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BlockEditorModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class BlockEditorEventsComponent implements AfterViewInit {    
    public blockDataEvents: BlockModel[] = blockDataEvents;
    ngAfterViewInit(): void {
        document.getElementById('clear')?.addEventListener('click', () => {
            document.getElementById('eventLog').innerHTML = '';
        });
    }
    public appendElement(html: string): void {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('eventLog');
        log.insertBefore(span, log.firstChild);
    }
    public logEvent(eventName: string): void {
        this.appendElement(`BlockEditor <b>${eventName}</b> event called<hr>`);
    }
}