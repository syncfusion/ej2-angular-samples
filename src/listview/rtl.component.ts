/**
 * ListView RTL Sample
 */

import { Component, Inject } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    styleUrls:['listview.css']
})

export class RTLListViewComponent {

    //Enable RTL
    public rtl: Boolean = true;

    //Define an array of JSON data
    public data: Object[] = [
        { text: 'الجیریا', id: 'list-01' },
        { text: 'ارمینیا', id: 'list-02' },
        { text: 'بنگلا دیش', id: 'list-03' },
        { text: 'کیوبا', id: 'list-04' },
        { text: 'فن لینڈ', id: 'list-05' },
        { text: 'بھارت', id: 'list-06' },
        { text: 'مصر', id: 'list-07' },
        { text: 'ڈنمارک', id: 'list-08' },
        { text: 'ملائیشیا', id: 'list-09' },
        { text: 'نیوزی لینڈ', id: 'list-10' },
        { text: 'ناروے', id: 'list-11' }
    ];

    //Set header title
    public headerTitle: string = 'اسم الدولة';

    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['listview.css'];
    }
}