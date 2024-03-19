import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Button, ButtonComponent, ChangeEventArgs, ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Message, MessageComponent, MessageModule } from '@syncfusion/ej2-angular-notifications';
import { getComponent } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 *  Sample for Message
 */
@Component({
    selector: 'control-content',
    templateUrl: 'icons.html',
    styleUrls: ['icons.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ButtonModule, MessageModule, CheckBoxModule, SBDescriptionComponent]
})

export class IconsController {
    @ViewChild('btn1') private defaultBtn: ButtonComponent;
    @ViewChild('btn2') private infoBtn: ButtonComponent;
    @ViewChild('btn3') private successBtn: ButtonComponent;
    @ViewChild('btn4') private warningBtn: ButtonComponent;
    @ViewChild('btn5') private errorBtn: ButtonComponent;
    @ViewChild('msg_default_icon') private msgDefault: MessageComponent;
    @ViewChild('msg_success_icon') private msgSuccess: MessageComponent;
    @ViewChild('msg_warning_icon') private msgWarning: MessageComponent;
    @ViewChild('msg_error_icon') private msgError: MessageComponent;
    @ViewChild('msg_info_icon') private msgInfo: MessageComponent;

    public defaultClick(): void {
        this.show(this.msgDefault, this.defaultBtn);
    }

    public defaultClosed(): void {
        this.defaultBtn.element.classList.remove('msg-hidden');
    }

    public infoClick(): void {
        this.show(this.msgInfo, this.infoBtn);
    }

    public infoClosed(): void {
        this.infoBtn.element.classList.remove('msg-hidden');
    }

    public successClick(): void {
        this.show(this.msgSuccess, this.successBtn);
    }

    public successClosed(): void {
        this.successBtn.element.classList.remove('msg-hidden');
    }

    public warningClick(): void {
        this.show(this.msgWarning, this.warningBtn);
    }

    public warningClosed(): void {
        this.warningBtn.element.classList.remove('msg-hidden');
    }

    public errorClick(): void {
        this.show(this.msgError, this.errorBtn);
    }

    public errorClosed(): void {
        this.errorBtn.element.classList.remove('msg-hidden');
    }

    public severityIconChange(args: ChangeEventArgs): void {
        this.changeProp("showIcon", args.checked);
    }

    public closeIconChange(args: ChangeEventArgs): void {
        this.changeProp("showCloseIcon", args.checked);
    }

    public show(message: Message, btn: Button): void {
        message.visible = true;
        btn.element.classList.add('msg-hidden');
    }

    public changeProp(prop: string, value: boolean): void {
        let msgTypes: string[] = ["default", "info", "success", "warning", "error"];
        for (let i: number = 0; i <= 4; i++) {
            let msgObj: Message = getComponent(document.getElementById("msg_" + msgTypes[i] + "_icon"), "message") as Message;
            if (msgObj) {
                if (value) {
                    msgObj[prop] = true;
                } else {
                    msgObj[prop] = false;
                }
            }
        }
    }
}
