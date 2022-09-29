/**
 * Rich Text Editor Mention integration Functionality Sample
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'mention-integration.html',
    styleUrls: ['mention-integration.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class MentionIntegrationComponent {
    public data: { [key: string]: Object }[] = [
        { Name: "Selma Rose", Status: "active", Eimg: "2", EmailId: "selma@gmail.com" },
        { Name: "Maria", Status: "active", Eimg: "1", EmailId: "maria@gmail.com" },
        { Name: "Russo Kay", Status: "busy", Eimg: "8", EmailId: "russo@gmail.com" },
        { Name: "Camden Kate", Status: "active", Eimg: "9", EmailId: "camden@gmail.com" },
        { Name: "Robert", Status: "busy", Eimg: "dp", EmailId: "robert@gmail.com" },
        { Name: "Garth", Status: "active", Eimg: "7", EmailId: "garth@gmail.com" },
        { Name: "Andrew James", Status: "away", Eimg: "pic04", EmailId: "noah@gmail.com" },
        { Name: "Olivia", Status: "busy", Eimg: "5", EmailId: "olivia@gmail.com" },
        { Name: "Sophia", Status: "away", Eimg: "6", EmailId: "sophia@gmail.com" },
        { Name: "Margaret", Status: "active", Eimg: "3", EmailId: "margaret@gmail.com" },
        { Name: "Ursula Ann", Status: "active", Eimg: "dp", EmailId: "ursula@gmail.com" },
        { Name: "Laura Grace", Status: "away", Eimg: "4", EmailId: "laura@gmail.com" },
        { Name: "Albert", Status: "active", Eimg: "pic03", EmailId: "albert@gmail.com" },
        { Name: "William", Status: "away", Eimg: "10", EmailId: "william@gmail.com" }
      ];
      public  fieldsData: { [key: string]: string } = { text: 'Name' };

      onActionBegin(args){
        if (args.requestType === 'EnterAction') {
            args.cancel = true;
        }
      }
}