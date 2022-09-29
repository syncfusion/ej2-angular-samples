/**
 * Mention default functionality Sample
 */
import { Component } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['mention.css']
})
export class DefaultMentionComponent {
    // define the JSON of data
    public emailData: Object[] = [
        { Name: "Selma Rose", Eimg: "7", EmailId: "selma@gmail.com" }, 
        { Name: "Russo Kay", Eimg: "8", EmailId: "russo@gmail.com" },
        { Name: "Camden Kate", Eimg: "9", EmailId: "camden@gmail.com" },
        { Name: "Garth", Eimg: "3", EmailId: "garth@gmail.com" }, 
        { Name: "Ursula Ann", Eimg: "10", EmailId: "ursula@gmail.com" },
        { Name: "Margaret", Eimg: "5", EmailId: "margaret@gmail.com" }, 
        { Name: "Laura Grace", Eimg: "7", EmailId: "laura@gmail.com" },
        { Name: "Robert", Eimg: "8", EmailId: "robert@gmail.com" }, 
        { Name: "Albert", Eimg: "9", EmailId: "albert@gmail.com" },
        { Name: "Michale", Eimg: "10", EmailId: "michale@gmail.com" }, 
        { Name: "Andrew James", Eimg: "3", EmailId: "james@gmail.com" },
        { Name: "William", Eimg: "4", EmailId: "william@gmail.com" }, 
        { Name: "David", Eimg: "5", EmailId: "david@gmail.com" },
        { Name: "Richard Rose", Eimg: "7", EmailId: "richard@gmail.com" }, 
        { Name: "Joseph", Eimg: "8", EmailId: "joseph@gmail.com" },
        { Name: "Thomas", Eimg: "9", EmailId: "thomas@gmail.com" }, 
        { Name: "Charles Danny", Eimg: "10", EmailId: "charles@gmail.com" },
        { Name: "Daniel", Eimg: "3", EmailId: "daniel@gmail.com" }, 
        { Name: "Matthew", Eimg: "2", EmailId: "matthew@gmail.com" },
        { Name: "Donald Krish", Eimg: "1", EmailId: "donald@gmail.com" },
        { Name: "Paul", Eimg: "4", EmailId: "paul@gmail.com" },
        { Name: "Kevin Paul", Eimg: "5", EmailId: "kevin@gmail.com" }
    ];

    public emailFields: Object = { text: 'EmailId' };
    public commentTarget: string = '#commentsMention';
    public commentFields: Object = { text: 'Name' };
}
