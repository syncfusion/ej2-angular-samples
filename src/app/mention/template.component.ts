/**
 * Mention template Sample
 */
import { Component } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, MentionModule, SBDescriptionComponent]
})
export class TemplateMentionComponent {
    // define the JSON of data
    public emailData: Object[] = [
        { Name: 'Selma Rose', Eimg: '3', EmailId: 'selma@gmail.com' }, 
        { Name: 'Russo Kay', Eimg: '8', EmailId: 'russo@gmail.com' },
        { Name: 'Camden Kate', Eimg: '9', EmailId: 'camden@gmail.com' },
        { Name: 'Mary Kate', Eimg: '4', EmailId: 'marry@gmail.com' }, 
        { Name: 'Ursula Ann', Eimg: '2', EmailId: 'ursula@gmail.com' },
        { Name: 'Margaret', Eimg: '5', EmailId: 'margaret@gmail.com' }, 
        { Name: 'Laura Grace', Eimg: '6', EmailId: 'laura@gmail.com' },
        { Name: 'Robert', Eimg: '8', EmailId: 'robert@gmail.com' }, 
        { Name: 'Albert', Eimg: '9', EmailId: 'albert@gmail.com' },
        { Name: 'Michale', Eimg: '10', EmailId: 'michale@gmail.com' }, 
        { Name: 'Andrew James', Eimg: '7', EmailId: 'james@gmail.com' },
        { Name: 'Rosalie', Eimg: '4', EmailId: 'rosalie@gmail.com' }, 
        { Name: 'Stella Ruth', Eimg: '2', EmailId: 'stella@gmail.com' },
        { Name: 'Richard Harris', Eimg: '10', EmailId: 'richard@gmail.com' }, 
        { Name: 'Gabrielle', Eimg: '3', EmailId: 'gabrielle@gmail.com' },
        { Name: 'Thomas', Eimg: '7', EmailId: 'thomas@gmail.com' }, 
        { Name: 'Charles Danny', Eimg: '8', EmailId: 'charles@gmail.com' },
        { Name: 'Daniel', Eimg: '10', EmailId: 'daniel@gmail.com' }, 
        { Name: 'Matthew', Eimg: '7', EmailId: 'matthew@gmail.com' },
        { Name: 'Donald Krish', Eimg: '9', EmailId: 'donald@gmail.com' },
        { Name: 'Yohana', Eimg: '1', EmailId: 'yohana@gmail.com' },
        { Name: 'Kevin Paul', Eimg: '10', EmailId: 'kevin@gmail.com' }
    ];

    public templateFields: Object = { text: 'Name' };
    public templateTarget: string = '#templateMention';
    public popupHeight: string = "200px";
    public popupWidth: string = "250px";
}