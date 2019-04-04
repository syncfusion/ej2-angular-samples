/**
 * DropDownList Grouping & Icons Samples
 */
import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'control-content',
    templateUrl: 'grouping-icon.html',
    styleUrls: ['grouping-icon.css'],
    encapsulation: ViewEncapsulation.None
})
export class GroupAndIconDropDownListComponent {
    // define the data with category
    public vegetableData: { [key: string]: Object }[] = [
        { Vegetable: 'Cabbage', Category: 'Leafy and Salad', Id: 'item1' },
        { Vegetable: 'Spinach', Category: 'Leafy and Salad', Id: 'item2' },
        { Vegetable: 'Wheat grass', Category: 'Leafy and Salad', Id: 'item3' },
        { Vegetable: 'Yarrow', Category: 'Leafy and Salad', Id: 'item4' },
        { Vegetable: 'Pumpkins', Category: 'Leafy and Salad', Id: 'item5' },
        { Vegetable: 'Chickpea', Category: 'Beans', Id: 'item6' },
        { Vegetable: 'Green bean', Category: 'Beans', Id: 'item7' },
        { Vegetable: 'Horse gram', Category: 'Beans', Id: 'item8' },
        { Vegetable: 'Garlic', Category: 'Bulb and Stem', Id: 'item9' },
        { Vegetable: 'Nopal', Category: 'Bulb and Stem', Id: 'item10' },
        { Vegetable: 'Onion', Category: 'Bulb and Stem', Id: 'item11' }
    ];    
  // map the groupBy field with Category column
    public groupFields: Object = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    // set the height of the popup element
    public height: string = '200px';
    // set the placeholder to DropDownList input element
    public groupWaterMark: string = 'Select a vegetable';
    //define the data with icon class
    public socialMediaData: Object[] = [
        { Class: 'facebook', SocialMedia: 'Facebook', Id: 'media1' },
        { Class: 'twitter', SocialMedia: 'Twitter', Id: 'media2' },
        { Class: 'whatsapp', SocialMedia: 'WhatsApp', Id: 'media3' },
        { Class: 'tumblr', SocialMedia: 'Tumblr', Id: 'media4' },
        { Class: 'google-plus', SocialMedia: 'Google Plus', Id: 'media5' },
        { Class: 'skype', SocialMedia: 'Skype', Id: 'media6' },
        { Class: 'vimeo', SocialMedia: 'Vimeo', Id: 'media7' },
        { Class: 'instagram', SocialMedia: 'Instagram', Id: 'media8' },
        { Class: 'youtube', SocialMedia: 'YouTube', Id: 'media9' },
        { Class: 'linkedin', SocialMedia: 'LinkedIn', Id: 'media10' },
    ];
    // map the iconCss field with Class column
    public iconFields: Object = { text: 'SocialMedia', iconCss: 'Class', value: 'Id' };
    // set the placeholder to DropDownList input element
    public iconWaterMark: string = 'Select a social media';
}