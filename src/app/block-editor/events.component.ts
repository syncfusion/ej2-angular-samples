import { Component, ViewEncapsulation, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { BlockModel, BlockEditorModule, ToolbarItemClickEventArgs, BlockAction, BlockChange, BlockChangedEventArgs } from '@syncfusion/ej2-angular-blockeditor';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import blockData from './blockData.json';

@Component({
    selector: 'control-content',
    templateUrl: 'events.html',
    styleUrls: ['events.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BlockEditorModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class BlockEditorEventsComponent implements AfterViewInit {
    public blockDataEvents: BlockModel[] = blockData.blockDataEvents as BlockModel[];
    // Inline toolbar event handlers for demonstrating toolbar interactions
    public inlineToolbar: any = {
        itemClick: (args: ToolbarItemClickEventArgs) => {
            // Log specific inline toolbar item click event to event log
            this.appendElement(`BlockEditor inline toolbar <b>${args.item.command}</b> clicked<hr>`);
        }
    };

    ngAfterViewInit(): void {
        // Event listener to clear the event log on button click
        document.getElementById('clear')?.addEventListener('click', () => {
            document.getElementById('eventLog').innerHTML = '';
        });
    }

    // Append a new log entry to the event log container, prepending it to existing content
    public appendElement(html: string): void {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('eventLog');
        log.insertBefore(span, log.firstChild);
    }

    // Handle block change events by logging a summary of the actions performed
    public blockChangeEvent(args: BlockChangedEventArgs): void {
        const changesCount: number = args.changes.length;
        if (changesCount === 0) { return; }

        // Count occurrences of each action type in the changes
        const actionCounts: { [key in BlockAction]?: number } = {};
        args.changes.forEach((change: BlockChange) => {
            actionCounts[change.action] = (actionCounts[change.action] || 0) + 1;
        });

        let logMessage: string = 'BlockEditor <b>blockChanged</b> event called: ';
        const messages: string[] = [];

        // Helper function to generate pluralized strings for action counts
        const getPluralString = (count: number, noun: string) => {
            return count === 1 ? `${count} ${noun}` : `${count} ${noun}s`;
        };

        // Build descriptive messages for each action type if present
        if (actionCounts.Insertion) {
            messages.push(`${getPluralString(actionCounts.Insertion, 'block')} inserted`);
        }
        if (actionCounts.Deletion) {
            messages.push(`${getPluralString(actionCounts.Deletion, 'block')} deleted`);
        }
        if (actionCounts.Moved) {
            messages.push(`${getPluralString(actionCounts.Moved, 'block')} moved`);
        }
        if (actionCounts.Update) {
            messages.push(`${getPluralString(actionCounts.Update, 'block')} updated`);
        }

        logMessage += messages.join(', ') + '<hr>';
        this.appendElement(logMessage);
    }

    // Log a generic event with the specified event name
    public logEvent(eventName: string): void {
        this.appendElement(`BlockEditor <b>${eventName}</b> event called<hr>`);
    }
}