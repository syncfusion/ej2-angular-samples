import { Component, Inject } from '@angular/core';

/**
 * Default ListView Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls:['listview.css']
})
export class DefaultListViewComponent {

    public data: Object[] = [
        { text: 'Hennessey Venom' },
        { text: 'Bugatti Chiron' },
        { text: 'Bugatti Veyron Super Sport' },
        { text: 'SSC Ultimate Aero' },
        { text: 'Koenigsegg CCR' },
        { text: 'McLaren F1' },
        { text: 'Aston Martin One- 77' },
        { text: 'Jaguar XJ220' },
        { text: 'McLaren P1' },
        { text: 'Ferrari LaFerrari' },
    ];

    public groupData: { [key: string]: Object }[] = [
        {
            'text': 'Audi A4',
            'id': '9bdb',
            'category': 'Audi'
        },
        {
            'text': 'Audi A5',
            'id': '4589',
            'category': 'Audi'
        },
        {
            'text': 'Audi A6',
            'id': 'e807',
            'category': 'Audi'
        },
        {
            'text': 'Audi A7',
            'id': 'a0cc',
            'category': 'Audi'
        },
        {
            'text': 'Audi A8',
            'id': '5e26',
            'category': 'Audi'
        },
        {
            'text': 'BMW 501',
            'id': 'f849',
            'category': 'BMW'
        },
        {
            'text': 'BMW 502',
            'id': '7aff',
            'category': 'BMW'
        },
        {
            'text': 'BMW 503',
            'id': 'b1da',
            'category': 'BMW'
        },
        {
            'text': 'BMW 507',
            'id': 'de2f',
            'category': 'BMW'
        },
        {
            'text': 'BMW 3200',
            'id': 'b2b1',
            'category': 'BMW'
        }
    ];

    public fields: Object = { groupBy: 'category' };

constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['listview.css'];
    }

}