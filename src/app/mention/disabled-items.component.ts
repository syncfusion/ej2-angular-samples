/**
 * Mention Disabled Item Sample
 */
import { Component } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'disabled-items.html',
    styleUrls: ['disabled-items.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, MentionModule, SBDescriptionComponent]
})
export class DisabledItemsMentionComponent {
    // define the JSON of data
    public emailData: Object[] = [
        { Name: 'Selma Rose (inactive)', Eimg: '3', EmailId: 'selma@gmail.com', State: true }, 
        { Name: 'Russo Kay', Eimg: '8', EmailId: 'russo@gmail.com', State: false },
        { Name: 'Camden Kate', Eimg: '9', EmailId: 'camden@gmail.com', State: false },
        { Name: 'Mary Kate (inactive)', Eimg: '4', EmailId: 'marry@gmail.com', State: true }, 
        { Name: 'Ursula Ann', Eimg: '2', EmailId: 'ursula@gmail.com', State: false },
        { Name: 'Margaret', Eimg: '5', EmailId: 'margaret@gmail.com', State: false }, 
        { Name: 'Laura Grace (inactive)', Eimg: '6', EmailId: 'laura@gmail.com', State: true },
        { Name: 'Robert', Eimg: '8', EmailId: 'robert@gmail.com', State: false }, 
        { Name: 'Albert', Eimg: '9', EmailId: 'albert@gmail.com', State: false },
        { Name: 'Michale', Eimg: '10', EmailId: 'michale@gmail.com', State: false }, 
        { Name: 'Andrew James', Eimg: '7', EmailId: 'james@gmail.com', State: false },
        { Name: 'Rosalie', Eimg: '4', EmailId: 'rosalie@gmail.com', State: false }, 
        { Name: 'Stella Ruth (inactive)', Eimg: '2', EmailId: 'stella@gmail.com', State: true },
        { Name: 'Richard Rose', Eimg: '10', EmailId: 'richard@gmail.com', State: false }, 
        { Name: 'Gabrielle', Eimg: '3', EmailId: 'gabrielle@gmail.com', State: false },
        { Name: 'Thomas', Eimg: '7', EmailId: 'thomas@gmail.com', State: false }, 
        { Name: 'Charles Danny', Eimg: '8', EmailId: 'charles@gmail.com', State: false },
        { Name: 'Daniel (inactive)', Eimg: '10', EmailId: 'daniel@gmail.com', State: true }, 
        { Name: 'Matthew', Eimg: '7', EmailId: 'matthew@gmail.com', State: false },
        { Name: 'Donald Krish', Eimg: '9', EmailId: 'donald@gmail.com', State: false },
        { Name: 'Yohana (inactive)', Eimg: '1', EmailId: 'yohana@gmail.com', State: true },
        { Name: 'Kevin Paul', Eimg: '10', EmailId: 'kevin@gmail.com', State: false }
    ];

    public disabledFields: Object = { text: 'Name', disabled: 'State' };
    public disabledTarget: string = '#disabledMention';
    public popupHeight: string = "200px";
    public popupWidth: string = "250px";
}
