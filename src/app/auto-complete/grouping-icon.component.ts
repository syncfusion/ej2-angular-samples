/**
 * AutoComplete Grouping & Icon Samples
 */
import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'control-content',
    templateUrl: 'grouping-icon.html',
    styleUrls: ['grouping-icon.css'],
    encapsulation: ViewEncapsulation.None
})
export class GroupAndIconAutoCompleteComponent {
    // defined the array of vegetables data
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
    // maps the Category column to groupBy fields
    public groupFields: Object = { groupBy: 'Category', value: 'Vegetable' };
    // set the placeholder to the AutoComplete input
    public groupWaterMark: string = 'e.g. Cabbage';
    // defined the array of social media data
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
    // maps the Class column to iconCss fields
    public iconFields: Object = { iconCss: 'Class', value: 'SocialMedia' };
    // set the placeholder to the AutoComplete input
    public iconWaterMark: string = 'e.g. Facebook';
}