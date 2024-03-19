import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { MessageComponent, MessageModule } from '@syncfusion/ej2-angular-notifications';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 *  Sample for Message
 */
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ButtonModule, MessageModule, SBDescriptionComponent]
})

export class MessageTemplateController {
    @ViewChild('showBtn') private showBtn: ButtonComponent;
    @ViewChild('msg_template') private msgTemplate: MessageComponent;

    public showClick(): void {
        this.msgTemplate.visible = true;
        this.showBtn.element.classList.add('msg-hidden');
    }

    public dismissClick(): void {
        this.msgTemplate.visible = false;
    }

    public closed(): void {
        this.showBtn.element.classList.remove('msg-hidden');
    }
}
