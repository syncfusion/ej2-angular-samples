/**
 * DropDownList Grouping & Icons Samples
 */
import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'control-content',
    templateUrl: 'groupingicon.html',
    styleUrls: ['groupingicon.css'],
    encapsulation: ViewEncapsulation.None
})
export class GroupAndIconDropDownListComponent {
    public vegetableData: { [key: string]: Object }[] = [
        { vegetable: 'Cabbage', category: 'Leafy and Salad', id: 'item1' },
        { vegetable: 'Spinach', category: 'Leafy and Salad', id: 'item2' },
        { vegetable: 'Wheat grass', category: 'Leafy and Salad', id: 'item3' },
        { vegetable: 'Yarrow', category: 'Leafy and Salad', id: 'item4' },
        { vegetable: 'Pumpkins', category: 'Leafy and Salad', id: 'item5' },
        { vegetable: 'Chickpea', category: 'Beans', id: 'item6' },
        { vegetable: 'Green bean', category: 'Beans', id: 'item7' },
        { vegetable: 'Horse gram', category: 'Beans', id: 'item8' },
        { vegetable: 'Garlic', category: 'Bulb and Stem', id: 'item9' },
        { vegetable: 'Nopal', category: 'Bulb and Stem', id: 'item10' },
        { vegetable: 'Onion', category: 'Bulb and Stem', id: 'item11' }
    ];
    public groupFields: Object = { groupBy: 'category', text: 'vegetable', value: 'id' };
    public height: string = '200px';
    public groupWaterMark: string = 'Select a vegetable';
    public socialMediaData: Object[] = [
        { class: 'facebook', socialMedia: 'Facebook', id: 'media1' },
        { class: 'twitter', socialMedia: 'Twitter', id: 'media2' },
        { class: 'whatsapp', socialMedia: 'WhatsApp', id: 'media3' },
        { class: 'tumblr', socialMedia: 'Tumblr', id: 'media4' },
        { class: 'google-plus', socialMedia: 'Google Plus', id: 'media5' },
        { class: 'skype', socialMedia: 'Skype', id: 'media6' },
        { class: 'vimeo', socialMedia: 'Vimeo', id: 'media7' },
        { class: 'instagram', socialMedia: 'Instagram', id: 'media8' },
        { class: 'youtube', socialMedia: 'YouTube', id: 'media9' },
        { class: 'reddit', socialMedia: 'Reddit', id: 'media10' }
    ];
    public iconFields: Object = { text: 'socialMedia', iconCss: 'class', value: 'id' };
    public iconWaterMark: string = 'Select a social media';
}