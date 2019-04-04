/**
 * ComboBox Grouping & Icons Samples
 */
import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'control-content',
    templateUrl: 'grouping-icon.html',
    styleUrls: ['grouping-icon.css'],
    encapsulation: ViewEncapsulation.None
})
export class GroupAndIconComboBoxComponent {
    //define the JSON of data with category
    public vegetableData: { [key: string]: Object }[] = [
        { Vegetable: 'Cabbage', Category: 'Leafy and Salad', Id: 'item1' },
        { Vegetable: 'Chickpea', Category: 'Beans', Id: 'item2' },
        { Vegetable: 'Garlic', Category: 'Bulb and Stem', Id: 'item3' },
        { Vegetable: 'Green bean', Category: 'Beans', Id: 'item4' },
        { Vegetable: 'Horse gram', Category: 'Beans', Id: 'item5' },
        { Vegetable: 'Nopal', Category: 'Bulb and Stem', Id: 'item6' },
        { Vegetable: 'Onion', Category: 'Bulb and Stem', Id: 'item7' },
        { Vegetable: 'Pumpkins', Category: 'Leafy and Salad', Id: 'item8' },
        { Vegetable: 'Spinach', Category: 'Leafy and Salad', Id: 'item9' },
        { Vegetable: 'Wheat grass', Category: 'Leafy and Salad', Id: 'item10' },
        { Vegetable: 'Yarrow', Category: 'Leafy and Salad', Id: 'item11' }
    ];
    // map the groupBy field with Category column
    public groupFields: Object = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    // set the height of the popup element
    public height: string = '200px';
    // set the placeholder to ComboBox input element
    public groupWaterMark: string = 'Select a vegetable';
    //define the data with icon class
    public socialMediaData: Object[] = [
        { Class: 'facebook', SocialMedia: 'Facebook', Id: 'media1' },
        { Class: 'google-plus', SocialMedia: 'Google Plus', Id: 'media2' },
        { Class: 'instagram', SocialMedia: 'Instagram', Id: 'media3' },
        { Class: 'linkedin', SocialMedia: 'LinkedIn', Id: 'media4' },
        { Class: 'skype', SocialMedia: 'Skype', Id: 'media5' },
        { Class: 'tumblr', SocialMedia: 'Tumblr', Id: 'media6' },
        { Class: 'twitter', SocialMedia: 'Twitter', Id: 'media7' },
        { Class: 'vimeo', SocialMedia: 'Vimeo', Id: 'media8' },
        { Class: 'whatsapp', SocialMedia: 'WhatsApp', Id: 'media9' },
        { Class: 'youtube', SocialMedia: 'YouTube', Id: 'media10' }
    ];
    // map the iconCss field with Class column
    public iconFields: Object = { text: 'SocialMedia', iconCss: 'Class', value: 'Id' };
    // set the placeholder to ComboBox input element
    public iconWaterMark: string = 'Select a social media';
}