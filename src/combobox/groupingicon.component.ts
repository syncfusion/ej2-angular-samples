/**
 * ComboBox Grouping & Icons Samples
 */
import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'control-content',
    templateUrl: 'groupingicon.html',
    styleUrls: ['groupingicon.css'],
    encapsulation: ViewEncapsulation.None
})
export class GroupAndIconComboBoxComponent {
    public vegetableData: { [key: string]: Object }[] = [
        { vegetable: 'Cabbage', category: 'Leafy and Salad', id: 'item1' },
        { vegetable: 'Chickpea', category: 'Beans', id: 'item2' },
        { vegetable: 'Garlic', category: 'Bulb and Stem', id: 'item3' },
        { vegetable: 'Green bean', category: 'Beans', id: 'item4' },
        { vegetable: 'Horse gram', category: 'Beans', id: 'item5' },
        { vegetable: 'Nopal', category: 'Bulb and Stem', id: 'item6' },
        { vegetable: 'Onion', category: 'Bulb and Stem', id: 'item7' },
        { vegetable: 'Pumpkins', category: 'Leafy and Salad', id: 'item8' },
        { vegetable: 'Spinach', category: 'Leafy and Salad', id: 'item9' },
        { vegetable: 'Wheat grass', category: 'Leafy and Salad', id: 'item10' },
        { vegetable: 'Yarrow', category: 'Leafy and Salad', id: 'item11' }
    ];
    public groupFields: Object = { groupBy: 'category', text: 'vegetable', value: 'id' };
    public height: string = '200px';
    public groupWaterMark: string = 'Select a vegetable';
    public socialMediaData: Object[] = [
        { class: 'facebook', socialMedia: 'Facebook', id: 'media1' },
        { class: 'google-plus', socialMedia: 'Google Plus', id: 'media2' },
        { class: 'instagram', socialMedia: 'Instagram', id: 'media3' },
        { class: 'reddit', socialMedia: 'Reddit', id: 'media4' },
        { class: 'skype', socialMedia: 'Skype', id: 'media5' },
        { class: 'tumblr', socialMedia: 'Tumblr', id: 'media6' },
        { class: 'twitter', socialMedia: 'Twitter', id: 'media7' },
        { class: 'vimeo', socialMedia: 'Vimeo', id: 'media8' },
        { class: 'whatsapp', socialMedia: 'WhatsApp', id: 'media9' },
        { class: 'youtube', socialMedia: 'YouTube', id: 'media10' }
    ];
    public iconFields: Object = { text: 'socialMedia', iconCss: 'class', value: 'id' };
    public iconWaterMark: string = 'Select a social media';
}