import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorUIComponent, RichTextEditorUIModule, SlashCommandService, SlashCommandItemSelectArgs, ChangeEventArgs, FocusEventArgs, BlurEventArgs, BeforeDialogOpenEventArgs, BeforeDialogCloseEventArgs, BeforeFileUploadEventArgs, BeforeFileDropEventArgs, SlashCommandSettingsModel } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { ToolbarItemClickedEventArgs } from '@syncfusion/ej2-richtexteditor-ui/src/richtexteditor-ui/model/toolbar-settings';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ActionCompleteEventArgs ,ActionBeginEventArgs } from '@syncfusion/ej2-richtexteditor-ui/src/controller/interface';

interface EventLogEntry {
    prefix: string;
    bold: string;
    suffix: string;
}

@Component({
    selector: 'control-content',
    templateUrl: 'events.html',
    styleUrls: ['events.css'],
    standalone: true,
    imports: [CommonModule, RichTextEditorUIModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent],
    providers: [SlashCommandService]
})
export class EventsComponent {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    public eventLog: EventLogEntry[] = [];

    public tools = {
        items: ['Bold', 'Italic', 'Underline', '|', 'FontColor', 'BackgroundColor', '|', 'FontName', 'FontSize', '|', 'Table', 'Image', 'Link', '|', 'Formats', 'Alignment', 'NumberFormatList', 'BulletFormatList', '|', 'Undo', 'Redo'],
        itemClicked: this.onItemClick.bind(this)
    };

    public slashCommandSettings: SlashCommandSettingsModel = {
        enable: true,
        itemSelect: this.onSlashCommandItemSelect.bind(this)
    };

    private pushLog(entry: EventLogEntry): void {
        this.eventLog.unshift(entry);
    }

    public onCreated(): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'create', suffix: ' event called' });
    }

    public onDestroyed(): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'destroyed', suffix: ' event called' });
    }

    public onFocused(args: FocusEventArgs): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'focus', suffix: ' event called' });
    }

    public onBlurred(args: BlurEventArgs): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'blur', suffix: ' event called' });
    }

    public onActionBegin(args: ActionBeginEventArgs): void {
        this.pushLog({ prefix: '', bold: args.action, suffix: ' action is called' });
    }

    public onActionComplete(args: ActionCompleteEventArgs): void {
        this.pushLog({ prefix: '', bold: args.action, suffix: ' action is completed' });
    }

    public onChange(args: ChangeEventArgs): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'change', suffix: ' event called' });
    }

    public onItemClick(args: ToolbarItemClickedEventArgs): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'toolbar click', suffix: ` event called (itemId: ${args.item.id})` });
    }

    public onBeforeDialogOpen(args: BeforeDialogOpenEventArgs): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'beforeDialogOpen', suffix: ' event called' });
    }

    public onBeforeDialogClose(args: BeforeDialogCloseEventArgs): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'beforeDialogClose', suffix: ' event called' });
    }

    public onBeforeFileUpload(args: BeforeFileUploadEventArgs): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'beforeFileUpload', suffix: ' event called' });
    }

    public onBeforeFileDrop(args: BeforeFileDropEventArgs): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'beforeFileDrop', suffix: ' event called' });
    }

    public onSlashCommandItemSelect(args: SlashCommandItemSelectArgs): void {
        this.pushLog({ prefix: 'Rich Text Editor UI ', bold: 'slashCommanditemSelect', suffix: ' event called' });
    }

    public onClear(): void {
        this.eventLog = [];
    }
}
