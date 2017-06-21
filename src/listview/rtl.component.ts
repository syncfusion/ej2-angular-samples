import { Component, Inject } from '@angular/core';

/**
 * 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    styleUrls:['listview.css']
})
export class RTLListViewComponent {

    public rtl: Boolean = true;

    public data: Object[] = [
        { text: 'الجیریا' },
        { text: 'ارمینیا' },
        { text: 'بنگلا دیش' },
        { text: 'کیوبا' },
        { text: 'فن لینڈ' },
        { text: 'بھارت' },
        { text: 'مصر' },
        { text: 'ڈنمارک' },
        { text: 'ملائیشیا' },
        { text: 'نیوزی لینڈ' },
        { text: 'ناروے' },
        { text: 'سوئٹزر لینڈ' },
        { text: 'پیرو'},
        { text: 'میکسیکو'},
        { text: 'کینیڈا'},
        { text: 'ایکواڈور'},
        { text: 'کویت'}
    ];
    public height: string = '400px';
    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['listview.css'];
    }
}